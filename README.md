![Narative Logo Header](https://res.cloudinary.com/narative/image/upload/v1554161802/home-meta.jpg)

<br />

# Narative.co

Narative builds brands, websites and products for growth-minded companies.. <br />
We're a team with senior startup experience here to help your business take the next step.

#### Technology

Narative.co is powered by [Gatsby](gatsbyjs.org) that pulls data from [Contentful](https://www.contentful.com) and is hosted on [Netlify's](https://netlify.com). Apart from that, we aim to keep things as barebones as we can.

#### Installation

```sh
# Go to your favourite directory and clone
git clone git@github.com:narative/narative.co.git && cd narative.co

# Install all depedencies
yarn

# 🎉 That's it, you've installed repo locally. One last step!
```

### Enviroment Variables

This project uses [Contentful](https://www.contentful.com) to pull in some copy and images. To get this variables you can go to a couple different locations. First, you can log directly into Narative's Contentful account and look for the API keys. Second, you can check [Netlify's](https://netlify.com) deploy settings for the variables.

#### Running the code locally

```sh
yarn dev
```

#### Building the website

```sh
yarn build
```

#### Deploying the website

Deployments are done using [Netlify](https://app.netlify.com/). You must be added to the Narative Netlify organization to deploy.

```sh
# To deploy, commit and push to master
git push
```

### Branching

#### `[your-branch]`

Working on your feature branch can be previewed after every push.

#### `dev`

Before deploying to narative.co, double check your code on `dev` branch.

#### `master`

To deploy to narative.co merge your code into master.

## License

BSD 3-Clause, see the [LICENSE](./LICENSE) file.
