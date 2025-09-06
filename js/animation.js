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


    // Animação da LOGO
    gsap.from(".logo h1", {
        duration: 1.5,
        y: -50,
        opacity: 0,
        ease: "power3.out",
        delay: 0.2
    });

    //Animação dos itens do menu
    gsap.from(".menu ul li", {
        duration: 1,
        y: -30,
        opacity: 0,
        ease: "power3.out",
        stagger: 0.2,
        delay: 0.5
    });
    
    //Animação do titulo
    function setupSplitting() {
        $(".title-animation .line").each(function() {
            const line = $(this);
            const text = line.text();
            const chars = text.split("").map(char => {
                return char === " " ? " " : `<span class="char">${char}</span>`;
            }).join("");
            line.html(chars);
        });
        
        gsap.to(".title-animation .char", {
            y: 0,
            stagger: 0.05,
            delay: 1,
            duration: 1,
            ease: "power4.out",
        });
    }

    setupSplitting();

    //Animação do parágrafo
    gsap.from(".text-animation", {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: "power3.out",
        delay: 1.8
    });

});