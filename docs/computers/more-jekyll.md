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
