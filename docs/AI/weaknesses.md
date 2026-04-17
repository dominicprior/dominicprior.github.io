---
title: Weaknesses
parent: Large language models
nav_order: 8
---

As [Dan Piponi](https://mathstodon.xyz/@dpiponi/111116694861297725) noted:

> more has been written about what ChatGPT can't do than has been written about what any other tool can't do. It's all very strange.

and:

> "The problem with citations about ChatGPT is that their authenticity can be difficult to discern" -- Plato

Anyway, here are some weaknesses:

+ They don't know when they are [telling the truth](https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)) - they never know when to shut up!

+ They can't do anything requiring precision (unlike, say, a database).

+ They need a huge amount of training data (a trillion words, unlike a ten-year-old child, who has seen or heard about a hundred million words).

+ They only correspond to a small part of the human brain, and so they may not be as smart as we think.

![Picture of Broca's and Wernicke's part of the brain](../broca.png)

[Wolfram](https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/) highlights another major gap:

> Try to give it rules for an actual “deep” computation that involves many potentially computationally irreducible steps
> and it just won’t work. (Remember that at each step it’s always just “feeding data forward” in its network,
> never looping except by virtue of generating new tokens.)

> Of course, the network can learn the answer to specific “irreducible” computations.
> But as soon as there are combinatorial numbers of possibilities, no such “table-lookup-style” approach will work.

Or in summary:

> Cases that a human “can solve in a glance” the neural net can solve too. But cases that require doing something “more algorithmic” the neural net tends to somehow be “too computationally shallow” to reliably do.

[Prompt injection: What’s the worst that can happen?](https://simonwillison.net/2023/Apr/14/worst-that-can-happen/)

## Hallucinations

[Looking for an interpretability paper](https://www.reddit.com/r/mlscaling/comments/175xtbt/looking_for_an_interpretability_paper_that/)

[Chain-of-Verification Reduces Hallucination in Large Language Models](https://arxiv.org/abs/2309.11495)
