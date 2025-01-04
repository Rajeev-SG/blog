# Implementation Details - Modern Markdown Blog Generator

## Technical Stack

### Core Technologies
```
- Node.js
- Express.js
- EJS templating
- Marked.js (Markdown parsing)
- Highlight.js (Syntax highlighting)
- Mermaid.js (Diagrams)
```

## Project Structure

### Directory Layout
```
/my-blog
├── /public
│   ├── /css
│   │   └── style.css
│   └── /js
│       └── darkMode.js
├── /posts
│   └── *.md
├── /views
│   ├── home.ejs
│   ├── post.ejs
│   ├── posts.ejs
│   └── /partials
│       └── nav.ejs
├── app.js
└── package.json
```

### Key Components

#### Server (app.js)
```javascript
- Express.js setup
- Basic routing
- Static file serving
- Markdown processing
```

#### Theme System (darkMode.js)
```javascript
- Theme detection
- localStorage management
- System preference detection
- Mermaid.js theme handling
```

#### Styling (style.css)
```css
- CSS variables for theming
- Light/dark theme definitions
- Responsive design
- Basic transitions
```

## Core Functionality Implementation

### Markdown Processing
```javascript
// Marked.js configuration
marked.setOptions({
  highlight: function(code, lang) {
    return hljs.highlight(lang, code).value;
  }
});
```

### Theme Management
```javascript
// Theme detection and application
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateMermaidTheme(theme);
}
```

### Mermaid Integration
```javascript
// Mermaid initialization
mermaid.initialize({
  startOnLoad: true,
  theme: theme === 'dark' ? 'dark' : 'default',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto'
});
```

## Data Flow

### Content Processing Flow
1. Markdown file read
2. Markdown parsing
3. HTML generation
4. Template rendering

### Theme Switch Flow
1. User triggers theme change
2. Theme preference stored
3. CSS variables updated
4. Mermaid diagrams updated

### Page Load Flow
1. Route handling
2. Content fetching
3. Markdown processing
4. Response sending

## Security Implementation

### Basic Security
```javascript
// Safe path resolution
const path = require('path');
const safePath = path.join(__dirname, 'posts', filename);
```

## Error Handling

### Basic Error Handler
```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { error: err });
});
