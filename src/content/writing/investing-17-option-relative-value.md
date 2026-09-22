---
title: "17. I looked for differences in option prices"
description: "Replication, volatility surfaces, and the risk between separately filled legs."
pubDate: 2026-09-22
tags:
  - investing
  - research
  - investing-on-my-own
draft: false
---

*Investing on my own · Part 17/22 · Evidence through 2026-09-22. Historical research is distinct from DRY and live execution.*

After comparing futures maturities and collateral, I extended the work to options. I examined identical-looking options across venues, combinations that replicate other payoffs, and differences in the market price of volatility.

The instruments were more complicated, but the initial question was familiar: if two positions provide similar outcomes at different prices, can the difference be traded?

## 🧩 Similar exposure or identical payoff?

A call provides the right to buy at a specified strike; a put provides the right to sell. Buying a call and selling a put with the same strike and maturity creates a forward-like terminal payoff.

I investigated put–call parity, cross-venue prices for matching options, and multi-option replication relationships. Cash-flow timing, discounting, collateral, and settlement conditions still had to match before a theoretical identity became an executable trade.

Two contracts labeled as Bitcoin options were not necessarily identical. I needed strike, exact expiry, settlement reference, multiplier, and premium currency. Coin-denominated premiums also required conversion using a contemporaneous underlying reference.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/17-01-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/17-01-en.png" alt="Two kinds of option comparison" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Exact-payoff verification differs from statistical convergence; labels and strikes alone do not establish arbitrage.</figcaption>
</figure>

I kept exact-payoff comparisons separate from portfolios with merely similar risks. The former required evidence of a contractual match. The latter asked whether an estimated pricing relationship would converge, which made it statistical relative value.

## 🌊 Volatility had a market price

Option prices reflect expectations about the scale of future moves. Implied volatility, or IV, is the volatility value inferred from an observed option price under a pricing model.

Rather than freely mixing venue-provided IV values, I recalculated them on a consistent basis. One research direction compared roughly at-the-money options of similar maturity across venues, buying cheaper volatility and selling richer volatility while reducing residual directional exposure.

A second direction compared skew: how expensive downside-oriented puts were relative to central options. A third compared short- and longer-maturity volatility structures. All involved price relationships, but they were not the same risk.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/17-02-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/17-02-en.png" alt="Three volatility-surface questions" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Research directions computed from historical five-minute trade bars, not proof of simultaneous executable bid/ask depth.</figcaption>
</figure>

The historical source used five-minute bars of actual option trades. “Actual trade” was meaningful, but it did not establish that a usable ask and bid existed simultaneously for my intended quantities.

When historical cross-venue overlap was insufficient, I also created separate within-venue comparisons against prior relationships. Those controls were not substitutes for cross-venue arbitrage and were not merged into exact-replication results.

This is why I have not reduced the article to one definitive return figure. Historical option-surface screening and recent public-quote DRY validation were separate stages. Combining them into a single track record would exceed what either established.

## 🛠️ Multiple legs did not fill as one transaction

Two options plus a hedge already require at least three executions. Four-option structures need more. Assuming simultaneous fills makes a backtest convenient, but the real problem is what happens when only some legs execute.

I fixed the route and quantities at the signal time, then modeled each leg independently at a later eligible bar. The allowed wait was at most one hour. If only part of the structure filled, the remaining orders were canceled and the filled positions were unwound.

Losses from those incomplete routes belonged in the result. Meanwhile, capital for the intended route was reserved during the wait, but an unfilled leg could not create profit, fees, or fictitious inventory.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/17-03-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/17-03-en.png" alt="Partial execution belonged in the result" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Existing replay structure: later eligible bars per leg; unfilled reservations create no fictitious P&amp;L or fees.</figcaption>
</figure>

The September DRY integration also exposed small implementation details with practical consequences. Floating-point arithmetic around a 0.01 quantity increment could cause a floor operation to remove one unit from a calculation intended to represent 59 increments.

The economic quantity might be clear on paper while the numerical representation produced a different order. Handling native lot sizes required more care than merely rounding the displayed value.

I also examined time budgets for fetching option details. A short aggregate deadline across all detail requests could discard a candidate before necessary contract information arrived. Adjusting that aggregate limit was not the same as removing individual request timeouts or quote-freshness requirements.

Those repairs and tests did not establish that enough naturally occurring trades had completed their full lifecycle. The number of observed entries through exits remained a separate question. Passing software checks was not a source of trading profit.

The most useful part of the option work was not simply learning another pricing formula. It was distinguishing similar risks from identical payoffs and asking whether the explanation still held while only one side was filled.

A price table can put four legs in one row. An operating system has to manage four separate events, their timing, and the exposure between them. Much of my option research ended up in that gap.


---

[Previous](https://donggyu-lee1.github.io/writing/investing-16-futures-relative-value/) · [Series index](https://donggyu-lee1.github.io/writing/investing-on-my-own/) · [Next](https://donggyu-lee1.github.io/writing/investing-18-prediction-market-relations/)
