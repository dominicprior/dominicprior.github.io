---
title: Other
parent: AI
nav_order: 3
---

[Finetuned language models are zero-shot learners](https://openreview.net/pdf?id=gEZrGCozdqR)

## Adversarial & Visualization

[Transformer Circuits Thread](https://transformer-circuits.pub/)

[Adversarial Examples Are Not Bugs, They Are Features](https://arxiv.org/abs/1905.02175) - **Ilyas** -
A popular paper, I think

[LLM Lies: Hallucinations are not Bugs, but Features as Adversarial Examples](https://arxiv.org/abs/2310.01469)

## Distill

[A Discussion of Adversarial Examples Are Not Bugs, They Are Features](https://distill.pub/2019/advex-bugs-discussion/)

[Visualizing Weights](https://distill.pub/2020/circuits/visualizing-weights/)

[Zoom In: An Introduction to Circuits](https://distill.pub/2020/circuits/zoom-in/)

[Exploring Neural Networks with Activation Atlases](https://distill.pub/2019/activation-atlas/)

## Interpreting GPT

+ The nodes are the variables and the weights are the program.

+ IOI

+ Superposition

+ Causal interventions on the internals of a model.

+ Activation patching - run the model twice; replace a node's activation in one run with the activation from the other run.
+ It measures counter-factuals.  What would 

+ Path patching

+ Automatic circuit discovery

+ With patching in general, you have to choose your input distribution carefully.

+ Attention heads (?) can refer to other info by value or by pointer.  They showed that, in their IOI example, the second John was being referred to by (relative) pointer.

## A mechanism for solving relational tasks in transformer language models

in an in-context learning setting

reverse-engineering the data structures and
algorithms that are implicitly encoded in the model’s weights

LLMs implement a basic
vector-addition mechanism which plays an important role in a number of in-context-learning tasks

a distinct processing signature in the forward pass which characterizes
this mechanism

if models need to perform the get capital(x) function, which
takes an argument x and yields an answer y, they first surface the argument x in earlier
layers which enables them to apply the function and yield y as the final output

the vector arithmetic mechanism
is often implemented by mid-to-late layer feedforward networks (FFNs) in a way that is
**modular and supports intervention**

From start to end, *x* is only updated
by additive updates, forming a residual stream. Thus, the token representation
*x<sub>i</sub>* represents all of the additions made into the residual stream up to layer *i*

LMs incrementally
update the token representation x to build and refine an encoding of the vocabulary distribution

Finally, the model enters Saturation, where the model recognizes it has solved
the next token, and ceases updating the token representation for the remaining layers

Saturation events are described in Geva et al. (2022a) where detection of such events is used to “early-exit”
out of the forward pass

Our findings invite
future work aimed at understanding why, and under what conditions, LMs learn to use this mechanism
when they are capable of solving such tasks using, e.g., adhoc memorization

# IOI links

[A Mathematical Framework for Transformer Circuits](https://transformer-circuits.pub/2021/framework/index.html)

[In-context Learning and Induction Heads](https://transformer-circuits.pub/2022/in-context-learning-and-induction-heads/index.html)

[LLM Visualization](https://bbycroft.net/llm)

<https://arxiv.org/pdf/2310.16028>

<https://openreview.net/pdf?id=ZmzLrl8nTa>
