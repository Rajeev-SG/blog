# Deploying an Express.js Application to Vercel: A Practical Guide

*Updated: January 5, 2025*

Deploying an Express.js application to Vercel is fairly straightforward, but there are several considerations and pitfalls to be aware of. This guide provides a basic overview of the process, highlighting common issues and their solutions based on real deployment experience.

## Initial Setup

### 1. Basic Requirements
- An Express.js application
- Node.js and npm installed
- A Vercel account
- Your code in a Git repository

### 2. Essential Configuration Files

#### vercel.json
Your deployment needs a `vercel.json` configuration file in your project root. Here's the initial basic setup:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "app.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "app.js"
    }
  ]
}
```

## Project Setup and Configuration

### 1. Create a New Express Project
First, create a new directory and initialize your project:

```bash
mkdir my-express-app
cd my-express-app
npm init -y
```

### 2. Install Dependencies
Install Express.js and any other required dependencies:

```bash
npm install express ejs
```

### 3. Project Structure
Create the following structure:
```
my-express-app/
├── api/
│   └── index.js          # Main Express application entry point
├── views/               # Directory for view templates
│   ├── partials/       # Reusable template components
│   │   ├── header.ejs  # Common header template
│   │   └── footer.ejs  # Common footer template
│   ├── home.ejs        # Home page template
│   └── error.ejs       # Error page template
├── public/             # Static assets directory
│   ├── css/           # Stylesheets
│   │   └── style.css
│   ├── js/            # Client-side JavaScript
│   │   └── main.js
│   └── images/        # Image assets
├── package.json        # Project dependencies and scripts
└── vercel.json        # Vercel deployment configuration
```

Example template files:

`views/partials/header.ejs`:
```ejs
<!DOCTYPE html>
<html>
<head>
    <title>Express on Vercel</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <header>
        <nav>
            <a href="/">Home</a>
        </nav>
    </header>
```

`views/partials/footer.ejs`:
```ejs
    <footer>
        <p>&copy; 2025 Express on Vercel</p>
    </footer>
    <script src="/js/main.js"></script>
</body>
</html>
```

`views/home.ejs`:
```ejs
<%- include('partials/header') %>
    <main>
        <h1>Welcome to Express on Vercel</h1>
        <p>Your server is running successfully!</p>
    </main>
<%- include('partials/footer') %>
```

`views/error.ejs`:
```ejs
<%- include('partials/header') %>
    <main>
        <h1>Error</h1>
        <p><%= message %></p>
        <p><%= error.status %></p>
        <pre><%= error.stack %></pre>
    </main>
<%- include('partials/footer') %>
```

### 4. Express Server Setup
Create `api/index.js` with this Express server configuration that properly handles views and static files:

```javascript
const express = require("express");
const path = require("path");
const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes
app.get("/", (req, res) => {
    res.render('home');
});

// Error handling
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// Only used in local development - Vercel handles this differently in production
if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => console.log("Server ready on port 3000."));
}

module.exports = app;
```

### 5. Vercel Configuration
Create `vercel.json` in your project root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    },
    {
      "src": "public/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/css/(.*)",
      "dest": "/public/css/$1"
    },
    {
      "src": "/js/(.*)",
      "dest": "/public/js/$1"
    },
    {
      "src": "/images/(.*)",
      "dest": "/public/images/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/api/index.js"
    }
  ]
}
```

### 6. Local Testing
Before deploying, test your application locally:

1. Install the Vercel CLI:
```bash
npm install -g vercel
```

2. Run the development server:
```bash
vercel dev
```

Your app should now be running at `http://localhost:3000`.

### 7. Deployment Options

#### Option A: Deploy with Vercel CLI
1. Login to Vercel:
```bash
vercel login
```

2. Deploy your application:
```bash
vercel
```

#### Option B: Deploy via GitHub
1. Push your code to a GitHub repository
2. Visit [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Select your GitHub repository
5. Click "Deploy"

## Common Issues and Solutions

### 1. Missing View Templates
#### The Problem
One of the first issues you might encounter is the error:
```
Error: Failed to lookup view "home" in views directory "/var/task/views"
```

This occurs because Vercel's serverless environment doesn't automatically include your view templates in the deployment.

#### The Solution
Two steps are needed to fix this:

1. Update your Express.js application to use absolute paths:
```javascript
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
```

This ensures Express.js can locate your views directory regardless of the current working directory.

### 2. Static Files Not Loading
#### The Problem
After deploying, you might notice that your CSS and JavaScript files aren't loading. This happens because:
1. Static files need to be explicitly included in the Vercel deployment
2. The static file middleware needs proper configuration

#### The Solution
1. Update your Express.js static file middleware to use absolute paths:
```javascript
app.use(express.static(path.join(__dirname, 'public')));
```

2. Configure Vercel to handle static files correctly in `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "app.js",
      "use": "@vercel/node"
    },
    {
      "src": "public/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/css/(.*)",
      "dest": "/public/css/$1"
    },
    {
      "src": "/js/(.*)",
      "dest": "/public/js/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/app.js"
    }
  ]
}
```

This configuration:
- Uses `@vercel/static` builder for static files
- Defines specific routes for CSS and JS files
- Maintains a catch-all route for other requests

### Understanding the Solutions

#### 1. Absolute Paths
In a traditional Express.js setup, relative paths often work fine because the application runs from a consistent working directory. However, in Vercel's serverless environment, the working directory might not be what you expect. Using `path.join(__dirname, ...)` ensures your application can find its resources regardless of the working directory.

#### 2. Static File Handling
The final configuration separates concerns:
- `@vercel/node` handles your Express.js application
- `@vercel/static` efficiently serves static files
- Route configuration ensures requests are directed to the correct handler

## Best Practices

1. **Test Locally First**
   - Use the Vercel CLI to test your deployment locally
   - Run `vercel dev` to simulate the production environment

2. **Proper Path Management**
   - Always use absolute paths in your Express.js configuration
   - Use `path.join()` for cross-platform compatibility

3. **Static File Organization**
   - Keep all static files in the `public` directory
   - Maintain a clear directory structure (e.g., `public/css`, `public/js`)

## Conclusion

Deploying an Express.js application to Vercel requires careful attention to path management and static file handling. By understanding how Vercel's serverless environment differs from traditional hosting, you can avoid common pitfalls and create a robust deployment configuration.

The key is to remember that while Express.js applications might work fine locally with minimal configuration, deploying to a serverless environment requires explicit configuration for paths and static file handling. This ensures your application works consistently across all environments.

## Additional Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Node.js Path Module Documentation](https://nodejs.org/api/path.html)
