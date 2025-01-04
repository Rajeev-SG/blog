// Dark mode functionality

// Function to get the current theme preference
function getThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Function to update Mermaid diagrams
function updateMermaidTheme(theme) {
    if (!window.mermaid) return;

    // Initialize Mermaid with new theme
    window.mermaid.initialize({
        startOnLoad: true,
        theme: theme === 'dark' ? 'dark' : 'default',
        themeVariables: theme === 'dark' ? {
            primaryColor: '#e0e0e0',
            primaryTextColor: '#fff',
            primaryBorderColor: '#666',
            lineColor: '#f8f9fa',
            secondaryColor: '#2d2d2d',
            tertiaryColor: '#2d2d2d'
        } : undefined,
        securityLevel: 'loose',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
    });

    // Re-render all diagrams
    document.querySelectorAll('.mermaid').forEach(diagram => {
        const content = diagram.getAttribute('data-diagram') || diagram.textContent;
        if (content) {
            diagram.setAttribute('data-diagram', content);
            diagram.removeAttribute('data-processed');
            diagram.innerHTML = content;
            window.mermaid.init(undefined, diagram);
        }
    });
}

// Function to set theme
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update toggle button if it exists
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        const themeIcon = darkModeToggle.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    // Update Mermaid diagrams
    updateMermaidTheme(theme);
}

// Initialize dark mode toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        // Handle toggle click
        darkModeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newTheme = e.matches ? 'dark' : 'light';
    setTheme(newTheme);
});

// Apply theme immediately to prevent flash
const initialTheme = getThemePreference();
setTheme(initialTheme);
