// Accessibility Enhancements
// Automatically applied to improve keyboard navigation and screen reader support

(function() {
    'use strict';

    // Add skip to main content link
    function addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: #00d9ff;
            color: #0a1628;
            padding: 0.75rem 1.5rem;
            text-decoration: none;
            font-weight: 700;
            z-index: 9999;
            transition: top 0.3s;
        `;

        skipLink.addEventListener('focus', function() {
            this.style.top = '0';
        });

        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add id to main content if not exists
        const main = document.querySelector('main');
        if (main && !main.id) {
            main.id = 'main-content';
        }
    }

    // Enhance focus visibility
    function enhanceFocusVisibility() {
        const style = document.createElement('style');
        style.textContent = `
            *:focus {
                outline: 3px solid #00d9ff;
                outline-offset: 2px;
            }

            *:focus:not(:focus-visible) {
                outline: none;
            }

            *:focus-visible {
                outline: 3px solid #00d9ff;
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);
    }

    // Add ARIA labels to interactive elements without labels
    function addAriaLabels() {
        // Add aria-label to buttons without text or with icons only
        document.querySelectorAll('button').forEach(button => {
            if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
                const iconText = button.querySelector('[class*="icon"]');
                if (iconText) {
                    button.setAttribute('aria-label', 'Button');
                }
            }
        });

        // Add aria-label to links that only contain icons
        document.querySelectorAll('a').forEach(link => {
            if (!link.getAttribute('aria-label') && !link.textContent.trim()) {
                link.setAttribute('aria-label', 'Link');
            }
        });

        // Add role="navigation" to nav elements without it
        document.querySelectorAll('nav').forEach(nav => {
            if (!nav.getAttribute('role')) {
                nav.setAttribute('role', 'navigation');
            }
        });

        // Add aria-current to current page links
        const currentPath = window.location.pathname;
        document.querySelectorAll('a').forEach(link => {
            const linkPath = new URL(link.href, window.location.origin).pathname;
            if (linkPath === currentPath) {
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    // Enhance form accessibility
    function enhanceFormAccessibility() {
        // Connect labels to inputs
        document.querySelectorAll('input, select, textarea').forEach(field => {
            if (!field.id && field.name) {
                field.id = 'field-' + field.name;
            }

            // Find associated label
            const label = field.closest('label') ||
                          document.querySelector(`label[for="${field.id}"]`);

            if (!label && field.placeholder) {
                field.setAttribute('aria-label', field.placeholder);
            }

            // Add required aria attribute
            if (field.hasAttribute('required')) {
                field.setAttribute('aria-required', 'true');
            }
        });

        // Add aria-invalid to fields on validation
        document.addEventListener('invalid', function(e) {
            e.target.setAttribute('aria-invalid', 'true');
        }, true);

        document.addEventListener('input', function(e) {
            if (e.target.hasAttribute('aria-invalid')) {
                e.target.removeAttribute('aria-invalid');
            }
        }, true);
    }

    // Add landmark roles if missing
    function addLandmarkRoles() {
        const header = document.querySelector('header');
        if (header && !header.getAttribute('role')) {
            header.setAttribute('role', 'banner');
        }

        const main = document.querySelector('main');
        if (main && !main.getAttribute('role')) {
            main.setAttribute('role', 'main');
        }

        const footer = document.querySelector('footer');
        if (footer && !footer.getAttribute('role')) {
            footer.setAttribute('role', 'contentinfo');
        }
    }

    // Keyboard navigation for custom components
    function enhanceKeyboardNavigation() {
        // Add keyboard support to card links
        document.querySelectorAll('.feature-card, .program-card, .chapter-card').forEach(card => {
            const link = card.querySelector('a');
            if (link && !card.getAttribute('tabindex')) {
                card.setAttribute('tabindex', '0');
                card.setAttribute('role', 'link');

                card.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        link.click();
                    }
                });
            }
        });
    }

    // Initialize all accessibility enhancements
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                addSkipLink();
                enhanceFocusVisibility();
                addAriaLabels();
                enhanceFormAccessibility();
                addLandmarkRoles();
                enhanceKeyboardNavigation();
            });
        } else {
            addSkipLink();
            enhanceFocusVisibility();
            addAriaLabels();
            enhanceFormAccessibility();
            addLandmarkRoles();
            enhanceKeyboardNavigation();
        }
    }

    init();

    console.log('Accessibility enhancements loaded');
})();
