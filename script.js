// ======================================
// Document Ready
// ======================================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ======================================
// Initialize App
// ======================================
function initializeApp() {
    setupScrollToTop();
    setupSmoothScroll();
    setupCardAnimations();
    setupSearchFunctionality();
    setupNavigation();
    setupDarkMode();
    setupLazyLoading();
}

// ======================================
// Scroll to Top Button
// ======================================
function setupScrollToTop() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '↑';
    document.body.appendChild(scrollTopBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    // Scroll to top on click
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ======================================
// Smooth Scroll
// ======================================
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
}

// ======================================
// Card Animations
// ======================================
function setupCardAnimations() {
    const cards = document.querySelectorAll('.card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = `fadeIn 0.6s ease-in-out forwards`;
                    observer.unobserve(entry.target);
                }, index * 50);
            }
        });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));
}

// ======================================
// Search Functionality
// ======================================
function setupSearchFunctionality() {
    // Create search bar
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.style.cssText = `
        display: flex;
        justify-content: center;
        margin: 2rem 0;
        padding: 0 1rem;
    `;

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '🔍 ابحث عن أدوات أو مواقع...';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 500px;
        padding: 0.75rem 1rem;
        border: 2px solid #e5e7eb;
        border-radius: 0.5rem;
        font-size: 1rem;
        font-family: inherit;
        direction: rtl;
        text-align: right;
        transition: all 0.3s ease;
    `;

    searchInput.addEventListener('focus', function() {
        this.style.borderColor = '#6366f1';
        this.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
    });

    searchInput.addEventListener('blur', function() {
        this.style.borderColor = '#e5e7eb';
        this.style.boxShadow = 'none';
    });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterCards(searchTerm);
    });

    searchContainer.appendChild(searchInput);
    const header = document.querySelector('.header');
    if (header) {
        header.parentNode.insertBefore(searchContainer, header.nextSibling);
    }
}

// ======================================
// Filter Cards
// ======================================
function filterCards(searchTerm) {
    const cards = document.querySelectorAll('.card');
    let visibleCount = 0;

    cards.forEach(card => {
        const title = card.querySelector('h3, h4');
        const description = card.querySelector('.card-description');
        const text = (title?.textContent + ' ' + description?.textContent).toLowerCase();

        if (text.includes(searchTerm)) {
            card.style.display = '';
            card.style.animation = 'fadeIn 0.3s ease-in-out';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Show "no results" message
    showNoResultsMessage(visibleCount === 0 && searchTerm !== '');
}

// ======================================
// No Results Message
// ======================================
function showNoResultsMessage(show) {
    let message = document.querySelector('.no-results');
    
    if (show) {
        if (!message) {
            message = document.createElement('div');
            message.className = 'no-results';
            message.style.cssText = `
                text-align: center;
                padding: 2rem;
                color: #9ca3af;
                font-size: 1.1rem;
            `;
            message.textContent = '❌ لم يتم العثور على نتائج';
            document.querySelector('main').appendChild(message);
        }
        message.style.display = 'block';
    } else if (message) {
        message.style.display = 'none';
    }
}

// ======================================
// Active Navigation Link
// ======================================
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
                link.style.borderBottom = '3px solid #6366f1';
                link.style.color = '#6366f1';
            } else {
                link.style.borderBottom = 'none';
                link.style.color = '';
            }
        });
    });
}

// ======================================
// Dark Mode Toggle
// ======================================
function setupDarkMode() {
    // Create dark mode toggle button
    const header = document.querySelector('.header');
    const toggleBtn = document.createElement('button');
    toggleBtn.innerHTML = '🌙';
    toggleBtn.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background-color: #6366f1;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        z-index: 1000;
    `;

    toggleBtn.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
    });

    toggleBtn.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });

    toggleBtn.addEventListener('click', () => {
        document.body.style.colorScheme = 
            document.body.style.colorScheme === 'dark' ? 'light' : 'dark';
        
        if (document.body.style.colorScheme === 'dark') {
            toggleBtn.innerHTML = '☀️';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            toggleBtn.innerHTML = '🌙';
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    document.body.appendChild(toggleBtn);

    // Check saved preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.style.colorScheme = 'dark';
        toggleBtn.innerHTML = '☀️';
    }
}

// ======================================
// Lazy Loading Images
// ======================================
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ======================================
// Copy to Clipboard
// ======================================
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = '✓ تم النسخ!';
        button.style.backgroundColor = '#10b981';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 2000);
    });
}

// ======================================
// Share Functionality
// ======================================
function shareContent(title, text) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: text,
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        alert('Share not supported on this browser');
    }
}

// ======================================
// Print Functionality
// ======================================
function printPage() {
    window.print();
}

// ======================================
// Keyboard Shortcuts
// ======================================
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K: Search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    }

    // Escape: Close search
    if (e.key === 'Escape') {
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput) {
            searchInput.blur();
            searchInput.value = '';
            filterCards('');
        }
    }
});

// ======================================
// Notification System
// ======================================
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        animation: slideDown 0.3s ease-out;
        z-index: 10000;
        max-width: 300px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// ======================================
// Table of Contents Generator
// ======================================
function generateTableOfContents() {
    const sections = document.querySelectorAll('section[id]');
    const toc = document.createElement('div');
    toc.className = 'table-of-contents';
    toc.style.cssText = `
        background-color: #f9fafb;
        padding: 1.5rem;
        border-radius: 0.5rem;
        margin-bottom: 2rem;
        border-right: 4px solid #6366f1;
    `;

    const title = document.createElement('h3');
    title.textContent = '📑 جدول المحتويات';
    title.style.marginBottom = '1rem';
    toc.appendChild(title);

    const list = document.createElement('ul');
    list.style.cssText = `
        list-style: none;
        padding-right: 1rem;
    `;

    sections.forEach(section => {
        const li = document.createElement('li');
        li.style.marginBottom = '0.5rem';
        
        const a = document.createElement('a');
        a.href = '#' + section.id;
        a.textContent = section.querySelector('h2')?.textContent || section.id;
        a.style.cssText = `
            color: #6366f1;
            text-decoration: none;
            transition: color 0.3s;
        `;
        
        a.addEventListener('mouseover', () => a.style.color = '#ec4899');
        a.addEventListener('mouseout', () => a.style.color = '#6366f1');
        
        li.appendChild(a);
        list.appendChild(li);
    });

    toc.appendChild(list);
    return toc;
}

// Insert TOC after header
window.addEventListener('load', () => {
    const header = document.querySelector('.header');
    if (header) {
        const toc = generateTableOfContents();
        header.parentNode.insertBefore(toc, header.nextSibling.nextSibling);
    }
});

// ======================================
// Performance Monitoring
// ======================================
function monitorPerformance() {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page Load Time: ${pageLoadTime}ms`);
    });
}

monitorPerformance();

// ======================================
// Export Functions for External Use
// ======================================
window.designTools = {
    copyToClipboard,
    shareContent,
    printPage,
    showNotification,
    filterCards
};
