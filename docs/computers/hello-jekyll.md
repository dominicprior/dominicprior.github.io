---
title: Hello Jekyll
parent: Computers
nav_order: 3
---

It's not obvious from the [official Jekyll docs](https://jekyllrb.com/docs/),
but a minimal Jekyll website is tiny.

For example, a single `foo.md` file:
```
---
---
hello
```
will produce a `foo.html` file in the `_site` output folder:
```html
<p>hello</p>
```
Run Jekyll with `jekyll build` (or `jekyll serve`).

The two `---` lines enclose the header info.
