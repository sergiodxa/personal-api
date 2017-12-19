---
title: React may be a library, but his ecosystem is a framework
date: YYYY-MM-DDT00:00:00Z
description:
slug: react-ecosystem-framework
---

React is always sold as a library, but even if that's true, we (the community) created a framework around react made of little (or not that little) packages intended to be used with React. I'm going to list some of the most common or expected features in frameworks like Ember and Angular with the React community.

## UI Layer

This is the base, each one of the frameworks I mentioned has his own way to render the UI (both using HTML based templates), in the React Ecosystem Framework (REF) this is what React does.

## Starting point

CRA || Next.js
Frameworks usually have a way to start a project with it following the best practices, Vue.js has \`vue-cli\`, Angular has \`angular-cli\`, Ember has \`ember-cli\`, even backend frameworks has similar tools like \`django-admin\` or \`rails new blog\`.

In the REF we have three options for doing this, the first one is the official one made by Facebook itself, [Create React App](https://github.com/facebookincubator/create-react-app), the second option is the [Next.js](https://github.com/zeit/next.js/) framework (which has [create-next-app](https://github.com/segmentio/create-next-app)) and the last option is using a community made boilerplate like [RAN!](https://www.rantoolkit.com/) or [react-boilerplate](https://www.reactboilerplate.com/).

CRA is the best tool to use when learning React.js because it let you create your application without any configuration and only a few decisions made for you.

Next.js (and CNA) is a framework built on top of React to give you more tools and some minimal conventions but allowing you to still change the configuration for your specific project.

Unlike CRA which give you a way to _eject_ from the tool and configure everything as you want being a framework means you can't eject, if you start a project with Next.js and want to move away you need to either move to CRA, another boilerplate or create your own custom build configure.

And boilerplates are the latest way to start a project, they're basically a repository with a CLI tool

## Routing Layer

Nowaday you can't expect a Frontend framework to not have a routing library, some tool which help us define different possible routes for the applications we make and take care of changing the URL in the user browser without reloading the page.

In the REF we have a de-facto option called [React Router](https://reacttraining.com/react-router/), it gives the developer a set of React components used to define the different routes of our application. This mean we can use the React components API to define our routes in a declarative way.

```js
import { Router, Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';

import HomePage from './pages/home.js';
import BlogPage from './pages/blog.js';
import PostPage from './pages/post.js';

render(
  <Router>
    <Route pattern="/" component={HomePage} />
    <Route pattern="/posts" component={BlogPage} />
    <Route pattern="/posts/:id" component={PostPage} />
  </Router>,
  document.getElementById('app')
);
```

But the most amazing feature of REF is that we can easily change parts of our framework if we don't like them. In this case we have more options for React Router, starting for the version 3 which has a different way to use it to the [Next.js](https://github.com/zeit/next.js/) integrated router or literally any JS routing library.

## Data Fetching Layer

Any non-trivial WebApp require some way to interact with a server, specially to fetch the data to be shown on the user browser. In a web we have two ways to get data, AJAX and WebSockets.

We're going to avoid WS for the moment since it's only related to real-time cases and will focus on AJAX. For a while we had to use the \`XMLHttpRequest\` horrible (yet powerful) API, then we moved to the jQuery based solution \`$.ajax\` and now we had a far better native API called Fetch API which let use define a request with a super simple syntax.

```js
// let's polyfill Fetch to work server-side, in old browsers and Safari
import fetch from 'isomorphic-fetch';

await fetch(URL, {
  method: 'POST',
  headers: HEADERS,
  body: JSON.stringify(DATA)
});
```

This is super useful for usual endpoints for REST API, but Facebook come some years ago with a really good way to get interact with an API, [GraphQL](https://graphql.org), and while we can still use Fetch API with a GraphQL API we have better tools for the job.

Apollo, from the Meteor team, is a super useful tool we can integrate with React and other UI libraries and frameworks, in the React case we can use it as a High Order Component which declare what data we need and is in charge of getting it, meanwhile it let us know is still loading and in the (_hopefully_) rare case of an error it tell us what happened.

```js
export default graphql(gql\`
  query userData($ID: String!) {
    user(id: $ID) {
      id
      displayName
      avatar
    }
  }
\`)(UserComponent);
```

And as usual in the REF we can just change either Apollo or Fetch API for other libraries, Apollo could be changed for Relay Modern, a Facebook made solution for GraphQL, in the case of Fetch API we can use some library like axios or xhr-promise to get the data we need.

## State Management Layer

Redux || MobX

## Testing

Jest && Enzyme

## Build tools

Webpack && Babel

## And more...

${/_ abbreviatures _/''}
_[REF]: React Ecosystem Framework
_[CRA]: Create React App \*[CNA]: Create Next App
