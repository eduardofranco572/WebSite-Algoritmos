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

    // --- TRANSIÇÃO INICIAL ---
    $('#start-journey-btn').on('click', function() {
        const tl = gsap.timeline();
        
        // 1. Some com o conteúdo inicial
        tl.to(['header', 'main > .about'], {
            duration: 0.5,
            opacity: 0,
            onComplete: function() {
                $(this.targets()).addClass('hidden').css('display', 'none');
            }
        });

        // 2. Some com as partículas
        tl.to('#particles-js', {
            duration: 0.5,
            opacity: 0,
            onComplete: () => {
                if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
                    window.pJSDom[0].pJS.fn.vendors.destroypJS();
                }
                $('#particles-js').remove();
            }
        }, "-=0.5");
        
        // 3. Ativa o warp do starfield e mostra o canvas
        tl.call(function() {
            $('#starfield').show();
            triggerWarp(); 
        });
        
        // 4. Mostra o journey-container vindo do "fundo"
        tl.fromTo('#journey-container, #next-algo-btn', 
            { scale: 0, opacity: 0 },
            {
                duration: 2,
                scale: 1,
                opacity: 1,
                ease: "power2.inOut",
                onStart: function() {
                    $('#journey-container, #next-algo-btn').removeClass('hidden').css('display', 'flex');
                }
            }, 
            "+=0.2" // Começa um pouco depois do warp
        );
    });

    // --- TRANSIÇÃO ENTRE ALGORITMOS ---
    $('#next-algo-btn').on('click', function() {
        const tl = gsap.timeline();
        
        // 1. Some com o card atual
        tl.to('.algoritmos', {
            duration: 0.4,
            opacity: 0,
            scale: 0.9,
            ease: "power2.in"
        });
        
        // 2. Ativa o warp
        tl.call(triggerWarp);
        
        // 3. Atualiza e mostra o novo card
        tl.call(function() {
            currentIndex = (currentIndex + 1) % algoritmos.length;
            updateAlgorithmView(currentIndex);
        }, null, "+=0.5"); // Espera um pouco para atualizar o conteúdo

        tl.fromTo('.algoritmos', 
            { scale: 0, opacity: 0 },
            {
                delay: 1, // Espera a maior parte do warp passar
                duration: 1,
                scale: 1,
                opacity: 1,
                ease: "power2.out"
            }
        );
    });

    // Inicializa a view do primeiro algoritmo no carregamento da página
    updateAlgorithmView(currentIndex);
});