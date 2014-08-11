# Javascript Toolkit WebSite

Source code repository for [javascript-toolkit.com](http://javascript-toolkit.com)


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
  |  |__tool.html
  |__index.html   
```

The template will be selected based on where the `.json` is located and its name, for example:

`/src/index.json` uses `/templates/home.ejs`

`/src/category/sub-category/index.json` uses `/templates/category.ejs`

`/src/category/sub-category/tool.json` uses `/templates/tool.ejs` 

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

### Publishing Changes

Publish `/build` to `gh-pages` branch.
Use with caution is this is the production deploy mechanism.
```bash
npm run publish
```
There's a helper that builds and publish.
```bash
npm run buildAndPublish
```
