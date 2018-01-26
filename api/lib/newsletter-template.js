const linksLangs = links => {
  const langs = links.map(link => link.lang);
  const lastLang = langs[langs.length - 1];
  langs.pop();
  return `${langs.join(", ")} or ${lastLang}`;
};

function layout(...tags) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
  body {
    background-color: #F2F2F2 !important;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: 18px;
    margin: 0;
    min-height: 100%;
  }
  </style>
</head>
<body>
  <div class="assets">
  ${tags.join("\n")}
  </div>
</body>
</html>`;
}

function a(text, props) {
  return `<a style="font-family: font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;font-size: 18px;font-weight: 200;" href=${
    props.href
  }>${text}</p>`;
}

function p(text) {
  return `<p style="font-family: font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;font-size: 18px;font-weight: 200;">${text}</p>`;
}

function ul(...items) {
  return `<ul>${items.join("\n")}</ul>`;
}

function li(text) {
  return `<li style="font-family: font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;font-size: 18px;font-weight: 200;">${text}</li>`;
}

module.exports = ({ description, token, links }) =>
  layout(
    p("Hello,"),
    p(
      "As a subscriber of my newsletter you're receiving my new essays <em>before anyone else</em>"
    ),
    p(description),
    p(`You can read it on ${linksLangs(links)} here:`),
    ul(
      ...links.map(link =>
        li(
          a(`${link.url}?token=${token}`, {
            href: `${link.url}?token=${token}`
          })
        )
      )
    ),
    p(
      `The essay is not public on ${a("my site", {
        href: "https://sergiodxa.com/essays"
      })} yet and the link is unique for you, of course you can share it if you want to 😉.`
    ),
    p(
      "If you have any feedback, question or just want to tell me something feel free to reply to this email."
    )
  );
