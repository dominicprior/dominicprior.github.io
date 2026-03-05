---
title: More Jekyll
parent: Computers
nav_order: 4
---

## Liquid templates

Jekyll includes a template subsystem called Liquid.

For example, this:
```
---
day: tues
---
# hi {{ page.day }}
```
will produce this:
```html
<h1 id="hi-tues">hi tues</h1>
```

## Misc

Files without the `---` header lines are simply copied to the `_site` folder.
