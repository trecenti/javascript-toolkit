*this project is now dead, for curated lists check [https://github.com/sorrycc/awesome-javascript](https://github.com/sorrycc/awesome-javascript)*

# Javascript Toolkit WebSite

## Development

### Architecture

We use metalsmith to generate a static website aplying the `.ejs` templates `/templates/*` from `json` content defined in `/src/**/*.json`. Any other static `/src/**/*.html` or `/src/image/*` file will also be copied to the `/build` directory.

Stylesheets are being pre-processed by `sass` and must live inside the `/src/sass/` folder, this will output `.css` files that are going to be used for each of the template pages that we have. (home, category, tool)

Here's the current architecture to generate the static website, given the structure:
```
/src
  |__/category
  |  |__/sub-category
  |     |__index.json
  |     |__tool.json
  |__index.json
```

it will output:
```
/build
  |__/sub-category
  |  |__index.html
  |__index.html
```

The template will be selected based on where the `.json` is located and its name, for example:

`/src/index.json` uses `/templates/home.ejs`

`/src/category/sub-category/index.json` uses `/templates/category.ejs`

`/src/category/sub-category/tool.json` will be baked into `/templates/category.ejs`

### Scripts

Watch for changes on `/src` and `/templates` and build the static website. Useful for fast interaction development.
```bash
npm run watch
```

Serve the static website structure from `/build` on `localhost:$PORT` where `$PORT` is a env variable declared which is default to 4000
```bash
npm start
```

Manually build the stucture outputing to `/build`
```bash
npm run build
```

### Testing

We're using nightwatch to create end-2-end functional UI tests, we should write tests whenever a new tool is added to the toolkit.


## Environment & Deploys

### Production
We're using Github Pages to host the website, deploys to production are manually triggered from [Snap-ci](https://snap-ci.com/trecenti/javascript-toolkit/branch/master).

### Staging
We have a staging environment hosted [heroku](http://staging-js-toolkit.herokuapp.com), every merge to master will deploy a new version of the app to this env.
Tests will also be run in this environment, they're managed by Snap-Ci

### Publishing Changes

Publish `/build` to `gh-pages` branch.

**Use with caution**: this is the production deploy mechanism, we shouldn't run this command via terminal. Instead refer to [production section](#Production) of this readme for deploys to production.
```bash
npm run publish
```
There's a helper that builds and publish.
```bash
npm run buildAndPublish
```

## Contributing

The Javascript Toolkit initiative is a open source informational webpage. We want it to be a guide and reference the community in regards to the tools, frameworks and technology that has be used with success in modern Javascript projects. 

So if you have had a good experience with a Javascript framework, please let us know. Before anything gets into the radar we want it to be pitched and discussed by the community.

Here are some guildelines on how to contribute:

1. Check if the tool, framework or technology you're pitching is already in the toolkit.

2. Check if there's a pitch already for the tool, our Labels can help filtering if needed.

3. Create a new Issue if step 1 && 2 results `false`

4. Give a good description, with your experience with the tool, Label it if possible.

5. Once enough people (still TBD) have vouched for it to be in the js toolkit, it will be added to the toolkit.

We welcome any contribution, we are very thankful for it as well!
