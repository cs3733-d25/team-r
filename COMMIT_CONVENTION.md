# Git Commit Message Format Guide!!!

## Commit Message Structure:
Each commit message should follow this structure:

````
<type>: <short summary line>

<optional detailed explanation (if necessary)>
````

---

## Commit Message Types:
We use specific types to categorize the changes. Here’s the breakdown of the most common types:

### 1. `fix` - Bug Fixes
- Use for commits that address issues or bugs in the code.
- **Example**: `fix: correct user login bug`

### 2. `feature` - New Features
- Use for new functionalities added to the project.
- **Example**: `feature: add dark mode toggle`

### 3. `docs` - Documentation Updates
- Use for commits that modify or add documentation, like README, instructions, etc.
- **Example**: `docs: update README with new API examples`

### 4. `refactor` - Code Refactoring
- Use when changing code for improvements, readability, or performance without changing functionality.
- **Example**: `refactor: improve login component readability`

### 5. `chore` - Routine Tasks
- Use for non-feature work like setting up tools, CI configuration, or cleaning up.
- **Example**: `chore: update project dependencies`

### 6. `test` - Tests
- Use for commits related to adding or fixing tests.
- **Example**: `test: add unit tests for login form validation`

### 7. `style` - Code Styling
- Use for commits that affect only the code style (e.g., formatting, whitespace) and do not affect functionality.
- **Example**: `style: format the service request page`

### 8. `perf` - Performance Improvements
- Use for commits related to optimizations or performance enhancements.
- **Example**: `perf: optimize image loading in the gallery`

---

## Commit Message Format Rules:

1. **Imperative Mood:**
    - Commit messages should be written in the **imperative mood**, as if you're commanding the changes to be made. This aligns with how Git applies the changes.
    - **Correct**: `fix: add user login verification`
    - **Incorrect**: `fixed user login verification`

2. **Brief and Descriptive Summary:**
    - The subject line (first line) should be **concise** (around 50 characters or fewer).
    - The summary should be specific enough to describe what the commit does, but not too detailed. Avoid vague messages like "fix bugs."

3. **Use a Blank Line Between Subject and Body (if needed):**
    - If your commit requires a detailed explanation, use a **blank line** after the subject and then provide the details.
    - The body should be wrapped at **72 characters** for readability.

4. **Avoid Ending the Subject Line with a Period:**
    - Commit subjects do not need to end with a period.
    - **Correct**: `feature: add map view`
    - **Incorrect**: `feature: add map view.`

5. **Keep Commits Focused:**
    - Each commit should focus on one logical change. Avoid committing unrelated changes together.
    - **Correct**: `fix: resolve header alignment issue`
    - **Incorrect**: `fix: resolve header issue + add footer component`

---

## Example Commit Messages:

### **1. Bug Fix**
````
fix: add user login verification
````
The login form now correctly verifies if the entered password matches the stored hash.

### **2. New Feature**
```
feature: add map view
```
Introduced a new map view page where users can explore locations on an interactive map.
### **3. Documentation Update**
````
docs: document login instructions
````
Added detailed steps on how to use the login functionality in the README file.
### **4. Code Refactoring**
````
refactor: extract login logic into a custom hook
````
Moved login validation and API call logic to a custom `useLogin` hook for reusability.
# **5. Routine Task**
````
chore: update dependencies to latest versions

Updated the `react-router-dom` and `axios` packages to their latest versions.
````
Why This Format Helps:
Consistency: A clear format keeps your commit history uniform, making it easier for developers (and tools like GitHub) to understand the changes at a glance.

Clarity: The use of types and concise messages helps with reading through the commit history quickly.

Automation: With this structure, you can easily integrate tools like Conventional Commits or auto-generated changelogs.