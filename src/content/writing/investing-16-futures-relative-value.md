---
title: "16. I compared crypto futures maturities and collateral"
description: "Five relative-value branches, small samples, and why similar labels did not mean identical payoffs."
pubDate: 2026-09-22
tags:
  - investing
  - research
  - investing-on-my-own
draft: false
---

*Investing on my own · Part 16/22 · Evidence through 2026-09-22. Historical research is distinct from DRY and live execution.*

“Futures” turned out to cover substantially different instruments. Some expired and others did not. Some used dollar-like collateral, while others used coins. Contracts referencing Bitcoin could still have different payoffs and settlement mechanics.

After funding research, I grouped several of these differences into relative-value studies. The question was less about predicting Bitcoin's direction and more about understanding why similar exposures traded at different prices.

## 📅 Could expiry provide the convergence?

Dated-futures carry buys spot and shorts a more expensive expiring future. The intended return comes from the price relationship resolving around maturity, after financing and execution costs.

The existing experiment restricted itself to linear contracts with compatible quote, margin, and settlement currencies. It assumed 5% annual financing and explicitly used a one-to-one baseline for the relevant stablecoin values. Stating that assumption did not eliminate actual currency risk.

The portfolio accepted 13 trades in training, four in validation, and one in the test. Simulated profits were approximately $145.47, $14.54, and negative $0.22. Adding ten basis points of cost changed the test result to negative $0.82.

A large candidate inventory had become a very small set of admitted trades. One losing test trade did not prove that all carry was impossible, but it did not support adopting this candidate either.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/16-01-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/16-01-en.png" alt="Dated carry: few admitted trades" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Accepted trades in the archived 2020–24/2025/2026 experiment; 5% financing, quote-compatible linear contracts, historical-price replay.</figcaption>
</figure>

## 🧭 Same expiry, different expiries

I also compared futures with nominally the same expiry across exchanges. Buying the cheaper contract and selling the richer one sounded direct, but matching dates did not establish identical settlement timestamps, reference indexes, or payout currencies.

The test produced approximately $48.25 from a single trade. Higher-cost diagnostics remained positive, but one episode explained the entire result. No route had sufficient evidence of an exactly identical contractual payoff, so I classified the study as statistical relative value.

Across different expiries, I examined the shape of the futures curve: near-versus-far spreads and a middle maturity that appeared unusually expensive relative to its neighbors.

A January 2025 micro study generated 9,935 candidate opportunities, but shared-capital admission retained only 11 trades. Their average pre-cost return was already negative 0.06 basis points. After costs, it was approximately negative 16.10 basis points, and all 11 lost.

I stopped that candidate at the micro stage rather than extending it into a long full-history experiment.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/16-02-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/16-02-en.png" alt="The futures-curve micro study" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">January 2025, 11 accepted trades. After 8 bp fees plus 8 bp slippage, all lost; no full-history extension followed.</figcaption>
</figure>

## 🧱 Collateral and wrapped Bitcoin

Another study compared contracts using different collateral or payoff structures, including USDT versus USDC and linear versus inverse contracts. The danger was attributing gains on collateral inventory to the spread strategy.

In the September 2025 collateral comparison, 1,069 independent route outcomes could be completed. After a 20-basis-point cost assumption, the average was approximately negative $0.91, with 36.9% positive.

Those overlapping route outcomes were not a shared-capital account, so their sum was not a portfolio return or CAGR. A large earlier positive component had included appreciation in coins placed as collateral. Removing that exposure made the actual spread economics less appealing.

Wrapped Bitcoin posed a related but distinct question. If a Bitcoin-linked token such as WBTC traded at a discount, I could model buying it and shorting a Bitcoin derivative to reduce directional exposure.

The intended return was recovery from an unusually large custody, redemption, or liquidity discount. The existing test contained three trades and approximately $5.63 of profit. Additional costs of 25 basis points reduced that to $1.13; 50 basis points changed it to a $3.37 loss.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/16-03-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/16-03-en.png" alt="WBTC: a narrow cost cushion" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Three 2026 test trades. Baseline wrapped-leg 30 bp and hedge 12 bp round trip, plus fixed-path stresses; simultaneous quote fills unverified.</figcaption>
</figure>

The sample was small and the cost cushion narrow. I did not call it guaranteed redemption arbitrage. The discount could reflect real custody concerns, and a retail holder might not have access to the redemption mechanism needed to close the gap directly.

Hedging Bitcoin's price did not hedge away the token's own failure risk. This was another case where similar-looking exposures retained a meaningful difference.

The five branches ended in different states. The dated-carry and curve candidates were stopped. Same-expiry, collateral, and wrapped-Bitcoin work remained research material. A positive number and an operational promotion were not interchangeable statuses.

Later option work expanded the project, but these older decisions did not define the status of every subsequent derivative experiment. New contract mapping, data, and execution work needed their own account.

The question I kept returning to was simple: do the two contracts really pay the same thing? If I could not establish that, the observed gap might be an opportunity, but it might equally be the price of a risk the hedge did not remove.


---

[Previous](https://donggyu-lee1.github.io/writing/investing-15-gold-across-markets/) · [Series index](https://donggyu-lee1.github.io/writing/investing-on-my-own/) · [Next](https://donggyu-lee1.github.io/writing/investing-17-option-relative-value/)
