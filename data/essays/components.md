---
title: Components
description: The UI components of the site
slug: components
date: YYYY-MM-DDT00:00:00Z
published: false
---

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

HTML **is** **_an_** _awesome_ `piece` ++of++ ==technology==

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et euismod nibh, ut vulputate felis. Sed bibendum euismod libero. Aliquam in ante at nisl fermentum dictum eu in quam. Donec at tortor eget diam pharetra ultrices. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu semper purus. Nam faucibus quam ut nunc mollis, vel lobortis odio ullamcorper.

Aliquam tempor ligula a ipsum varius interdum. Phasellus a dapibus dolor, ac malesuada eros. Pellentesque nec ex hendrerit, vestibulum dolor vel, viverra nisl. Vestibulum at odio erat. Sed massa tortor, suscipit non mattis in, pharetra posuere tellus. Suspendisse iaculis lacus eu magna egestas semper. Ut sed lorem malesuada, blandit risus id, semper leo. Sed tincidunt mauris ac venenatis pellentesque. Morbi enim massa, rhoncus sit amet rhoncus ac, varius et ante. Fusce leo neque, luctus ut tristique at, egestas pulvinar risus. Vivamus vitae bibendum ipsum. Donec fermentum tristique massa, ut tristique ligula mattis eu. Integer at vulputate lectus. Nulla eget sapien euismod, dignissim felis vel, vestibulum tortor.

### Lists

* [Lorem](https://sergiodxa.com "My home page")
* [Ipsum](https://zeit.co "Company site")
* Dolor
* Sit
* Amet

1. One
2. Two
3. Three
4. Four
5. Five

Term 1
~ Definition 1

---

Term 2
~ Definition 2a
~ Definition 2b

*[HTML]: HyperText Markup Language

### Block of code

```js
import * as colors from '../../lib/colors';

export function UL({ children, ...props }) {
  return (
    <ul {...props}>
      {children}
      <style jsx>{`
        ul {
          font-size: 1.3em;
          font-weight: normal;
          margin-left: -2rem;
          padding-left: 2rem;
          list-style-type: square;
        }
      `}</style>
    </ul>
  );
}
```

### Request

```request
url: https://zeit.co/api/v2
method: POST
headers:
  Authorization: Bearer $TOKEN
body: '{
  "key": "value"
}'
```

```request
url: https://zeit.co/api/v1
headers:
  Authorization: Bearer $TOKEN
```

### Table

| This | Is  | A   | Table |
| ---- | :-: | --: | ----- |
| This | Is  | A   | Table |
| This | Is  | A   | Table |
| This | Is  | A   | Table |

### Image with caption

~[This is an image](https://assets.zeit.co/image/upload/front/logos/black-bg-text-logo-1200.png)

### YouTube

@[youtube](HZMIeyO_2-Q)

### Gist

@[gist](https://gist.github.com/sergiodxa/ba565704d669a42e15dcb4a704f9defb)

### Twitter

@[twitter](895831530773381120)
