$(document).ready(function() {
    // --- LÓGICA DA TRANSIÇÃO ---
    $('#start-journey-btn').on('click', function() {
        const tl = gsap.timeline();

        // 1. Faz o conteúdo inicial desaparecer (header e a seção 'about')
        tl.to(['header', 'main > .about'], {
            duration: 0.5,
            opacity: 0,
            onComplete: function() {
                $(this.targets()).addClass('hidden').css('display', 'none');
            }
        }, 0);

        // 2. Desliga a animação de partículas e remove o elemento
        tl.to('#particles-js', { 
            duration: 0.5, 
            opacity: 0, 
            onComplete: () => {
                if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
                    window.pJSDom[0].pJS.fn.vendors.destroypJS();
                    window.pJSDom = [];
                }
                $('#particles-js').remove();
            }
        }, 0);

        // 3. Ativa a dobra e mostra o canvas de estrelas (sem alterar o fundo do body)
        tl.call(function() {
            $('#starfield').show();
            triggerWarp();
        });

        // 4. Mostra o novo conteúdo (journey-container) após a animação de dobra
        tl.fromTo('#journey-container, #next-algo-btn', 
            { display: 'none', opacity: 0 }, 
            {
                duration: 0.8,
                display: 'flex',
                opacity: 1,
                onStart: function() {
                    $('#journey-container, #next-algo-btn').removeClass('hidden');
                }
            }, 
            "+=1.5" // Espera 1.5s (duração da dobra) para começar
        );
    });

    // --- LÓGICA DA VIAGEM ENTRE ALGORITMOS (sem alterações) ---
    const algoritmos = [
        {
            nome: "Busca em Largura (BFS)",
            explicacao: [
                {
                    titulo: "Busca em Largura (BFS)",
                    texto: "Esse algoritmo é capaz de obter a menor distância entre dois nós de um grafo não ponderado. O BFS encontra o menor caminho verificando todas as direções à sua volta, é como uma gota d'água que se espalha uniformemente, explorando todos os caminhos possíveis antes de avançar para o próximo nível. Isso garante que a primeira vez que um nó é alcançado, é pelo caminho mais curto possível."
                },
                {
                    titulo: "Como Funciona?",
                    texto: "O BFS utiliza uma estrutura de dados de fila (FIFO - First-In, First-Out). Ele começa em um nó raiz, explora todos os seus vizinhos e, em seguida, para cada um desses vizinhos, explora os vizinhos ainda não visitados, e assim por diante, nível por nível no grafo."
                },
                {
                    titulo: "Casos de Uso",
                    texto: "É amplamente utilizado para encontrar o caminho mais curto em grafos sem pesos, em web crawlers para descobrir todas as páginas de um site, em redes sociais para encontrar \"amigos de amigos\" e na solução de quebra-cabeças como o Cubo de Rubik."
                }
            ]
        },
        {
            nome: "Dijkstra",
            explicacao: [
                {
                    titulo: "Algoritmo de Dijkstra",
                    texto: "O algoritmo de Dijkstra encontra o caminho mais curto entre os nós em um grafo ponderado, onde as arestas têm custos. Ele é ideal para problemas como encontrar a rota mais rápida em um mapa GPS."
                },
                {
                    titulo: "Funcionamento",
                     texto: "Ele funciona mantendo um conjunto de vértices cujos caminhos mais curtos a partir da origem já são conhecidos e, a cada passo, expande esse conjunto com o vértice mais próximo que ainda não foi visitado."
                }
            ]
        },
        {
            nome: "Knapsack (Problema da Mochila)",
             explicacao: [
                {
                    titulo: "Problema da Mochila (Knapsack)",
                    texto: "Dado um conjunto de itens, cada um com um peso e um valor, o problema da mochila consiste em determinar quais itens colocar em uma mochila com capacidade limitada de peso, de forma a maximizar o valor total."
                },
                 {
                    titulo: "Aplicação",
                    texto: "É um problema clássico de otimização, usado em áreas como alocação de recursos, logística e finanças para tomar as melhores decisões com restrições."
                }
            ]
        },
        {
            nome: "Matriz DR",
             explicacao: [
                {
                    titulo: "Matriz de Distâncias e Roteamento",
                    texto: "A Matriz de Distâncias e Roteamento é uma estrutura que armazena as distâncias (ou custos) entre todos os pares de vértices em um grafo. É a base para algoritmos que precisam conhecer todos os caminhos."
                },
                 {
                    titulo: "Exemplo de Uso",
                    texto: "O algoritmo de Floyd-Warshall, por exemplo, utiliza essa abordagem para calcular os caminhos mais curtos entre todos os pares de nós de uma só vez, sendo muito útil em planejamento de rotas complexas."
                }
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

        $('.opitons-menu-demo .menu-option').removeClass('active');
        $('.opitons-menu-demo .menu-option').first().addClass('active');
        $('.body-content').hide();
        $('.body-explanation').show();

        initCustomCarousel();

        if (algo.nome !== "Busca em Largura (BFS)") {
            $('#cy').empty();
        }
    }

    $('#next-algo-btn').on('click', function() {
        triggerWarp();

        gsap.to('.algoritmos', {
            duration: 0.4,
            opacity: 0,
            onComplete: function() {
                currentIndex = (currentIndex + 1) % algoritmos.length;
                updateAlgorithmView(currentIndex);
                gsap.to('.algoritmos', {
                    delay: 1.5,
                    duration: 0.4,
                    opacity: 1
                });
            }
        });
    });

    updateAlgorithmView(currentIndex);
});
