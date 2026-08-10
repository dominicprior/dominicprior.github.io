---
title: RL Intro
parent: Reinforcement Learning
nav_order: 2
---

https://www.youtube.com/watch?v=VnpRp7ZglfA

Helps robots learn to walk

trial and error

positive and negative rewards

Atari 2014

AlphaGo 2016

DOTA 2018

RLHF

agent - can directly control

env - interact via agent

action: agent -> env

MDP

Markov property

+++ need to mention credit assignment (he does this later, at 37:30)

s, a, r, s, a, r, ...

Aim: maximize future reward, the return

policy π: s -> a
policy: π(a|s)

return G_t = r_t + γ r_{t+1} + ...

model: p(s', r | s, a)

In a gridworld demo, the agent doesn't know those p values.

aim: improve the policy

directly adjusting the policy is a policy gradient method

value functions: keep track of expected G_t when following π from a given s: V_π(s)

V_π(s) = Σ p(s', r | s, a) [ r + γ Q_π(s', a) ]

Optimal: V_*(s) and Q_*(s, a)

Once we have Q, just use a greedy π.  an **improvement** on the previous version.

But Q depends on π.  We need **evaluation**.

Generalized policy iteration.

For good improvement we need good evaluation

+++ assuming α is a good thing - e.g. why are gradual changes good?

+++ need to marvel at how a tight string solves the problem - or a catenary

+++ my demo needs to display the correct Q for a small grid world.

+++ maybe make the demo choose random dirs when there is a tie.  to illustrate the brownian motion.

+++ to show the trouble with MC, just set α to 0.

Sarsa, Expected Sarsa, Q-Learning

DQN allows for cts states but not cts actions.  For cts actions, we need policy gradient methods.

Policy gradients.  We need some way to evaluate a π.
