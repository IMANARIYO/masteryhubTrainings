# Requirements Document

## Introduction

A beginner-friendly, single-page HTML guide delivered as an `index.html` file. The guide teaches complete beginners the most commonly used HTML tags, organized by purpose and page location. Each tag is explained in plain language with syntax, a simple example, and optional tips. The guide is suitable for classroom or workshop use.

## Glossary

- **Guide_Page**: The `index.html` file that renders the complete HTML tags reference in a browser.
- **Category**: A logical grouping of HTML tags by their purpose (e.g., Text Content, Links and Navigation).
- **Tag_Entry**: A single HTML tag's documentation block containing its syntax, example, and plain-language description.
- **Learner**: A person with zero prior HTML experience reading the guide.
- **Instructor**: A teacher or workshop facilitator using the guide to teach beginners.

## Requirements

### Requirement 1: Tag Categorization

**User Story:** As an Instructor, I want HTML tags grouped into clear categories, so that learners can understand where and why each tag is used.

#### Acceptance Criteria

1. THE Guide_Page SHALL organize Tag_Entries into the following categories: Text Content, Links and Navigation, Images and Media, Lists, Forms and Inputs, Layout and Structure, Tables, and Semantic Tags.
2. THE Guide_Page SHALL display each Category with a visible heading and a short plain-language description of the category's purpose.
3. THE Guide_Page SHALL present categories in a consistent visual structure so that learners can scan and compare them easily.

---

### Requirement 2: Tag Entry Documentation

**User Story:** As a Learner, I want to see the syntax, a simple example, and a plain-language explanation for each tag, so that I can understand and use it immediately.

#### Acceptance Criteria

1. THE Guide_Page SHALL display the tag syntax using a code block for every Tag_Entry.
2. THE Guide_Page SHALL display at least one minimal working example using a code block for every Tag_Entry.
3. THE Guide_Page SHALL display a plain-language description of no more than three sentences for every Tag_Entry.
4. WHEN a Tag_Entry has a commonly misunderstood behavior or a best practice, THE Guide_Page SHALL display a short tip alongside that Tag_Entry.

---

### Requirement 3: Scope and Focus

**User Story:** As an Instructor, I want the guide to cover only the most commonly used tags, so that learners are not overwhelmed on their first lesson.

#### Acceptance Criteria

1. THE Guide_Page SHALL include only tags that are widely used in everyday HTML documents.
2. THE Guide_Page SHALL limit each Category to the most essential tags, avoiding rarely used or deprecated tags.
3. THE Guide_Page SHALL use vocabulary appropriate for a Learner with zero prior experience, avoiding unexplained jargon.

---

### Requirement 4: Combined Example

**User Story:** As a Learner, I want to see tags used together in a small complete example, so that I understand how they combine to form a real web page.

#### Acceptance Criteria

1. THE Guide_Page SHALL include at least one combined code example that uses tags from multiple categories together.
2. THE Guide_Page SHALL display the combined example in a clearly labeled, readable code block.
3. THE Guide_Page SHALL accompany the combined example with a brief explanation of what each part does.

---

### Requirement 5: Readability and Presentation

**User Story:** As an Instructor, I want the guide to use clean formatting, so that it is easy to read and teach from in a classroom or workshop.

#### Acceptance Criteria

1. THE Guide_Page SHALL use consistent visual styling (font sizes, spacing, colors) to distinguish headings, descriptions, code blocks, and tips.
2. THE Guide_Page SHALL render correctly in a modern browser without any external dependencies (no CDN links, no JavaScript frameworks).
3. THE Guide_Page SHALL be a single self-contained `index.html` file with all styles written inline in a `<style>` block.
4. WHEN the Guide_Page is printed or projected, THE Guide_Page SHALL remain legible with sufficient contrast between text and background.

---

### Requirement 6: Deliverable

**User Story:** As an Instructor, I want the output as an `index.html` file in the workspace root, so that I can open it directly in a browser without any build step.

#### Acceptance Criteria

1. THE Guide_Page SHALL be saved as `index.html` at the workspace root.
2. THE Guide_Page SHALL be a valid HTML5 document starting with `<!DOCTYPE html>`.
3. WHEN opened in a browser, THE Guide_Page SHALL display all categories and Tag_Entries without errors or missing content.
