---
title: "Learning Nim: Part 1"
date: 2021-05-03T14:38:03+02:00
showDate: true
draft: true
tags: ["programming","nim"]
---

# What is Nim?
Nim does a good job explaining what it is in a short way on their [website](https://nim-lang.org/).
> Nim is a statically typed compiled systems programming language. It combines successful concepts from mature languages like Python, Ada and Modula.
But that only covers a tiny portion of what Nim really is. In these posts I want to share my progress of learning Nim and show off the things that surprised or amazed me the most.

# Why?
Why? I dunno. I didn't really have a reason to learn a new language. I learned about Nim when [Julian](https://xyquadrat.ch/) recommended some cool new low-level languages including [Zig](https://ziglang.org/), [Crystal](https://crystal-lang.org/) and Nim. I looked into each and Nim syntax was the one that appealed the most to me. Python was my previous most used language, so I was familiar with indentation in programming. Appealing points of Nim are it's fairly easy to understand syntax and it being a fairly [fast language](https://github.com/kostya/benchmarks) on top of that.

I decided to start learning by following the [tutorial](https://nim-lang.org/docs/tut1.html) on the official nim docs. Once I had a good enough grasp of the basics, I additionally started working on a Discord bot. A Discord bot is an amazing way to learn a language as it includes working with APIs, user input and a lot of different areas at once, all while people can play with your bot and see your progress.

# The Surprises
Now to the meat of the post. I know Python and Java the best, so I will often explain things in regards to them.

Starting out with the basics of Nim, Nim is a statically typed language. Meaning variables have a fixed type set to them upon initialization. This can be done in multiple ways as shown below.

- Array indexing at any index you want



Different ways to use a Method
```nim
var str = "this is a string"
echo str  # this prints the string
# --> this is a string

echo len(str)
echo len str
echo str.len
# --> 16
```