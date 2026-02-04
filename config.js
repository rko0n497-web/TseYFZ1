// ===== ملف الإعدادات والتكوين =====

const SiteConfig = {
    // معلومات الموقع
    siteName: "TseYFZ",
    siteTagline: "مساحة إبداعية رقمية",
    author: "TseYFZ",
    year: 2024,
    
    // معلومات التواصل
    contact: {
        email: "contact@tseyfz.com",
        phone: "+966 55 123 4567",
        location: "المملكة العربية السعودية",
        social: {
            twitter: "https://twitter.com/tseyfz",
            linkedin: "https://linkedin.com/in/tseyfz",
            github: "https://github.com/tseyfz",
            codepen: "https://codepen.io/tseyfz"
        }
    },
    
    // الدورات التعليمية
    courses: {
        html: "https://satr.tuwaiq.edu.sa/course/CATspNvVjT/view",
        css: "https://satr.tuwaiq.edu.sa/course/hNUwyBUKmF/view",
        security1: "https://satr.tuwaiq.edu.sa/course/QfybsgXiVq/view",
        security2: "https://satr.tuwaiq.edu.sa/course/JwJKgGgESO/view",
        security3: "https://satr.tuwaiq.edu.sa/course/QQMEfb9ADu/view"
    },
    
    // مصادر تعليمية إضافية
    learningResources: {
        freecodecamp: "https://freecodecamp.org",
        w3schools: "https://w3schools.com",
        cs50: "https://cs50.harvard.edu",
        mdn: "https://developer.mozilla.org"
    },
    
    // تخصيص المظهر
    theme: {
        primaryColor: "#FFD700", // ذهبي
        secondaryColor: "#0b1a36", // أزرق داكن
        accentColor: "#00ff88", // أخضر
        dangerColor: "#ff4444", // أحمر
        borderRadius: "16px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    
    // ميزات الموقع
    features: {
        darkMode: true,
        animations: true,
        smoothScroll: true,
        lazyLoading: true
    },
    
    // إعدادات التنمية
    development: {
        debug: true,
        logLevel: "info",
        version: "1.0.0"
    },
    
    // وظائف مساعدة
    helpers: {
        // تنسيق التاريخ
        formatDate: function(date) {
            return new Date(date).toLocaleDateString('ar-SA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },
        
        // تقصير النص
        truncateText: function(text, length) {
            if (text.length <= length) return text;
            return text.substring(0, length) + '...';
        },
        
        // إنشاء معرف فريد
        generateId: function() {
            return 'id_' + Math.random().toString(36).substr(2, 9);
        }
    }
};

// تصدير التكوين
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SiteConfig;
} else {
    window.SiteConfig = SiteConfig;
}