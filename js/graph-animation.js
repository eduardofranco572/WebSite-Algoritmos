window.addEventListener('load', function() {
    
    gsap.registerPlugin(ScrollTrigger);

    if ($('#algorithm-graph-container').length) {
        
        // Vamos conectar os nós em sequência para criar o caminho da "nebulosa"
        const nodes = gsap.utils.toArray('.graph-node-wrapper');
        const svg = document.getElementById('graph-svg');
        const paths = svg.querySelectorAll('path');

        // Função para criar uma curva suave entre dois pontos
        function createCurve(startEl, endEl, pathEl) {
            const startX = parseFloat(startEl.style.left);
            const startY = parseFloat(startEl.style.top);
            const endX = parseFloat(endEl.style.left);
            const endY = parseFloat(endEl.style.top);

            // Controla a "barriga" da curva
            const controlX1 = startX;
            const controlY1 = startY + (endY - startY) * 0.5;
            const controlX2 = endX;
            const controlY2 = endY - (endY - startY) * 0.5;

            pathEl.setAttribute('d', `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`);
            
            const length = pathEl.getTotalLength();
            pathEl.style.strokeDasharray = length;
            pathEl.style.strokeDashoffset = length;
        }

        // Criar as curvas entre os nós sequenciais
        for (let i = 0; i < nodes.length - 1; i++) {
            if (paths[i]) {
                createCurve(nodes[i], nodes[i+1], paths[i]);
            }
        }
        
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#algorithm-graph-container", 
                start: "top top",
                end: "+=3000",
                scrub: 1.5,
                pin: true,
            }
        });

        // Ocultamos o tronco via CSS, então não precisamos mais animá-lo
        // tl.fromTo(".graph-trunk", { height: "0%" }, { height: "100%", duration: 5, ease: "none" });

        // Animar o primeiro nó imediatamente
        tl.fromTo("#node-1 .graph-node", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1.5, ease: "power1.out" }, 0);

        // Animar os nós e caminhos restantes em sequência
        tl.to("#path-node-1", { strokeDashoffset: 0, duration: 2, ease: "none" }, 0.5);
        tl.fromTo("#node-2 .graph-node", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1.5, ease: "power1.out" }, 1.5);
        
        tl.to({}, {duration: 2}); 

        tl.to("#path-node-2", { strokeDashoffset: 0, duration: 2, ease: "none" }, 4);
        tl.fromTo("#node-3 .graph-node", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1.5, ease: "power1.out" }, 5);
        
        tl.to({}, {duration: 2}); 

        tl.to("#path-node-3", { strokeDashoffset: 0, duration: 2, ease: "none" }, 7.5);
        tl.fromTo("#node-4 .graph-node", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1.5, ease: "power1.out" }, 8.5);

        tl.to({}, {duration: 2}); 

        tl.to("#path-node-4", { strokeDashoffset: 0, duration: 2, ease: "none" }, 11);
        tl.fromTo("#node-5 .graph-node", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1.5, ease: "power1.out" }, 12);
    }

    // --- LÓGICA DO MODAL (sem alterações) ---
    const modalOverlay = $("#modal-overlay");
    const modal = $(".algoritmos"); // Alvo correto do modal

    $('.graph-node').on('click', function() {
        const algoName = $(this).parent().data('algo');
        modal.find('.example-title').text(algoName);
        
        // Resetar para a primeira aba (Explicação) ao abrir
        $('.opitons-menu-demo span').removeClass('active');
        $('.opitons-menu-demo span').eq(0).addClass('active');
        $('.body-content').hide();
        $('.body-content').eq(0).show();
        
        gsap.to(modalOverlay, { autoAlpha: 1, duration: 0.4 });
    });

    function closeModal() {
        gsap.to(modalOverlay, { autoAlpha: 0, duration: 0.3 });
    }

    // Fechar o modal
    modalOverlay.on('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
});