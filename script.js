// JavaScript for liquid animation portfolio - movie clips sharing website
document.addEventListener('DOMContentLoaded', () => {
    
    // Set current year dynamically
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Movie clips data (dynamic content)
    const movieClips = [
        {
            icon: 'fas fa-water',
            title: 'Liquid Scene',
            description: 'Surreal transitions & water-like visuals from arthouse cinema.',
            color: '#7c3aed'
        },
        {
            icon: 'fas fa-ghost',
            title: 'Phantom Cut',
            description: 'Ethereal moments from cult classics and ghostly narratives.',
            color: '#a855f7'
        },
        {
            icon: 'fas fa-bolt',
            title: 'Neon Pulse',
            description: 'High-energy action with vibrant neon-drenched cinematography.',
            color: '#ec4899'
        },
        {
            icon: 'fas fa-cloud-moon',
            title: 'Dream Loop',
            description: 'Ambient slow-motion dream sequences and surreal loops.',
            color: '#6366f1'
        },
        {
            icon: 'fas fa-fire',
            title: 'Inferno Cut',
            description: 'Intense dramatic scenes with explosive emotional depth.',
            color: '#f97316'
        },
        {
            icon: 'fas fa-star',
            title: 'Starlight Reel',
            description: 'Magical moments under cosmic skies and starlit beauty.',
            color: '#eab308'
        }
    ];

    // Render clip cards dynamically
    const clipsGrid = document.getElementById('clips-grid');
    
    function renderClips() {
        if (!clipsGrid) return;
        
        clipsGrid.innerHTML = '';
        
        movieClips.forEach((clip, index) => {
            const card = document.createElement('div');
            card.className = 'clip-card';
            card.setAttribute('data-clip-index', index);
            card.style.animationDelay = `${index * 0.1}s`;
            
            card.innerHTML = `
                <div class="clip-icon">
                    <i class="${clip.icon}"></i>
                </div>
                <h3>${clip.title}</h3>
                <p>${clip.description}</p>
                <span class="fake-btn">
                    <i class="far fa-play-circle"></i> watch clip
                </span>
            `;
            
            // Add click interaction with liquid animation feedback
            card.addEventListener('click', function(e) {
                handleClipClick(clip, card);
            });
            
            // Add hover interaction tracking
            card.addEventListener('mouseenter', function() {
                updateInteractionHint(`hovering: ${clip.title}`);
            });
            
            card.addEventListener('mouseleave', function() {
                updateInteractionHint('');
            });
            
            clipsGrid.appendChild(card);
        });
    }

    // Handle clip card click with liquid ripple effect
    function handleClipClick(clip, cardElement) {
        // Create temporary liquid ripple element
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.4)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        ripple.style.animation = 'liquidRipple 0.8s ease-out forwards';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '10';
        
        // Add ripple keyframes dynamically if not present
        if (!document.getElementById('ripple-style')) {
            const styleEl = document.createElement('style');
            styleEl.id = 'ripple-style';
            styleEl.textContent = `
                @keyframes liquidRipple {
                    0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
                    100% { transform: translate(-50%, -50%) scale(25); opacity: 0; }
                }
            `;
            document.head.appendChild(styleEl);
        }
        
        cardElement.style.position = 'relative';
        cardElement.style.overflow = 'hidden';
        cardElement.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 800);
        
        // Update hint and show alert (placeholder for actual clip action)
        updateInteractionHint(`🎬 playing: ${clip.title} (clip demo)`);
        
        // Simulate clip interaction (in real site, would open modal or video)
        console.log(`Movie clip selected: ${clip.title} - ${clip.description}`);
        
        // Visual feedback on card
        cardElement.style.transform = 'scale(0.97)';
        setTimeout(() => {
            cardElement.style.transform = '';
        }, 200);
    }

    // Update interaction hint in footer
    function updateInteractionHint(message) {
        const hintElement = document.getElementById('interaction-hint');
        if (hintElement) {
            hintElement.textContent = message || 'click any clip to feel the liquid effect';
        }
    }

    // Social media links interaction tracking
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.getAttribute('data-platform') || 'social';
            updateInteractionHint(`✨ connecting to ${platform}... liquid transition`);
            
            // Optional: add small delay effect before navigation
            setTimeout(() => {
                updateInteractionHint('');
            }, 1500);
        });
        
        link.addEventListener('mouseenter', function() {
            const platform = this.getAttribute('data-platform') || '';
            if (platform) {
                updateInteractionHint(`visit ${platform} for more movie clips`);
            }
        });
        
        link.addEventListener('mouseleave', function() {
            updateInteractionHint('');
        });
    });

    // Initialize liquid background extra interaction (move blobs slightly with mouse)
    document.addEventListener('mousemove', function(e) {
        const blobs = document.querySelectorAll('.blob');
        if (blobs.length && window.innerWidth > 768) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            blobs.forEach((blob, index) => {
                const speed = (index + 1) * 8;
                const offsetX = (mouseX - 0.5) * speed;
                const offsetY = (mouseY - 0.5) * speed;
                blob.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });
        }
    });

    // Initial render of clips
    renderClips();
    
    // Set default hint
    updateInteractionHint('click any clip to feel the liquid effect');
    
    // Add subtle entrance animation for clips
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe clip cards after they're rendered
    setTimeout(() => {
        document.querySelectorAll('.clip-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
            
            // Trigger visible after short delay for cascade effect
            const index = card.getAttribute('data-clip-index') || 0;
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 120);
        });
    }, 100);
});
