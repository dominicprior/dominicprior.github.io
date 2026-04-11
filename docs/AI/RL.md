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





## Planning by Dynamic programming

## Model-free prediction

## Model-free control

$$p(s^′, r|s, a) = Pr[S_t+1 = s^′, R_{t+1} = r | S_t = s, A_t = a]$$


$$v_π(s) = E_π[G_t | S_t = s]
= ∑_aπ(a|s) ∑_{s^{'}}p(s^′, r|s, a)[r + \gamma v_π(s^′)]$$

$$q_π(s, a) = E_π[G_t | S_t = s, A_t = a]$$

$$
Q^*(s, a) = \mathbb{E} \left[ R_{t+1} + \gamma \max_{a'} Q^*(s_{t+1}, a') \mid S_t = s, A_t = a \right]
$$

$$
Q(S_t, A_t) \leftarrow Q(S_t, A_t) + \alpha [ \underbrace{R_{t+1} + \gamma \max_{a} Q(S_{t+1}, a)}_{\text{TD Target}} - Q(S_t, A_t) ]
$$

$$
V_\pi(s) = \sum_{a \in \mathcal{A}} \pi(a \mid s) Q_\pi(s, a)
$$

$$
V^*(s) = \max_{a} Q^*(s, a)
$$

{: .note }
> **The Intuition:** $V(s)$ is how good it is to *be* in a state. $Q(s, a)$ is how good it is to *take an action* while in that state.


```python
import numpy as np

# A simplified update for a specific state-action pair
def get_q_value(state, action, V, gamma, transition_probs):
    q_val = 0
    # Iterating over possible next states and rewards
    for next_state, prob, reward in transition_probs[state][action]:
        q_val += prob * (reward + gamma * V[next_state])
    return q_val
```

```python
# The Q-Learning Update Rule
# Q(s,a) = Q(s,a) + alpha * (reward + gamma * max(Q(s',a')) - Q(s,a))

td_target = reward + gamma * np.max(Q[next_state])
td_error = td_target - Q[state][action]
Q[state][action] += alpha * td_error
```

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

