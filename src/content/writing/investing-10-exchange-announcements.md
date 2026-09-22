---
title: "10. Was trading an exchange announcement already too late?"
description: "Publication timestamps, delayed entries, and a feed that remained useful even without an alpha."
pubDate: 2026-09-22
tags:
  - investing
  - research
  - investing-on-my-own
draft: false
---

*Investing on my own · Part 10/22 · Evidence through 2026-09-22. Historical research is distinct from DRY and live execution.*

Listings tend to attract buying, and delisting announcements tend to attract selling. On a historical chart, the event often looks obvious. I wondered whether a bot that read exchange announcements could trade the remaining reaction.

The difficult part was the word “remaining.” Finding an event after opening a chart is not the same as receiving the announcement for the first time and then submitting an order. Timestamps became more important than I initially expected.

## 🕒 When could I actually know?

A listing has an announcement time and a trading-start time. Deposits and withdrawals may open at other times. Treating the date in a headline as the event timestamp can mix several different events.

Suppose an announcement appears at 10 a.m. and trading begins at 3 p.m. Using 3 p.m. as the first information time misses the intervening reaction. Conversely, applying a later revision of the announcement to 10 a.m. gives the strategy information it did not yet have.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/10-01-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/10-01-en.png" alt="Publication and trading start differ" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Conceptual announcement timing, not an execution log. Revisions and scheduled starts are not first publication.</figcaption>
</figure>

The audit separated 1,368 listing-related events into 914 actual listing announcements, 242 posts after trading had opened, and 212 derivative, conversion, or other non-spot events. A headline containing “listing” was not automatically the same buy signal. Before optimizing the reader's speed, I had to establish what kind of event it was reading.

I did not only test buying after listings. I also examined shorts after delisting announcements, reversals after initial drops, and deposit or withdrawal restrictions. They could share a collector, but their economic mechanisms were different.

## 📉 Trading after the announcement

One listing-chase rule entered five minutes after the information time and held for two hours. Its mean trade returns were positive 1.43% in training, negative 1.22% in validation, and negative 0.28% in the test.

A full-delisting short rule entered after 15 minutes, held for 12 hours, and used a 10% stop. Mean returns were positive 1.28%, negative 1.29%, and positive 0.01% respectively. The test median was negative 0.40%.

The positive 0.01% average could be presented as roughly breaking even. That would omit both the negative median and the poor validation period. It was not convincing evidence of a reliable announcement-trading strategy.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/10-02-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/10-02-en.png" alt="Mean returns after delayed entry" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">After-cost mean trade returns in the August 14 audit: listing +5 minutes/2 hours; delisting short +15 minutes/12 hours with 10% stop. Not account CAGR.</figcaption>
</figure>

I also examined buying reversals after sharp falls. Some candidates looked better in earlier periods and deteriorated later. A small number of events could materially change the result, which made headline averages fragile.

An announcement can genuinely cause a large price move without leaving that entire move available to my strategy. By the time the collector observes the notice, classifies it, and submits an order, the original price may be gone.

This distinction sounds obvious in prose. It is easier to lose in a dataset containing one convenient timestamp and a sequence of candles. I needed the backtest to preserve the delay instead of rewarding the strategy for recognizing an event retrospectively.

## 🚧 Transfer restrictions asked another question

I later separated transfer restrictions unrelated to delisting. Security incidents and network problems can prevent assets from moving between venues, weakening the mechanism that normally keeps prices aligned.

The resulting gap might be an opportunity. It might also be compensation for being unable to get the asset out. Those possibilities cannot be distinguished from the price difference alone.

One follow-up sample contained only 14 security-related episodes linking Coinone notices to Binance perpetual contracts. Evaluating hundreds of entry and exit combinations did not turn that into hundreds of independent events.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/10-03-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/10-03-en.png" alt="Configurations are not independent events" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">The later transfer-restriction study used a narrow Coinone-notice/Binance-perpetual sample, not all exchanges.</figcaption>
</figure>

Some notices also lacked a preserved first version. If I could not establish whether today's wording was visible at the original timestamp, better text classification would not repair the information-timing problem. I kept this work at the observation stage.

The data remained useful even when the return strategy failed. A delisting or withdrawal suspension affecting an existing position can justify blocking new entries and reviewing the position. A signal designed to earn money and an alert designed to avoid preventable losses serve different purposes.

The collector needed to handle duplicate notices, revisions, and ambiguous asset names. Matching tickers was not enough: identical symbols can refer to different assets, and an operational response applied to the wrong contract would be worse than a missed research observation.

I began by asking how quickly the system could read an announcement. I ended up asking two earlier questions: was the information genuinely public at that moment, and what executable price remained when the strategy could respond?

The event is often clearly visible on the chart. The available trade is not. Recognizing that difference changed how I used the announcement feed, including the parts that never became a standalone strategy.


---

[Previous](https://donggyu-lee1.github.io/writing/investing-09-statistical-arbitrage/) · [Series index](https://donggyu-lee1.github.io/writing/investing-on-my-own/) · [Next](https://donggyu-lee1.github.io/writing/investing-11-meme-booms/)
