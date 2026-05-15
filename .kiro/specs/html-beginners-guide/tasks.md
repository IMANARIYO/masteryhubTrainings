# Implementation Plan: HTML Beginner's Guide

## Overview

Build a single self-contained `index.html` at the workspace root. All work is authoring HTML and CSS directly in that file, plus a JavaScript test file that parses the finished document with cheerio to verify the four structural correctness properties and the example-based checks from the design.

## Tasks

- [x] 1. Scaffold the HTML5 document shell
  - Create `index.html` with `<!DOCTYPE html>`, `<html lang="en">`, `<head>` (charset, viewport, title), an empty `<style>` block, and a `<body>` containing `<header>`, `<nav>`, `<main>`, and `<footer>` placeholders.
  - _Requirements: 5.2, 5.3, 6.1, 6.2_

- [x] 2. Add base styles to the `<style>` block
  - Write CSS for body font, heading sizes, spacing, code-block appearance (background, monospace font, padding), tip aside styling, and print contrast rules.
  - _Requirements: 5.1, 5.4_

- [x] 3. Implement the 8 category sections
  - [x] 3.1 Text Content category (`id="text-content"`)
    - Add `<section class="category">` with `<h2 class="category-heading">` and `<p class="category-description">`.
    - Add Tag Entries for `<h1>`–`<h3>`, `<p>`, `<strong>`, `<em>`, `<br>` — each as `<article class="tag-entry">` with `.tag-name`, `.tag-description` (≤ 3 sentences), `.code-block.syntax`, `.code-block.example`, and optional `.tip`.
    - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3_

  - [x] 3.2 Links and Navigation category (`id="links-navigation"`)
    - Add category section and Tag Entry for `<a>`.
    - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.3, 2.4_

  - [x] 3.3 Images and Media category (`id="images-media"`)
    - Add category section and Tag Entry for `<img>`.
    - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.3, 2.4_

  - [x] 3.4 Lists category (`id="lists"`)
    - Add category section and Tag Entries for `<ul>`, `<ol>`, `<li>`.
    - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.3, 2.4_

  - [x] 3.5 Forms and Inputs category (`id="forms-inputs"`)
    - Add category section and Tag Entries for `<form>`, `<input>`, `<label>`, `<button>`.
    - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.3, 2.4_

  - [x] 3.6 Layout and Structure category (`id="layout-structure"`)
    - Add category section and Tag Entries for `<div>`, `<span>`.
    - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.3, 2.4_

  - [x] 3.7 Tables category (`id="tables"`)
    - Add category section and Tag Entries for `<table>`, `<tr>`, `<th>`, `<td>`.
    - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.3, 2.4_

  - [x] 3.8 Semantic Tags category (`id="semantic-tags"`)
    - Add category section and Tag Entries for `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`.
    - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.3, 2.4_

- [x] 4. Add the Combined Example section
  - Add `<section class="category" id="combined-example">` with heading, description, a `<div class="code-block example">` containing a `<pre><code>` mini-page that uses tags from multiple categories, and a `<dl class="combined-explanation">` with `<dt>`/`<dd>` pairs explaining each notable tag used.
  - _Requirements: 4.1, 4.2, 4.3_

- [x] 5. Add nav jump links
  - Populate the `<nav>` with anchor links (`<a href="#text-content">` etc.) pointing to each of the 8 category `id` values and the combined-example section.
  - _Requirements: 1.3_

- [x] 6. Checkpoint — ensure HTML structure is complete
  - Ensure all 8 category sections, the combined example section, and the nav are present in `index.html`. Ask the user if questions arise.

- [~] 7. Write structural tests with Node.js + cheerio
  - Create `test.js` at the workspace root. Add `cheerio` as a dependency in `package.json` (or note `npm install cheerio` for the user).
  - [x] 7.1 Write example-based tests
    - Assert 8 category `id` values exist in the DOM.
    - Assert `#combined-example` contains a `<pre><code>` block and a `.combined-explanation` element.
    - Assert no `<link href>`, `<script src>`, or `<img src>` points to an `http`/`https` URL.
    - Assert `<head>` contains a non-empty `<style>` element.
    - Assert file content starts with `<!DOCTYPE html>`.
    - _Requirements: 1.1, 4.1, 4.2, 5.2, 5.3, 6.2_

  - [x] 7.2 Write property test for Property 1 — every category has a heading and description
    - **Property 1: Every category has a heading and description**
    - Iterate all `.category` sections; assert each has a non-empty `.category-heading` and `.category-description`.
    - **Validates: Requirements 1.2**

  - [-] 7.3 Write property test for Property 2 — every Tag Entry has a syntax code block
    - **Property 2: Every Tag Entry has a syntax code block**
    - Iterate all `.tag-entry` articles; assert each has a `.code-block.syntax` containing non-empty `<code>` text.
    - **Validates: Requirements 2.1**

  - [~] 7.4 Write property test for Property 3 — every Tag Entry has at least one example code block
    - **Property 3: Every Tag Entry has at least one example code block**
    - Iterate all `.tag-entry` articles; assert each has at least one `.code-block.example` containing non-empty `<code>` text.
    - **Validates: Requirements 2.2**

  - [~] 7.5 Write property test for Property 4 — every Tag Entry description is at most three sentences
    - **Property 4: Every Tag Entry description is at most three sentences**
    - Iterate all `.tag-entry` articles; assert each `.tag-description` text is non-empty and contains ≤ 3 sentences (split on `.`, `!`, `?`).
    - **Validates: Requirements 2.3**

- [~] 8. Final checkpoint — run tests and verify
  - Run `node test.js` and confirm all assertions pass. Ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP.
- All `<` and `>` inside `<pre><code>` blocks must be escaped as `&lt;` and `&gt;`.
- Test comments should follow the format: `Feature: html-beginners-guide, Property {N}: {property_text}`.
