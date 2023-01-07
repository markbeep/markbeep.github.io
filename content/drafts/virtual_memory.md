---
title: "Saving Memory using Virtual Memory"
date: 2022-02-01T08:10:07+01:00
showDate: true
draft: true
mathjax: true
justify: true
tags: ["programming","c"]
---

Virtual memory has been the norm on most PCs for years now. It has so many advantages and so little disadvantages, that it doesn't make sense to not have your OS handle virtual memory. Some reasons are listed in this article [here](https://www.baeldung.com/cs/virtual-memory-why#why-do-we-need-virtual-memory).

In this blog post we're going to look at what a single level page table looks like and what the reasons are we use multi-level page tables instead. If you're not familiar with what page tables are, this read might be a bit challenging, but I'll try to explain it in an easy to understand way.

The basic gist of virtual memory explained quickly is, that every process running on an OS can simply say "I want to save variable x at address `0x2000`" and then the *MMU* (Memory Management Unit) turns that *virtual* address of `0x2000` into the *physical* address of where the variable is actually stored in the memory. Virtual addresses are turned into physical addresse through *page tables*.

This is a really simplified way of looking at it, but it helps get a overall idea of what is happening. I will also not talk about TLB in this post, as that would needlessly overcomplicate it.

# Single Level Page Table
Now let us take a look at a single level page table. Every row in a page table is called a *PTE* (Page Table Entry) and it stores a *frame pointer* to a page.

Let's look at an example. Say we have a 34-bit virtual address and we assume byte-addressability (we align on bytes). So if the address is all zeroes ($00\ldots00$) we address the very first byte and if the address is 1 ($00\ldots01$), we address the second byte. 34-bits gives us a theoretical size of $2^{34}$ bytes of storage.

Now additionally let us assume each page is of size $4kB = 2^{12}B$, which is very often the case in real life as well. That then means we need $\log_2(2^{12})=12$ bits to indicate our offset