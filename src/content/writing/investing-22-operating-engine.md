---
title: "22. Building an operating engine: after leaving the bots on"
description: "DRY and REAL, failed cancellation, late fees, and why a running process was not enough."
pubDate: 2026-09-22
tags:
  - investing
  - research
  - investing-on-my-own
draft: false
---

*Investing on my own · Part 22/22 · Evidence through 2026-09-22. Historical research is distinct from DRY and live execution.*

After building the backtests, I continued into running bots and checking their execution. The operating records contain many investigations of order states and ledgers alongside the price data.

A live process, fresh market data, and permission to enter a new trade were separate conditions. This final article is about what happened after leaving the bots on, rather than a summary of trading profits.

## 🟢 Between DRY and REAL

DRY records simulated execution using public market inputs without submitting real orders. REAL handles exchange orders and actual account state. Sharing a strategy name does not make the evidence from those paths interchangeable.

A DRY entry does not verify real order permissions or collateral settings. A running REAL process does not mean it can open a position: stale prices, insufficient depth, or unresolved orders can still block entry.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/22-01-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/22-01-en.png" alt="One green light was not enough" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Conceptual operating checks, not a live account screen. DRY and REAL require different evidence.</figcaption>
</figure>

The dashboard needed to preserve those distinctions. Showing missing data as zero profit would obscure whether the system was safely blocked or had genuinely observed no activity.

Normal market closure also differed from a failure. Korean equities do not produce ordinary live quotes outside the session. Repeatedly reporting that as an incident would bury meaningful warnings, while treating stale open-market prices as healthy could affect an entry decision.

## 🚨 A cancellation request was not a cancellation

A September 18 incident involving Bithumb SAND began with partial execution in a paired trade. A mismatch between the cancellation authentication hash and the transmitted parameter format was identified as a strong cause of the cancellation failure.

The original buy order remained active. A reversal sale was then submitted, but the exchange's self-trade-prevention mechanism canceled that sale. The remaining quantity of the original buy filled hours later.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/22-02-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/22-02-en.png" alt="What followed the failed cancellation" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Sequence from the September 18 incident report, with account details removed. Historical causation is not current position status.</figcaption>
</figure>

Simply restarting the process could not establish a safe recovery. The first requirement was to read what actually remained on the exchange. There were also problems classifying canceled orders and connecting failure records back to the original order identity.

In a backtest, deleting a failed trade can make the account look tidy. In operation, already-filled inventory remains. Later fills, original quantities, and fees all have to be incorporated before deciding the next action.

This article describes the incident's documented cause and sequence. That historical record alone does not establish that the same residual position exists now, or that every subsequent recovery task completed. Those are separate status questions requiring later evidence.

## 🧾 Small fees still needed reliable identities

On September 22, I asked for a plain-language explanation of what was wrong with fees paid in Gate's GT token. The exchange had reported the fees; the problem included a failure to consistently connect the stored fill with its in-memory ledger representation.

Valuing a fee paid in a third currency created another issue. If the token quantity was known but a relevant historical price was unavailable, the dollar cost needed to remain unresolved. Replacing it with zero or today's price would produce a different account.

<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/22-03-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/22-03-en.png" alt="Recognize a late fee exactly once" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">From the September 22 GT repair. Recognition of an existing cost, not a new expense; historical proxy prices are not exact exchange conversion rates.</figcaption>
</figure>

The repair used consistent fill identities and allowed confirmed fee evidence to replace provisional estimates. Copy-based verification checked that processing the same evidence again would not deduct the cost twice.

The focused suite passed 125 checks, while separate failures remained in broader existing tests. I did not describe the entire repository as passing. The repair was subsequently applied to the relevant REAL engine and reconciled; DRY was not changed in that operation.

This recognized a cost already paid, rather than spending the fee again. Even a small amount mattered because a broken connection would undermine the ledger as more trades accumulated.

The same day's observations also showed that a process and parts of its data path could be healthy while overall readiness was not. Partial success was not enough to call the complete runtime healthy.

I treated isolated margin and 1x leverage as distinct conditions too. Adding a safety policy to source code was not the same as a running engine loading it. Requesting an exchange setting was not the same as reading it back and confirming it.

The series began with a question about how far I could take investment research on my own. What remains is broader than a few favorable backtests: rejected ideas, incomplete datasets, and operational errors are part of the record.

Adding AI did not make investing automatically easy. It did let me carry out more calculations and comparisons than I could otherwise have managed alone.

I want to keep recording what was verified and what remains unknown alongside the returns. That is the most accurate way I can describe what I had done by September 22.


<figure style="margin:2em 0;">
<a href="https://donggyu-lee1.github.io/images/writing/investing-20260922/22-04-en.png" target="_blank" rel="noopener" title="Open full-size image" style="cursor:zoom-in;">
<img src="https://donggyu-lee1.github.io/images/writing/investing-20260922/22-04-en.png" alt="Fee-repair report view" width="1440" height="960" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;" />
</a>
<figcaption style="font-size:0.88em;line-height:1.7;color:#52646b;margin-top:0.8em;">Browser capture of a public-safe view of selected source fields. Not an account screen or a live dashboard; full provenance is retained privately.</figcaption>
</figure>


---

[Previous](https://donggyu-lee1.github.io/writing/investing-21-backtest-engine/) · [Series index](https://donggyu-lee1.github.io/writing/investing-on-my-own/)
