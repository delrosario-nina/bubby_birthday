let ticking = false;
        
        function updateParallax() {
            const scrollY = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const parallaxElements = document.querySelectorAll('.parallax-element');
            
            parallaxElements.forEach(element => {
                const section = element.closest('.content-section');
                const rect = section.getBoundingClientRect();
                const speed = parseFloat(element.dataset.speed) || 0.5;
                const direction = element.dataset.direction || 'right';
                
                // Calculate section progress (0 = just entered, 1 = fully exited)
                const sectionHeight = section.offsetHeight;
                const sectionProgress = Math.max(0, Math.min(1, 
                    (windowHeight - rect.top) / (windowHeight + sectionHeight)
                ));
                
                // Only animate if section is in or near viewport
                if (rect.bottom >= -100 && rect.top <= windowHeight + 100) {
                    // vertical movement based on section scroll progress
                    const moveDistance = windowHeight * 1.2;
                    const yOffset = (sectionProgress * moveDistance * speed) - (moveDistance * 0.3);
                    
                    // horizontal movement based on direction
                    let xOffset = Math.sin(sectionProgress * Math.PI) * 30;
                    if (direction === 'left') {
                        xOffset = -Math.abs(xOffset);
                    } else {
                        xOffset = Math.abs(xOffset);
                    }
                    
                    // Add some rotation for more dynamic effect
                    const rotation = Math.sin(sectionProgress * Math.PI * 2) * 5;
                    
                    let opacity = 1;
                    if (sectionProgress < 0.15) {
                        opacity = sectionProgress / 0.15;
                    } else if (sectionProgress > 0.85) {
                        opacity = (1 - sectionProgress) / 0.15;
                    }
                    
                    element.style.transform = `translateY(${yOffset}px) translateX(${xOffset}px) rotate(${rotation}deg)`;
                    element.style.opacity = Math.max(0, Math.min(1, opacity));
                    element.style.visibility = 'visible';
                } else {

                    element.style.visibility = 'hidden';
                }
            });
            
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });

        // initialize parallax on page load
        window.addEventListener('load', () => {
            updateParallax();
        });

        // recalculate on resize
        window.addEventListener('resize', () => {
            updateParallax();
        });