---
title: "Automatic Per-Project Tools in Nix"
date: 2023-06-06T15:50:41+02:00
showDate: true
draft: true
tags: ["blog", "story"]
---

Over my past blog posts, I've made it clear that I enjoy how much I like setting up all my projects in the declarative way of Nix. In this article, I will go more in detail on how exactly I have `direnv` set up to automatically load my tools when I hop into a project.

In my [last article](/posts/nix-direnv-setup) I talked about how I don't have most my programs installed globally, but instead, I have it set up so that whenever I jump into one of my project directories it automatically loads the correct packages and tools into my terminal environment. Since I discovered `direnv` 4 months ago I've been using it for all my projects with only a slight performance change I will go into later in the article.

For this article, I will assume that you already have a general idea of Nix and what it is. If not, have a look at my previous two blog posts ([#1](/posts/nix) & [#2](/posts/nix-package-manager)) to get a general understanding.

# The Idea

The basic idea of how I have everything set up, is that globally I barely have anything installed. Mostly just tools I use a lot or I don't want to have to open a terminal environment for; this includes applications like Firefox, Neovim, Kitty, etc. Everything else related to programming or tools I only need for a one-time use I install differently.

Tools that I only need for a one-time use, say I want to quickly run `dig` to figure out what IP a domain points to or I quickly try something out in GIMP, I open up my terminal and run `nix shell nixpkgs#{dig, gimp}` (note this will install both into a single terminal environment). Then I run the command and when I'm done, I'll simply close the terminal and let the Nix garbage collector clean up. You might notice that in my last article I used `nix-shell` while here I used `nix shell`. The version with the space is the _new_ way to create environment shells which I've recently started to pick up on. Can suggest having a read [here](https://blog.ysndr.de/posts/guides/2021-12-01-nix-shells/) if you're interested.
