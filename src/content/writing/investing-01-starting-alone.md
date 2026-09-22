---
title: "01. I started researching investments on my own"
description: "Small capital, simple rules, and the hope of building a research process I could run alone."
pubDate: 2026-09-22
tags:
  - investing
  - research
  - investing-on-my-own
draft: false
---

*Investing on my own · Part 1/22 · Evidence through 2026-09-22. Historical research is distinct from DRY and live execution.*

While working on research, I kept coming back to a fairly ordinary question: if I could use AI to read papers and write code, could I also use it to study my own investments?

I had an interest in machine learning and finance, along with access to computing resources. I did not have a trading firm's staff or capital. I wanted to see how far I could get on my own.

The project gradually expanded from price-based crypto strategies to exchange spreads, Korean corporate disclosures, options, and prediction markets. Looking only at the better results would make the path seem much more deliberate than it was. There were plenty of detours.

This series is my record of those attempts. I will include backtests, but I also want to explain why I tried each idea and what changed after I saw the results.

## 🧭 Starting with crypto

Data access was a practical reason. Exchanges provided price and volume histories through APIs, and I could obtain funding observations for perpetual futures. A market that operates around the clock also seemed like a reasonable place to try automation.

The fragmentation interested me too. The same asset could trade on several exchanges, with different prices, customers, collateral requirements, and available products. I wondered whether those differences left opportunities that a small account could use.

Small size is not entirely a disadvantage. A trade that is too small for a large firm might still matter to an individual. But small accounts do not escape fees, and a large percentage spread on a thin market does not necessarily allow an actual trade. That distinction became more important as the project developed.

I was less interested in competing on extreme speed. My setup was unlikely to beat professional firms located close to exchange infrastructure. I wanted opportunities that might survive the time needed to observe a signal, check it, and send an order.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/01-01-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/01-01-en.png" alt="Two simple starting ideas" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">The two starting ideas from my retrospective, not reconstructed Freqtrade performance.</figcaption>
</figure>

## 📈 Writing the first rules

Two ideas stood out from my early personal experiments: EMA reversion and momentum. An exponential moving average puts more weight on recent prices. Reversion buys after an unusually large decline relative to that average. Momentum looks for strength that may continue.

They sound contradictory, but the horizon and universe matter. Buying a coin after a sudden collapse is a different hypothesis from selecting large assets that have performed well over several weeks. I wanted to test both rather than settle the argument in advance.

I remember using personal backtesting tools, including Freqtrade, during that period. However, I cannot reconstruct all of those early runs from the files I still have. I will therefore treat that part as recollection and use the later preserved research records for numerical results.

My aim was not to find one rule that worked everywhere. I hoped to collect several modest sources of return that behaved differently. A strategy that helped when another struggled could be useful even without an impressive standalone chart.

That led to a practical frustration: testing each idea involved much of the same work. I kept preparing data, writing similar calculations, and checking similar outputs. Asking an LLM to help with that repetition seemed like a natural next step.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/01-02-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/01-02-en.png" alt="How the questions expanded" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">A simplified 2026 chronology. Projects overlapped rather than finishing one by one.</figcaption>
</figure>

## 🤖 What I hoped to automate

I wanted a process that could read material, propose a hypothesis, implement it, calculate the results, identify mistakes, and try again. I did not want to spend the whole day passing instructions between separate scripts.

One boundary was important from the start. AI could suggest buying assets after a surge in volume, but code had to calculate the actual positions, fees, and returns. A convincing explanation was not evidence that the arithmetic was correct.

Running a local model for long periods made the idea appealing. I imagined giving the system a research direction and reviewing its progress later, spending more time on questions and less time copying commands.

More experiments brought another problem. If I kept changing conditions while looking at the same history, some rules would look good by chance. A growing folder of positive backtests could mean progress, but it could also mean that I had become better at fitting the past.

I started paying more attention to separate time periods, trading costs, historical listings, and the information available at the moment of a decision. These checks slowed things down. They also made the results much easier to interpret.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/01-03-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/01-03-en.png" alt="Three different kinds of evidence" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">These are distinct evidence categories. Simulated capital is not my actual account balance.</figcaption>
</figure>

By September 2026, some ideas had reached dry-run observation, while others had stopped at data collection or backtesting. Work on actual execution brought its own questions about orders, balances, and recovery.

I will start with the automated factor project, then move through EMA, the Korean crypto premium, corporate events, and relative-value research. The research, backtesting, and operating engines will each get their own technical article.

The question is still much the same: what can I repeatedly trade with the data, capital, and time available to me? I now have more conditions attached to that question. Working through them is a large part of the story.


---

[Series index](https://donggyu-lee1.github.io/writing/investing-on-my-own/) · [Next](https://donggyu-lee1.github.io/writing/investing-02-llm-factors/)
