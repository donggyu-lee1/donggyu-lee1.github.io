---
title: "02. I asked an LLM to invent trading factors"
description: "Local Qwen, a growing factor bank, and what survived re-evaluation."
pubDate: 2026-09-22
tags:
  - investing
  - research
  - investing-on-my-own
draft: false
---

*Investing on my own · Part 2/22 · Evidence through 2026-09-22. Historical research is distinct from DRY and live execution.*

After implementing a few strategies by hand, I noticed how much time went into preparing data and checking results. Changing the idea was often the easy part. Getting another trustworthy backtest took longer.

Factor AI started from a straightforward expectation: an LLM could read research and write code, so perhaps it could keep proposing and testing factors while I reviewed the more promising results.

## 🤖 Letting one experiment lead to another

A factor is a number used to compare assets. Recent returns, changes in volume, and distance from a moving average are simple examples. I could rank assets by that number and test buying one end of the ranking while selling the other.

I wanted the system to continue beyond generating a single formula. Given a research direction, it would find material, form a hypothesis, implement it, run a backtest, and examine the failure. Ideally, that examination would inform the next attempt.

A local Qwen model was attractive because it could run for long periods. I used Codex for changes to the pipeline and difficult debugging, while the local model handled repeated exploration. Reducing the amount of instruction-passing I had to do was part of the goal.

The model did not get to invent performance numbers. It proposed a formula; deterministic code had to construct signals and positions, charge costs, and calculate returns. The explanation and the calculation then needed to agree.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/02-01-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/02-01-en.png" alt="Generate, calculate, review" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">The intended research workflow; separate roles did not guarantee independent validation.</figcaption>
</figure>

I was looking for a collection of modest effects, not necessarily one exceptional strategy. That made duplication important. Ten differently named formulas were not useful if they all produced nearly the same trades.

## 📚 A growing collection of files

The late-August inventory contained 568 research artifacts, 1,230 backtest artifacts, and 114 verification artifacts. Those counts included retries and variations. They were not counts of independent strategies, and certainly not counts of profitable ones.

The canonical collection contained 62 latest factors. Fifty-nine were rejected, two were archived, and one needed another test. None had qualified for promotion.

The ideas were also less diverse than I had expected. The model frequently returned to some version of calculating a deviation from recent conditions and betting on a reversal. Descriptions might refer to volume or market sentiment while the actual signals remained similar.

I began checking correlations between signals and returns, along with holding periods, trading frequency, and asset overlap. A complicated expression could still carry almost the same information as a much simpler one.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/02-02-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/02-02-en.png" alt="Artifacts were not unique strategies" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Artifact counts from the August 30 export, not counts of unique successful strategies.</figcaption>
</figure>

## 🔍 Checking the checks

The more serious problem was that the validation labels themselves were not consistently reliable. Older results were spread across several locations. Some could not be traced back to the original recipe. A few had been marked as passing despite outcomes in which the simulated account was effectively wiped out.

I standardized the data and reran candidates under a shared evaluation contract. The main historical split used 2020–2024 for training and 2025 for validation, with later data considered separately. I looked at drawdowns, costs, and liquidation events alongside return statistics.

One volatility-targeted momentum candidate had an overall Sharpe ratio of about 1.21. That sounded worth investigating. Its maximum drawdown was approximately 65%, however, and its validation and test Sharpe ratios were about -1.49 and -1.78.

Maximum drawdown measures the decline from an account's previous peak. An account that loses roughly two-thirds of its value along the way needs more explanation than an attractive full-period average. Negative results in the later periods made the candidate still less convincing.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/02-03-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/02-03-en.png" alt="Latest states: none promoted" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">The 62 latest factor states, distinct from 153 historical records. No candidate was promoted.</figcaption>
</figure>

A single number across the whole history can let a good period conceal a bad one. Searching many candidates also makes it increasingly likely that something will fit the past by chance. I needed to record which results had already influenced the next decision.

Keeping rejected candidates became useful. If the model suggested a similar idea later, I wanted it to inherit the reason for the earlier rejection instead of treating the idea as a new discovery. Connections between experiments mattered more than the size of the output folder.

The project gradually gave me a more specific view of what the AI was helping with. It was useful for finding material, expressing hypotheses, and pointing out inconsistencies. Accepting a strategy still required reproducible calculations and evidence from different periods.

I would not describe Factor AI as a successful automatic source of trading strategies. It did make the requirements of an automatic research process much clearer. When I returned to traditional factors and redesigned parts of the research engine, these failed attempts were still useful inputs.

The practical change was in what I asked the system to preserve. I no longer wanted just a formula and a performance table. I wanted to know what had been tried before, what changed, and why the current result should be treated differently.


---

[Previous](https://donggyu-lee1.github.io/writing/investing-01-starting-alone/) · [Series index](https://donggyu-lee1.github.io/writing/investing-on-my-own/) · [Next](https://donggyu-lee1.github.io/writing/investing-03-ema-dips/)
