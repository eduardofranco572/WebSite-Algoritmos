window.addEventListener('load', function() {
    
    gsap.registerPlugin(ScrollTrigger);

    if ($('#algorithm-graph-container').length) {
        
        const svg = document.getElementById('graph-svg');
        const paths = svg.querySelectorAll('path');

        paths.forEach((path, index) => {
            const startX = parseFloat(path.getAttribute('d').match(/M\s*([0-9.]+)/)[1]);
            const startY = parseFloat(path.getAttribute('d').match(/M\s*[0-9.]+\s*([0-9.]+)/)[1]);
            const endX = parseFloat(path.getAttribute('d').match(/,\s*([0-9.]+)/)[1]);
            const endY = parseFloat(path.getAttribute('d').match(/,\s*[0-9.]+\s*([0-9.]+)/)[1]);

            const amplitude = 5;
            const c1x = startX + (endX - startX) * 0.25;
            const c1y = startY + (endX < startX ? amplitude : -amplitude);
            const c2x = startX + (endX - startX) * 0.75;
            const c2y = startY + (endX < startX ? -amplitude : amplitude);
            
            path.setAttribute('d', `M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`);

            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
        });
        
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#algorithm-graph-container", 
                start: "top top",
                end: "+=3000",
                scrub: 1.5,
                pin: true,
            }
        });

        tl.fromTo(".graph-trunk", { height: "0%" }, { height: "100%", duration: 5, ease: "none" });

        // Etapa 1
        tl.to("#path-node-1", { strokeDashoffset: 0, duration: 2, ease: "none" }, 0);
        tl.fromTo("#node-1 .graph-node", { opacity: 0, xPercent: -20 }, { opacity: 1, xPercent: 0, scale: 1, duration: 1.5, ease: "power1.out" }, 0.5);
        
        tl.to("#path-node-2", { strokeDashoffset: 0, duration: 2, ease: "none" }, 0.5);
        tl.fromTo("#node-2 .graph-node", { opacity: 0, xPercent: 20 }, { opacity: 1, xPercent: 0, scale: 1, duration: 1.5, ease: "power1.out" }, 1);

        tl.to({}, {duration: 2}); 

        // Etapa 2
        tl.to("#path-node-3", { strokeDashoffset: 0, duration: 2, ease: "none" }, 4.5);
        tl.fromTo("#node-3 .graph-node", { opacity: 0, xPercent: -20 }, { opacity: 1, xPercent: 0, scale: 1, duration: 1.5, ease: "power1.out" }, 5);

        tl.to("#path-node-4", { strokeDashoffset: 0, duration: 2, ease: "none" }, 5);
        tl.fromTo("#node-4 .graph-node", { opacity: 0, xPercent: 20 }, { opacity: 1, xPercent: 0, scale: 1, duration: 1.5, ease: "power1.out" }, 5.5);
        
        tl.to({}, {duration: 2});

        // Etapa 3
        tl.to("#path-node-5", { strokeDashoffset: 0, duration: 2, ease: "none" }, 8.5);
        tl.fromTo("#node-5 .graph-node", { opacity: 0, xPercent: -20 }, { opacity: 1, xPercent: 0, scale: 1, duration: 1.5, ease: "power1.out" }, 9);
    }


    // --- LÓGICA DO MODAL (sem alterações) ---
    const modalOverlay = $("#modal-overlay");
    const modal = $("#demo-algo-modal");

    $('.graph-node').on('click', function() {
        const algoName = $(this).parent().data('algo');
        modal.find('.example-title').text(algoName);
        gsap.to(modalOverlay, { autoAlpha: 1, duration: 0.4 });
        gsap.to(modal, { scale: 1, duration: 0.4, delay: 0.1 });
    });

    function closeModal() {
        gsap.to(modal, { scale: 0.9, duration: 0.3 });
        gsap.to(modalOverlay, { autoAlpha: 0, duration: 0.3, delay: 0.1 });
    }

    $('.close-modal-btn, #modal-overlay').on('click', function() {
        closeModal();
    });

    $('#demo-algo-modal').on('click', function(e) {
        e.stopPropagation();
    });

});