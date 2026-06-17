#metadata((
  title: "Hello from Typst",
  summary: "A tour of Typst features that survive HTML export: scripting, show rules, tables, footnotes, and more.",
  publishDate: "2026-06-16",
)) <post-meta>

// ---------------------------------------------------------------------------
// Show rules — applied document-wide before any content renders.
// ---------------------------------------------------------------------------

// Every bare mention of "Typst" becomes bold automatically.
#show "Typst": strong

= Hello from Typst

This post is itself a Typst document, compiled to HTML at build time with
`typst compile --features html`. Everything you read was produced by the Typst
compiler --- no Markdown, no remark plugins, no MDX.

The show rule at the top of this file is already active: every bare mention of
Typst in this document is *bolded automatically*, without a single `*...*` at
any call site. The source looks like this:

```typst
#show "Typst": strong

Every mention of Typst in this document is now bold.
```

== Functions

Typst is a _programmable_ typesetting language. You define functions with
`#let` and call them inline. Named parameters with defaults keep call sites
readable; the function body is a content block that returns markup, not a
string.

```typst
#let greet(name, formal: false) = {
  if formal [Good day, #name.] else [Hey, #name!]
}

#greet("Alice") \
#greet("Bob", formal: true)
```

#let greet(name, formal: false) = {
  if formal [Good day, #name.] else [Hey, #name!]
}

#greet("Alice") \
#greet("Bob", formal: true)

== Recursion

Functions can be recursive. The computation happens entirely at compile time ---
the HTML receives only the final values.

```typst
#let factorial(n) = if n <= 1 { 1 } else { n * factorial(n - 1) }

#table(
  columns: (auto, auto),
  align: (center, right),
  table.header[$n$][$n!$],
  ..range(0, 8).map(n => (str(n), str(factorial(n)))).flatten(),
)
```

#let factorial(n) = if n <= 1 { 1 } else { n * factorial(n - 1) }

#table(
  columns: (auto, auto),
  align: (center, right),
  table.header[$n$][$n!$],
  ..range(0, 8).map(n => (str(n), str(factorial(n)))).flatten(),
)

== Higher-Order Functions

Typst arrays have `map`, `filter`, `fold`, and `zip`. Here is a pipeline that
squares numbers, keeps multiples of 4, then folds to a sum:

```typst
#let sq = n => { let r = n * n; r }
#let results = range(1, 11).map(sq).filter(n => calc.rem(n, 4) == 0)

Perfect squares divisible by 4 up to 100: #results.map(str).join(", ")

And a fold to sum them: #results.fold(0, (acc, x) => acc + x)
```

#let sq = n => { let r = n * n; r }
#let results = range(1, 11).map(sq).filter(n => calc.rem(n, 4) == 0)

Perfect squares divisible by 4 up to 100: #results.map(str).join(", ")

And a fold to sum them: #results.fold(0, (acc, x) => acc + x)

== Dictionaries

Dictionaries are first-class values. Here, `.pairs()` iterates key-value
entries, `.map()` transforms each pair, and `..` spreads the result directly
into `#table` as individual cell arguments:

```typst
#let langs = (
  typst:   (year: 2023, paradigm: "functional scripting"),
  rust:    (year: 2015, paradigm: "systems / ownership"),
  haskell: (year: 1990, paradigm: "pure functional"),
)

#table(
  columns: (auto, auto, 1fr),
  align: (left, center, left),
  table.header[*Language*][*Year*][*Paradigm*],
  ..langs
    .pairs()
    .map(pair => {
      let (name, info) = pair
      (upper(name.first()) + name.slice(1), str(info.year), info.paradigm)
    })
    .flatten(),
)
```

#let langs = (
  typst:   (year: 2023, paradigm: "functional scripting"),
  rust:    (year: 2015, paradigm: "systems / ownership"),
  haskell: (year: 1990, paradigm: "pure functional"),
)

#table(
  columns: (auto, auto, 1fr),
  align: (left, center, left),
  table.header[*Language*][*Year*][*Paradigm*],
  ..langs
    .pairs()
    .map(pair => {
      let (name, info) = pair
      (upper(name.first()) + name.slice(1), str(info.year), info.paradigm)
    })
    .flatten(),
)

== Show Rules

Show rules transform matching content globally. The rule at the top of this
file bolds `"Typst"` everywhere without a single call site change. Rules can
also wrap, unwrap, or entirely replace matched elements.

Scoping rules inside `#{ ... }` limits them to that block only:

```typst
#{
  show "STOP": [*[STOP]*]
  show strong: it => [«#it»]

  [
    The word STOP triggers the first rule.
    And *this bold phrase* is wrapped in guillemets by the second.
    Both rules vanish outside this block.
  ]
}
```

#{
  show "STOP": [*[STOP]*]
  show strong: it => [«#it»]

  [
    The word STOP triggers the first rule.
    And *this bold phrase* is wrapped in guillemets by the second.
    Both rules vanish outside this block.
  ]
}

== Term Lists

Term lists use the `/ term: definition` syntax and render as semantic
`<dl>` / `<dt>` / `<dd>` in HTML:

```typst
/ *Show rule*: A document-wide transformation applied to all matching
  content. Declared once, acts everywhere.
/ *Content block*: A fragment of markup delimited by `[` and `]`,
  returned from functions and expressions.
/ *`#let` binding*: Assigns a value or function to a name.
/ *Spread operator*: `..array` spreads array elements as individual
  arguments in a function call or table.
```

/ *Show rule*: A document-wide transformation applied to all matching
  content. Declared once, acts everywhere.
/ *Content block*: A fragment of markup delimited by `[` and `]`,
  returned from functions and expressions.
/ *`#let` binding*: Assigns a value or function to a name.
/ *Spread operator*: `..array` spreads array elements as individual
  arguments in a function call or table.

== Tables

Typst tables are first-class. The spread operator (`..`) lets you build
rows from a computed array and pass them directly as table children:

```typst
#let primes = (2, 3, 5, 7, 11, 13, 17, 19, 23, 29)

#table(
  columns: (auto,) * 5,
  align: center,
  table.header[p₁][p₂][p₃][p₄][p₅],
  ..primes.map(str),
)
```

#let primes = (2, 3, 5, 7, 11, 13, 17, 19, 23, 29)

#table(
  columns: (auto,) * 5,
  align: center,
  table.header[p₁][p₂][p₃][p₄][p₅],
  ..primes.map(str),
)

== Footnotes

Footnotes are defined _inline_ at the point of reference using
`#footnote[...]`. Typst numbers them automatically and emits proper
`<a>` back-links in the HTML:

```typst
Footnotes are defined inline.#footnote[
  This body appears as a numbered endnote with bidirectional anchor links.
] A second reference#footnote[
  Typst numbers them automatically. Reorder paragraphs; numbers stay correct.
] demonstrates automatic numbering.
```

Footnotes are defined inline.#footnote[
  This body appears as a numbered endnote with bidirectional anchor links.
] A second reference#footnote[
  Typst numbers them automatically. Reorder paragraphs; numbers stay correct.
] demonstrates automatic numbering.

== Nested Lists

Indentation creates nesting in both ordered and unordered lists:

```typst
- Compiled
  - Systems-level
    - Rust
    - C / C++
  - Managed runtime
    - Go
    - Swift
- Interpreted
  - Python
  - JavaScript / TypeScript
```

- Compiled
  - Systems-level
    - Rust
    - C / C++
  - Managed runtime
    - Go
    - Swift
- Interpreted
  - Python
  - JavaScript / TypeScript

== Code Blocks

Fenced code blocks use triple backticks with a language tag. Typst's own
highlighter emits inline `style` attributes (not Prism classes):

// Nested code fences can't be written as a raw literal inside another
// raw block — Typst would try to parse the inner ``` as markup.
// Use the raw() function with a string argument instead.
#raw(lang: "typst", block: true,
"```rust
fn collatz(mut n: u64) -> u64 {
    let mut steps = 0;
    while n != 1 {
        n = if n % 2 == 0 { n / 2 } else { 3 * n + 1 };
        steps += 1;
    }
    steps
}
```"
)

```rust
fn collatz(mut n: u64) -> u64 {
    let mut steps = 0;
    while n != 1 {
        n = if n % 2 == 0 { n / 2 } else { 3 * n + 1 };
        steps += 1;
    }
    steps
}
```

```python
def sieve(limit):
    composite = set()
    for n in range(2, limit):
        if n not in composite:
            yield n
            composite.update(range(n * n, limit, n))
```

== Inline Markup

```typst
H#sub[2]O and E = mc#super[2] use sub/superscript.
#highlight[Highlighted spans] use the HTML <mark> element.
Smart punctuation: "double quotes", 'single quotes', em dashes --- like this.
```

H#sub[2]O and E = mc#super[2] use sub/superscript.
#highlight[Highlighted spans] use the HTML `<mark>` element.
Smart punctuation: "double quotes", 'single quotes', em dashes --- like this.

== Math

Typst 0.15 exports equations as MathML, which browsers render natively.

```typst
Inline: $E = m c^2$, $pi approx 3.14159$, $a^2 + b^2 = c^2$.

$ sum_(i=1)^n i = (n(n+1)) / 2 $

$ integral_0^infinity e^(-x^2) dif x = sqrt(pi) / 2 $

$ x = (-b plus.minus sqrt(b^2 - 4 a c)) / (2 a) $
```

Inline: $E = m c^2$, $pi approx 3.14159$, $a^2 + b^2 = c^2$.

$ sum_(i=1)^n i = (n(n+1)) / 2 $

$ integral_0^infinity e^(-x^2) dif x = sqrt(pi) / 2 $

The quadratic formula:

$ x = (-b plus.minus sqrt(b^2 - 4 a c)) / (2 a) $

== What Does Not Work Yet

HTML export is experimental (Typst 0.15, `--features html`). The following
produce no output or silently drop styling:

- *`text(fill:)` colors* --- `#text(fill: red)[...]` renders the text but
  drops the color entirely. `#highlight(fill: ...)` similarly loses its
  custom fill and emits a plain `<mark>`. Show rules using `text(fill:)`
  are also affected.
- *Images* --- `#image(...)` is silently omitted.
- *Block layout* --- `#grid`, `#rect`, `#block` produce no HTML output.
- *`#show raw:` overrides* --- custom raw-block styling is ignored.

Follow upstream progress: #link(
  "https://github.com/typst/typst/issues/5512",
)[typst/typst #5512].
