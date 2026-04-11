---
title: Reinforcement Learning
parent: AI
nav_order: 6
---

## Markov decision processes

### Markov processes

a.k.a. Markov chain.

$$ \mathcal{P}_{ss'} =  \mathbb{P} [ S_{t+1} = s' \mid S_t = s ] $$

### Markov reward processes

*A Markov process with value judgements*

We get reward,
$$ \mathcal{R}_{s} = \mathbb{E} [ R_{t+1} \mid S_t = s ] $$, when we leave state $$ s $$.

The total *return* from leaving $$s$$ is: $$\; G_t = R_{t+1} + \gamma R_{t+2} + \gamma^2R_{t+3} + \dots $$

The *state-value function*, the long-term value of being in $$s$$, is:

$$ v(s) = \mathbb{E}[ G_t \mid S_t = s ] $$

The *Bellman equation for MRPs* is (if $$v$$ is a valid state function):

$$
\begin{aligned}
v(s) &= \mathbb{E}[ R_{t+1} + \gamma v(S_{t+1}) \mid S_t = s ] \\
     &= \mathcal{R}_{s} + \gamma \sum_{s' \in \mathcal{S}} \mathcal{P}_{ss'} \, v(s')
\end{aligned}
$$

$$ v = \mathcal{R} + \gamma \mathcal{P} v $$

(We will see this variation in the next section:
    $$ v_{\pi} = \mathcal{R}^{\pi} + \gamma \mathcal{P}^{\pi} v_{\pi} $$ ).

We can evaluate $$ v $$ directly with $$ v = (I - \gamma \mathcal{P})^{-1} \mathcal{R} $$


### Markov decision processes

*A Markov reward process with decisions*

$$ \mathcal{P^a_{ss'}} = \mathbb{P}[ S_{t+1} = s' \mid S_t = s, A_t = a ] $$

$$ \mathcal{R}^a_{s} = \mathbb{E} [ R_{t+1} \mid S_t = s, A_t = a ] $$

<span>
A policy $$ \pi $$ is defined as: $$ \; \pi(a|s) = \mathbb{P}[A_t = a \mid S_t = s]  $$
</span>

A Markov decision process can be flattened into a Markov reward process:

$$ \mathcal{P}^{\pi}_{ss'} = \sum_{a \in \mathcal{A}} \pi (a|s) \mathcal{P}^a_{ss'} $$

$$ \mathcal{R}^{\pi}_s = \sum_{a \in \mathcal{A}} \pi (a|s) \mathcal{R}^a_s $$

The state-value function:

$$ v_{\pi}(s) = \mathbb{E}_{\pi}[G_t \mid S_t = s]  $$

The action-value function:

$$ q_{\pi}(s, a) = \mathbb{E}_{\pi}[G_t \mid S_t = s, A_t = a]  $$

Bellman again:

$$ v_{\pi}(s) = \sum_{a \in \mathcal{A}} \pi(a|s) q_{\pi}(s,a) $$

$$ q_{\pi}(s,a) = \mathcal{R}^a_s + \gamma \sum_{s' \in S} \mathcal{P}^a_{ss'} v_{\pi}(s') $$

$$ v_{\pi}(s) = \sum_{a \in \mathcal{A}} \pi(a|s)
        \left(
            \mathcal{R}^a_s + \gamma \sum_{s' \in S} \mathcal{P}^a_{ss'} v_{\pi}(s')
        \right) $$

$$ q_{\pi}(s,a) = \mathcal{R}^a_s + \gamma \sum_{s' \in S} \mathcal{P}^a_{ss'}
        \sum_{a' \in \mathcal{A}} \pi(a'|s') q_{\pi}(s',a') $$

The optimal value functions are simply:

$$ v_{*}(s) = \max_{\pi} v_{\pi}(s) $$

$$ q_{*}(s, a) = \max_{\pi} q_{\pi}(s, a) $$

There is a partial ordering for policies:

$$ \pi \geq \pi' \iff v_{\pi}(s) \geq v_{\pi'}(s), \forall s $$

There is a theorem that says there is at least one deterministic policy $$ v_* $$ where:

$$ v_* \geq v_{\pi}, \forall \pi $$

The Bellman Optimality Equations:

$$ v_*(s) = \max_a q_*(s, a)  $$

$$ q_*(s,a) = \mathcal{R}^a_s + \gamma \sum_{s' \in S} \mathcal{P}^a_{ss'} v_*(s') $$

$$ v_*(s) = \max_a
        \left(
            \mathcal{R}^a_s + \gamma \sum_{s' \in S} \mathcal{P}^a_{ss'} v_*(s')
        \right) $$

$$ q_*(s,a) = \mathcal{R}^a_s + \gamma \sum_{s' \in S} \mathcal{P}^a_{ss'}
        \max_{a'} q_*(s',a') $$





## Planning by Dynamic programming

## Model-free prediction

## Model-free control

## Random bits of LaTeX

$$
Q(S_t, A_t) \leftarrow Q(S_t, A_t) + \alpha [ \underbrace{R_{t+1} + \gamma \max_{a} Q(S_{t+1}, a)}_{\text{TD Target}} - Q(S_t, A_t) ]
$$

$$
\vec{\nabla} \times \vec{F} =
            \left( \frac{\partial F_z}{\partial y} - \frac{\partial F_y}{\partial z} \right) \mathbf{i}
          + \left( \frac{\partial F_x}{\partial z} - \frac{\partial F_z}{\partial x} \right) \mathbf{j}
          + \left( \frac{\partial F_y}{\partial x} - \frac{\partial F_x}{\partial y} \right) \mathbf{k}
$$

$$
(\nabla_X Y)^k = X^i (\nabla_i Y)^k =
           X^i \left( \frac{\partial Y^k}{\partial x^i} + \Gamma_{im}^k Y^m \right)
$$

