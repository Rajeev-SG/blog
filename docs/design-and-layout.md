# Design and Layout - Modern Markdown Blog Generator

## Theme System

### CSS Variables (style.css)
```css
:root {
    /* Light theme variables */
    --bg-color: #ffffff;
    --text-color: #333333;
    --link-color: #0066cc;
    --link-hover-color: #003366;
    --code-bg: #f5f5f5;
    --border-color: #dddddd;
    --nav-bg: #f8f9fa;
    --nav-text: #333333;
    --primary-color: #2c3e50;
    --card-background: #fff;
    --card-shadow: rgba(0,0,0,0.05);
    --hover-bg: #f0f0f0;
}

[data-theme="dark"] {
    /* Dark theme variables */
    --bg-color: #1a1a1a;
    --text-color: #e0e0e0;
    --link-color: #66b3ff;
    --link-hover-color: #99ccff;
    --code-bg: #2d2d2d;
    --border-color: #404040;
    --nav-bg: #2d2d2d;
    --nav-text: #e0e0e0;
    --primary-color: #61afef;
    --card-background: #2c313a;
    --card-shadow: rgba(0,0,0,0.2);
    --hover-bg: #333;
}
```

### Theme Transitions
```css
/* Apply transitions */
.main-nav,
.container,
pre,
.mermaid,
.dark-mode-toggle {
    transition: background-color 0.3s ease;
}

/* Instant text color changes */
body, a, button, input {
    color: var(--text-color);
}
```

## Layout Components

### Navigation (nav.ejs)
```ejs
<nav class="main-nav">
    <div class="nav-container">
        <div class="nav-links">
            <a href="/">Home</a>
            <a href="/posts">Posts</a>
        </div>
        <button id="darkModeToggle" class="dark-mode-toggle" aria-label="Toggle dark mode">
            <span class="theme-icon">🌙</span>
        </button>
    </div>
</nav>
```

### Post Layout (post.ejs)
```ejs
<div class="container">
    <article class="post-content">
        <h1><%= title %></h1>
        <div class="post-meta">
            <time><%= date %></time>
        </div>
        <%- content %>
    </article>
</div>
```

### Posts List (posts.ejs)
```ejs
<div class="container">
    <div class="posts-list">
        <% posts.forEach(function(post) { %>
            <article class="post-preview">
                <h2><a href="/posts/<%= post.slug %>"><%= post.title %></a></h2>
                <div class="post-meta">
                    <time><%= post.date %></time>
                </div>
            </article>
        <% }); %>
    </div>
</div>
```

## Component Styles

### Navigation Styling
```css
.main-nav {
    background-color: var(--nav-background);
    padding: 1rem 0;
    box-shadow: 0 2px 4px var(--card-shadow);
}

.nav-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-links a {
    color: var(--nav-text);
    text-decoration: none;
    margin-right: 1rem;
}

.dark-mode-toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
}
```

### Content Container
```css
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
}

.post-content {
    margin-bottom: 2rem;
}

.post-meta {
    color: var(--text-color);
    margin-bottom: 1rem;
    font-size: 0.9rem;
}
```

### Code and Diagram Styling
```css
pre {
    background-color: var(--code-background);
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
    margin: 1.5rem 0;
}

code {
    font-family: 'SF Mono', Menlo, Monaco, Consolas, monospace;
    font-size: 0.9em;
}

.mermaid {
    background-color: var(--background-color);
    padding: 1rem;
    margin: 1.5rem 0;
    border-radius: 4px;
}
```

### Typography
```css
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background-color: var(--background-color);
}

h1, h2, h3, h4, h5, h6 {
    color: var(--text-color);
    line-height: 1.2;
    margin-top: 0;
}

a {
    color: var(--link-color);
    text-decoration: none;
}

a:hover {
    color: var(--link-hover-color);
}
```

### Post Preview Cards
```css
.post-preview {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--border-color);
}

.post-preview:last-child {
    border-bottom: none;
}
```

## Responsive Design
```css
@media (max-width: 768px) {
    .container {
        padding: 1rem;
    }

    h1 {
        font-size: 2rem;
    }

    pre {
        margin: 1rem -1rem;
        border-radius: 0;
    }
}
```
