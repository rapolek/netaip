# Stackbit Ampersand Theme

This site was generated by [www.stackbit.com](https://www.stackbit.com), v0.3.8.

Stackbit Ampersand Theme original README is located [here](./README.theme.md).

The content of this site is managed by NetlifyCMS. Visit https://{yoursite-domain}/admin to manage site content.

# Running Your Site Locally

1. Install [Node.js and npm](https://nodejs.org/en/)

1. Install npm dependencies:

        npm install

1. Get "stackbit-api-key" from project menu in [Stackbit dashboard](https://app.stackbit.com/dashboard)

1. Run the following command to assign this key to `STACKBIT_API_KEY` environment variable:

        export STACKBIT_API_KEY={stackbit_netlify_api_key}

1. Run the following command to fetch additional site contents from Stackbit if needed:

        npx @stackbit/stackbit-pull --stackbit-pull-api-url=https://api.stackbit.com/pull/5f0dc89ae46fff001f8985a7

1. Start a local development server:

        npm run develop

1. browse to [http://localhost:8000/](http://localhost:8000/)
