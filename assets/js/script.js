document.addEventListener('DOMContentLoaded', function() {
    // Elementos de navegação
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Toggle menu mobile
    if (navToggle) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Impede que o clique se propague para o document
            navLinks.classList.toggle('active');
            
            // Alterna entre ícones de menu e fechar
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            // Adicionar classe active ao link clicado
            document.querySelectorAll('.nav-links a').forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                
                // Restaura o ícone de menu
                if (navToggle) {
                    const icon = navToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
    
    // Fechar menu quando clicar fora dele
    document.addEventListener('click', function(event) {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(event.target) && 
            !navToggle.contains(event.target)) {
            
            navLinks.classList.remove('active');
            
            // Restaura o ícone de menu
            if (navToggle) {
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Botão voltar ao topo e indicador de rolagem
    const backToTopButton = document.querySelector('.back-to-top');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (backToTopButton && scrollIndicator) {
        window.addEventListener('scroll', function() {
            const shouldShowBackToTop = window.scrollY > 100;
            backToTopButton.classList.toggle('visible', shouldShowBackToTop);
            scrollIndicator.style.display = shouldShowBackToTop ? 'none' : 'flex';
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Ativar link "Início" ao clicar no botão voltar ao topo
            document.querySelectorAll('.nav-links a').forEach(el => el.classList.remove('active'));
            document.querySelector('.nav-links a[href="#"]').classList.add('active');
        });
    }
    
    // Indicador de rolagem - Comportamento
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            const destaqueSection = document.querySelector('#destaque');
            if (destaqueSection) {
                destaqueSection.scrollIntoView({ behavior: 'smooth' });
                
                // Ativar link "Destaque" ao clicar no indicador de rolagem
                document.querySelectorAll('.nav-links a').forEach(el => el.classList.remove('active'));
                document.querySelector('.nav-links a[href="#destaque"]').classList.add('active');
            }
        });
    }
    
    // Destaque para links ativos na navegação
    highlightActiveNavLink();
    window.addEventListener('scroll', throttle(highlightActiveNavLink, 100));
    
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        const footerAnchor = document.querySelector('.footer-anchor');
        const footer = document.querySelector('footer');
        
        // Encontrar a seção atual visível na tela
        let currentSection = '';
        let closestSection = null;
        let closestDistance = Infinity;
        
        // Se o usuário está no topo da página, ativar link "Início"
        if (window.scrollY < 100) {
            currentSection = '';
        } else {
            // Verificar todas as seções e encontrar a mais próxima do topo da viewport
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const distance = Math.abs(sectionTop);
                
                // Se esta seção está mais próxima do topo da viewport que a anterior
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestSection = section;
                }
            });
            
            // Verificação para o footer/contato - verificamos se o footer é visível
            const footerPosition = footer ? footer.getBoundingClientRect().top : Infinity;
            const footerAnchorPosition = footerAnchor ? footerAnchor.getBoundingClientRect().top : Infinity;
            
            // Se o footer ou âncora de footer está visível ou perto do topo da viewport
            if (footerPosition < window.innerHeight * 0.75 || footerAnchorPosition < window.innerHeight * 0.75 || 
                ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100)) {
                currentSection = 'falarcomop'; // ID da seção de contato conforme o HTML
            } else if (closestSection) {
                currentSection = closestSection.id;
            }
        }
        
        // Atualizar links ativos
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            // Para o link "Início"
            if (href === '#' && (currentSection === '' || window.scrollY < 100)) {
                link.classList.add('active');
            } 
            // Para link de contato quando perto do final da página ou na seção falarcomop
            else if (href === '#falarcomop' && currentSection === 'falarcomop') {
                link.classList.add('active');
            }
            // Para outros links diretos
            else if (href === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Função para limitar a frequência de execução (throttle)
    function throttle(func, delay) {
        let lastCall = 0;
        return function(...args) {
            const now = new Date().getTime();
            if (now - lastCall < delay) {
                return;
            }
            lastCall = now;
            return func(...args);
        };
    }
    
    // Efeito 3D para os cards de projeto (mantido conforme solicitado)
    const setupCardEffects = () => {
        const cards = document.querySelectorAll('.project-card');
    
        cards.forEach(card => {
            let rafId = null;
    
            const handleMouseMove = (e) => {
                if (rafId) {
                    cancelAnimationFrame(rafId);
                }
    
                rafId = requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
                    card.style.setProperty('--mouse-x', `${x}%`);
                    card.style.setProperty('--mouse-y', `${y}%`);
    
                    // Desativa efeito 3D em dispositivos móveis
                    if (window.innerWidth > 480) {
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
    
                        const rotateX = -(e.clientY - rect.top - centerY) / 10;
                        const rotateY = (e.clientX - rect.left - centerX) / 10;
    
                        card.style.transform = `
                            perspective(1000px) 
                            rotateX(${rotateX}deg) 
                            rotateY(${rotateY}deg) 
                            translateZ(20px)
                        `;
                    }
                });
            };
    
            const handleMouseLeave = () => {
                if (rafId) {
                    cancelAnimationFrame(rafId);
                }
    
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
            };
    
            // Adiciona eventos apenas em dispositivos não-touch
            if (!('ontouchstart' in window)) {
                card.addEventListener('mousemove', handleMouseMove);
                card.addEventListener('mouseleave', handleMouseLeave);
            }
        });
    };
    
    // Inicializa efeitos dos cards
    setupCardEffects();
    
    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            
            // Para o link "Início" (#)
            if (href === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // Para outros links
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});