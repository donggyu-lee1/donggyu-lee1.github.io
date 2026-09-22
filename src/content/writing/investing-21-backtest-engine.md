---
title: "21. Building a faster backtest engine I could trust"
description: "Three clocks, shared capital, compatible caches, and checks beyond headline returns."
pubDate: 2026-09-22
tags:
  - investing
  - research
  - investing-on-my-own
draft: false
---

*Investing on my own · Part 21/22 · Evidence through 2026-09-22. Historical research is distinct from DRY and live execution.*

Testing many ideas required a faster backtest engine. Repeated experiments across venues and instruments were difficult to sustain if every small change meant waiting through the same expensive work.

I initially wanted parallelization and caching that would support iteration within roughly 10–15 minutes. That was a goal, not a claim that every experiment met it. As the engine evolved, preserving the meaning of the experiment became more important than the runtime alone.

## ⏱️ There were three different clocks

I separated the time attached to a price, the time information became available, and the time an order could execute.

A candle covering 10:00 to 10:05 is complete only at 10:05. A signal using its closing price cannot legitimately buy at the candle's 10:00 opening price.

Knowing the signal at 10:05 also does not guarantee that the last trade at that instant remains available for my entire order. The simulation needs a subsequent execution opportunity and an explicit treatment of delay.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/21-01-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/21-01-en.png" alt="Bar time, information time, execution time" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Illustrative times. A completed bar cannot justify an earlier opening-price fill; next-open proxies still do not verify depth.</figcaption>
</figure>

Announcements had separate publication and trading-start times. Options and prediction markets had expiry, outcome confirmation, and cash-release times. Collapsing these into one date simplified code while creating trades that were not historically available.

The historical universe required similar care. A large collection of price files was not enough if it included contracts before they existed or omitted delisted instruments. Contract inventories and coverage records belonged beside the prices.

## 💰 Trade profits were not portfolio profits

For an isolated idea, calculating returns trade by trade was a useful starting point. Combining strategies introduced competition for the same money.

If EMA and kimchi-premium strategies signaled together, the account had to allocate finite cash and collateral. Adding their standalone results could describe a portfolio that could never have held both paths simultaneously.

I therefore needed shared-capital admission and a common ledger rather than a final spreadsheet that merely summed independent strategy returns.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/21-02-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/21-02-en.png" alt="Different strategies compete for one capital pool" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Simplified shared-core design. Standalone returns cannot simply be added; reservations, fills and fees connect through one ledger.</figcaption>
</figure>

Multi-leg option routes reserved capital at the decision time. An order waiting to fill could prevent another strategy from using that money. Profit and costs, however, belonged only to legs that had actually received simulated fills.

Partial execution also changed counting. Several child orders filling one economic trade were not several independent opportunities. I retained child-level audit records while applying cumulative sizing limits and dashboard summaries to the parent trade.

Exits had their own timing. A sale did not always make the proceeds immediately reusable. In prediction markets, the economic outcome becoming fixed and the cash becoming available were separate ledger events.

## 🗃️ Reuse without changing the experiment

I reduced repeated reads of the same data and recalculation of identical features. Shared inputs could be cached, while independent calculations could run separately.

But a cache should not conceal stale economics. Reuse required compatible data, configuration, and code meaning, with provenance and hashes. Recovering from a network interruption could resume the same work; changing fees or fill rules required a new result.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/21-03-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/21-03-en.png" alt="A faster replay must preserve the trades" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Replay checks beyond speed and headline returns. This series reused existing results rather than running new strategy tests.</figcaption>
</figure>

Performance comparisons between engines could not stop at elapsed time. I checked whether they produced the same candidates, rejected them for the same reasons, and filled the same quantities at the same modeled times.

Similar headline returns did not establish equivalence if the trade paths differed. A faster engine that quietly changed admission rules was a different experiment, not simply an optimization.

The broader project provided concrete reasons for these checks. Earlier RL work required scrutiny of same-bar prices and future-linked rewards. Factor work exposed liquidation and cost-accounting issues. Single-stock-futures replays checked whether cash and positions reconciled.

Those problems could change apparent performance independently of the strategy idea. I wanted reports to be recomputable from trade records, not merely preserved as attractive charts.

The figures in this series likewise come from existing results. I did not run new backtests or open reserved holdouts to make the articles look better. When an old result had an awkward limitation, I described the limitation instead of searching for a more flattering replacement.

I wanted speed partly to reduce the cost of checking a mistaken assumption. Faster iteration would be useful only if it accelerated correction as well as exploration. Otherwise, it would simply accumulate incorrect confidence faster.

The final question was therefore not how quickly the process finished. It was whether the revised engine used the same information to make the same trades. Only after answering that could speed count as an improvement.


<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/21-04-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/21-04-en.png" alt="Archived EMA analysis table" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Browser capture of a public-safe view of selected source fields. Not an account screen or a live dashboard; full provenance is retained privately.</figcaption>
</figure>


---

[Previous](https://donggyu-lee1.github.io/writing/investing-20-research-engine/) · [Series index](https://donggyu-lee1.github.io/writing/investing-on-my-own/) · [Next](https://donggyu-lee1.github.io/writing/investing-22-operating-engine/)
