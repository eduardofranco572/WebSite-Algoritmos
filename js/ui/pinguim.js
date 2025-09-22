$(document).ready(function() {
    // --- LÓGICA DA VIAGEM ---
    const algoritmos = [
        {
            nome: "Busca em Largura (BFS)",
            explicacao: [
                { titulo: "Busca em Largura (BFS)", texto: "Esse algoritmo é capaz de obter a menor distância entre dois nós de um grafo não ponderado. O BFS encontra o menor caminho verificando todas as direções à sua volta, é como uma gota d'água que se espalha uniformemente, explorando todos os caminhos possíveis antes de avançar para o próximo nível. Isso garante que a primeira vez que um nó é alcançado, é pelo caminho mais curto possível." },
                { titulo: "Como Funciona?", texto: "O BFS utiliza uma estrutura de dados de fila (FIFO - First-In, First-Out). Ele começa em um nó raiz, explora todos os seus vizinhos e, em seguida, para cada um desses vizinhos, explora os vizinhos ainda não visitados, e assim por diante, nível por nível no grafo." },
                { titulo: "Casos de Uso", texto: "É amplamente utilizado para encontrar o caminho mais curto em grafos sem pesos, em web crawlers para descobrir todas as páginas de um site, em redes sociais para encontrar \"amigos de amigos\" e na solução de quebra-cabeças como o Cubo de Rubik." }
            ]
        },
        {
            nome: "Dijkstra",
            explicacao: [
                { titulo: "Algoritmo de Dijkstra", texto: "O algoritmo de Dijkstra encontra o caminho mais curto entre os nós em um grafo ponderado, onde as arestas têm custos. Ele é ideal para problemas como encontrar a rota mais rápida em um mapa GPS." },
                { titulo: "Funcionamento", texto: "Ele funciona mantendo um conjunto de vértices cujos caminhos mais curtos a partir da origem já são conhecidos e, a cada passo, expande esse conjunto com o vértice mais próximo que ainda não foi visitado." }
            ]
        },
        {
            nome: "Knapsack (Problema da Mochila)",
             explicacao: [
                { titulo: "Problema da Mochila (Knapsack)", texto: "Dado um conjunto de itens, cada um com um peso e um valor, o problema da mochila consiste em determinar quais itens colocar em uma mochila com capacidade limitada de peso, de forma a maximizar o valor total." },
                 { titulo: "Aplicação", texto: "É um problema clássico de otimização, usado em áreas como alocação de recursos, logística e finanças para tomar as melhores decisões com restrições." }
            ]
        },
        {
            nome: "Matriz DR",
             explicacao: [
                { titulo: "Matriz de Distâncias e Roteamento", texto: "A Matriz de Distâncias e Roteamento é uma estrutura que armazena as distâncias (ou custos) entre todos os pares de vértices em um grafo. É a base para algoritmos que precisam conhecer todos os caminhos." },
                 { titulo: "Exemplo de Uso", texto: "O algoritmo de Floyd-Warshall, por exemplo, utiliza essa abordagem para calcular os caminhos mais curtos entre todos os pares de nós de uma só vez, sendo muito útil em planejamento de rotas complexas." }
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
    let currentBgIndex = 0;
    let currentIndex = 0;

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

    // --- FUNÇÃO DE ANIMAÇÃO DE VIAGEM REUTILIZÁVEL ---
    function playWarpTransition(onCompleteCallback) {
        const tl = gsap.timeline();

        // 1. Ativa o warp (aceleração)
        tl.call(triggerWarp);

        // 2. Fade to white (flash)
        tl.to('#flash-overlay', {
            opacity: 1,
            duration: 1,
            ease: "power2.in"
        }, "+=0.5");

        // 3. No pico do branco, executa o callback (troca de conteúdo e fundo)
        tl.call(() => {
            // Troca a imagem de fundo
            currentBgIndex = (currentBgIndex + 1) % backgroundImages.length;
            $('body').css('background-image', `url('${backgroundImages[currentBgIndex]}')`);

            if (onCompleteCallback) {
                onCompleteCallback();
            }
        });

        // 4. Fade out do branco para revelar o novo conteúdo
        tl.to('#flash-overlay', {
            opacity: 0,
            duration: 0.5
        }, "+=0.2");
    }


    // --- TRANSIÇÃO INICIAL ---
    $('#start-journey-btn').on('click', function() {
        gsap.to(['header', 'main > .about'], {
            duration: 0.5,
            opacity: 0,
            onComplete: function() {
                $(this.targets()).addClass('hidden').css('display', 'none');
                
                // Remove o background de particulas e mostra o de estrelas
                if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) { window.pJSDom[0].pJS.fn.vendors.destroypJS(); }
                $('#particles-js').remove();
                $('#starfield').show();
                
                // Inicia a animação de viagem
                playWarpTransition(() => {
                    // Mostra o container do algoritmo
                     $('#journey-container, #next-algo-btn').removeClass('hidden').css({
                        'display': 'flex',
                        'opacity': 1
                    });
                });
            }
        });
    });


    // --- TRANSIÇÃO ENTRE ALGORITMOS ---
    $('#next-algo-btn').on('click', function() {
        const tl = gsap.timeline();
        
        // 1. Some com o card atual
        tl.to('.algoritmos', {
            duration: 0.4,
            autoAlpha: 0,
            scale: 0.9,
            ease: "power2.in",
            onComplete: () => {
                // 2. Inicia a viagem
                playWarpTransition(() => {
                    // 3. Atualiza o conteúdo do card
                    currentIndex = (currentIndex + 1) % algoritmos.length;
                    updateAlgorithmView(currentIndex);

                    // 4. Mostra o novo card subitamente
                    gsap.set('.algoritmos', {
                        autoAlpha: 1,
                        scale: 1
                    });
                });
            }
        });
    });

    updateAlgorithmView(currentIndex);
});