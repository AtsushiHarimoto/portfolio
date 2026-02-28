# 28. Making Machines Slow Down and Think: Chain of Thought (CoT) and the Agentic Workflow Revolution

> **Type**: Large Language Model Applied Practice and Architecture Design Patterns
> **Focus**: Echoing the real-world battle-tested wisdom. AI is not a vending machine that spits out standard answers at the push of a button. This chapter reveals Silicon Valley's two most celebrated paradigms this year: **Chain of Thought (CoT)**, which forces the brain into System 2 (slow thinking), and **Agentic Workflows**, which let AI be its own boss, iteratively refining its work.

---

## Preface: The Foolish Mistakes of Fast Thinking (System 1)

Psychology giant Daniel Kahneman once said that human thinking falls into two categories: System 1 (intuitive reflex) and System 2 (slow deliberation).
Traditional GPT-3 or ChatGPT are textbook System 1 operators.
If you ask a complex question: "I have one apple, ate half of it, spit out two seeds -- how much fruit do I have left?"
It will, because the probability of the word strings "ate half, spit out two" is too high, blindly guess a nonsensical number in 0.1 seconds. Because Auto-regressive models "cannot backtrack" -- text flows forward irreversibly like spilled water -- it has no time to draft in its head!

---

## 1. The Miracle of Magic Words: Chain of Thought (CoT)

In 2022, researchers discovered a priceless magic prompt: **"Let's think step by step."**

Just adding this phrase, GPT suddenly became an Olympiad math genius. Why?

- **Trading output for "memory and drafting time."**
- When you ask the model to go step by step, it is forced to produce process text before the final answer, such as: _"1. An apple is one fruit. 2. Eating half means half the physical entity remains. 3. Seeds are not fruit flesh..."_
- This text gets pushed into the **KV Cache**, becoming the staircase for its subsequent reasoning! This effectively forces the neural network to pause its System 1 intuition and enter rigorous **System 2 (logical deduction)**.

In modern OpenAI o1 models, this process has even been hidden and automated (built-in deliberation time -- Time-to-think). This is the cheapest yet most powerful technique for dramatically boosting model logical reasoning capabilities.

---

## 2. The Four Pillars That Upend Tradition: Agentic Workflows

If you want to write a 50,000-word novel and tell GPT: "Write me a novel." The output will absolutely be unreadable garbage.
AI luminary Andrew Ng has vigorously promoted the **Agentic Workflows** paradigm. Don't treat AI as a text-printing machine -- treat it as a "project team capable of self-reflection."

Achieving the Agentic state requires four design patterns:

### 1. Reflection and Self-Correction

You create a loop: first have AI write chapter one. Then launch **a completely separate AI (the reviewer)** and command it: "Find 10 awkward phrasings in that article."
Then throw those 10 issues back at the original AI and demand a rewrite. After three rounds of this left-hand-fights-right-hand cycle, the final article can surpass 99% of human writers.

### 2. Tool Use

As we discussed in Article 23 with Generative UI principles. AI is bad at math -- it can't compute `3894 * 123`.
So you give it a ruler: you tell AI "If you encounter arithmetic, don't guess -- call a function called `python_calculator()`." AI learns to use external tools to compensate for its own blind spots. It can now even browse the web (Web Search) or query local databases (RAG) on its own.

### 3. Planning

Faced with a grand objective like "Plan a 7-day trip to Japan for me."
The Agent first drafts a plan, splitting itself into several tasks:
`[Step 1: Search online for attractions] -> [Step 2: Call API to check flights] -> [Step 3: Sum up expenses]`.
If it discovers mid-way that flights are too expensive, it can **backtrack to the previous step and re-plan**, just like a human.

### 4. Multi-Agent Collaboration

This is the ultimate form of Moyin's future!
Have one AI play the "lead programmer," another AI play the "security auditor," and yet another AI play the "QA tester." The engineer AI writes code, the tester AI automatically takes over and runs unit tests. If red error text appears, the tester AI throws the Error Log right in the engineer AI's face and demands a fix.
Three robots argue fiercely all night, and when you wake up the next morning, a godlike piece of software with perfect test coverage is already built. This is the script that frameworks like Microsoft's **AutoGen** are currently using to sweep the globe.

---

## Vibecoding Advanced System Delegation Tips

When commanding Claude or building highly complex large model operations scripts within Moyin:

> `"When building this backend module for Moyin document analysis, I strictly forbid you from using single-shot LLM API calls (Zero-shot)! For this level of sophisticated requirement, adopt Andrew Ng's recommended 【Agentic Workflows】. Design a Pipeline for me: the first layer model must use 【Chain of Thought (CoT)】 to force output of reasoning process; the second layer must include a 【Reflection】 reviewer Agent to ensure the article conforms to our 00_core_protocol specification. And configure the brain to autonomously initiate 【Tool Use】 to trigger local grep_search retrieval when information is insufficient!"`
