# personal-api
An API created for my personal site usage.

## Development
Install dependencies:

```bash
yarn
```

Create a `now-secrets.json` with the keys
- `@gh_personal_site_token`
- `@personal_api_token`

Run it with

```bash
yarn dev
```

## Folder structure
### API
The GraphQL API (made with Grial) is placed inside the `api` directory. There you can find the files `resolvers.js`, `models.json` and `connectors.json`, used to define each part of the API, those files require the code from the directories with the same name.

There's also a `schemas` folder where is possible to find the `.gql` files whose define the GraphQL schema.

### Data
It contains all the data used by the API, for the moment it only hosts `essays` with all the Markdown files created.

An essay without the published meta data is not going to work on production.

### Server
The server is a simple HTTP server used to run the GraphQL API and some Express.js middleware like `compression` (for gzip) and `morgan` (for logs).

## Deploy to production
Just run `now` and it will work on production. It's also automatically deployed to Now each time a commit goes to `master`.