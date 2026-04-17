---
title: Reinforcement Learning
parent: Large language models
nav_order: 6
---

*Notes from David Silver's RL lecture series*

## 2. Markov Decision Processes

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

The *Bellman expectation equation for MRPs* is (if $$v$$ is a valid state function):

$$
\begin{aligned}
v(s) &= \mathbb{E}[ R_{t+1} + \gamma v(S_{t+1}) \mid S_t = s ] \\
     &= \mathcal{R}_{s} + \gamma \sum_{s' \in \mathcal{S}} \mathcal{P}_{ss'} \, v(s')
\end{aligned}
$$

$$ v = \mathcal{R} + \gamma \mathcal{P} v $$

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

## 3. Planning by Dynamic Programming

*An optimization method for sequential problems, given perfect knowledge of the environment*

### Policy evaluation (prediction, using the Bellman expectation equation)

*How much return from a policy?  What is the $$v_{\pi}$$?*

We repeat this step on the flattened MDP:

<div style="display:none">
$$ \newcommand{\vec}[1]{\boldsymbol{#1}} $$
</div>

$$ \vec{v} \gets \vec{\mathcal{R}} + \gamma \vec{\mathcal{P} v} $$

### Policy iteration (solving an MDP)

*Finding the best policy.  What is the $$v_*$$?*

We repeat these steps:

$$ v_{\pi} \gets evaluate(\pi) \qquad  \text{iteratively}  $$

$$ \pi \gets greedy(v_{\pi})  $$

Here is the greedy step:

$$ \pi'(s) \gets \mathop{\mathrm{argmax}}_{a \in \mathcal{A}} \; q_{\pi}(s,a) $$

### Value iteration (solving an MDP)

*Applying the Bellman equation without an explicit policy*

In the policy iteration (above), the $$evaluate(\pi)$$ stage contained
an inner iteration of its own.  If we apply that inner iteration
just once, we get *value iteration*.

Value iteration just repeats this step:

$$ v \gets \max_a \left(
        \vec{\mathcal{R}}^a + \gamma \vec{\mathcal{P}^a v}
    \right) $$


## 4. Model-Free Prediction (no actions yet)

*Evaluating an MDP without a model*

### Monte-Carlo Learning (unbiased)

$$ v_{\pi} = \mathbb{E}_{\pi} [ G_t \mid S_t = s]  $$

*First-visit* MC policy evaluation only considers the first visit to a state in a given episode.

*Every-visit* MC policy evaluation only considers all visits.

Means can be computed incrementally:

$$ \mu_k = \mu_{k-1} + \frac{1}{k} (x_k - \mu_{k-1}) $$

$$ V(S_t) \; \text{ += } \; \frac{1}{N(S_t)} (G_t - V({S_t}))  $$

For non-stationary problems or evolving policies, this is better:

$$ V(S_t) \; \text{ += } \; \alpha (G_t - V({S_t}))  $$


### Temporal-Difference Learning (for model-free prediction) - TD(0)

*Updates a guess towards a guess. Lower variance and faster, but biased.
TD(0) can converge incorrectly when using function approximation.
More sensitive to the initial value.*

$$ V(S_t) \; \text{ += } \;
    \alpha (
        \underbrace{
             \underbrace{ R_{t+1} + \gamma V(S_{t+1})}
                       _{\text{TD Target}} - V({S_t}) }
                   _{\text{TD error}}
           )
$$

Or more colloquially:

$$ \text{Nudge } \, V(S_t) \, \text{ towards, the target } \, R_{t+1} + \gamma V(S_{t+1}) $$

A,0,B,0
<br>
B,1
<br>
B,1
<br>
B,0

MC says V(A) = 1, but TD says V(A) = 0.5.

$$
\begin{array}{c|cc}
  & samples & fullwidth \\
\hline
bootstraps & TD & DP \\
  & MC & exhaustive
\end{array}
$$

### TD(λ)

*A spectrum of sampling methods*

One-step TD learning (n=1), TD(0):

$$ G^{(1)}_t = R_{t+1} + \gamma V(S_{t+1}) $$

Two-step TD learning (n=2):

$$ G^{(2)}_t = R_{t+1} + \gamma R_{t+2} + \gamma^2 V(S_{t+2}) $$

N-step TD learning:

$$ \text{Nudge } \, V(S_t) \, \text{ towards } \, G^{(n)}_t $$

TD(λ) learning:

$$ \text{Nudge } \, V(S_t) \, \text{ towards } \, G^{\lambda}_t, \text{where} $$

$$ G^{\lambda}_t = (1 - \lambda) \sum_{n=1}^{\infty} \lambda^{n-1} G^{(n)}_t $$

The geometric decay of the $$ G^{(n)}_t $$ coefficients allows for these eligibility traces:

$$ E_0(s) = 0 $$

$$ E_t(s) = \gamma \lambda E_{t-1}(s) + \boldsymbol{1} (S_t = s) $$

which gives us these steps:

$$ \delta_t \gets R_{t+1} + \gamma V(S_{t+1}) - V(S_t) $$

$$ V(s) \gets V(s) + \alpha \delta_t E_t(s) $$

## 5. Model-free control

*Finding the optimal value functions without a model*

### On-Policy MC control

*On-Policy: learning about π from experience sampled from π*

There are two problems:

- It needs the model because $$ \pi'(s) = \mathrm{argmax} (\mathcal{R^a_s} + \mathcal{P^a_{ss'}} V(s')) $$
- It doesn't explore

For the first problem, we use $q$ instead of $v$.

For the second problem, we use the $\varepsilon$-greedy policy:

$$ \pi(a|s) = 
\begin{cases}
\epsilon / m + 1 - \epsilon  & \text{if } \; \displaystyle{\mathop{argmax}_{a \in \mathcal{A}}}  (Q(s, a)) = a^* \\
\epsilon / m                 & \text{otherwise}
\end{cases}
$$

To speed things up, we can change from:

> loop(evaluate q with many MC episodes of running π; the ε-greedy step of making a new π)

to:

> loop(evaluate q with just one MC episode of running π; the ε-greedy step of making a new π)

To make it simpler, the π is implicit and is always calculated from q.

### On-Policy TD Learning

Use TD instead of MC.  Keep nudging q by updating a guess towards a (better) guess, at every step, not just every episode.

It is known as **Sarsa**, and a step is like this:

$$ \text{Nudge } \, Q(S,A) \, \text{ towards } \,
    R + \gamma Q(S',A') $$

where we are in a state S and considering taking the action A,
and we want to know the R and then the value of the next action we would take.

Instead of this 1-step SARSA, we could have 2-step etc., or a λ version
(including the eligibility traces).

### Off-policy learning

*Off-Policy: learning about π from experience sampled from some behaviour policy μ*

Importance sampling: estimating the expectation of a different distribution, by multiplying by the ratio, and that corrects for the change between your distributions.

$$
\begin{aligned}
\mathbb{E}_{X \sim P} [f(X)]
    &= \sum P(X)f(X)  \\
    &= \sum Q(X) \frac{P(X)}{Q(X)} f(X)  \\
    &= \mathbb{E}_{X \sim Q} \left[ \frac{P(X)}{Q(X)} f(X) \right]
\end{aligned}
$$

In MC, we could compute a $$ G_t^{\pi / \mu} $$ using lots of ratios, but it ends up with very high variance.

Therefore, we have to use TD for off-policy learning, where we nudge $$V(S_t)$$ towards this target:

$$
\frac{\pi (A_t|S_t)}{\mu (A_t|S_t)} (R_{t+1} + \gamma V(S_{t+1}))
$$

Alternatively, we use **Q-learning** (which is specific to TD(0)):

$\mu$ is the behaviour policy for selecting our next action $A_{t+1}$.

But we are also going to consider an alternative successor action $A'$ we might have taken had we been following our target policy $\pi$.

$$ A_{t+1} \sim \mu (\cdot | S_t) $$

$$ A' \sim \pi (\cdot | S_t) $$

We nudge $Q(S_t, A_t)$ towards this target:

$$
R_{t+1} + \gamma Q(S_{t+1}, A')
$$

The common case is where $\pi$ is greedy w.r.t. $Q(s,a)$ and $\mu$ is ε-greedy w.r.t. $Q(s,a)$.

In other words, the $A'$ is taken greedily and the $A_{t+1}$ is sampled ε-greedily.

$$
\begin{align}
R_{t+1} + \gamma Q(S_{t+1}, A')
&= R_{t+1} + \gamma Q(S_{t+1}, \mathrm{argmax} \; Q(S_{t+1}, a'))  \\
&= R_{t+1} + \mathrm{max} \; \gamma Q(S_{t+1}, a')
\end{align}
$$

