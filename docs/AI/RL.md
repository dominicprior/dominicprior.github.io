---
title: Reinforcement Learning
parent: AI
nav_order: 6
---

The quadratic formula is $$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$.

$$G_t = R_{t+1} + γR_{t+2} + γ^2R_{t+3} + ···$$

$$p(s^′, r|s, a) = Pr[S_t+1 = s^′, R_{t+1} = r | S_t = s, A_t = a]$$


$$v_π(s) = E_π[G_t | S_t = s]
= ∑_aπ(a|s) ∑_{s^{'}}p(s^′, r|s, a)[r + γv_π(s^′)]$$

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


$$
\begin{aligned}
(a + b)^2 &= (a + b)(a + b) \\
&= a^2 + ab + ba + b^2 \\
&= a^2 + 2ab + b^2
\end{aligned}
$$