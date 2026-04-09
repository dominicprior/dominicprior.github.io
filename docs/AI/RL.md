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
\begin{aligned}
(a + b)^2 &= (a + b)(a + b) \\
&= a^2 + ab + ba + b^2 \\
&= a^2 + 2ab + b^2
\end{aligned}
$$