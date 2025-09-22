$(document).ready(function() {
    // --- ANIMAÇÃO DO FUNDO DE PARTÍCULAS ---
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff" // Cor das partículas
            },
            "shape": {
                "type": "circle",
            },
            "opacity": {
                "value": 0.5,
                "random": false,
            },
            "size": {
                "value": 3,
                "random": true,
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#959595", // Cor das linhas que ligam as partículas
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2, // Velocidade do movimento
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab" // Efeito ao passar o mouse
                },
                "onclick": {
                    "enable": true,
                    "mode": "push" // Efeito ao clicar
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });


    const tl = gsap.timeline();

    // 2. Animação da LOGO e MENU (inicia em 0.2s)
    tl.from(".logo h1", { duration: 1.5, y: -50, opacity: 0, ease: "power3.out" }, 0.2);
    tl.from(".menu ul li", { duration: 1, y: -30, opacity: 0, ease: "power3.out", stagger: 0.2 }, 0.5);

    // 3. Animação do TÍTULO (inicia em 1s)
    // Primeiro, prepara o texto dividindo em caracteres
    $(".title-animation .line").each(function() {
        const line = $(this);
        const text = line.text();
        const chars = text.split("").map(char => {
            return char === " " ? " " : `<span class="char">${char}</span>`;
        }).join("");
        line.html(chars);
        // Esconde os caracteres inicialmente
        gsap.set($(this).find('.char'), { opacity: 0, y: 20 });
    });

    // Adiciona a animação dos caracteres à timeline
    tl.to(".title-animation .char", {
        opacity: 1,
        y: 0,
        stagger: 0.08, // Aumentado para ser mais lento
        duration: 1,
        ease: "power4.out",
    }, 1); // Inicia em 1 segundo na timeline

    // 4. Animação do PARÁGRAFO (inicia em 1.8s)
    tl.from(".text-animation", { duration: 1.5, y: 50, opacity: 0, ease: "power3.out" }, 1.8);

    // 5. Animação do BOTÃO "INICIAR JORNADA" (inicia após o texto)
    tl.to("#start-journey-btn", {
        duration: 1.5,
        opacity: 1,
        ease: "power3.out"
    }, 2.5);

});