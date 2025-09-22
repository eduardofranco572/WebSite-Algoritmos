$(document).ready(function() {
    // Logica da Viagem
    const algoritmos = [
        {
            nome: "Busca em Largura (BFS)",
            explicacao: [
                { 
                    titulo: "Busca em Largura (BFS)", 
                    texto: "Esse algoritmo é capaz de obter a menor distância entre dois nós de um grafo não ponderado. O BFS encontra o menor caminho verificando todas as direções à sua volta, é como uma gota d'água que se espalha uniformemente, explorando todos os caminhos possíveis antes de avançar para o próximo nível. Isso garante que a primeira vez que um nó é alcançado, é pelo caminho mais curto possível." },
                { 
                    titulo: "Como Funciona?", 
                    texto: "O BFS utiliza uma estrutura de dados de fila (FIFO - First-In, First-Out). Ele começa em um nó raiz, explora todos os seus vizinhos e, em seguida, para cada um desses vizinhos, explora os vizinhos ainda não visitados, e assim por diante, nível por nível no grafo." },
                { 
                    titulo: "Casos de Uso", 
                    texto: "É amplamente utilizado para encontrar o caminho mais curto em grafos sem pesos, em web crawlers para descobrir todas as páginas de um site, em redes sociais para encontrar \"amigos de amigos\" e na solução de quebra-cabeças como o Cubo de Rubik." }
            ]
        },
        {
            nome: "Dijkstra",
            explicacao: [
                { 
                    titulo: "Algoritmo de Dijkstra", 
                    texto: "O algoritmo de Dijkstra encontra o caminho mais curto entre os nós em um grafo ponderado, onde as arestas têm custos. Ele é ideal para problemas como encontrar a rota mais rápida em um mapa GPS." },
                { 
                    titulo: "Funcionamento", 
                    texto: "Ele funciona mantendo um conjunto de vértices cujos caminhos mais curtos a partir da origem já são conhecidos e, a cada passo, expande esse conjunto com o vértice mais próximo que ainda não foi visitado." }
            ]
        },
        {
            nome: "Knapsack (Problema da Mochila)",
             explicacao: [
                { 
                    titulo: "Problema da Mochila (Knapsack)", 
                    texto: "Dado um conjunto de itens, cada um com um peso e um valor, o problema da mochila consiste em determinar quais itens colocar em uma mochila com capacidade limitada de peso, de forma a maximizar o valor total." },
                 { 
                    titulo: "Aplicação", 
                    texto: "É um problema clássico de otimização, usado em áreas como alocação de recursos, logística e finanças para tomar as melhores decisões com restrições." }
            ]
        },
        {
            nome: "Matriz DR",
             explicacao: [
                { 
                    titulo: "Matriz de Distâncias e Roteamento", 
                    texto: "A Matriz de Distâncias e Roteamento é uma estrutura que armazena as distâncias (ou custos) entre todos os pares de vértices em um grafo. É a base para algoritmos que precisam conhecer todos os caminhos." },
                 { 
                    titulo: "Exemplo de Uso", 
                    texto: "O algoritmo de Floyd-Warshall, por exemplo, utiliza essa abordagem para calcular os caminhos mais curtos entre todos os pares de nós de uma só vez, sendo muito útil em planejamento de rotas complexas." }
            ]
        }
    ];

    const backgroundImages = [
        '../img/wallpaperM1.jpg',
        '../img/wallpaperM2.jpg',
        '../img/wallpaperM3.jpg',
        '../img/wallpaperM4.jpg',
        '../img/wallpaperM5.jpg'
    ];
    const initialWallpaper = '../img/wallpaperM.jpg';

    let currentBgIndex = 0;
    let currentIndex = 0;

    const nextAlgoBtn = $("#next-algo-btn");
    const backToStartBtn = $("#back-to-start-btn");

    function updateAlgorithmView(index) {
        const algo = algoritmos[index];
        const carouselTrack = $('.carousel-track');
        $('.example-title').text(algo.nome);
        carouselTrack.empty();
        let carouselItemsHTML = '';
        algo.explicacao.forEach(slide => {
            carouselItemsHTML += `
                <div class="carousel-item">
                    <h3>${slide.titulo}</h3>
                    <p>${slide.texto}</p>
                </div>
            `;
        });
        carouselTrack.html(carouselItemsHTML);
        $('.opitons-menu-demo .menu-option').removeClass('active').first().addClass('active');
        $('.body-content').hide().first().show();
        initCustomCarousel();
    }

    function playWarpTransition(onCompleteCallback) {
        const tl = gsap.timeline();
        tl.call(triggerWarp);
        tl.to('#flash-overlay', { opacity: 1, duration: 1, ease: "power2.in" }, "+=0.5");
        tl.call(() => {
            currentBgIndex = (currentBgIndex + 1) % backgroundImages.length;
            $('body').css('background-image', `url('${backgroundImages[currentBgIndex]}')`);
            if (onCompleteCallback) onCompleteCallback();
        });
        tl.to('#flash-overlay', { opacity: 0, duration: 1.5 }, "+=0.2");
    }

    $('#start-journey-btn').on('click', function() {
        gsap.to(['header', 'main > .about'], {
            duration: 0.5,
            opacity: 0,
            onComplete: function() {
                $(this.targets()).addClass('hidden').css('display', 'none'); 

                if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) { window.pJSDom[0].pJS.fn.vendors.destroypJS(); }
                $('#particles-js').remove();
                $('#starfield').show();
                playWarpTransition(() => {
                    $('#journey-container').removeClass('hidden').css({ 'display': 'flex' });
                    nextAlgoBtn.removeClass('hidden');

                    gsap.fromTo('#journey-container', { scale: 0.5, autoAlpha: 0 }, { duration: 2.0, scale: 1, autoAlpha: 1, ease: "power2.out", delay: 1.5 });
                    gsap.fromTo(nextAlgoBtn, { autoAlpha: 0 }, { duration: 1, autoAlpha: 1, delay: 2.5 });
                });
            }
        });
    });

    $('#next-algo-btn').on('click', function() {
        gsap.to('.algoritmos', {
            duration: 0.4, autoAlpha: 0, scale: 0.9, ease: "power2.in",
            onComplete: () => {
                playWarpTransition(() => {
                    currentIndex++;
                    if (currentIndex >= algoritmos.length) {
                        currentIndex = 0;
                    }
                    updateAlgorithmView(currentIndex);

                    if (currentIndex === algoritmos.length - 1) {
                        nextAlgoBtn.addClass('hidden');
                        backToStartBtn.removeClass('hidden');
                    }

                    gsap.fromTo('.algoritmos', { scale: 0.5, autoAlpha: 0 }, { duration: 1.5, scale: 1, autoAlpha: 1, ease: "power2.out", delay: 1.0 });
                });
            }
        });
    });

    $('#back-to-start-btn').on('click', function() {
        gsap.to('#journey-container', {
            duration: 0.5, autoAlpha: 0, scale: 0.9, ease: "power2.in",
            onComplete: () => {
                $('#journey-container, #back-to-start-btn').addClass('hidden');
                $('#starfield').hide();
                $('body').css('background-image', `url('${initialWallpaper}')`);

                if ($('#particles-js').length === 0) {
                    $('<div id="particles-js"></div>').insertBefore('#starfield');
                }

                window.pJSDom = []; 
                particlesJS("particles-js", { 
                    particles: { 
                        number: { value: 80, density: { enable: true, value_area: 800 } },
                        color: { value: "#ffffff" }, shape: { type: "circle" }, 
                        opacity: { value: 0.5, random: false }, 
                        size: { value: 3, random: true }, 
                        line_linked: { enable: true, distance: 150, color: "#959595", opacity: 0.4, width: 1 },
                        move: { 
                            enable: true, 
                            speed: 2, 
                            direction: "none", 
                            random: false, 
                            straight: false, 
                            out_mode: "out", 
                            bounce: false 
                        }},
                        interactivity: { 
                            detect_on: "canvas", 
                            events: { 
                                onhover: { enable: true, mode: "grab" }, 
                                onclick: { enable: true, mode: "push" }, 
                                resize: true 
                            }, 
                            modes: { 
                                grab: { distance: 140, line_linked: { opacity: 1 } }, 
                                push: { particles_nb: 4 } } }, retina_detect: true });
                
                $('header, main > .about').removeClass('hidden').removeAttr('style');
                gsap.fromTo(['header', 'main > .about'], { opacity: 0 }, { duration: 1, opacity: 1, delay: 0.5 });
                
                currentIndex = 0;
                currentBgIndex = 0;
                updateAlgorithmView(currentIndex);
            }
        });
    });
    
    updateAlgorithmView(currentIndex);

    function applyButtonAnimation(button) {
        if (button.length) {
            const btnFill = button.find(".btn-viagem-fill");
            button.on("mouseenter", function(e) { const rect = this.getBoundingClientRect(); const x = e.clientX - rect.left; const y = e.clientY - rect.top; gsap.set(btnFill, { top: y, left: x }); gsap.to(btnFill, { scale: 4, duration: 0.4, ease: "power2.out" }); });
            button.on("mousemove", function(e) { const rect = this.getBoundingClientRect(); const x = e.clientX - rect.left; const y = e.clientY - rect.top; gsap.to(btnFill, { top: y, left: x, duration: 0.1 }); });
            button.on("mouseleave", function() { gsap.to(btnFill, { scale: 0, duration: 0.3, ease: "power2.in" }); });
        }
    }

    applyButtonAnimation(nextAlgoBtn);
    applyButtonAnimation(backToStartBtn);
});