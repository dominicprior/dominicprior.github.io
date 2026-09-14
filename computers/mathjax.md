---
title: MathJax
parent: Computers
nav_order: 5
---
MathJax puts equations in webpages.

For example, a file like this:
```
<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
$$ E = m c^2 $$
```
would be displayed like this:

$$ E = m c^2 $$

Right-click on the equation, and you will see lots of MathJax options,
including `Show Math As > TeX Commands`, which shows the original `E = m c^2`.

See this excellent [tutorial and quick reference](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference).

In case you're wondering, MathJax works by adding new DOM elements to the webpage after it is loaded.
