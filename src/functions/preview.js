import dotenv from 'dotenv'
dotenv.config()

import { is, map } from 'ramda'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
const contentful = require('contentful')

import { HTMLRendererOpts } from '../../plugins/gatsby-transformer-contentful-rich-text-html-renderer/htmlRenderer'
import settings from '../settings'

// Create a clinet to talk with Contentful
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_PREVIEW_API_KEY,
  host: 'preview.contentful.com',
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'staging',
})

// Some static error codes
const ERROR_BAD_REQUEST = {
  statusCode: 400,
  body: JSON.stringify('Please provide a valid entry to preview'),
}

const ERROR_FORBIDDEN = {
  statusCode: 403,
  body: JSON.stringify('Cannot provide preview for that type of entry'),
}

const ERROR_UNRETRIEVABLE = {
  statusCode: 400,
  body: JSON.stringify('Could not retrieve you entry'),
}

const ERROR_UNPROCESSABLE = {
  statusCode: 400,
  body: JSON.stringify('Your entry could not be displayed'),
}

// Values we want as constants
const MODEL_ARTICLE = 'article'

// The only models that we will accept previews for
const MODEL_PREVIEW_WHITELIST = [MODEL_ARTICLE]

// Turn the model names in to a URL so you can set the path prefix
const modelToUrl = {
  [MODEL_ARTICLE]: settings.urls.articles,
}

export async function handler(event, context) {
  const queryParams = event.queryStringParameters
  const entryId = queryParams.entry

  // Store some empty variables for later (makes try / catch less painful)
  let entry, model, fields

  if (!entryId) return ERROR_BAD_REQUEST

  // Go to the API and get this entry
  try {
    entry = await client.getEntry(entryId)
    model = entry.sys.contentType.sys.id
  } catch (error) {
    console.error(error)
    return ERROR_UNRETRIEVABLE
  }

  // Check that the entry's model is one we would want to allow a preview of
  if (!MODEL_PREVIEW_WHITELIST.includes(model)) return ERROR_FORBIDDEN

  // Create a nice object we can preview
  // Fields will have a couple different "types" of fields here.
  // Sometimes it's basic values (e.g. a string)
  // Sometimes it's an object representing a relationship
  // Sometimes it's a rich text complex object
  // This inline function has a go at parsing all of that information
  try {
    fields = map(value => {
      const isObject = is(Object, value)

      // ... handle assets e.g. hero images
      // todo: currently we just pull these out and do nothing with them
      if (isObject && value.sys && value.sys.type === 'Asset') {
        return { Article__Hero: 'Will not be displayed on preview' }
      }

      // ... handle the rich text elements
      if (isObject && value.nodeType === 'document') {
        return documentToHtmlString(value, HTMLRendererOpts)
      }

      // ... or elevate all nested values
      if (isObject && value.fields) return value.fields

      // ...else return the basic value
      return value
    }, entry.fields)
  } catch (error) {
    console.error(error)
    return ERROR_UNPROCESSABLE
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      ...fields,
      // Fields that are calculated during createPages we have to do manually here
      id: entryId,
      postDate: '< Date of post >',
      pathPrefix: modelToUrl[model],
      node_locale: 'en',
    }),
  }
}
