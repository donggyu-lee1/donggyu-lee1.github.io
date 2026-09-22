---
title: "04. Do prediction-market traders act on what they say?"
description: "Connecting comments, positions, and later behavior without treating text labels as identity."
pubDate: 2026-09-22
tags:
  - investing
  - research
  - investing-on-my-own
draft: false
---

*Investing on my own · Part 4/22 · Evidence through 2026-09-22. Historical research is distinct from DRY and live execution.*

Prediction markets place comments next to prices. Someone sounds certain that a candidate will win; someone else says the market is completely wrong. I wondered whether those people were actually putting their money in the same direction.

In late June 2026, I chose one event, Polymarket's 2024 US presidential election winner, and started collecting data. My first objective was to connect comments with positions and subsequent actions. I was not yet testing a trading strategy.

## 💬 Adding positions to comments

A prediction-market token pays according to the outcome of an event. Its price can reflect participants' beliefs, but it also reflects liquidity, fees, and constraints. I did not want to treat the price as a direct measurement of the true probability.

The pilot covered 17 markets, 114,356 cleaned comments, and 11,499 users. Collecting the text was only part of the work. I needed to estimate what each user held when a particular comment was written.

Attaching a user's current position to an old comment would mix different times. They might have bought after posting or sold before I collected the profile. I therefore replayed transaction and activity histories in chronological order.

Positions could be linked to 41,501 comments, of which 38,637 had a reconstruction status classified as OK. The remaining cases and unmatched comments mattered: a large dataset did not mean that every participant's past position was known.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/04-01-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/04-01-en.png" alt="Text, positions, later behavior" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">The study linked distinct observations rather than assuming comments directly represented investments.</figcaption>
</figure>

I then attached subsequent activity over six, 24, and 48 hours, together with prices near the comment time. This made it possible to ask whether a user added to a position, reduced it, or did nothing after writing.

## 🧠 Giving the model a narrower task

I did not want to infer political preference from a position. Buying a candidate's token does not necessarily mean supporting that candidate. Someone can dislike a candidate and still expect them to win, or simply consider the price too low.

The text classifier therefore saw the comment itself, without the position or market price. It classified explicit Democratic-leaning expression, Republican-leaning expression, or neither. Market predictions and expressions of support needed to be distinguished.

This seemed like a concrete use for an LLM. Short comments contain sarcasm, jokes, and references that keyword counting handles poorly. Mentioning a candidate's name is not enough to establish support.

The classification covered all 41,501 position-linked comments. I also added an audit stage for the initially positive classifications instead of treating the first answer as final.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/04-02-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/04-02-en.png" alt="Collection and usable position records" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Counts from the 17-market election study. Different units; not additive counts of trades or independent investors.</figcaption>
</figure>

Under the strict final filters, 32,123 comments were classified as none, 5,695 as rep, and 3,683 as dem. Many comments could not confidently be described as political support. I preferred keeping that uncertainty to forcing a more complete-looking classification.

## 📊 What the dataset could support

The resulting data allowed comparisons between stated views, reconstructed positions, and later actions. It did not establish a person's political identity or investment skill.

Commenters are only part of a market's participants. Users whose positions can be reconstructed are another subset. A frequent commenter can also dominate a comment-level analysis if every post is treated as an independent opinion.

I kept comment-level and user-level summaries separate. Users with expressions in both directions could remain mixed. There was no need to assign every person to a single category.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/04-03-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/04-03-en.png" alt="Labels changed with the classification rule" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Strict versus audited text-preference labels on position rows, not fixed political identities.</figcaption>
</figure>

The API structure introduced another complication. Some comments belonged to the event-wide discussion rather than to an individual candidate's market. An empty current positions list also did not establish that the person had never traded. Those details affected how confidently records could be joined.

What I completed was a dataset for behavioral research. I did not demonstrate that reading the comments could predict the next price move profitably. That would require another experiment with information receipt times, delayed trading prices, and costs.

The distinction matters because a compelling relationship in a chart can still be difficult to use. A comment may be observed late. The associated price may already have moved. Even an accurate description of someone's opinion may say little about the next trade.

For me, this was a useful example of giving an LLM a bounded job. Instead of asking it to forecast prices, I asked it to organize text under an explicit classification rule and leave ambiguous cases unresolved.

I later investigated logical relationships between prediction-market contracts and the possibility of following successful wallets. Those are separate questions with different data requirements. This pilot began with something simpler: putting words and actions on the same clock.


---

[Previous](https://donggyu-lee1.github.io/writing/investing-03-ema-dips/) · [Series index](https://donggyu-lee1.github.io/writing/investing-on-my-own/) · [Next](https://donggyu-lee1.github.io/writing/investing-05-reinforcement-learning/)
