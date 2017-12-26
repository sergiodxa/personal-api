---
title: How I overengineered this blog
date: 2017-12-05T00:00:00Z
description:
published: false
slug: how-i-overengineered-this-blog
---

Personal and pet projects are the best projects to practice and over engineer things. Mostly because you're the only one affected if this cause you more work (as far as you keep doing them in your own free time of course).

With that in mind I keep implementing ideas to this blog just for the sake of learning and having fun. This is how I ended up overengineering this blog.

## Exported Next.js app

The first thing is this blog use Next.js with the static export command (`next export`). I create a few pages inside a Next.js app with some components and then configured it to be exported.

I also integrated a custom server to reuse the exported paths as custom routes while developing. This allow me to run `nodemon server/index.js` (yeah I also use Nodemon to restart the server if I add a new exported path) and have a nice server with a lot of features like hot-reload, code splitting, etc.

I also implemented a Service Worker which is created at the build phase. This SW is configured to cache everything for offline usage so after the first load is super fast and can even load offline.

## GraphQL API for essays

The next thing is I have a GraphQL API used to get the essays from the file system, they read Markdown files with a content similar to:

```markdown
---
title: My post
---

This is the content
```

And read the metadata as front-matter to send it to the site. When I export the Next.js app I basically fetch every public essay to create the HTML for the site. When doing a client side navigation to another an essay the API is fetchted at the moment so he always have the most updated data.

I also have a mutation on this API used to publish an essay, what it does is create a `.md` file with the metadata as front-matter and the content, and then send a commit to the API repository to add the essay as a file.

## Travis for continuous integration (on the site and API)

And here it comes Travis, every time I update either the site or API repositories Travis deploy them automatically.

In the case of the site it will install dependencies, build the Next.js app, export the site, copy the Service Worker code, create a atom feed file with the RSS code.

## Now.sh for easy deployment and escalability
