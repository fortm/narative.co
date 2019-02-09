import { ReactNode } from 'react'

/**
 * Basic types
 */

interface IMeta {
  title: string
  description: string
  image: {
    file: {
      url: string
    }
  }
}

interface IMetaQuery {
  edges: {
    node: { seo: IMeta }
  }[]
}

interface ICategory {
  name: string
  id: string
}

interface IAuthor {
  name: string
  slug: string
  avatar?: {
    small: ISharpFluidAtKey
    large: ISharpFluidAtKey
  }
  bio?: {
    bio: string
  }
  fullBiography?: {
    childRichTextHtml: {
      html: string
    }
  }
}

export interface IAsset {
  file: {
    url: string
  }
}

interface ISharpImage {
  src: string
  base64?: string
  srcWebp?: string
  srcSet?: string
  srcSetWebp?: string
  tracedSVG?: string
}

// todo : These types probably exist inside of the the Gatsby sharp module

interface ISharpFluidAttrs extends ISharpImage {
  maxHeight: number
  maxWidth: number
}

interface ISharpFixedAttrs extends ISharpImage {
  height: number
  width: number
}

type ISharpFixedOrFluidAttrs = ISharpFluidAttrs | ISharpFixedAttrs

export interface ISharpFixedAtKey {
  fixed: ISharpFixedAttrs
}

export interface ISharpFluidAtKey {
  fluid: ISharpFluidAttrs
}

interface IGraphqlSharpFixedImage {
  childImageSharp: ISharpFixedAtKey
}

interface IGraphqlSharpFluidImage {
  childImageSharp: ISharpFluidAtKey
}

interface IGraphqlContentfulImage {
  CardStandard: ISharpFixedOrFluidAttrs
  CardPost: ISharpFixedOrFluidAttrs
  Home__Hero: ISharpFixedOrFluidAttrs
  Article__Hero: ISharpFixedOrFluidAttrs
}

interface IBasicNode {
  __typename?: string
  id: string
  title: string
  node_locale: string
  excerpt: string
  body: string
  featured?: boolean
  postDate?: string
  fields: {
    postDate: string
    postDateAsDate?: string
  }
}

export interface IArticleNode extends IBasicNode {
  slug: string
  author: IAuthor
  category: ICategory[]
  hero: IGraphqlContentfulImage
  type?: string
  path?: string
  fields: {
    path: string
    postDate: string
    postDateAsDate?: string
  }
}

export type IPressOrPostArray = IPostNode[]

interface IPostNodeQuery {
  edges: {
    node: IPostNode
  }[]
}

interface IRouterContext {
  locale: string
  languages: ILanguage[]
}

export interface IPageContext extends IRouterContext {
  slug?: string
  index?: number
  pathPrefix?: string
}

export interface IPageContextPosts extends IPageContext {
  group?: IPostNode[]
  additionalContext: {
    featured?: IPostNode[]
  }
}

export interface IPageContextPress extends IPageContext {
  group?: IPressLinkNode[]
  additionalContext: {
    featured?: IPressLinkNode[]
  }
}

export interface IPageContextPost extends IPageContext {
  node: IPostNode
  relateds: IPostNode[]
}

export interface IPageContextAuthorBio extends IPageContext {
  author: IAuthor
}

export interface IPathContext extends IRouterContext {
  node: {
    path: string
    pathPrefix: string
  }
}

/**
 * Components
 */

export interface ICard extends React.HTMLAttributes<HTMLElement> {
  title: string
  media?: ISharpFixedOrFluidAttrs | string
  backgroundMedia?: ISharpFixedOrFluidAttrs | string
  excerpt?: string
  author?: IAuthor
  createdAt?: string
  as?: ReactNode
  to?: string
  href?: string
  hasHover?: boolean
}

export interface IImg extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: ISharpFixedOrFluidAttrs | string
}

export interface IRichText {
  content: {
    childRichTextHtml: {
      html: string
    }
  }
  contentRef: React.RefObject<HTMLElement>
}

type IHorizontalScrollerItem = IPostNode | IPressLinkNode

export interface IHorizontalScrollerProps {
  title: string
  items: IHorizontalScrollerItem[]
}

export interface IMicrodataBreadcrumb {
  levels: {
    item: string
    name: string
  }[]
}

/**
 * Pages
 */

interface IBasicPage {
  location: Location
  '*': string
  path: string
  uri: string
  navigate: () => void
}

interface IGatsbyMadePage extends IBasicPage {
  pageContext: IPageContext
  pathContext: IPathContext
}
