---
title: Text generation
parent: Large language models
nav_order: 7
---

[How to generate text](https://huggingface.co/blog/how-to-generate) - Greedy search, Beam search, Top-K Sampling, Top-p sampling

> As ad-hoc decoding methods, top-p and top-K sampling seem to produce more fluent text than traditional greedy -
> and beam search on *open-ended* language generation. There is evidence that the apparent flaws of greedy and beam search -
> mainly generating repetitive word sequences - are caused by the model (especially the way the model is trained),
> rather than the decoding method

[The Difficulties of Text Generation using Autoregressive Language Models: A Brief Overview](https://bmk.sh/2019/10/27/The-Difficulties-of-Text-Generation-with-Autoregressive-Language-Models/)

> While some may criticize the autoregressive formulation because people generally
> don’t write purely autoregressively, there actually are authors who use this sort
> of technique to write *entire* books.

"GPT learning has been great at capturing the underlying reality and maybe the weak point is the text generation" - Sutskever -
![YouTube logo](../yt.png)
[https://www.youtube.com/watch?v=SjhIlw3Iffs](https://www.youtube.com/watch?v=SjhIlw3Iffs)

[The Curious Case of Neural Text Degeneration](https://arxiv.org/abs/1904.09751) - Beam search text (blue) is less surprising than human text (orange):
![A graph of the surprisingness of beam search vs human text](../beam_search_is_less_surprising.png)

> Why is human-written text not the most probable text? ... people optimize against stating the obvious.

[GPT-3 has a habit of repeating its input](https://news.ycombinator.com/item?id=26442211)
