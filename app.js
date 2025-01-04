const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const marked = require('marked');
const highlight = require('highlight.js');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Custom renderer to handle Mermaid diagrams
const renderer = new marked.Renderer();
renderer.code = (code, language) => {
    if (language === 'mermaid') {
        return `<div class="mermaid">${code}</div>`;
    }
    // Use the new highlight.js API
    const validLanguage = highlight.getLanguage(language) ? language : 'plaintext';
    const highlightedCode = highlight.highlight(code, {
        language: validLanguage,
        ignoreIllegals: true
    }).value;
    return `<pre><code class="hljs language-${validLanguage}">${highlightedCode}</code></pre>`;
};

// Configure marked with custom renderer
marked.setOptions({
    renderer: renderer,
    breaks: true,
    gfm: true
});

// Middleware for logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Function to get post metadata and content from markdown file
async function getPostMetadata(filename) {
    try {
        const content = await fs.readFile(path.join(__dirname, 'posts', filename), 'utf8');
        const titleMatch = content.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1] : path.basename(filename, '.md');
        const slug = path.basename(filename, '.md');
        const stats = await fs.stat(path.join(__dirname, 'posts', filename));
        
        // Remove the title from content to avoid duplication
        const contentWithoutTitle = content.replace(/^#\s+(.+)$/m, '');
        
        return {
            title,
            slug,
            content: marked(contentWithoutTitle), // Convert the content without title
            rawContent: content,
            date: stats.mtime.toLocaleDateString(),
            timestamp: stats.mtime.getTime()
        };
    } catch (err) {
        console.error(`Error reading post metadata: ${err}`);
        return null;
    }
}

// Get all posts metadata
async function getAllPosts() {
    try {
        const files = await fs.readdir(path.join(__dirname, 'posts'));
        const markdownFiles = files.filter(file => file.endsWith('.md'));
        
        const posts = await Promise.all(
            markdownFiles.map(file => getPostMetadata(file))
        );
        
        // Sort posts by date, newest first
        return posts
            .filter(Boolean)
            .sort((a, b) => b.timestamp - a.timestamp);
    } catch (err) {
        console.error(`Error getting posts: ${err}`);
        return [];
    }
}

// Middleware to attach common view data
app.use(async (req, res, next) => {
    try {
        const posts = await getAllPosts();
        res.locals.latestPost = posts[0] || null;
        next();
    } catch (err) {
        next(err);
    }
});

// Serve the homepage with latest post
app.get('/', async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.render('home', { posts });
    } catch (err) {
        console.error(`Error reading posts directory: ${err}`);
        res.status(500).send('Error loading blog posts');
    }
});

// Serve the posts page with all posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.render('posts', { posts });
    } catch (err) {
        console.error(`Error reading posts directory: ${err}`);
        res.status(500).send('Error loading blog posts');
    }
});

// Route to serve individual Markdown files as HTML
app.get('/posts/:slug', async (req, res) => {
    const slug = req.params.slug;
    const filePath = path.join(__dirname, 'posts', `${slug}.md`);

    try {
        const post = await getPostMetadata(`${slug}.md`);
        if (!post) {
            throw new Error('Post not found');
        }
        res.render('post', { post });
    } catch (err) {
        console.error(`Error reading file: ${err}`);
        res.status(404).send('Post not found');
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
