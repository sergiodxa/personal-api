---
title: Why I think MongoDB is a good DB for GraphQL services
date: 2017-11-04T00:00:00Z
description: MongoDB's lack of relations made it an actually good DB for GraphQL which doesn't allow us to really use our relations when running queries.
slug: mongodb-and-graphql
---

For a long time I thought MongoDB had only a few little use cases and in most application you should always use a SQL-like database, specially PostgreSQL since it even allow to write JSON files inside rows.

And now I think you should always use GraphQL for any API which is not only intended for ipc (and even for that case you could use and benefit from GraphQL).

## The Case for GraphQL

What is GraphQL? Is basically a way we can expose an API to the world and a syntax to query it (that's why is a Query Language). In GraphQL we would have a single endpoint (usually \`/graphql\`) and the client of our API will just send a simple POST to that endpoint with the query.

> If you want to learn more you can read "[How To GraphQL](https://www.howtographql.com/)".

After thinking a lot about GraphQL and his usage with any database I found SQL-like DB aren't that useful because one important thing about how GraphQL works, **the waterfall**.

Which means if you receive a query similar to:

```graphql
query myUser {
  me {
    id
    username
    displayName
    friends {
      id
      username
      displayName
      friends {
        ...
      }
    }
  }
}
```

And you've a resolvers code similar to this one:

```js
export default {
  Query: {
    me(_, args, context) {
      // here we check our auth token to get our own personal profile
    }
  },
  User: {
    friends(_, args, context) {
      // here we query our DB again to get our list of friends
    }
  }
};
```

You're going to query the DB one time to get your personal profile and your list of friend (only the list) and then in \`User.friends\` you're going to use each friend ID to get his user data.

If you need the friends of your friends then you're going to use the same resolver to get their data, this is the reason why _you can't just use \`JOIN\`_ in your DB queries.

## The Case for MongoDB

If we think how to handle relations on MongoDB we'll see the same waterfall as in GraphQL.

```js
// connect to DB
const db = await MongoDB.connect(process.env.DB_URL);
// first query to the DB
const myUser = await db.collection('users').findOne({ id: MY_ID });
// a new query per friend
const myFriends = await Promise.all(
  myUser.friends.map(friendId =>
    db.collection('users').findOne({ id: friendId })
  )
);
// close connection
db.close();
```

That's because MongoDB doesn't have real relations so to fake it we need to save the \`ObjectID\` of another document (which is maybe in another collection) and then query MongoDB to get it when we need it.

Of course the whole idea of using MongoDB is to save entire documents which didn't need any external data but in most application we need to easily update a little piece of data and to got it automatically updated in many places.

So it looks in GraphQL even if we used PostgreSQL we're still going to do the same as MongoDB because that's how GraphQL and it's resolvers allow us to work.

## The Case for Microservices

If we want to split our backend code into microservices with GraphQL a nice way to achieve it is using [schema](https://dev-blog.apollodata.com/graphql-schema-stitching-8af23354ac37) [stitching](https://dev-blog.apollodata.com/graphql-tools-2-0-with-schema-stitching-8944064904a5) which allow us to define many GraphQL services (even in different languages) and then create a single service in charge of mergin them into a single fetchable schema and API.

If we use MongoDB each service could be using a single collection of documents and those collections could be part of a single DB (usually a bad idea) or splitted on different DB (one per collection) and our data doesn't care because there is not real relations between them.

## Further Optimizations

But what if we want to optimize this? The waterfall could eventually be super slow so what can we do? Well, there'are many ways to [optimize the waterfall](https://dev-blog.apollodata.com/optimizing-your-graphql-request-waterfalls-7c3f3360b051), starting for the most simple batching queries (we already did it in the MongoDB code when using \`Promise.all\`) and more things.

### Persisted Queries

One of the best way to optimize queries is [persisting them](https://dev-blog.apollodata.com/persisted-graphql-queries-with-apollo-client-119fd7e6bba5), that means we can extract all the queries we're going to run in our client-side applications and then create optimized queries for them.

If we know our app always run the GraphQL query to get the user profile and his friends we could then persist that query and create an optimized version of it. If we use PostgreSQL or another SQL DB this means we can create a SQL sentence to get the whole query data.

But we decided to use MongoDB, so we could just do something else, we could create a new collection of persisted queries results (basically a cache), after each mutation we could get rid of the possible affected documents and after a first non-optimized query create the new documents.

Next time the user run the persisted query we would just get the data from a single document.

## Conclusion

In other kind of API services we could get more advantages from using a SQL DB, in GraphQL the main benefits are gone and we could just use MongoDB to easily save data and to persist query results as new documents.
