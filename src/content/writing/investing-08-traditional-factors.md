---
title: "08. I revisited established crypto factors"
description: "Tradable shorts, changing universes, and a cost-aware ensemble that selected no winner."
pubDate: 2026-09-22
tags:
  - investing
  - research
  - investing-on-my-own
draft: false
---

*Investing on my own · Part 8/22 · Evidence through 2026-09-22. Historical research is distinct from DRY and live execution.*

After asking an LLM to invent factors, I kept seeing variations on familiar mean-reversion ideas. I decided to revisit established factors more carefully: momentum, reversal, volatility, trading volume, and liquidity.

Their names were familiar. Turning them into comparable, tradable experiments was less straightforward. The same formula could represent a different strategy depending on which venue, instruments, and historical universe I used.

## 📚 A ranking is not yet a portfolio

A factor is a rule for assigning scores to assets. Giving higher scores to recent winners produces one kind of momentum signal. Giving them to recent losers produces one kind of reversal signal.

“Buy the highest scores and sell the lowest” sounds simple. In a spot market, however, selling a negative position requires borrowing or another shorting mechanism. A backtest accepting negative weights does not establish that the trade was available.

I separated spot long-only portfolios, synthetic spot long–short calculations, and long–short portfolios using actual perpetual contracts. For spot–perpetual comparisons, I also needed instruments that existed on both sides at the relevant historical time.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/08-01-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/08-01-en.png" alt="One ranking, different portfolios" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Long–short portfolios require an actual shorting route, not just negative weights in a model.</figcaption>
</figure>

Using today's surviving coins throughout history would quietly remove failures and delistings. Filling observations before a contract began trading would create another distortion. Reconstructing the candidate universe date by date became more important than adding another scoring formula.

I compared venues as well. A result appearing on several exchanges was more interesting than one confined to a single market. But these were not wholly independent replications: the same coins and market shocks appeared in several places.

## 📊 A good test, followed by a bad continuation

One prominent candidate used the variability of trading volume over 30 days. It combined information across venues and built a perpetual long–short portfolio. The input concerned how uneven volume had been, rather than simply how volatile the coin's price was.

In that evaluation, the median test return was positive 7.30%, with a Sharpe ratio of 1.72. All nine core comparisons were positive. The subsequent Forward period returned negative 2.53%, with a Sharpe ratio of negative 1.23.

These were research comparisons across evaluated configurations, not a live account record. Once I had seen results and conducted follow-up analysis, I could not keep counting each revision as an untouched test. A promising earlier result and inadequate subsequent evidence had to remain visible together.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/08-02-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/08-02-en.png" alt="A good test, a negative forward period" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Global 30-day volume-variability perpetual-neutral candidate; 2026 test and following six weeks, next-hour proxy, venue costs and slippage. Post-holdout research.</figcaption>
</figure>

I also checked where the profits came from. The short side mattered for this family. Replacing a long–short implementation with a spot-only basket of high-scoring coins therefore did not preserve the same investment proposition.

Small, illiquid coins were another complication. They might offer a genuine premium, but they could also make the simulation unrealistically generous. A spread estimated from historical candles was not an observed order book. Reported volume did not mean that the entire amount was available to my strategy at one price.

## 🧺 Combining factors did not remove the problem

If individual factors were unstable, perhaps a portfolio of them would work better. I tested simple ensembles, market-regime adjustments, and dynamic allocations informed by recent performance.

A September cost-aware allocation study worked with 329 candidates and three control rules. It rebalanced weekly, limited any one factor to 35%, and capped related factor families at 60%. It could leave money in cash when expected returns were unfavorable.

The main accounting issue was that factor returns could not simply be added together. Two factors might request opposite positions in the same coin, allowing orders to cancel. They might also request the same direction, increasing concentration rather than diversifying it.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/08-03-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/08-03-en.png" alt="Allocation improvements did not pass training" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Sequential 2022–24 versus observed 2025; weekly allocation, 15 bp per side plus funding, no capacity cap. The new ensemble did not open 2026.</figcaption>
</figure>

I therefore needed costs on the final net coin orders. Changes in factor allocations were not the same as turnover in the underlying assets. A fairly stable allocation could still trade heavily if each constituent factor kept replacing its holdings.

The selection outcome was unambiguous. No configuration passed the sequential 2022–2024 training criteria, and the final selection remained empty. Some configurations later showed positive 2025 results, but using those outcomes to choose a winner would defeat the selection protocol.

That was not the result I had hoped a larger candidate pool would deliver. A pool can contain many nearly identical ideas, or many versions of the same small pre-cost edge. More rows in a registry do not necessarily mean more independent sources of return.

My late-August research export still described this work as ongoing. By the September 22 review, there were follow-up experiments and explicit rejection reasons to include. Leaving the old description unchanged would have made the series sound more promising, but less accurate.

I have not concluded that all traditional crypto factors are useless. I have concluded that these results do not support presenting the evaluated ensemble as a stable money-making portfolio. The useful output was a clearer separation between a scoring pattern, a portfolio that could actually be implemented, and a selection process that survived its own rules.


---

[Previous](https://donggyu-lee1.github.io/writing/investing-07-funding-carry/) · [Series index](https://donggyu-lee1.github.io/writing/investing-on-my-own/) · [Next](https://donggyu-lee1.github.io/writing/investing-09-statistical-arbitrage/)
