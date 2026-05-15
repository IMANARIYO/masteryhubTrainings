# Design Document: HTML Beginner's Guide

## Overview

The deliverable is a single `index.html` file at the workspace root. It is a self-contained, beginner-friendly HTML tags reference guide. No build step, no external dependencies, no JavaScript frameworks — just valid HTML5 with an embedded `<style>` block.

The guide is organized into 8 tag categories. Each category contains a set of Tag Entries. Each Tag Entry documents one HTML tag with its syntax, a working example, a plain-language description, and an optional tip. A combined example section at the end shows multiple tags working together.

The target audience is a complete beginner (zero prior HTML experience) reading in a browser, or an instructor projecting the page in a classroom.

---

## Architecture

The entire feature is a single static file. There is no runtime logic, no server, and no build pipeline.

```
workspace root/
└── index.html          ← the complete deliverable
```

Internal structure of `index.html`:

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Beginner's Guide</title>
    <style>
      /* all styles here */
    </style>
  </head>
  <body>
    <header>          <!-- page title and intro -->
    <nav>             <!-- optional jump links to categories -->
    <main>
      <section>       <!-- one per category, 8 total -->
        <article>     <!-- one per Tag Entry -->
      </section>
      <section id="combined-example">
    </main>
    <footer>
  </body>
</html>
```

---

## Components and Interfaces

Since this is a static HTML document, "components" are structural HTML patterns repeated consistently throughout the file.

### Category Section

```html
<section class="category" id="text-content">
  <h2 class="category-heading">Text Content</h2>
  <p class="category-description">Tags for displaying and formatting text on a page.</p>
  <!-- Tag Entries -->
</section>
```

One `<section class="category">` per category. The `id` attribute enables anchor navigation.

### Tag Entry Article

```html
<article class="tag-entry">
  <h3 class="tag-name">&lt;p&gt;</h3>
  <p class="tag-description">
    The paragraph tag wraps a block of text into its own paragraph.
    Browsers add space above and below each paragraph automatically.
    Use it for any body text that forms a complete thought.
  </p>
  <div class="code-block syntax">
    <span class="code-label">Syntax</span>
    <pre><code>&lt;p&gt;Your text here.&lt;/p&gt;</code></pre>
  </div>
  <div class="code-block example">
    <span class="code-label">Example</span>
    <pre><code>&lt;p&gt;Hello, world!&lt;/p&gt;</code></pre>
  </div>
  <!-- optional -->
  <aside class="tip">
    <strong>Tip:</strong> Never nest one &lt;p&gt; inside another &lt;p&gt;.
  </aside>
</article>
```

### Combined Example Section

```html
<section class="category" id="combined-example">
  <h2 class="category-heading">Putting It All Together</h2>
  <p class="category-description">
    Here is a small but complete web page that uses tags from several categories.
  </p>
  <div class="code-block example">
    <span class="code-label">Combined Example</span>
    <pre><code><!-- full mini page here --></code></pre>
  </div>
  <dl class="combined-explanation">
    <dt>&lt;h1&gt;</dt><dd>The page's main heading.</dd>
    <!-- one dt/dd per notable tag used -->
  </dl>
</section>
```

---

## Data Models

There is no runtime data model. The content is hard-coded HTML. The logical model below describes the structure that the HTML must conform to.

### Category

| Field | Type | Constraint |
|---|---|---|
| id | string (kebab-case) | unique, used as anchor |
| heading | string | visible `<h2>` |
| description | string | 1–2 sentences, plain language |
| tagEntries | TagEntry[] | 1 or more |

### TagEntry

| Field | Type | Constraint |
|---|---|---|
| tagName | string | e.g. `<p>`, `<a>` |
| description | string | ≤ 3 sentences, plain language |
| syntax | string | code block showing tag structure |
| examples | string[] | ≥ 1 minimal working example |
| tip | string \| null | optional; short best-practice note |

### The 8 Categories and Their Core Tags

| Category | Tags to include |
|---|---|
| Text Content | `<h1>`–`<h3>`, `<p>`, `<strong>`, `<em>`, `<br>` |
| Links and Navigation | `<a>` |
| Images and Media | `<img>` |
| Lists | `<ul>`, `<ol>`, `<li>` |
| Forms and Inputs | `<form>`, `<input>`, `<label>`, `<button>` |
| Layout and Structure | `<div>`, `<span>` |
| Tables | `<table>`, `<tr>`, `<th>`, `<td>` |
| Semantic Tags | `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>` |

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

The prework analysis identified that most acceptance criteria for this feature are structural checks on the HTML document. The universal properties below hold for every Tag Entry and every Category in the guide, making them suitable for property-based testing over the document's parsed structure.

**Property Reflection:** After reviewing all testable criteria, criteria 2.1 and 2.2 (syntax code block and example code block per tag entry) are closely related but test distinct things (syntax vs. example), so both are kept. Criteria 1.2 (category has heading + description) is independent of the tag-entry properties. No redundancy was found that warrants consolidation.

### Property 1: Every category has a heading and description

*For any* category section in the guide, the rendered HTML SHALL contain both a non-empty heading element (`<h2>`) and a non-empty description paragraph.

**Validates: Requirements 1.2**

### Property 2: Every Tag Entry has a syntax code block

*For any* Tag Entry in the guide, the rendered HTML SHALL contain a code block element marked as the syntax block with non-empty content.

**Validates: Requirements 2.1**

### Property 3: Every Tag Entry has at least one example code block

*For any* Tag Entry in the guide, the rendered HTML SHALL contain at least one code block element marked as an example with non-empty content.

**Validates: Requirements 2.2**

### Property 4: Every Tag Entry description is at most three sentences

*For any* Tag Entry in the guide, the plain-language description text SHALL be non-empty and SHALL contain no more than three sentences.

**Validates: Requirements 2.3**

---

## Error Handling

This is a static HTML document. There is no runtime error handling. The relevant failure modes and mitigations are:

| Failure | Mitigation |
|---|---|
| Broken HTML structure (unclosed tags) | Validate with an HTML validator before delivery |
| External resource reference accidentally included | Review `<link>`, `<script>`, `<img src>` attributes for `http` URLs |
| Missing `<!DOCTYPE html>` | Checked as part of the deliverable acceptance criteria |
| Code examples contain unescaped `<` or `>` | All `<` and `>` inside `<pre><code>` blocks must be escaped as `&lt;` and `&gt;` |

---

## Testing Strategy

This feature is a static HTML document. Property-based testing applies to the structural invariants of the document (properties 1–4 above). All other acceptance criteria are verified by example-based checks or manual review.

### Property-Based Tests

Use a DOM parsing library (e.g., `cheerio` in Node.js, or Python's `html.parser` / `BeautifulSoup`) to parse `index.html` and run the following property tests. Each test should enumerate all instances of the relevant element and assert the property holds for every one.

- **Property 1** — iterate over all `.category` sections; assert each has a non-empty `.category-heading` and `.category-description`.
- **Property 2** — iterate over all `.tag-entry` articles; assert each has a `.code-block.syntax` containing non-empty `<code>` text.
- **Property 3** — iterate over all `.tag-entry` articles; assert each has at least one `.code-block.example` containing non-empty `<code>` text.
- **Property 4** — iterate over all `.tag-entry` articles; assert each `.tag-description` text has ≤ 3 sentences (split on `.`, `!`, `?`).

Minimum 100 iterations is not applicable here since the input set is finite (fixed number of tag entries). Instead, the tests are exhaustive over all entries in the document.

Tag format for test comments: `Feature: html-beginners-guide, Property {N}: {property_text}`

### Example-Based Tests

| Test | What to assert |
|---|---|
| 8 categories present | All 8 category `id` values exist in the DOM |
| Combined example exists | `#combined-example` section contains a `<pre><code>` block and a `.combined-explanation` element |
| No external dependencies | No `<link href>`, `<script src>`, or `<img src>` pointing to an `http` or `https` URL |
| `<style>` block present | `<head>` contains a `<style>` element with non-empty content |
| Valid HTML5 doctype | File content starts with `<!DOCTYPE html>` |

### Manual / Smoke Checks

- Open in Chrome, Firefox, and Safari; verify all content renders without errors.
- Print preview: verify text remains legible with sufficient contrast.
- Review vocabulary for jargon; verify tips appear on appropriate tag entries.
- Verify all 8 categories contain only widely-used, non-deprecated tags.
