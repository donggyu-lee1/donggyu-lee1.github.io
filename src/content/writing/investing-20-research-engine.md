---
title: "20. Building a research engine: what should AI handle?"
description: "Roles, deterministic calculations, memory, retries, and the moments that needed intervention."
pubDate: 2026-09-22
tags:
  - investing
  - research
  - investing-on-my-own
draft: false
---

*Investing on my own · Part 20/22 · Evidence through 2026-09-22. Historical research is distinct from DRY and live execution.*

My initial goal was straightforward: give an AI a broad research direction, then let it propose ideas, run experiments, summarize results, and move to the next question. I wanted to focus on important judgments and quality control.

It was an attempt to work alone with something resembling a small research team. In an April conversation, I asked why I had to enter four separate commands. I wanted one research question to carry the process into its next steps, not just assistance copying commands.

## 🤖 Did separate roles create a research team?

In Factor AI, I separated hypothesis generation, implementation, and review. Local Qwen models were intended for repeated exploration, with more complex design and repair handled separately.

A hypothesis needed an economic reason, a specification of the data, and a description of what would count against it. Simply requesting a high-return formula encouraged variations on familiar expressions.

Multiple roles did not automatically provide independent review. If every role trusted the same summary and inherited the same assumptions, the system could produce several agreeing paragraphs without examining the underlying evidence.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/20-01-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/20-01-en.png" alt="Separate roles, connected evidence" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">The intended Factor AI roles. Several agents reading one summary do not create independent evidence.</figcaption>
</figure>

I wanted the AI to take responsibility for the research process, but I also resisted a purely mechanical rejection rule. Insufficient data and a disproved idea were different outcomes. The system needed to explain that distinction rather than reduce everything to one threshold.

## 🧮 Numbers had to come from calculations

The clearest boundary concerned numerical work. An LLM could propose an idea and write code, but returns and drawdowns had to be calculated from prices, orders, costs, and ledgers. They could not be completed by plausible-sounding prose.

A favorable overall Sharpe ratio meant something very different if the account had already been liquidated. Cases where the equity path reached zero but the evaluation still looked acceptable made me question the validity of the automated pass label itself.

The later Factor AI registry review contained 62 latest states: 59 rejected, two archived, and one requiring another test. None was promoted. That differed substantially from the earlier impression that several validated candidates remained available.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/20-02-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/20-02-en.png" alt="The canonical registry changed the picture" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">The actual latest-state inventory: 62 entries. Reports, past runs and pending retests are not promotions.</figcaption>
</figure>

Results had also become scattered across different factor stores. The same idea could appear under multiple names, while some results lacked a reproducible source recipe.

I worked toward a canonical registry linking the hypothesis, code, configuration, data version, and outcome. Memory became less about retaining an enormous conversation and more about preserving the state needed for the next valid action.

What had been attempted? Why did it stop? Which result was authoritative? Which evaluation period remained unseen? Those questions were more operationally useful than a long narrative saying that the project was progressing.

## 🗂️ Retrying was not the same as researching again

Resuming after a network failure and changing the experiment's economics were different operations. Treating both as a retry could silently reuse results that no longer matched the code.

If price paths or fee calculations changed while an old cache remained accepted, I could end up with current code describing numbers produced under earlier assumptions. File existence was not sufficient evidence of compatibility.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/20-03-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/20-03-en.png" alt="Resume or start a different experiment?" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Design summary: cache existence alone does not justify reuse; execution, research and deployment are distinct states.</figcaption>
</figure>

Completion required similar distinctions. A script finishing meant that execution ended. It did not establish sufficient data, successful selection, robustness in another period, or deployment into an operating account.

My own interventions often concerned these boundaries. A requested full universe might turn out to be a subset. Data described as actual might be a price proxy. A missing result might have been represented as zero.

In prediction-market work, comment analysis was once confused with my earlier interest in semantic relationships between events. Repository names and remembered keywords were not enough to identify the intended historical task.

That experience made it useful to state both the current question and the questions excluded from scope. The farther automation proceeded, the more files a small initial misunderstanding could generate.

I did not abandon automation. It was genuinely useful for repeated data preparation, calculations, and checks. But “the AI handled it” could not replace an account of the inputs, decisions, and limits of the result.

The research engine I wanted became a system that could keep generating questions while also preventing incorrect results from quietly passing through. It was less about removing the human entirely and more about making the need for intervention visible at the right moment.

That was different from the original expectation, but more concrete. I had a clearer sense of what could be delegated and what still required direct inspection. The next layer was the backtest engine responsible for producing the numbers those research roles discussed.


<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/20-04-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/20-04-en.png" alt="Canonical factor registry" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Browser capture of a public-safe view of selected source fields. Not an account screen or a live dashboard; full provenance is retained privately.</figcaption>
</figure>


---

[Previous](https://donggyu-lee1.github.io/writing/investing-19-prediction-markets-and-options/) · [Series index](https://donggyu-lee1.github.io/writing/investing-on-my-own/) · [Next](https://donggyu-lee1.github.io/writing/investing-21-backtest-engine/)
