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
                "value": "#ffffff"
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
                "color": "#959595",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
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
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
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

    // Define o estado inicial do botão como invisível e um pouco abaixo
    gsap.set("#start-journey-btn", { opacity: 0, y: 20 });

    tl.from(".logo h1", { duration: 1.5, y: -50, opacity: 0, ease: "power3.out" }, 0.2);
    tl.from(".menu ul li", { duration: 1, y: -30, opacity: 0, ease: "power3.out", stagger: 0.2 }, 0.5);

    $(".title-animation .line").each(function() {
        const line = $(this);
        const text = line.text();
        const chars = text.split("").map(char => {
            return char === " " ? " " : `<span class="char">${char}</span>`;
        }).join("");
        line.html(chars);
        gsap.set($(this).find('.char'), { opacity: 0, y: 20 });
    });

    tl.to(".title-animation .char", {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 1,
        ease: "power4.out",
    }, 1);

    tl.from(".text-animation", { duration: 1.5, y: 50, opacity: 0, ease: "power3.out" }, 1.8);

    // Anima o botão para o seu estado final (visível e na posição original)
    tl.to("#start-journey-btn", {
        duration: 1.5,
        opacity: 1,
        y: 0,
        ease: "power3.out"
    }, 2.5);

});