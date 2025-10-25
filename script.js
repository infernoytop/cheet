// Copy code functionality
function copyCode(button) {
    // Find the code element within the same code-container
    const codeContainer = button.parentElement;
    const codeElement = codeContainer.querySelector('code');
    
    if (!codeElement) {
        console.error('Code element not found');
        return;
    }
    // hello
    
    // Get the text content of the code
    const codeText = codeElement.textContent;
    
    // Copy to clipboard
    navigator.clipboard.writeText(codeText).then(() => {
        // Show success feedback
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.classList.add('copied');
        
        // Reset button after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy code: ', err);
        
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = codeText;
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('copied');
            }, 2000);
        } catch (fallbackErr) {
            console.error('Fallback copy failed: ', fallbackErr);
            button.textContent = 'Copy Failed';
            setTimeout(() => {
                button.textContent = 'Copy Code';
            }, 2000);
        }
        
        document.body.removeChild(textArea);
    });
}

// Add keyboard shortcuts for better accessibility
document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + K to focus on first copy button (quick copy)
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        const firstCopyBtn = document.querySelector('.copy-btn');
        if (firstCopyBtn) {
            firstCopyBtn.click();
        }
    }
});

// Add smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to anchor links if any are added later
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});