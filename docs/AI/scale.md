---
title: Scale
parent: AI
nav_order: 3
---

The GPT-3 paper, [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165), has this:

![Screenshot of a table of model sizes.](../model_sizes.png)

The last row shows that the full GPT-3 has 175 billion parameters, arranged in 96 blocks
where each block has an attention layer with 4 * 12288 * 12288 parameters
and a couple of feed forward layers with a further 8 * 12288 * 12288 parameters.

The parameter count doesn't depend on the context window size (which for GPT-3 is 2048 and for GPT-3.5 is 4096),
or the number of attention heads, or the vocabulary size (which for GPT-3 is 50,257).
Instead, it just depends on the number of layers and the model dimension (the embedding size of each token).

According to [this](https://github.com/amirgholami/ai_and_memory_wall#nlp-models), GPT-3 needs 740 teraflops to infer a single token,
due to each parameter being used many times (which, in turn, allows the model to do more computation than the raw parameter count would imply).
Later versions of GPT-3 had lower inference costs (?).

In the paper, they say:

>  for most tasks we find relatively smooth scaling with model capacity

and then, intriguingly:

> the gap between zero-, one-, and few-shot performance often grows with model capacity,
> perhaps suggesting that larger models are more proficient meta-learners

For completeness, here are the GPT-2 small, medium, large and XL model sizes.

![Screenshot of a table of GPT-2 model sizes.](../gpt2_sizes.png)

[Memory bandwidth constraints imply economies of scale in AI inference](https://www.lesswrong.com/posts/cB2Rtnp7DBTpDy3ii/memory-bandwidth-constraints-imply-economies-of-scale-in-ai) -
avoiding GPU bandwidth limits by favouring things like matrix multiply where the computation is O(N<sup>3</sup>) and the memory is O(N<sup>2</sup>), possibly with tiling to make sure things fit in the cache.

[Chinchilla's wild implications](https://www.lesswrong.com/posts/6Fpvch8RR29qLEWNH/chinchilla-s-wild-implications) - running out of data.

[The Bitter Lesson](https://www.cs.utexas.edu/~eunsol/courses/data/bitter_lesson.pdf)

[RedPajama-Data-v2: an Open Dataset with 30 Trillion Tokens](https://together.ai/blog/redpajama-data-v2)
