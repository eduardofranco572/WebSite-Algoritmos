function initParticles() {
    if (document.getElementById('particles-js')) {
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
                    "type": "circle" 
                }, 
                "opacity": { 
                    "value": 0.5, 
                    "random": false 
                }, 
                "size": { 
                    "value": 3, 
                    "random": true 
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
                    "bounce": false 
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
    }
}


$(window).on('load', function() {
    gsap.set("body, html", { 
        overflow: "hidden" 
    });

    initParticles();

    $(".title-animation .line").each(function() {
        const line = $(this);
        const text = line.text();
        const chars = text.split("").map(char => (char === " " ? " " : `<span class="char">${char}</span>`)).join("");
        line.html(chars);
    });
    gsap.set(".title-animation .char", { 
        y: 115 
    });

    const introTl = gsap.timeline({
        onComplete: () => {
            $('.container-details').removeClass('initially-hidden');
            gsap.set("body, html", { 
                overflow: "auto" 
            });
            ScrollTrigger.refresh();
        }
    });

    introTl
        .to('body', { 
            visibility: 'visible', 
            opacity: 1, 
            duration: 0.5 
        })
        
        .from(".logo h1", { 
            duration: 1.5, 
            y: -50, 
            opacity: 0, 
            ease: "power3.out" 
        }, 0.2)

        .from(".menu ul li", { 
            duration: 1, 
            y: -30, 
            opacity: 0, 
            ease: "power3.out", 
            stagger: 0.2 
        }, 0.5)

        .to(".title-animation", { 
            opacity: 1, 
            duration: 0.1 
        }, 1)

        .to(".title-animation .char", { 
            y: 0, 
            stagger: 0.05, 
            duration: 1, 
            ease: "power4.out" 
        }, 1)

        .fromTo(".text-animation", { 
            y: 50, 
            autoAlpha: 0 
        }, { 
            duration: 1.5, 
            y: 0, 
            autoAlpha: 1, 
            ease: "power3.out" 
        }, 1.8)

        .fromTo("#start-journey-btn", { 
            y: 20, 
            autoAlpha: 0 
        }, { 
            duration: 1.5, 
            y: 0, 
            autoAlpha: 1, 
            ease: "power3.out" 
        }, 2.5);

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
        trigger: ".about",
        start: "top top",
        end: "+=50%",
        scrub: true,
        animation: gsap.timeline()
            .to(".about", { 
                autoAlpha: 0, 
                ease: "power1.in" 
            })
            .to("#particles-js", { 
                autoAlpha: 0, 
                ease: "power1.in" 
            }, "<")
    });

    gsap.from(".card-alg", {
        scrollTrigger: {
            trigger: ".cards-alg",
            start: "top 85%",
            end: "bottom 70%",
            scrub: true,
        },
        opacity: 0,
        y: 80,
        stagger: 0.5
    });
});