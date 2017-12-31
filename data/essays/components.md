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

### Lists
* [Lorem](https://sergiodxa.com "My home page")
* Ipsum
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
~~~js
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
~~~

### Table
| This | Is | A | Table |
| ---- | -- | - | ----- |
| This | Is | A | Table |
| This | Is | A | Table |
| This | Is | A | Table |

### Image with caption
~[This is an image](https://assets.zeit.co/image/upload/front/logos/black-bg-text-logo-1200.png)

### YouTube
@[youtube](HZMIeyO_2-Q)

### Gist
@[gist](https://gist.github.com/sergiodxa/ba565704d669a42e15dcb4a704f9defb)

### Twitter
@[twitter](895831530773381120)
