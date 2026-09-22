---
title: "05. I tried reinforcement learning too"
description: "A TradeMaster-related experiment, five seeds, and a small gain that did not survive its checks."
pubDate: 2026-09-22
tags:
  - investing
  - research
  - investing-on-my-own
draft: false
---

*Investing on my own · Part 5/22 · Evidence through 2026-09-22. Historical research is distinct from DRY and live execution.*

After writing explicit trading rules, it was natural to wonder whether a model could learn when to take risk instead. That was part of my interest in reinforcement learning.

I had already explored TradeMaster-related code. In late July, I asked for a more concrete experiment using the crypto data available to me. I wanted to understand the assumptions in the existing implementation as well as try a newer method.

## 🎮 Choosing a position

In reinforcement learning, an agent observes a state, chooses an action, and learns from the outcome. Here, the state included past returns, volume, moving-average gaps, and funding. The action represented the amount of market exposure, and the reward included trading costs.

I limited the action space to five target positions: fully short, half short, cash, half long, and fully long. Before considering elaborate orders, I wanted to test a smaller question about how much risk to take.

The experiment used BTC and ETH for training and 34 features constructed from historical information. I trained five versions with different random seeds and examined them together. A single fortunate initialization was not enough.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/05-01-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/05-01-en.png" alt="The same model, different seeds" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">The July 31 evaluation setup, not a claim of upgrading all of TradeMaster.</figcaption>
</figure>

The existing code needed scrutiny first. Some paths observed a whole bar and traded at that same bar's close. Another used future multi-bar returns in reward shaping. A named research method did not make those assumptions appropriate for my intended evaluation.

I built an isolated experiment that decided after a completed bar and entered at the following open. I also checked whether a full-position purchase could quietly leave cash negative after fees.

## 🧪 Trying assets outside the training pair

I separated the data used to choose the model from the final evaluation. Before opening the last basket, I wrote down AVAX, DOT, TRX, and ETC along with the acceptance criteria. The evaluation covered March 2025 through June 2026.

With a cost of 10 basis points per one-times position change, the basket returned +0.41%. Increasing the cost to 25 basis points changed that to -0.72%. A slightly positive baseline was not very reassuring when a modest cost increase reversed it.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/05-02-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/05-02-en.png" alt="A small gain did not survive higher costs" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">March 2025–June 2026 total returns; cost per unit of position change, next-open simulation.</figcaption>
</figure>

The asset breakdown was more informative. AVAX returned -1.03%, DOT -12.25%, TRX stayed in cash at 0%, and ETC returned +13.88%. ETC almost offset DOT's loss.

That was not broad success across four assets. It was a small aggregate gain supported by one asset. Exposure was also sparse, so the experiment had not demonstrated repeated performance across a large number of independent market episodes.

Removing one seed at a time produced a median return of -1.07%. The lower end of the block-bootstrap interval was -6.45%. These checks made the weak aggregate result harder to dismiss as a minor cost issue.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/05-03-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/05-03-en.png" alt="The four assets did not agree" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Asset results at 10 bp. TRX did not trade; ETC&#x27;s gain was not evidence of broad consistency.</figcaption>
</figure>

## 🤔 What about the better-looking results?

A separate replay on eight major assets returned +5.11% at 10 basis points and +2.75% at 25 basis points. Those numbers could have supported a more upbeat description.

However, some assets and the period had already been inspected during development. That basket could provide additional diagnostics, but it could not be described as an untouched final test.

Four of the six preregistered acceptance criteria failed. The recorded verdict was FAIL for research promotion, paper trading, and live trading. This experiment submitted no orders.

The method itself also had a limited interpretation. It calculated what different historical positions would have earned while assuming that my small trades did not affect the price path. It did not learn how my orders would change the book or how much would actually fill.

That distinction matters when discussing “offline RL.” The experiment was a fitted-Q procedure over counterfactual historical returns, rather than a complete market simulator with observed outcomes for every possible action.

During the work, I asked whether the existing repository had actually been improved or whether a separate experiment had simply been added beside it. The answer was the latter. A useful research prototype is not automatically an integrated trading component.

What I took from the exercise was a more restrained expectation of model names. Whatever method chooses the position, it still has to survive different assets, later periods, and the cost of changing its mind.

This version did not clear that bar. I kept the failed evaluation alongside the more attractive diagnostic results, because both were necessary to understand what had actually happened.


---

[Previous](https://donggyu-lee1.github.io/writing/investing-04-comments-and-positions/) · [Series index](https://donggyu-lee1.github.io/writing/investing-on-my-own/) · [Next](https://donggyu-lee1.github.io/writing/investing-06-kimchi-premium/)
