---
title: More Jekyll
parent: Computers
nav_order: 2
---

## Liquid templates

Jekyll includes a template subsystem called Liquid.

For example, this:
```
---
day: tuesday
---
{%- raw -%}
hello {{ page.day }}
{% endraw %}
```
will produce this:
```html
<p>hello tuesday</p>
```

## Misc

Files without the `---` header lines are simply copied to the `_site` folder.

By default, Jekyll uses [kramdown](https://kramdown.gettalong.org/).

Kramdown is a superset of standard Markdown that adds several extensions, including:

- Footnotes — `[^1]` style references
- Definition lists — using `: ` syntax
- Tables — GitHub-style pipe tables
- Attribute lists — `{: .class #id}` to add HTML attributes to elements
- Fenced code blocks — with both backticks and tildes, plus an optional language hint
- Math blocks — via `$$...$$` (often paired with MathJax or KaTeX)
- Inline HTML — mixed freely with Markdown
