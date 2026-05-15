// Example-based tests for index.html
// Requirements: 1.1, 4.1, 4.2, 5.2, 5.3, 6.2

const fs = require('fs');
const assert = require('assert');
const cheerio = require('cheerio');

const filePath = 'index.html';
const fileContent = fs.readFileSync(filePath, 'utf8');
const $ = cheerio.load(fileContent);

function pass(description) {
  console.log(`PASS: ${description}`);
}

function fail(description) {
  throw new Error(`FAIL: ${description}`);
}

// Test 1: All 8 category id values exist in the DOM
// Requirements: 1.1
const categoryIds = [
  'text-content',
  'links-navigation',
  'images-media',
  'lists',
  'forms-inputs',
  'layout-structure',
  'tables',
  'semantic-tags',
];

for (const id of categoryIds) {
  if ($(`#${id}`).length === 0) {
    fail(`Category id "#${id}" not found in the DOM`);
  }
}
pass('All 8 category id values exist in the DOM');

// Test 2: #combined-example contains a <pre><code> block and a .combined-explanation element
// Requirements: 4.1, 4.2
const combinedSection = $('#combined-example');
if (combinedSection.length === 0) {
  fail('#combined-example section not found');
}
if (combinedSection.find('pre code').length === 0) {
  fail('#combined-example does not contain a <pre><code> block');
}
if (combinedSection.find('.combined-explanation').length === 0) {
  fail('#combined-example does not contain a .combined-explanation element');
}
pass('#combined-example contains a <pre><code> block and a .combined-explanation element');

// Test 3: No <link href>, <script src>, or <img src> points to an http or https URL
// Requirements: 6.2
const externalPattern = /^https?:\/\//i;

$('link[href]').each((_, el) => {
  const href = $(el).attr('href');
  if (externalPattern.test(href)) {
    fail(`<link href="${href}"> points to an external http/https URL`);
  }
});

$('script[src]').each((_, el) => {
  const src = $(el).attr('src');
  if (externalPattern.test(src)) {
    fail(`<script src="${src}"> points to an external http/https URL`);
  }
});

$('img[src]').each((_, el) => {
  const src = $(el).attr('src');
  if (externalPattern.test(src)) {
    fail(`<img src="${src}"> points to an external http/https URL`);
  }
});

pass('No <link href>, <script src>, or <img src> points to an http or https URL');

// Test 4: <head> contains a non-empty <style> element
// Requirements: 5.2, 5.3
const styleEl = $('head style');
if (styleEl.length === 0) {
  fail('<head> does not contain a <style> element');
}
if (styleEl.text().trim().length === 0) {
  fail('<head> contains a <style> element but it is empty');
}
pass('<head> contains a non-empty <style> element');

// Test 5: File content starts with <!DOCTYPE html>
// Requirements: 5.2
if (!fileContent.trimStart().startsWith('<!DOCTYPE html>')) {
  fail('File content does not start with <!DOCTYPE html>');
}
pass('File content starts with <!DOCTYPE html>');

// Feature: html-beginners-guide, Property 1: Every category has a heading and description
// Validates: Requirements 1.2
$('.category').each((i, el) => {
  const section = $(el);

  const heading = section.find('.category-heading');
  if (heading.length === 0) {
    throw new Error(`FAIL: Property 1 — .category section ${i + 1} is missing a .category-heading`);
  }
  if (heading.text().trim().length === 0) {
    throw new Error(`FAIL: Property 1 — .category section ${i + 1} has an empty .category-heading`);
  }

  const description = section.find('.category-description');
  if (description.length === 0) {
    throw new Error(`FAIL: Property 1 — .category section ${i + 1} is missing a .category-description`);
  }
  if (description.text().trim().length === 0) {
    throw new Error(`FAIL: Property 1 — .category section ${i + 1} has an empty .category-description`);
  }
});
console.log('PASS: Property 1 — every category has a heading and description');

// Feature: html-beginners-guide, Property 2: Every Tag Entry has a syntax code block
// Validates: Requirements 2.1
$('.tag-entry').each((i, el) => {
  const article = $(el);

  const syntaxBlock = article.find('.code-block.syntax');
  if (syntaxBlock.length === 0) {
    throw new Error(`FAIL: Property 2 — .tag-entry article ${i + 1} is missing a .code-block.syntax`);
  }

  const codeEl = syntaxBlock.find('code');
  if (codeEl.length === 0) {
    throw new Error(`FAIL: Property 2 — .tag-entry article ${i + 1} .code-block.syntax is missing a <code> element`);
  }
  if (codeEl.text().trim().length === 0) {
    throw new Error(`FAIL: Property 2 — .tag-entry article ${i + 1} .code-block.syntax <code> element is empty`);
  }
});
console.log('PASS: Property 2 — every Tag Entry has a syntax code block');

console.log('\nAll tests passed.');
