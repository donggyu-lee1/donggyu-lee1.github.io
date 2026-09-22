---
title: "14. What if a stock and its future have different prices?"
description: "Contract units, cash and collateral, reconciliation, and the unfinished quote-reception problem."
pubDate: 2026-09-22
tags:
  - investing
  - research
  - investing-on-my-own
draft: false
---

*Investing on my own · Part 14/22 · Evidence through 2026-09-22. Historical research is distinct from DRY and live execution.*

What if the cash price of a stock differs from the price of its futures contract? My single-stock-futures research examined that relationship in Korean equities.

Compared with predicting the next price move, the question seemed concrete. If the contracts matched, perhaps I could calculate the difference directly. But finishing the calculation did not mean the trade could be executed.

## ⚖️ The visible gap was not all profit

As an illustration, suppose a stock's ask is KRW 10,000 and the corresponding futures bid is KRW 10,100. Buying the stock and selling the futures creates a position around that apparent KRW 100 difference.

The relevant prices are the ask I would pay and the bid I would receive, not the two markets' last trades. A larger order may also consume several order-book levels rather than fill entirely at the best displayed quote.

I had to match quantities using the contract multiplier. One share and one futures contract are not automatically equivalent positions. A common company name is not a complete contract specification.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/14-01-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/14-01-en.png" alt="An illustrative KRW 100 gap" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Illustrative, not an observed trade. Match multipliers and depth; the KRW 100 gap is not net profit.</figcaption>
</figure>

The position requires cash for the stock and collateral for the futures. Dividends, maturity, settlement mechanics, transaction costs, taxes, and the time capital remains committed all affect the result.

Tax and margin items in this article describe the historical research model. They are not current trading instructions. Actual execution would require checking the applicable account and date-specific conditions again.

## 🧮 Getting the accounting to reconcile

One research inventory contained 274 underlying stocks and 1,644 futures contracts. Inventories from other dates differed slightly as contracts appeared and expired. I treated those counts as dated snapshots rather than permanent properties of the market.

For each candidate, I needed maturity, multiplier, stock quantity, collateral requirements, and expected costs. I also distinguished an ideal fractional portfolio from a position constructed using actual whole contracts.

That distinction matters particularly for a small account. An optimizer may suggest 0.3 contracts, but if the instrument trades only in whole contracts, the feasible choices are zero or one. Sizing and residual exposure can change abruptly.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/14-02-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/14-02-en.png" alt="What the account must represent" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Accounting concepts in the existing engine. Fractional research sizing is distinct from executable contract units.</figcaption>
</figure>

I replayed execution records to check that portfolio accounting remained consistent. A version documented on September 10 reconciled all 16 evaluation cases. Reconciliation meant the recorded trades, cash, and positions added up correctly.

It did not mean 16 profitable trades. Nor did it mean that a broker had filled 16 real orders. A count of accounting tests could not be used as a trading track record.

This was useful work nonetheless. A strategy that cannot explain its own cash and inventory has a problem before its expected return is even considered. I wanted that layer checked independently of the opportunity detector.

## 📡 Receiving usable quotes remained a separate task

The strategy ultimately needed sufficiently synchronized cash and futures quotes. If one price was stale while the other updated, a vanished gap could look like a current opportunity.

An existing collection route encountered authentication or access errors returning 401 and 403. The product catalog could therefore contain many instruments while the number of verified opportunities remained zero.

That did not establish that the market had no opportunities. It established that the study had not verified any with the required quote data. When the observable-market denominator was itself uncertain, reporting a zero opportunity rate would also be misleading.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/14-03-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/14-03-en.png" alt="Verified accounting, unverified reception" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">September 10 documented scope. Sixteen is a reconciliation-test count, not profitable trades or verified live fills.</figcaption>
</figure>

I continued implementing the brokerage receiver and checking subscriptions and fields. Writing the connection code, successfully logging in, and receiving actual in-session callbacks were separate milestones.

That was the September 10 position, but later evidence moved forward. On September 22, a separate recovery test received 3,671 real NXT cash-equity quote messages for Samsung Electronics and SK Hynix through Shinhan INDI. Describing quote reception as entirely unverified at the cutoff would now be inaccurate.

The test disconnected and reconnected the transport. It preserved counters for 188 queue losses and 44 stale-message discards instead of resetting them away. Automatic diagnostic recovery was declared about 30.07 seconds after the recovery observation began.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/14-04-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/14-04-en.png" alt="Real callbacks on September 22" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">September 22 after-hours transport test using real NXT quotes; 188 queue losses and 44 stale discards preserved. Not a paired stock-futures trade or real order.</figcaption>
</figure>

This used two NXT cash stocks after hours. KRX single-stock futures were outside their ordinary session, so it was not a simultaneous cash-futures trading test. The experiment added no trades to the existing paper accounts and submitted no real orders.

The research question remained specific: what remained after matching two forms of exposure to the same underlying asset and paying the relevant costs?

The price of that specificity was sensitivity to details. A stale quote, incorrect multiplier, or mismatched expiry could make a clean spreadsheet describe the wrong trade.

The record now includes instrument mapping, accounting replay, and a bounded recovery check using real quotes. Automatic resumption on the operating cash-futures transport path and entry-to-exit execution with both valid books still need separate evidence. There is no verified live-profit table for this strategy.

I had initially thought that calculating the price difference would be the central task. After building that calculation, I spent much more time establishing whether the two prices entering it represented a trade I could actually make.


---

[Previous](https://donggyu-lee1.github.io/writing/investing-13-korean-equity-research/) · [Series index](https://donggyu-lee1.github.io/writing/investing-on-my-own/) · [Next](https://donggyu-lee1.github.io/writing/investing-15-gold-across-markets/)
