---
title: "07. Could I collect funding and wait?"
description: "Positive funding receipts did not guarantee positive returns after basis movement and costs."
pubDate: 2026-09-22
tags:
  - investing
  - research
  - investing-on-my-own
draft: false
---

*Investing on my own · Part 7/22 · Evidence through 2026-09-22. Historical research is distinct from DRY and live execution.*

I wanted to try something that did not depend entirely on predicting the next price move. Funding payments seemed like a reasonable place to look: could I hold an offsetting pair of positions and get paid while I waited?

Perpetual futures have no expiry date. Instead, longs and shorts exchange funding payments to help keep the contract near the spot market. Under positive funding, longs generally pay shorts. Buying the coin and shorting the same quantity of perpetual futures therefore sounds attractive.

## 🪙 Payments are not the whole return

Consider an illustrative position with $100 of spot exposure and a matching futures short. If the coin rises, the spot gain broadly offsets the short's loss. If it falls, the opposite happens.

The word “broadly” matters. Spot and futures do not necessarily move by precisely the same amount. The difference between their prices, usually called the basis, can change between entry and exit.

The calculation I needed was funding received, plus the profit or loss from the changing basis, minus execution costs. A funding statement only covers the first component. It is not a complete strategy account.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/07-01-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/07-01-en.png" alt="Funding was only one component" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Carry accounting: reduced directional exposure still leaves basis, cost, and execution risks.</figcaption>
</figure>

I explored unusually high funding, deviations from recent funding levels, and different holding periods. A high payment quoted now is not a promise about the next settlement. Conditions may change soon after entry, particularly in the markets offering the most eye-catching numbers.

A September 5 experiment put this into a more concrete spot–perpetual carry setup. It matched spot and USDT perpetual contracts on the same venue, used a smoothed funding signal and an entry-basis condition, and held the selected positions for seven days.

## 📉 The later periods did not hold up

The simulation started with 2,000 USDT. There were four position slots, each allocating 250 to spot and 250 to futures collateral. I wanted the denominator to include the capital committed to both sides, not just one leg's notional exposure.

The baseline cost assumption was 52 basis points across the four executions: opening spot, opening futures, and closing each. One basis point is 0.01%. This was the experiment's modeling assumption, not a claim about every account's actual fee schedule.

Training, from April 2020 through 2023, returned 16.66% in total. Validation in 2024 returned 7.08%. Those results made the idea worth examining, but the 2025 test lost 6.13%. The subsequent 2026 period through June 20 lost another 3.60% within its own simulation segment.

These are period total returns, not annualized figures. The windows differ in length and contained 224, 72, 47, and 41 trades respectively. A chart that silently treated them as equivalent annual returns would tell the wrong story.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/07-02-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/07-02-en.png" alt="Returns did not persist" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Seven-day hold, 2,000 USDT simulated capital, four-execution cost 52 bp. Train starts April 2020; forward ends June 20, 2026. Total, not annualized, returns.</figcaption>
</figure>

The 2025 decomposition was more useful than the headline. Funding contributed approximately 79.15 USDT. Basis movement lost 141.24, and trading costs consumed 60.42. The resulting loss of about 122.51 corresponds to the reported 6.13% loss on the simulated 2,000 USDT capital base.

Funding did its job in that narrow sense: it contributed positive income. It simply did not cover the other components. I was looking for a profitable completed trade, not a position with a pleasant-looking payment history.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/07-03-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/07-03-en.png" alt="2025: positive funding, negative total" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Accounting decomposition of the same 2025 path, not a rerun without fees. Values are rounded.</figcaption>
</figure>

## 🔍 Cheaper execution was not enough

I also checked cost sensitivity. With a lower 37-basis-point round-trip assumption, the 2025 test still lost 5.25%. At the baseline 52 basis points it lost 6.13%, and at 77 basis points it lost 7.58%.

That does not mean execution costs were unimportant. It means a cheaper fee tier, by itself, would not repair this candidate in the evaluated period.

Exits created another problem. Delistings and interrupted data make it difficult to establish when a position could actually have been closed. The last price in a file is not automatically an executable liquidation price.

Removing troublesome exit cases improved some diagnostic results. But I could not have known in advance which contracts would later become troublesome. Deleting them after seeing the outcome would produce a cleaner chart at the expense of answering the original question.

I did not promote this candidate to trading. That is a narrower conclusion than saying funding strategies cannot work. This particular rule, with the available data and modeled constraints, failed to hold up in the later periods.

Holding both sides also did not make the position cash-like. Collateral could be isolated in a different wallet, only one order might fill, and venues could settle payments differently. Reducing directional exposure was useful, but it was not the same thing as removing operational risk.

For later relative-value experiments, I kept returning to this breakdown: money received while holding, money made or lost as the price relationship changes, and money spent getting in and out. It made impressive strategy names much easier to evaluate.


---

[Previous](https://donggyu-lee1.github.io/writing/investing-06-kimchi-premium/) · [Series index](https://donggyu-lee1.github.io/writing/investing-on-my-own/) · [Next](https://donggyu-lee1.github.io/writing/investing-08-traditional-factors/)
