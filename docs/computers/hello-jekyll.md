---
title: Hello Jekyll
parent: Computers
nav_order: 3
---

It's not obvious from the [Official Jekyll docs](https://jekyllrb.com/docs/),
but a minimal Jekyll website is tiny.

For example, a single `foo.md` file:
```
---
---
# hi
```
will produce a `foo.html` file in the `_site` output folder:
```html
<h1 id="hi">hi</h1>
```
Run Jekyll with `jekyll build` (or `jekyll serve` for continual builds).

The two `---` lines enclose the header info.
