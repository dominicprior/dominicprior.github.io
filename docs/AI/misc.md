---
title: Misc
parent: AI
nav_order: 4
---

## Training

From the GPT-3 paper, [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165):

![GPT-3 datasets](../training_data.png)

> **Datasets used to train GPT-3**. “Weight in training mix” refers to the fraction of examples during training
that are drawn from a given dataset, which we intentionally do not make proportional to the size of the dataset. As a
result, when we train for 300 billion tokens, some datasets are seen up to 3.4 times during training while other datasets
are seen less than once.

Here is the training data for [LLaMA: Open and Efficient Foundation Language Models](https://arxiv.org/abs/2302.13971):

![Llama training data](../llama_training.png)

## Optimization

[BitNet: Scaling 1-bit Transformers for Large Language Models](https://arxiv.org/abs/2310.11453) -
reduce the FF matrices to 1-bit precision, by using just +1 or -1 values.

[Generating Long Sequences with Sparse Transformers](https://arxiv.org/abs/1904.10509) - sparse factorizations of the attention matrix which reduce the cost to O(n√n).

[Nvidia increases performance a thousandfold](https://spectrum.ieee.org/nvidia-gpu):

+ Number Representation: 16x
+ Complex Instructions: 12.5x
+ Moore’s Law: 2.5x
+ Sparsity: 2x

[You can now run a GPT-3-level AI model on your laptop, phone, and Raspberry Pi](https://arstechnica.com/information-technology/2023/03/you-can-now-run-a-gpt-3-level-ai-model-on-your-laptop-phone-and-raspberry-pi/)

> Regarding AI's rate of progress, a fellow AI reporter told Ars, "It's like those videos of dogs where you upend a crate of tennis balls on them. [They] don't know where to chase first and get lost in the confusion."

[FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness](https://arxiv.org/abs/2205.14135)

## Tuning

"In general, it’s interesting how little “poking” the “originally trained” network seems to need
to get it to usefully go in particular directions." -
[Wolfram](https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/)

[Intrinsic Dimensionality Explains the Effectiveness of Language Model Fine-Tuning](https://arxiv.org/abs/2012.13255)

[LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685) -
explanation [here](https://www.anyscale.com/blog/fine-tuning-llms-lora-or-full-parameter-an-in-depth-analysis-with-llama-2).

## Using LLMs

[Catching up on the weird world of LLMs](https://simonwillison.net/2023/Aug/3/weird-world-of-llms/)

> I read academic papers by pasting pieces of them into GPT-4 and asking it to explain every jargon term in the extract.

> I no longer dread naming things. I can ask it for 20 ideas for names, and maybe option number 15 is the one I go with.
> (It beats brainstorming for an hour).
> Always ask for “twenty ideas for” — you’ll find that the first ten are super-obvious,
> but once you get past those things start getting interesting.

"With GPT questions, the vaguer the better sometimes" - Terence Tao

[Brex's Prompt Engineering Guide](https://github.com/brexhq/prompt-engineering) ⊗

## Overviews

[Why GPT-3 Matters](https://bmk.sh/2020/05/29/GPT-3-A-Brief-Summary/)

[The Decade of Deep Learning](https://bmk.sh/2019/12/31/The-Decade-of-Deep-Learning/)

> Adam is based on the idea of adapting separate learning rates for each parameter.

> AlphaGo consists of a policy network and a value network that narrow the search tree and allow for truncation of the search tree, respectively.

> Neural Architecture Search has become common practice in the field for squeezing every drop of performance out of networks.

> The Lottery Ticket Hypothesis asserts that most of a network’s performance comes from a certain subnetwork due to a lucky initialization.

## Landmark papers

[Attention Is All You Need](https://arxiv.org/abs/1706.03762) - Transformers

[Improving Language Understanding by Generative Pre-Training](https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf) - GPT

[Language Models are Unsupervised Multitask Learners](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf) - GPT-2

[Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165) - GPT-3

## Resources

[https://paperswithcode.com/](https://paperswithcode.com/)

[https://github.com/huggingface/transformers](https://github.com/huggingface/transformers)

[AI Canon](https://a16z.com/ai-canon/)

![YouTube logo](../yt.png)
[Neural Networks: Zero to Hero](https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ) -
Karpathy's 12 hour video series that builds towards [this implementation](https://github.com/karpathy/ng-video-lecture/blob/master/gpt.py).

[The Illustrated GPT-2](https://jalammar.github.io/illustrated-gpt2/)

[The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)

[Visualizing Matrix Multiplication](https://pytorch.org/blog/inside-the-matrix/)

[A Comprehensive Overview of Large Language Models](https://arxiv.org/abs/2307.06435)

[The Bloom base model](https://huggingface.co/bigscience/bloom)

## The impacts of AI

[AI and the automation of work](https://www.ben-evans.com/benedictevans/2023/7/2/working-with-ai)

[AI Alignment Is Turning from Alchemy Into Chemistry](https://guzey.com/ai/alignment-alchemy/)

[On the Opportunities and Risks of Foundation Models](https://arxiv.org/abs/2108.07258)

## Random thoughts

We can't help equating language ability and intelligence.  Therefore, the LLMs' eloquence might be fooling us into thinking they are smart.

LLMs don't contain control-flow things like "if" statements.

An LLM is like a fuzzy hologram of the web.

Retrieval Augmented Generation.  OpenAI embeddings api.

Wikipedia:
[Prompt engineering](https://en.wikipedia.org/wiki/Prompt_engineering) ⊗,
[The Pile](https://en.wikipedia.org/wiki/The_Pile_(dataset)),

[What OpenAI Really Wants](https://www.wired.com/story/what-openai-really-wants/) - A fun history of OpenAI.

[Where We See Shapes, AI Sees Textures](https://www.quantamagazine.org/where-we-see-shapes-ai-sees-textures-20190701/)

![YouTube logo](../yt.png)
[Hinton: Evolution is a tinkerer ... we probably don't need all those kinds of neurons to get an intelligent system](https://youtu.be/Gg-w_n9NJIE?t=4355)

![YouTube logo](../yt.png)
[Hassabis: AI-enabled scientific revolution](https://youtu.be/Gg-w_n9NJIE?t=4423)
