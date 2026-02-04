// ===== ملف JavaScript الرئيسي =====
// هذا الملف يربط جميع الصفحات معاً

// ===== 1. تهيئة الموقع =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('موقع TseYFZ جاهز للعمل!');
    
    // تحديد الصفحة الحالية
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    console.log('الصفحة الحالية:', currentPage);
    
    // تفعيل التنقل
    initializeNavigation();
    
    // تفعيل القوائم المنسدلة
    initializeDropdowns();
    
    // تفعيل الروابط الناعمة
    initializeSmoothLinks();
    
    // تفعيل المراقبين
    initializeObservers();
    
    // تفعيل النماذج
    initializeForms();
    
    // تهيئة إضافية حسب الصفحة
    switch(currentPage) {
        case 'index.html':
            initHomePage();
            break;
        case 'about.html':
            initAboutPage();
            break;
        case 'learning.html':
            initLearningPage();
            break;
        case 'portfolio.html':
            initPortfolioPage();
            break;
    }
});

// ===== 2. وظائف التنقل =====
function initializeNavigation() {
    // تفعيل الروابط النشطة
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .hdr-menu__link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage.includes(href.replace('.html', '')) && href !== '#')
        ) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
        
        // إضافة event listener للروابط الداخلية
        if (href.startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });
    
    // إنشاء رابط للصفحة الرئيسية إذا لم يكن موجوداً
    if (!document.querySelector('a[href="index.html"]')) {
        const homeLink = document.createElement('a');
        homeLink.href = 'index.html';
        homeLink.className = 'nav-link';
        homeLink.innerHTML = '<i class="fas fa-home"></i> الرئيسية';
        document.querySelector('.nav-links')?.prepend(homeLink);
    }
}

// ===== 3. القوائم المنسدلة =====
function initializeDropdowns() {
    const menuButtons = document.querySelectorAll('.hdr-menu__btn');
    
    menuButtons.forEach(button => {
        const menu = button.nextElementSibling;
        
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            menu.classList.toggle('show');
            button.setAttribute('aria-expanded', menu.classList.contains('show'));
        });
        
        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', function(e) {
            if (!button.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.remove('show');
                button.setAttribute('aria-expanded', 'false');
            }
        });
        
        // إغلاق القائمة بـ ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menu.classList.contains('show')) {
                menu.classList.remove('show');
                button.setAttribute('aria-expanded', 'false');
            }
        });
        
        // تفعيل القوائم الفرعية
        const subMenuToggles = menu.querySelectorAll('.hdr-sub-toggle');
        subMenuToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const subMenu = this.nextElementSibling;
                if (subMenu && subMenu.classList.contains('hdr-sub')) {
                    subMenu.classList.toggle('show');
                    this.setAttribute('aria-expanded', subMenu.classList.contains('show'));
                }
            });
        });
    });
}

// ===== 4. الروابط الناعمة =====
function initializeSmoothLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // تحديث URL بدون تحديث الصفحة
                history.pushState(null, null, targetId);
            }
        });
    });
}

// ===== 5. المراقبون =====
function initializeObservers() {
    // مراقبة العناصر للظهور
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // تفعيل العدادات
                if (entry.target.classList.contains('counter')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // مراقبة العناصر المراد تحريكها
    document.querySelectorAll('.fade-in, .slide-up, .counter').forEach(el => {
        observer.observe(el);
    });
}

// ===== 6. النماذج =====
function initializeForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // التحقق من المدخلات
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    input.style.borderColor = 'var(--danger)';
                    isValid = false;
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // محاكاة الإرسال
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    // هنا يمكن إضافة كود الإرسال الفعلي
                    alert('تم إرسال النموذج بنجاح!');
                    form.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            } else {
                alert('يرجى ملء جميع الحقول المطلوبة');
            }
        });
    });
}

// ===== 7. وظائف العدادات =====
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count')) || parseInt(element.textContent);
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = current.toLocaleString();
    }, 16);
}

// ===== 8. وظائف خاصة بالصفحات =====
function initHomePage() {
    console.log('تهيئة الصفحة الرئيسية');
    
    // تفعيل قسم الدورات
    const courseLinks = document.querySelectorAll('[href*="satr.tuwaiq.edu.sa"]');
    courseLinks.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
    
    // تأثيرات خاصة
    const heroElements = document.querySelectorAll('.hero-main, .floating-card');
    heroElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200);
    });
}

function initAboutPage() {
    console.log('تهيئة صفحة عني');
    
    // تفعيل الجدول الزمني
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200);
    });
    
    // تفعيل شريط المهارات
    const skillBars = document.querySelectorAll('.skill-level');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease';
            bar.style.width = width;
        }, 500);
    });
}

function initLearningPage() {
    console.log('تهيئة صفحة التعلم');
    
    // تفعيل الأسئلة الشائعة
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // إغلاق جميع الإجابات الأخرى
            document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
                if (otherAnswer !== answer && otherAnswer.classList.contains('open')) {
                    otherAnswer.classList.remove('open');
                    otherAnswer.previousElementSibling.querySelector('i').style.transform = 'rotate(0deg)';
                }
            });
            
            // تبديل الحالة
            answer.classList.toggle('open');
            icon.style.transform = answer.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
        });
    });
    
    // تفعيل خطوات التعلم
    const roadmapSteps = document.querySelectorAll('.roadmap-step');
    roadmapSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(30px)';
        
        setTimeout(() => {
            step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            step.style.opacity = '1';
            step.style.transform = 'translateX(0)';
        }, index * 300);
    });
}

function initPortfolioPage() {
    console.log('تهيئة صفحة المعرض');
    
    // تفعيل التصفية
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة النشط من جميع الأزرار
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // إضافة النشط للزر المحدد
            this.classList.add('active');
            
            // الحصول على قيمة التصفية
            const filterValue = this.getAttribute('data-filter');
            
            // تصفية العناصر
            projectItems.forEach(item => {
                const categories = item.getAttribute('data-category');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // تفعيل العدادات
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const statValues = statsSection.querySelectorAll('.stat-value');
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statValues.forEach(value => {
                        const target = parseInt(value.textContent);
                        animateCounter(value);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
}

// ===== 9. وظائف مساعدة =====
// إنشاء عنصر التنقل الديناميكي
function createNavigation() {
    const navHTML = `
        <nav class="nav-links">
            <a href="index.html" class="nav-link"><i class="fas fa-home"></i> الرئيسية</a>
            <a href="about.html" class="nav-link"><i class="fas fa-user"></i> عني</a>
            <a href="portfolio.html" class="nav-link"><i class="fas fa-briefcase"></i> أعمالي</a>
            <a href="learning.html" class="nav-link"><i class="fas fa-graduation-cap"></i> تعلم البرمجة</a>
            <a href="#contact" class="nav-link"><i class="fas fa-envelope"></i> تواصل</a>
        </nav>
    `;
    
    const toolbarCenter = document.querySelector('.toolbar-center');
    if (toolbarCenter) {
        toolbarCenter.innerHTML = navHTML;
    }
}

// تحميل محتوى ديناميكي
async function loadContent(url, containerId) {
    try {
        const response = await fetch(url);
        const content = await response.text();
        document.getElementById(containerId).innerHTML = content;
        initializeNavigation(); // إعادة تهيئة التنقل بعد تحميل المحتوى
    } catch (error) {
        console.error('خطأ في تحميل المحتوى:', error);
    }
}

// حفظ حالة التمرير
function saveScrollPosition() {
    sessionStorage.setItem('scrollPosition', window.pageYOffset);
}

function restoreScrollPosition() {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition));
        sessionStorage.removeItem('scrollPosition');
    }
}

// ===== 10. أحداث النافذة =====
window.addEventListener('scroll', function() {
    const toolbar = document.querySelector('.toolbar');
    if (window.pageYOffset > 100) {
        toolbar.style.background = 'rgba(11, 26, 54, 0.95)';
        toolbar.style.backdropFilter = 'blur(10px)';
    } else {
        toolbar.style.background = 'linear-gradient(90deg, #0b1a36, #132b54)';
        toolbar.style.backdropFilter = 'none';
    }
});

window.addEventListener('beforeunload', saveScrollPosition);
window.addEventListener('load', restoreScrollPosition);

// ===== 11. تصدير الوظائف (للاستخدام في الملفات الأخرى) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeNavigation,
        initializeDropdowns,
        initializeSmoothLinks,
        initializeObservers,
        initializeForms,
        animateCounter,
        createNavigation,
        loadContent
    };
}