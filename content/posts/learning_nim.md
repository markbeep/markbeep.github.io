---
title: "Learning Nim: Part 1"
date: 2021-05-04T14:38:03+02:00
showDate: true
draft: true
justify: true
tags: ["programming","nim"]
---

# What is Nim?
Nim does a good job explaining what it is in a short way on their [website](https://nim-lang.org/).
> Nim is a statically typed compiled systems programming language. It combines successful concepts from mature languages like Python, Ada and Modula.

But that only covers a tiny portion of what Nim really is. In these posts I want to share my progress of learning Nim and show off the things that surprised or amazed me the most. Maybe I can even awaken your interest for a new language you've never heard of before.

___
# Why?
Why? I dunno. I didn't really have a reason to learn a new language. I learned about Nim when [Julian](https://xyquadrat.ch/) recommended some cool new low-level languages including [Zig](https://ziglang.org/), [Crystal](https://crystal-lang.org/) and Nim. I looked into each and Nim syntax was the one that appealed the most to me. Python was my previous most used language, so I was familiar with indentation in programming. Appealing points of Nim are it's fairly easy to understand syntax and it being a fairly [fast language](https://github.com/kostya/benchmarks) on top of that.

I decided to start learning by following the [tutorial](https://nim-lang.org/docs/tut1.html) on the official nim docs. Once I had a good enough grasp of the basics, I additionally started working on a Discord bot. A Discord bot is an amazing way to learn a language as it includes working with APIs, user input and a lot of different areas at once, all while people can play with your bot and see your progress.

___
# The Surprises
Now to the meat of the post. I know Python and Java the best, so I will often explain things in regards to them.

___
### Variables
Starting out with the basics of Nim, Nim is a statically typed language. Meaning variables have a fixed type set to them upon initialization. This can be done in multiple ways.
Because it is statically typed, you want to initialize a variable with a type.
```nim
var x: int  # by default a 64-bit int
var s: string  # string with fixed length
var b: uint8  # unsigned 8-bit int
```
But Nim allows us to leave out a lot of things to cut down on code and make it more readable.
```nim
var
    x, y, z: int8
    s = "this is a string"
    f = 0.0'f32  # 32-bit float
```
Additionally it's even possible to execute code when assigning variables.
```nim
var fact = (var x = 1; for i in 1..4: x *= i; x)
```
This can also be written as
```nim
var fact = (
    var x = 1
    for i in 1..4:
        x *= i
    x
)
```

Nim has different ways to initialize variables. These include `var`,`let` and `const`. `var` is for assigning variables which can be re-assigned at a later point. `let` is similar to `var`, but is only for single assignment variables. Meaning the values can't be changed once initialized. `const` variables are initialized during compiling, meaning they need to be computable at compile time.

___
### Switch Cases
Switch cases might come as a familiar concept, as they exist in most other language ([Including Python 3.10](https://towardsdatascience.com/switch-case-statements-are-coming-to-python-d0caf7b2bfd3)). Usually each case is for a single case, which makes it often tedious if you need to cover a lot different values for each case. Nim takes this a step further and allows you to define a list or range of values that hold for a case.
```nim
var x = 9
case x:
of 1..2: echo "1 <= x <= 2"
of 3..5: echo "3 <= x <= 5"
of 6..<10: echo "6 <= x < 10"
else: echo "neither"
# --> 6 <= x < 10
```
Something to take note of, this also works for arrays of any type, as long as that array is evaluated at compile time. Meaning we have to use `const` for these arrays.

___
### For Loops
For anybody that has used Python, for loops in Nim will come as very familiar. They are structured in the same way.
```nim
for i in 1..<10:
    echo i
# --> 1 2 3 4 5 6 7 8 9 all on separate lines
```
Is used to print all numbers from 1 to 10 exclusive. We can also easily iterate over iterables like arrays in the same manner. Optionally it's possible to define two variables in the for loop. The first one will then be assigned the index and the second the value. 
```nim
var arr = [5, 55, 555, 5555]
for idx, val in arr:
    echo (idx, val)
# --> (0, 5)
# --> (1, 55)
# --> (2, 555)
# --> (3, 5555)
```
___
### Procedures
Procedures are Nim's way of calling their methods or functions. This is the part that really starts to make Nim shine. 
Let's look at an example:
```nim
proc combine(a, b: string): string =
    # the & operator concats two strings
    a & b
echo combine("Hello ", "there")
# --> General Kenobi (jk it returns the line below)
# --> Hello there
```
This is already a full procedure. To explain it in a bit more detail. This is a procedure called `foo`, which takes the two string parameters `a` and `b`. The `string =` part indicates that this procedure returns a value of type string. The parameters of a procedure require a defined type. Just like in Java this then allows for overloading of methods; having multiple methods with the same name, but different parameters. We can use this to our advantage if we wanted to create a similar `combine` function, but which combines integers instead.
```nim
proc combine(a, b: int): string =
    # the $ operator turns an int into a string
    return $a & $b
echo combine(4, 20)
# --> 420
```
Something I found extremely interesting, is that just like a lot of things in Nim, the `return` statement is optional. In the above example, it was very well possible to leave out the return statement, I only put it there for showcase purposes. If there is no return statement given **OR** the `result` variable is not assigned to anything, the last line will be taken as the return value.
We can rewrite the above example in the following ways which all result in the same result:
```nim
proc combine(a, b: int): string =
    $a & $b
proc combine(a, b: int): string =
    result = $a & $b
```
But that only scrapes the start of what can be done with procedures in Nim. Just like in Python, we can set default values for parameters. This is something that has annoyed me extremely when programming in Java, as there you need to create a new method for each default parameter and this makes it a lot less flexible. Additionally it's possible to name what variable you want to assign which is shown with `b` and `d` in the below example.
```nim
proc combine(a=1, b=2, c=3, d=4): string =
    $a & $b & $c & $d
combine(d=69, b=666)
# --> 1666369
```
Now see how I used the `$` operator to turn integers into strings. Why can't we just do `a & b & c & d` for integers? That's because it's not defined yet. But we can define it ourselves. After all, Nim has operator overloading. We can make our custom operators in the following way.
```nim
proc `&`(a, b: int): string =
    $a & $b
echo (1 & 2) & (3 & 4)
# --> 1234
```
Operators can be called in multiple different ways. If you for example wanted to inflict pain on the person reading your code, you could do the following:
```nim
echo `==`(`+`(5, 11), `*`(2, 8))
# --> true
# This is the same as simply
echo 5 + 11 == 2 * 8
# --> true
```
This then also leads into the fact that normal procedures can be called in a of different ways. Let's take the following procedure which simply puts two square brackets on each side of the given word.
```nim
import strformat  # this allows us to format strings
proc wrap(w: string): string =
    fmt"[[{w}]]"
```
We can now call this in different way, all resulting in the same result.
```nim
echo wrap("kek")
echo wrap "kek"
echo "kek".wrap
# --> [[kek]]
```
This allows for some very interesting concepts, which I will cover in a bit more detail in the **Objects** section.


___
### Arrays

___
- [x] Ways of assigning variables
- [x] Switch cases with ranges
- [x] Ease of for loops
- [x] Procedures (no return, result is return value)
    - Optional parameters
    - no return/ result variable is return
- [x] Create operators
- [ ] Array indexing at any index you want
- [ ] Objects
- [ ] Importing (it imports all public procedures)