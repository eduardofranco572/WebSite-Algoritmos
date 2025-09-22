// Trab Maromo/js/ui/pinguim.js
$(document).ready(function() {
    // --- LÓGICA DA TRANSIÇÃO ---
    $('#start-journey-btn').on('click', function() {
        gsap.to(['header', 'main', 'footer'], {
            duration: 0.5,
            opacity: 0,
            onComplete: function() {
                $(this.targets()).addClass('hidden').css('display', 'none');
            }
        });

        gsap.fromTo('#journey-container, #next-algo-btn', 
            { display: 'none', opacity: 0 }, 
            {
                delay: 0.5,
                duration: 0.8,
                display: 'flex',
                opacity: 1,
                onStart: function() {
                    $('#journey-container, #next-algo-btn').removeClass('hidden');
                }
            }
        );
    });

    // --- LÓGICA DA VIAGEM ENTRE ALGORITMOS ---
    // Estrutura de dados atualizada para suportar múltiplos slides
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
        
        // 1. Limpa os slides antigos
        carouselTrack.empty();

        let carouselItemsHTML = '';
        // 2. Cria um loop para gerar todos os slides do algoritmo atual
        algo.explicacao.forEach(slide => {
            carouselItemsHTML += `
                <div class="carousel-item">
                    <h3>${slide.titulo}</h3>
                    <p>${slide.texto}</p>
                </div>
            `;
        });

        // 3. Adiciona todos os novos slides ao carrossel
        carouselTrack.html(carouselItemsHTML);

        console.log("Carregando algoritmo:", algo.nome);

        // Reseta as abas e a visualização
        $('.opitons-menu-demo .menu-option').removeClass('active');
        $('.opitons-menu-demo .menu-option').first().addClass('active');
        $('.body-content').hide();
        $('.body-explanation').show();

        // 4. Reinicia o carrossel com os novos slides
        initCustomCarousel();

        if (algo.nome !== "Busca em Largura (BFS)") {
            $('#cy').empty();
        }
    }

    $('#next-algo-btn').on('click', function() {
        currentIndex = (currentIndex + 1) % algoritmos.length;
        updateAlgorithmView(currentIndex);
    });

    // Inicia a visualização com o primeiro algoritmo
    updateAlgorithmView(currentIndex);
});