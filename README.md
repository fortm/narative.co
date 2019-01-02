![Narative Logo Header](https://res.cloudinary.com/narative/image/upload/v1546451163/narative-header.jpg)

<br />

# Narative.co

Narative brings decades of design, marketing and engineering expertise directly to your team. <br />
We help you build the products you've always dreamed of, and the ones you're yet to dream up.

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
