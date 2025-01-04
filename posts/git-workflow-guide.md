# Git Workflow Guide: From Project Setup to Feature Development

(needs updating with 2. Authenticate with github-cli)

This guide will walk you through the complete workflow of using Git for feature development, from initializing a new repository to successfully merging features into your main project.

## Table of Contents
1. [Initializing Git and GitHub Setup](#initializing-git-and-github-setup)
2. [Starting Work on a New Feature](#starting-work-on-a-new-feature)
3. [Handling Failed Features](#handling-failed-features)
4. [Merging Successful Features](#merging-successful-features)
5. [Post-Merge Steps](#post-merge-steps)
6. [CLI Reference](#cli-reference)

## Initializing Git and GitHub Setup

### Local Git Setup
```bash
# Initialize Git in your project directory
cd your-project-directory
git init

# Add all your files to Git
git add .

# Create initial commit
git commit -m "Initial commit"
```

### GitHub Repository Setup
1. Go to GitHub.com and create a new repository
2. Authenticate with github-cli
3. Link your local repository to GitHub:

```bash
# Add the remote repository
git remote add origin https://github.com/username/repository-name.git

# Push your code to GitHub
git push -u origin main
```

## Starting Work on a New Feature

Always start new features from your main branch:

```bash
# Ensure you're on main branch and it's up to date
git checkout main
git pull origin main

# Create and switch to a new feature branch
git checkout -b feature/your-feature-name
```

Best practices for feature development:
- Use descriptive branch names (e.g., `feature/user-authentication`)
- Make regular commits with clear messages
- Push your branch to GitHub regularly:

```bash
git push origin feature/your-feature-name
```

## Handling Failed Features

If your feature development isn't going well and you want to start over:

```bash
# Discard all changes and return to main branch
git checkout main
git branch -D feature/your-feature-name

# If you've pushed to GitHub, optionally remove remote branch
git push origin --delete feature/your-feature-name
```

## Merging Successful Features

When your feature is complete and tested:

1. Update your feature branch with latest main:

```bash
git checkout main
git pull origin main
git checkout feature/your-feature-name
git merge main
```

2. Resolve any conflicts if they occur

3. Create a Pull Request (PR):
   - Push your changes: `git push origin feature/your-feature-name`
   - Go to GitHub and create a PR
   - Add description of changes
   - Request code review if working in a team

4. Merge the PR:

```bash
git checkout main
git pull origin main
```

## Post-Merge Steps

After successfully merging your feature:

A. Clean up local branches:
```bash
# Delete local feature branch
git branch -d feature/your-feature-name

# Delete remote feature branch (if needed)
git push origin --delete feature/your-feature-name
```

B. Update your local main branch:

```bash
git checkout main
git pull origin main
```

## Best Practices

- Always create feature branches from an up-to-date main branch
- Make regular, small commits with clear messages
- Test your changes thoroughly before merging
- Keep feature branches short-lived
- Delete branches after merging to keep repository clean

## Commit Message Format

Follow conventional commits for clear history:

```text
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Formatting changes
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance tasks

Example:
```text
feat(auth): implement user authentication

- Add login form component
- Implement JWT token handling
- Add protected route middleware
```

This structured approach helps maintain a clean and organized development workflow while ensuring your project's history remains clear and manageable.

## CLI Reference

This section explains all the command-line interface (CLI) commands used in this guide.

### Basic Terminal Commands

- `cd <directory>`: Change Directory
  - Usage: Navigate between folders
  - Example: `cd your-project-directory` moves into the specified directory
  - Example: `cd ..` moves up one directory level

### Git Commands

#### Repository Setup and Management
- `git init`
  - Purpose: Initialize a new Git repository
  - Creates a hidden `.git` folder to track changes

- `git remote add origin <url>`
  - Purpose: Link local repository to a remote repository (usually GitHub)
  - `origin` is the conventional name for the primary remote repository
  - Example: `git remote add origin https://github.com/username/repo.git`

#### Basic Git Operations
- `git add <file or directory>`
  - Purpose: Stage changes for commit
  - `git add .` stages all changes in current directory
  - `git add filename` stages specific file
  - `git add directory/` stages all changes in specific directory

- `git commit -m "<message>"`
  - Purpose: Create a commit with staged changes
  - `-m` flag specifies a commit message
  - Example: `git commit -m "Initial commit"`

- `git push <remote> <branch>`
  - Purpose: Upload local commits to remote repository
  - Example: `git push origin main`
  - `-u` flag (as in `git push -u origin main`) sets up tracking, linking local and remote branches

#### Branch Operations
- `git checkout <branch>`
  - Purpose: Switch to a different branch
  - Example: `git checkout main`

- `git checkout -b <new-branch>`
  - Purpose: Create and switch to a new branch
  - `-b` flag creates a new branch
  - Example: `git checkout -b feature/user-auth`

- `git branch`
  - Purpose: List, create, or delete branches
  - `git branch` alone lists all local branches
  - `git branch -d <branch>` deletes a branch (safe)
  - `git branch -D <branch>` forces branch deletion (unsafe)
  - Example: `git branch -D feature/failed-experiment`

#### Syncing and Merging
- `git pull <remote> <branch>`
  - Purpose: Fetch and merge changes from remote repository
  - Example: `git pull origin main`
  - Combines `git fetch` and `git merge` into one command

- `git merge <branch>`
  - Purpose: Merge changes from specified branch into current branch
  - Example: `git merge feature/completed-feature`

#### Status and Information
- `git status`
  - Purpose: Show working tree status
  - Displays changed files, staged changes, and branch information

- `git diff`
  - Purpose: Show changes between commits, commit and working tree, etc.
  - Shows exact lines that were changed
  - `git diff filename` shows changes in specific file

#### Remote Operations
- `git push origin --delete <branch>`
  - Purpose: Delete a remote branch
  - Example: `git push origin --delete feature/old-feature`

### Common Flags Explained
- `-b`: Create a new branch (used with `checkout`)
- `-d`: Safely delete a branch (only if merged)
- `-D`: Forcefully delete a branch (even if not merged)
- `-m`: Specify a message (used with `commit`)
- `-u`: Set up tracking between local and remote branches
- `--delete`: Remove a remote branch

### Tips for Command Usage
1. Use tab completion in terminal to avoid typing full paths/names
2. Use up arrow to recall previous commands
3. Add `--help` to any command for detailed documentation
   - Example: `git commit --help`
4. Use `git status` frequently to check your repository state
5. When in doubt about a destructive command (like branch deletion), use safer versions first:
   - Try `git branch -d` before `git branch -D`
   - Try merging branches locally before pushing to remote
