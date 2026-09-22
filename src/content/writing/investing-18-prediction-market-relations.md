---
title: "18. Looking for inconsistent prices and skilled wallets"
description: "A semantic-pricing pilot lost its apparent edge to fees; wallet-copy work remained unfinished."
pubDate: 2026-09-22
tags:
  - investing
  - research
  - investing-on-my-own
draft: false
---

*Investing on my own · Part 18/22 · Evidence through 2026-09-22. Historical research is distinct from DRY and live execution.*

Prediction markets sometimes ask related questions in different forms. A team winning its league should imply that it also won its conference. I wondered whether language models could identify such relationships and reveal inconsistent prices.

I also explored following successful traders' wallets. These were separate from my earlier comment-classification work: one used relationships between contracts, while the other used observable trading behavior.

## 🧠 Turning meaning into a payoff comparison

If team A winning the league implies that it wins its conference, consider buying league-winner NO and conference-winner YES. Under ordinary binary settlement, at least one should pay.

If two teams cannot both win the same title, another possible comparison buys NO on both. Both teams might lose, so both contracts could pay. Mutual exclusion is not the same as two outcomes being exact opposites.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/18-01-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/18-01-en.png" alt="Logical relations and normal-settlement floors" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Human-reviewed sports relations. Mutual exclusion is not exact opposition; exceptional settlements require separate checks.</figcaption>
</figure>

Cancellation, joint winners, and other settlement exceptions complicated the logic. A relationship that holds for normal sporting results does not automatically guarantee the same cash flow under every exceptional contract rule.

An earlier May experiment examined event-relation graphs too. What I could recover was a retrospective describing synthetic contracts and multiple seeds, not the original code and an independently reconstructed after-cost market result. I did not merge it into the empirical findings.

## 📉 The apparent one-cent opportunity

The September real-data pilot covered NBA and NFL markets on Kalshi. Polymarket public access had been blocked during the relevant collection attempt, so I did not have equivalent historical quotes there.

Across 784 human-reviewed relationships, the pilot evaluated 143,294 valid relationship–time observations. Only two were positive before fees, and none remained positive afterward.

One observed pair of mutually exclusive NO contracts cost $0.50 and $0.49. Against a normal-settlement minimum payout of $1, the apparent advantage was one cent per set, or $1 for 100 sets.

The pilot's fee model charged $3.50, changing that apparent gain into a $2.50 loss. The other observation also began with $1 of gross advantage and ended at negative $1.97 after fees.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/18-02-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/18-02-en.png" alt="A $1 gross gap became a loss" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Two 2026 Kalshi quote observations, 100 sets each; standardized pilot fees with cent rounding, not historical account charges or verified depth.</figcaption>
</figure>

I rechecked seven nearby candidate relationships using one-minute data. Among 498 valid rows, 23 were positive before fees and none afterward. Repeated minutes for the same relationship were not 23 independent trades.

This remained a historical quote inspection, not a record of submitted orders. Available depth for the assumed size was unverified. In this sample, however, fees exceeded the small gap even before adding that execution constraint.

The result was specific to the evaluated markets and windows. It did not establish that semantic pricing opportunities never occur elsewhere. It established that the appealing examples in this pilot were not profitable under its stated cost model.

## 👀 Following a successful wallet

Wallet-copy research asked a different question: could I choose a trader using past information, observe their subsequent transactions, and follow them?

The most obvious trap was choosing tomorrow's winners. Selecting wallets by their full-year profits and simulating copies from January would use information unavailable at the selection date. Wallet selection and the following period needed a strict boundary.

The source trade's timestamp was not my observation time. Without historical first-seen records, the study used one-, five-, and thirty-minute delays after the leader's trade as proxies, not verified follower detection times.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/18-03-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/18-03-en.png" alt="Copying begins when the follower observes" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Wallet-copy design, not a completed backtest. The source wallet&#x27;s fill is not the follower&#x27;s execution price.</figcaption>
</figure>

The latter would model simultaneous execution, not copying. Even if the source trader had useful information, the market might adjust before a follower could act. Trade size and the amount of remaining liquidity would further change the result.

The work progressed beyond collection into monthly past-only wallet selection. A September 9 review replaced a flat half-cent charge with historical market-specific fee formulas. For the same wallets and no-premium entry condition, profit factor rose from 1.130 to 1.372.

More realistic execution weakened the result again. A separate review's no-premium condition went from 1.705 using general trade-price references to 1.094 with quotes prioritized and directional trade proxies where quotes were unavailable.

Waiting while the leader retained exposure was another extension. At a half-cent discount, its close-price model produced a profit factor of 1.574. Waiting for the next minute's open after observing that close reduced it to 1.209. The smaller archived-quotes-only sample produced 0.769.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/18-04-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/18-04-en.png" alt="The fill assumption changed the copying result" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">September 9 follow-up; five-minute delay, half-cent discount, historical fee model, one net share. Data through March 29, 2026; admitted samples differ.</figcaption>
</figure>

These were different admitted samples, not a pure fee comparison. Profit factor is a gain-to-loss ratio, not an account return. The common unit was one net received share, without a fully validated account-capital or minimum-order model.

A September 10 temporary public-access experiment collected wallet trades and order books together. That limited success did not establish trading eligibility or long-term stability; direct access still returned 451 and no real orders were submitted.

Calling the project collection-only would therefore be outdated. Calling it a completed trading strategy would be equally wrong. Historical fees, selection, and execution assumptions had been tested, while prospective performance and real execution remained unverified.

Both branches were appealing because they used information beyond a price indicator. Yet reading a relationship correctly did not guarantee an after-fee bargain, and identifying a successful trader did not establish that their returns could be copied.

The outcome here was a small empirical pilot and a set of unfinished questions, not a successful automated trading story. As the amount of collected data grew, I needed the description of what I had actually validated to remain equally precise.


---

[Previous](https://donggyu-lee1.github.io/writing/investing-17-option-relative-value/) · [Series index](https://donggyu-lee1.github.io/writing/investing-on-my-own/) · [Next](https://donggyu-lee1.github.io/writing/investing-19-prediction-markets-and-options/)
