// Google Analytics 4 (GA4) Configuration
//
// SETUP INSTRUCTIONS:
// 1. Go to https://analytics.google.com/
// 2. Create a GA4 property for book.uravation.com
// 3. Copy your Measurement ID (format: G-XXXXXXXXXX)
// 4. Replace the value below with your actual Measurement ID
//
// For now, analytics is disabled until you add your ID

(function() {
    // Your GA4 Measurement ID - REPLACE THIS!
    const GA_MEASUREMENT_ID = 'G-0FF0MSMW1V'; // Uravation GA4 Property

    // Exit if no ID is set
    if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
        console.log('Google Analytics not configured. Add your Measurement ID to analytics.js');
        return;
    }

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
        'anonymize_ip': true,
        'cookie_flags': 'SameSite=None;Secure'
    });

    // Custom event tracking
    window.trackEvent = function(eventName, eventParams = {}) {
        if (typeof gtag === 'function') {
            gtag('event', eventName, eventParams);
        }
    };

    // Track form submissions
    document.addEventListener('submit', function(e) {
        const form = e.target;
        const formId = form.id || 'unknown_form';

        window.trackEvent('form_submission', {
            'form_id': formId,
            'form_location': window.location.pathname
        });
    });

    // Track button clicks
    document.addEventListener('click', function(e) {
        const button = e.target.closest('button, .btn');
        if (button) {
            const buttonText = button.textContent.trim();
            const buttonClass = button.className;

            window.trackEvent('button_click', {
                'button_text': buttonText,
                'button_class': buttonClass,
                'page_location': window.location.pathname
            });
        }
    });

    // Track outbound links
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link && link.hostname !== window.location.hostname) {
            window.trackEvent('outbound_click', {
                'link_url': link.href,
                'link_text': link.textContent.trim()
            });
        }
    });

    // Track scroll depth
    let scrollDepth = 0;
    const scrollMilestones = [25, 50, 75, 100];

    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);

        scrollMilestones.forEach(function(milestone) {
            if (scrollPercent >= milestone && scrollDepth < milestone) {
                scrollDepth = milestone;
                window.trackEvent('scroll_depth', {
                    'percent_scrolled': milestone,
                    'page_location': window.location.pathname
                });
            }
        });
    });

    console.log('Analytics initialized with ID:', GA_MEASUREMENT_ID);
})();
