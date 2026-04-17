---
title: Interpreting GPT
parent: Large language models
nav_order: 5
---


[Othello-GPT](https://www.neelnanda.io/mechanistic-interpretability/othello)

[A Comprehensive Mechanistic Interpretability Explainer & Glossary](https://dynalist.io/d/n2ZWtnoYHrU1s4vnFSAQ519J)

[Interpreting GPT: the logit lens](https://www.lesswrong.com/posts/AcKRB8wDpdaN6v6ru/interpreting-gpt-the-logit-lens) - Also see the "Mentioned in" section at the end.
![A thumbnail of some logits in successive GPT layers](../the_logit_lens.png)

[A jargon-free explanation of how AI large language models work](https://arstechnica.com/science/2023/07/a-jargon-free-explanation-of-how-ai-large-language-models-work/)
![A layer where words are getting annotated](../transformer_layer.png) - including the brilliant squirrels analogy for how NNs are trained.

> You can think of the attention mechanism as a matchmaking service for words.

> You can think of all those [12288] dimensions as a kind of “scratch space” that GPT-3
> can use to write notes to itself about the context of each word. Notes made by earlier
> layers can be read and modified by later layers, allowing the model to gradually sharpen
> its understanding of the passage as a whole.

There's also this quip:

> A kind of “clever Hans” effect, only in language models rather than horses.

[Interpretability in the Wild: a Circuit for Indirect Object Identification in GPT-2 small](https://arxiv.org/abs/2211.00593)
![a circuit in GPT-2 small that implements IOI](../mary_and_john.png)

[Transformer Feed-Forward Layers Are Key-Value Memories](https://arxiv.org/abs/2012.14913)

[A Mechanism for Solving Relational Tasks in Transformer Language Models](https://arxiv.org/abs/2305.16130) - e.g., capital_of(Poland)=Warsaw

[A Mathematical Framework for Transformer Circuits](https://transformer-circuits.pub/2021/framework/index.html) - Anthropic

[In-context Learning and Induction Heads](https://transformer-circuits.pub/2022/in-context-learning-and-induction-heads/index.html) - Anthropic

[The Scaling Hypothesis](https://gwern.net/scaling-hypothesis)

> GPT-3 has “learned how to learn”: in its endless training on so many gigabytes of text,
> it encounters so many different kinds of text that it had no choice but to learn abstractions.

> This family of phenomena is perhaps driven by neural networks functioning as ensembles
> of many sub-networks.

> It is sufficiently powerful a model that its sub-models can do anything from poetry to arithmetic,
> and it is trained on so much data that those superficial models may do well early on,
> but gradually fall behind more abstract models.

[Beyond Surface Statistics: Scene Representations in a Latent Diffusion Model](https://arxiv.org/abs/2306.05720)

[Toy Models of Superposition](https://transformer-circuits.pub/2022/toy_model/index.html)
![Thumbnail of feature sparsity](../superposition.png)

[Softmax Linear Units](https://transformer-circuits.pub/2022/solu/index.html) - **Anthropic** -
Making models more interpretable

+ Many MLP neurons appear to be polysemantic, responding to multiple unrelated features
(unlike the [Grandmother cell](https://en.wikipedia.org/wiki/Grandmother_cell)).

+ One plausible explanation for polysemanticity is the superposition hypothesis, which suggests that neural network layers have more features than neurons as part of a “sparse coding” strategy to simulate a much larger layer.
