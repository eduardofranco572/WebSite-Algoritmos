const algoritmos = [
    {
        nome: "Busca em Largura (BFS)",
        exampleInitFunction: 'initBFSGraph',
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
        ],
        code: `
public class Main {
    static class User{
        String name;
        int proximidade; 

        public User(String name, int proximidade){
            this.name = name;
            this.proximidade = proximidade;
        }

        public String getName() {
            return name;
        }

        public int getProximidade() {
            return proximidade;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        Map<String, List<String>> conexoes = new HashMap<>();

        int n = sc.nextInt();
        sc.nextLine();

        for(int i = 0; i < n; i++){
            String line = sc.nextLine();
            String[] names = line.split(" ");
            String name1 = names[0];
            String name2 = names[1];

            conexoes.computeIfAbsent(name1, k -> new ArrayList<>()).add(name2);
            conexoes.computeIfAbsent(name2, k -> new ArrayList<>()).add(name1);
        }

        int n2 = sc.nextInt();
        sc.nextLine();

        for(int i = 0; i < n2; i++){
            String line2 = sc.nextLine();
            String[] queryNames = line2.split(" ");
            String origem = queryNames[0];
            String destino = queryNames[1];

            Queue<User> fila = new LinkedList<>();
            Set<String> visitado = new HashSet<>();

            int distanciaFinal = -1;

            fila.add(new User(origem, 0));
            visitado.add(origem);

            while(!fila.isEmpty()){
                User atualUser = fila.poll();
                String atualName = atualUser.getName();
                int atualDist = atualUser.getProximidade();

                if(atualName.equals(destino)){
                    distanciaFinal = atualDist;
                    break;
                }

                List<String> amigos = conexoes.get(atualName);

                if(amigos == null) continue;

                for(String amigo : amigos){
                    if(!visitado.contains(amigo)){
                        visitado.add(amigo);
                        fila.add(new User(amigo, atualDist + 1));
                    }
                }
            }

            System.out.print(origem + "-" + destino + " = ");
            if (distanciaFinal != -1) {
                System.out.println(distanciaFinal);
            } else {
                System.out.println("sem conexao");
            }
        }
    }
}
        `
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
        ],
        code: `
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;
import java.util.StringTokenizer;

/**
 * Solucao para um problema de caminho mais curto em estilo de maratona de programacao.
 * Esta classe e autossuficiente e le da entrada padrao e escreve na saida padrao.
 */
public class RotaDeEntrega {

    // Constante para representar distancia infinita.
    // Usar Long.MAX_VALUE para evitar overflow em somas de caminhos longos.
    static final long INFINITO = Long.MAX_VALUE;

    // Estrutura para representar uma aresta (conexao entre cruzamentos).
    // 'record' e uma forma concisa de criar classes de dados imutaveis.
    // Implementa Comparable para que a PriorityQueue possa ordenar pelo custo.
    static record Aresta(int para, int custo) implements Comparable<Aresta> {
        @Override
        public int compareTo(Aresta outra) {
            return Integer.compare(this.custo, outra.custo);
        }
    }

    public static void main(String[] args) throws IOException {
        // Setup para leitura rapida de input (padrao em maratonas)
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        // Leitura de N (vertices/cruzamentos) e M (arestas/ruas)
        int n = Integer.parseInt(st.nextToken());
        int m = Integer.parseInt(st.nextToken());

        // Criacao do grafo como uma lista de adjacencia.
        // Usamos n+1 para trabalhar com indices de 1 a N, o que simplifica o codigo.
        List<List<Aresta>> grafo = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            grafo.add(new ArrayList<>());
        }

        // Leitura das M arestas e populando o grafo.
        for (int i = 0; i < m; i++) {
            st = new StringTokenizer(br.readLine());
            int u = Integer.parseInt(st.nextToken());
            int v = Integer.parseInt(st.nextToken());
            int w = Integer.parseInt(st.nextToken());
            // O grafo e nao-direcionado (mao dupla)
            grafo.get(u).add(new Aresta(v, w));
            grafo.get(v).add(new Aresta(u, w));
        }

        // Leitura da origem (S) e destino (D)
        st = new StringTokenizer(br.readLine());
        int origem = Integer.parseInt(st.nextToken());
        int destino = Integer.parseInt(st.nextToken());

        // Array para armazenar as menores distancias encontradas da origem ate cada vertice.
        long[] distancias = new long[n + 1];
        Arrays.fill(distancias, INFINITO);

        // Fila de prioridade para executar Dijkstra. Armazena o vertice e o custo para alcanca-lo.
        PriorityQueue<Aresta> pq = new PriorityQueue<>();

        // Inicio do algoritmo: a distancia da origem para si mesma e 0.
        distancias[origem] = 0;
        pq.add(new Aresta(origem, 0));

        while (!pq.isEmpty()) {
            // Pega o vertice da fila com a menor distancia atual.
            Aresta atual = pq.poll();
            int u = atual.para;
            long distU = atual.custo;

            // Otimizacao: se ja encontramos um caminho mais curto para 'u', ignoramos este.
            if (distU > distancias[u]) {
                continue;
            }
            
            // Otimizacao: se chegamos ao destino, podemos parar, pois Dijkstra garante
            // que a primeira vez que visitamos um no, e pelo caminho mais curto.
            if (u == destino) {
                break;
            }

            // "Relaxamento": Itera sobre os vizinhos de 'u'.
            for (Aresta vizinho : grafo.get(u)) {
                int v = vizinho.para;
                int pesoAresta = vizinho.custo;

                // Se encontramos um caminho melhor para 'v' atraves de 'u'...
                if (distancias[u] + pesoAresta < distancias[v]) {
                    // ...atualizamos a distancia e adicionamos a fila de prioridade.
                    distancias[v] = distancias[u] + pesoAresta;
                    pq.add(new Aresta(v, (int) distancias[v]));
                }
            }
        }

        // Preparacao do output
        long resultado = distancias[destino];

        if (resultado == INFINITO) {
            System.out.println(-1); // Caminho inexistente
        } else {
            System.out.println(resultado); // Imprime o menor tempo
        }
    }
}
        `
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
        ],
        code: `
import java.util.Scanner;

public class Reforma {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        while (scanner.hasNext()) {
            int N = scanner.nextInt(); // Tamanho total
            int Q = scanner.nextInt(); // Quantidade de pecas

            int[] pecas = new int[Q];
            for (int i = 0; i < Q; i++) {
                pecas[i] = scanner.nextInt();
            }

            // A capacidade da "mochila" e o tamanho N
            boolean[] dp = new boolean[N + 1];
            dp[0] = true;

            // Para cada peca, tente coloca-la na "mochila"
            for (int peca : pecas) {
                // Itera de tras para frente para garantir que cada peca seja usada no maximo uma vez
                for (int j = N; j >= peca; j--) {
                    if (dp[j - peca]) {
                        dp[j] = true;
                    }
                }
            }

            // O resultado esta na ultima posicao da nossa tabela de programacao dinamica
            if (dp[N]) {
                System.out.println("SIM");
            } else {
                System.out.println("NAO");
            }
        }
        scanner.close();
    }
}
        `
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
        ],
        code: `
public class CaesarCipher {
    public String encrypt(String text, int shift) {
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < text.length(); i++) {
            char ch = text.charAt(i);
            if (Character.isLetter(ch)) {
                char base = Character.isLowerCase(ch) ? 'a' : 'A';
                ch = (char) ((ch - base + shift) % 26 + base);
            }
            result.append(ch);
        }
        return result.toString();
    }
}
        `
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
        ],
        code: `
public class MatrixDR {
    public void traverse(int[][] matrix) {
        int totalLinhas2 = matriz2.length;
        int totalColuna2 = matriz2[0].length;

        int linhaInicial = 1;
        int ColunaInicial = 2;

        // Vetores de movimento para 8 direcoes
        // Cima, Baixo, Esquerda, Direita, Sup-Esq, Sup-Dir, Inf-Esq, Inf-Dir
        int[] drL = {-1,  1,  0,  0, -1, -1,  1,  1};
        int[] dcC = { 0,  0, -1,  1, -1,  1, -1,  1};

        // O laco agora vai de 0 a 7 (8 iteracoes)
        for (int i = 0; i < 8; i++) {
            int VizinhoL = linhaInicial + drL[i];
            int VizinhoC = ColunaInicial + dcC[i];

            if (VizinhoL >= 0 && VizinhoL < totalLinhas2 && VizinhoC >= 0 && VizinhoC < totalColuna2) {
                System.out.println("Vizinho encontrado em matriz[" + VizinhoL + "][" + VizinhoC + "] = " + matriz2[VizinhoL][VizinhoC]);
            } else {
                System.out.println("Vizinho em (" + VizinhoL + ", " + VizinhoC + ") esta fora dos limites da matriz.");
            }
        }
    }
}
        `
    }
];