$(document).ready(function() {
    // Array de objetos, onde cada objeto representa um algoritmo
    const algoritmos = [
        {
            nome: "Busca em Largura (BFS)",
            // Nome da função JS que inicia a animação deste algoritmo
            exampleInitFunction: 'initBFSGraph',
            // HTML que será injetado na aba "Exemplo" para este algoritmo
            exampleHtml: `
                <h2 class="example-title">Busca em Largura (BFS)</h2>
                <div id="cy-graph" class="grafo-bfs"></div>
                <div class="animation-controls">
                    <button id="animate-btn" class="btn-animate">
                        <span class="material-symbols-outlined">play_arrow</span>
                    </button>
                </div>
            `,
            explicacao: [
                {
                    titulo: "Busca em Largura (BFS)",
                    texto: "A Busca em Largura (Breadth-First Search - BFS) é um algoritmo de travessia ou busca em estruturas de dados como árvores e grafos. Ele explora os vizinhos de um nó antes de se aprofundar nos vizinhos dos vizinhos, visitando todos os nós em um mesmo nível antes de prosseguir para o próximo nível.",
                    img: "../img/animacao_acenando.gif"
                },
                {
                    titulo: "Como Funciona?",
                    texto: "O algoritmo utiliza uma fila para controlar os nós a serem visitados. Inicia-se em um nó raiz, que é adicionado à fila. Em seguida, o primeiro nó da fila é removido e seus vizinhos ainda não visitados são adicionados ao final da fila. Esse processo se repete até que a fila esteja vazia, garantindo que a exploração seja feita camada por camada.",
                    img: "../img/animacao_apontando.gif"
                },
                {
                    titulo: "Visualização",
                    imgExemple: "../img/algorithms/bfs.webp",
                },
                {
                    titulo: "Casos de Uso",
                    texto: "A BFS é ideal para encontrar o caminho mais curto entre dois nós em um grafo não ponderado. É amplamente utilizada em redes de computadores para encontrar todos os computadores alcançáveis, em redes sociais para sugerir amizades (amigos de amigos).",
                    img: "../img/animacao_olhando.gif"
                }
            ]
        },
        {
            nome: "Algoritmo de Dijkstra",
            exampleInitFunction: 'initDijkstraGraph',
            exampleHtml: `
                <h2 class="example-title">Algoritmo de Dijkstra</h2>
                <div id="cy-graph" class="grafo-bfs"></div>
                <div class="animation-controls">
                    <button id="animate-btn" class="btn-animate">
                        <span class="material-symbols-outlined">play_arrow</span> Animar
                    </button>
                    <p id="animation-result" style="display: none; margin-top: 10px; font-weight: bold; color: #f0f0f0;"></p>
                </div>
            `,
            explicacao: [
                {
                    titulo: "Algoritmo de Dijkstra",
                    texto: "O Algoritmo de Dijkstra é um dos mais famosos algoritmos para encontrar o caminho mais curto entre um nó inicial e todos os outros nós em um grafo com pesos (custos) não negativos nas arestas. Ele é a base para muitos protocolos de roteamento e sistemas de navegação.",
                    img: "../img/animacao_acenando.gif"
                },
                {
                    titulo: "Como Funciona?",
                    texto: "Dijkstra utiliza uma abordagem 'gananciosa' (greedy). Ele mantém um registro da menor distância conhecida do ponto de partida até cada nó. A cada passo, ele visita o nó não visitado com a menor distância e atualiza as distâncias para seus vizinhos, caso um caminho mais curto seja encontrado através dele. O processo se repete até que o destino seja alcançado ou todos os nós tenham sido visitados.",
                    img: "../img/animacao_apontando.gif"
                },
                {
                    titulo: "Visualização",
                    imgExemple: "../img/algorithms/dijkstra.png",
                },
                {
                    titulo: "Casos de Uso",
                    texto: "É fundamental em aplicações de roteamento. Sistemas de GPS (como Google Maps e Waze) usam variações de Dijkstra para calcular a rota mais rápida. Em redes de computadores, ele é usado em protocolos como OSPF para determinar o melhor caminho para pacotes de dados. Também é aplicado em logística e qualquer problema que envolva encontrar a rota de menor custo em uma rede.",
                    img: "../img/animacao_olhando.gif"
                }
            ]
        },
        {
            nome: "Problema da Mochila (Knapsack Problem)",
            exampleInitFunction: 'initKnapsackAnimation',
            exampleHtml: `<div id="knapsack-animation-container"></div>`,
            explicacao: [
                {
                    titulo: "Problema da Mochila (Knapsack Problem)",
                    texto: "O Problema da Mochila é um problema clássico de otimização combinatória. Dado um conjunto de itens, cada um com um peso e um valor, o objetivo é determinar quais itens colocar em uma mochila de capacidade limitada para que o valor total seja o máximo possível, sem ultrapassar o limite de peso.",
                    img: "../img/animacao_acenando.gif"
                },
                {
                    titulo: "Tipos e Soluções",
                    texto: "Existem variações, sendo a mais comum a 'Mochila 0/1', onde cada item pode ser escolhido (1) ou não (0). Esta versão é geralmente resolvida com programação dinâmica. Outra variação é a 'Mochila Fracionária', onde frações de itens podem ser levadas, que pode ser resolvida de forma mais simples com um algoritmo guloso (greedy).",
                    imgBolsa: "../img/animacao_bolsa.gif"
                },
                {
                    titulo: "Visualização",
                    imgExemple: "../img/algorithms/knapsack.jpeg",
                },
                {
                    titulo: "Casos de Uso",
                    texto: "Este problema serve como modelo para diversas situações de alocação de recursos. É usado na seleção de investimentos financeiros para maximizar o retorno dentro de um orçamento, no carregamento de contêineres e caminhões para otimizar o valor da carga, e na alocação de recursos computacionais.",
                    img: "../img/animacao_olhando.gif"
                }
            ]
        },
        {
            nome: "Cifra de César",
            exampleInitFunction: 'initCaesarCipherAnimation',
            exampleHtml: `<div id="caesar-animation-container"></div>`,
            explicacao: [
                {
                    titulo: "Cifra de César",
                    texto: "A Cifra de César é uma das mais simples e antigas técnicas de criptografia. É uma cifra de substituição na qual cada letra do texto original é trocada por outra, localizada um número fixo de posições adiante no alfabeto. O método foi nomeado em homenagem a Júlio César, que o utilizava para proteger suas comunicações.",
                    img: "../img/animacao_acenando.gif"
                },
                {
                    titulo: "Como Funciona?",
                    texto: "O funcionamento baseia-se em um 'deslocamento' (a chave), que é um número inteiro. Por exemplo, com um deslocamento de 3, a letra 'A' se torna 'D', 'B' vira 'E', e assim por diante. Ao chegar ao final do alfabeto, o processo continua do início. Para descriptografar, basta aplicar o mesmo deslocamento no sentido contrário.",
                    img: "../img/animacao_lupa.gif"
                },
                {
                    titulo: "Visualização",
                    imgExemple: "../img/algorithms/caesar.png",
                },
                {
                    titulo: "Casos de Uso",
                    texto: "O principal caso de uso da Cifra de César hoje é no campo educacional. Por sua simplicidade, ela é uma ferramenta excelente e ainda muito utilizada para introduzir os conceitos básicos de criptografia, como cifragem, decifragem e o uso de chaves. Fora da aprendizagem, não tem uso prático para segurança, mas pode ser encontrada em quebra-cabeças e jogos simples.",
                    img: "../img/aanimacao_apontando.gif"
                }
            ]
        },
        {
            nome: "Matriz DR",
            exampleInitFunction: 'initMatrixDRAnimation',
            exampleHtml: `<div id="example-content-container"></div>`, 
            explicacao: [
                { 
                    "titulo": "Matriz DR: Navegação Direcional", 
                    "texto": "A 'Matriz DR' é uma técnica utilizada para percorrer células vizinhas em uma matriz ou grade. O nome se refere ao uso de vetores de direção, geralmente chamados de 'dr' (delta linha) e 'dc' (delta coluna), que armazenam os deslocamentos necessários para alcançar as células adjacentes a partir de um ponto de origem.",
                    "img": "../img/animacao_acenando.gif"
                },
                { 
                    "titulo": "Como Funciona?", 
                    "texto": "Para encontrar os vizinhos, um laço 'for' percorre os vetores de direção. Em cada iteração 'i', as coordenadas de um novo vizinho são calculadas somando a posição atual com os valores de dr[i] e dc[i]. Em seguida, um 'if' realiza validações essenciais para o algoritmo.",
                    "img": "../img/aanimacao_apontando.gif"
                },
                { 
                    "titulo": "Casos de Uso", 
                    "texto": "Esta abordagem é a base para a implementação de diversos algoritmos clássicos em grades, como a Busca em Largura (BFS) para encontrar o caminho mais curto, a Busca em Profundidade (DFS) para explorar labirintos, e em soluções de problemas como 'flood fill' (pintura) e jogos de tabuleiro.",
                    "img": "../img/animacao_olhando.gif"
                }
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
        const exampleContainer = $('#example-content-container');

        carouselTrack.empty();
        let carouselItemsHTML = '';
        algo.explicacao.forEach(slide => {
            if (slide.imgExemple) {
                carouselItemsHTML += `
                    <div class="carousel-item">
                        <h3>${slide.titulo}</h3>
                        <div class="imgExemple">
                            <img src="${slide.imgExemple}" alt="Visualização do algoritmo">
                        </div>
                    </div>
                `;
            } else if (slide.imgBolsa && slide.texto) {
                carouselItemsHTML += `
                    <div class="carousel-item with-image">
                        <h3>${slide.titulo}</h3>
                        <p>${slide.texto}</p>
                        <div class="image-container">
                            <img class="imgBolsa" src="${slide.imgBolsa}" alt="Animação de uma bolsa">
                        </div>
                    </div>
                `;
            } else if (slide.img && slide.texto) {
                carouselItemsHTML += `
                    <div class="carousel-item with-image">
                        <h3>${slide.titulo}</h3>
                        <p>${slide.texto}</p>
                        <div class="image-container">
                            <img class="img-mascot" src="${slide.img}" alt="Mascote Pinguim">
                        </div>
                    </div>
                `;
            } else if (slide.texto) {
                carouselItemsHTML += `
                    <div class="carousel-item">
                        <h3>${slide.titulo}</h3>
                        <p>${slide.texto}</p>
                    </div>
                `;
            }
        });
        carouselTrack.html(carouselItemsHTML);

        exampleContainer.html(algo.exampleHtml || '<p style="color: #fff;">Exemplo não disponível.</p>');

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
                    window.currentIndex = currentIndex;
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
                window.currentIndex = 0;
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

    window.algoritmos = algoritmos;
    window.currentIndex = currentIndex;
});