---
title: "19. What if I compared prediction markets with crypto options?"
description: "Three research lanes, fresher prices, and a large simulated return with serious capacity caveats."
pubDate: 2026-09-22
tags:
  - investing
  - research
  - investing-on-my-own
draft: false
---

*Investing on my own · Part 19/22 · Evidence through 2026-09-22. Historical research is distinct from DRY and live execution.*

Prediction markets offer contracts on whether Bitcoin will finish above a price or move up over a short interval. Options also contain information about future prices and time horizons.

I wanted to compare the two. If a prediction-market price differed substantially from an option-based value, perhaps that gap could support a trade. I separated the question into three research branches called A, B, and C.

## 🔀 Three similar-looking but different questions

A sought exactly matching payoffs. It required compatible resolution indexes, timestamps, boundary conditions, and fees. B used option combinations to approximate the prediction-market payoff at the same maturity.

Approximation in B did not mean arbitrary expiry mismatch was acceptable. C was different again: it estimated an Up/Down probability from crypto price data and bought the comparatively cheap prediction-market direction, without building a complete offsetting option position.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/19-01-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/19-01-en.png" alt="Keeping A, B and C separate" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Three research scopes: B does not permit expiry mismatch; C is not a fully option-hedged contractual arbitrage.</figcaption>
</figure>

Matching a catalog date was insufficient. The question's actual ending time and resolution rule mattered, including what happened when the final price exactly equaled the threshold.

A remained unverified because the required payout equivalence and historical fee evidence were incomplete. That was not a finding of zero opportunities. It was a limit on whether the empirical comparison could be completed at all.

## 📉 Fresher prices changed the result

For B, I expanded the option-chain inspection beyond a few nearby strikes to historically observed contracts with the same maturity. That reduced the chance of missing a relevant contract merely because it had not traded close to expiry.

At a representative 60-cent gap threshold, the five-minute price-proxy version produced 74 trades and a positive 2.17% return. Requiring fresh one-minute observations left four trades and a negative 0.54% return.

At the 70- and 80-cent thresholds, positive five-minute results likewise became negative in the smaller fresh-minute samples.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/19-02-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/19-02-en.png" alt="Fresh minute observations changed the result" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">September 8 B results; simulated $10k/1% sizing, standard fee assumptions and zero added slippage. Historical fees, lots and simultaneous fills remain unverified.</figcaption>
</figure>

This was not simply a slightly higher fee assumption. Changing whether an old trade print could stand in for a current price changed which trades existed in the simulation.

The additional minute data also did not cover every options venue. It primarily came from Deribit, where the public historical route returned the required observations. I did not extend that verification to markets whose data remained unavailable.

## 🧪 Why I did not trust the largest number

In C, a Student-t model with a 60-cent gap threshold produced 29 simulated trades and a positive 270.65% total return. It was one of the most striking numbers in the project, but the diagnostics needed to sit immediately beside it.

The selected trades had an average predicted probability of 92.1%, while their realized directional hit rate was 41.4%. Fourteen of the 29 assumed orders were larger than the entire observed minute's traded volume.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/19-03-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/19-03-en.png" alt="The probability diagnostic beside the large return" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">C at 60 cents, 29 trades. The +270.65% simulated return also assumed 14 orders larger than the entire minute&#x27;s volume. Not executable performance.</figcaption>
</figure>

The simulation could therefore be relying on buying substantial quantities at prices supported by very small prints. I did not describe positive 270.65% as an executable performance result.

It depended on a simulated $10,000 starting account, 1%-of-equity allocations, holding to expiry, and cash becoming reusable after 24 hours. Historical market-specific fees and order-book depth were not fully verified.

At an 80-cent threshold, the model produced four trades and positive 6.20%. At 90 cents, one trade lost 1.00%. A higher threshold did not automatically make the evidence stronger: the sample became smaller, and repeated observation of the same history remained an issue.

A separate follow-up documented on September 10 replayed archived book depth. At a 20-cent threshold and a fixed maximum $100 ticket, the original t model lost $1,004 across 50 trades. The price proxy on those same candidates lost $1,251. This was a different sample and configuration from the earlier 29-trade result.

Binance-based calibration, PM-based calibration, and a combined model did not improve probability error over the original t model in that evaluation. More complicated did not mean more accurate.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/19-04-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/19-04-en.png" alt="Matched candidates in the later depth replay" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Separate September 10 study; 20-cent threshold, maximum $100 ticket, hold to expiry and standard fees. Matched samples of 50/27/1/10 trades, not real orders.</figcaption>
</figure>

The follow-up Up/Down engine used the actual selected YES or NO token's ask and depth. Computing one minus a NO price can express a payoff relationship, but it does not establish a YES ask at which I can buy.

I added a recheck 60 seconds after qualifying and separated DRY accounts for different settings and sizing rules. More simulated accounts did not create more independent market evidence; they represented alternative rules applied to related inputs.

Public API access returning 451 blocked continued observation with the required live public data. I distinguished fixture-based engine checks from market observation rather than treating successful synthetic tests as a completed public-data run.

What made this experiment worth describing was not just the large return figure. It was the sequence of constraints that reduced confidence in it: matching the exact maturity, using the actual selected token, requiring fresh observations, and checking quantity against available evidence.

The research had not established guaranteed arbitrage or a validated probability-trading system. It had established a more specific list of conditions that needed to be verified before either claim would become reasonable.


---

[Previous](https://donggyu-lee1.github.io/writing/investing-18-prediction-market-relations/) · [Series index](https://donggyu-lee1.github.io/writing/investing-on-my-own/) · [Next](https://donggyu-lee1.github.io/writing/investing-20-research-engine/)
