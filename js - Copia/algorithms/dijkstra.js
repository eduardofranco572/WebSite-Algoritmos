let cyDijkstra;
let dijkstraAnimationTimeline;

/**
 * Inicializa e renderiza o grafo ponderado para a demonstração do Algoritmo de Dijkstra.
 */
function initDijkstraGraph() {
    if (cyDijkstra) { cyDijkstra.destroy(); }
    if (dijkstraAnimationTimeline) { dijkstraAnimationTimeline.kill(); }

    const dijkstraNodes = [
        { data: { id: 'A' }, position: { x: 50, y: 150 } }, { data: { id: 'B' }, position: { x: 150, y: 50 } },
        { data: { id: 'C' }, position: { x: 150, y: 250 } }, { data: { id: 'D' }, position: { x: 250, y: 50 } },
        { data: { id: 'E' }, position: { x: 250, y: 250 } }, { data: { id: 'F' }, position: { x: 350, y: 150 } }
    ];
    const dijkstraEdges = [
        { data: { id: 'AB', source: 'A', target: 'B', weight: 7 } },
        { data: { id: 'AC', source: 'A', target: 'C', weight: 9 } },
        { data: { id: 'BC', source: 'B', target: 'C', weight: 10 } },
        { data: { id: 'BD', source: 'B', target: 'D', weight: 15 } },
        { data: { id: 'CD', source: 'C', target: 'D', weight: 11 } },
        { data: { id: 'CE', source: 'C', target: 'E', weight: 2 } },
        { data: { id: 'DE', source: 'D', target: 'E', weight: 6 } },
        { data: { id: 'EF', source: 'E', target: 'F', weight: 9 } },
        { data: { id: 'DF', source: 'D', target: 'F', weight: 3 } }
    ];

    cyDijkstra = cytoscape({
        container: document.getElementById('cy-graph'),
        elements: dijkstraNodes.concat(dijkstraEdges),
        style: [
            // Estilo base
            {
                selector: 'node',
                style: {
                    'background-color': '#555',
                    'label': 'data(id)',
                    'color': '#ccc',
                    'font-size': '12px',
                    'text-valign': 'center',
                    'width': '30px',
                    'height': '30px',
                    'border-width': 2,
                    'border-color': '#888',
                    'transition-property': 'background-color, border-color, color, transform',
                    'transition-duration': '0.4s'
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 3,
                    'line-color': '#555',
                    'label': 'data(weight)',
                    'color': '#fff',
                    'font-size': '10px',
                    'text-background-color': '#555',
                    'text-background-opacity': 0.8,
                    'transition-property': 'line-color',
                    'transition-duration': '0.4s'
                }
            },

            // Estilo para o nó "visitado"
            {
                selector: '.visited-node',
                style: {
                    'background-color': '#9307e4',
                    'border-color': '#ffffff',
                    'color': '#FFFFFF'
                }
            },

            // Estilo para a aresta "visitada"
            {
                selector: '.visited-edge',
                style: {
                    'line-color': '#9307e4'
                }
            },

            // Classe temporária para destacar o nó atual sem mudar a cor
            {
                selector: '.current',
                style: {
                    'transform': 'scale(1.25)'
                }
            }
        ],
        layout: {
            name: 'preset'
        },
        zoomingEnabled: false,
        userPanningEnabled: false,
        autoungrabify: true
    });

    cyDijkstra.ready(() => {
        cyDijkstra.center();
        cyDijkstra.fit(undefined, 30);
    });

    setupDijkstraAnimationButton();
    return cyDijkstra;
}

/**
 * Executa o algoritmo de Dijkstra e retorna uma lista de "passos" para a animação.
 * Em vez de modificar o grafo diretamente, ele registra cada ação (visitar, destacar)
 * para ser executada sequencialmente pela timeline de animação.
 * @param {string} startId - O ID do nó inicial.
 * @param {string} endId - O ID do nó final.
 * @returns {Array<Object>} Uma lista de objetos que representam os passos da animação.
 */
function getDijkstraAnimationSteps(startId, endId) {
    const distances = {};
    const previous = {};
    const pq = new Set(cyDijkstra.nodes().map(n => n.id()));
    const animationSteps = [];

    cyDijkstra.nodes().forEach(node => {
        distances[node.id()] = Infinity;
        previous[node.id()] = null;
    });

    distances[startId] = 0;

    while (pq.size > 0) {
        let uId = [...pq].reduce((min, current) => distances[current] < distances[min] ? current : min);
        pq.delete(uId);

        animationSteps.push({
            action: 'setCurrent', elementId: uId
        });

        if (previous[uId]) {
             animationSteps.push({
                action: 'setVisited',
                elementIds: [
                    uId,
                    previous[uId].edge
                ]
            });
        } else {
             animationSteps.push({
                action: 'setVisited',
                elementIds: [uId]
            });
        }

        if (uId === endId) break;

        const uNode = cyDijkstra.getElementById(uId);
        uNode.connectedEdges(`[source = "${uId}"]`).forEach(edge => {
            const vId = edge.target().id();
            if (pq.has(vId)) {
                const alt = distances[uId] + edge.data('weight');
                if (alt < distances[vId]) {
                    distances[vId] = alt;
                    previous[vId] = { node: uId, edge: edge.id() };
                }
            }
        });

        animationSteps.push({
            action: 'unsetCurrent',
            elementId: uId
        });
    }

    return animationSteps;
}

/**
 * Configura o botão de animação, tratando os eventos de clique para iniciar,
 * reiniciar e controlar a visualização do algoritmo de Dijkstra.
 */
function setupDijkstraAnimationButton() {
    const btn = $('#animate-btn');
    const btnIcon = btn.find('.material-symbols-outlined');
    const btnTextNode = btn.contents().filter(function() {
        return this.nodeType === 3;
    })[0];

    /**
     * Reseta a animação, limpando os estilos do grafo e redefinindo o botão
     * para o seu estado inicial.
     */
    function resetAnimation() {
        cyDijkstra.elements().removeClass('visited-node visited-edge current');
        btnIcon.text('play_arrow');
        if (btnTextNode) btnTextNode.nodeValue = ' Animar';
        btn.prop('disabled', false).css({
            'background-color': '#f0f0f0',
            'color': '#0e0416'
        });
        if (dijkstraAnimationTimeline) dijkstraAnimationTimeline.kill();
    }

    resetAnimation();

    /**
     * Evento de clique para o botão de animação. Inicia a animação se não estiver ativa,
     * ou a reseta se já tiver sido concluída.
     */
    btn.off('click').on('click', function() {
        if (dijkstraAnimationTimeline && dijkstraAnimationTimeline.isActive()) return;
        if (dijkstraAnimationTimeline && dijkstraAnimationTimeline.progress() === 1) {
            resetAnimation();
            return;
        }

        resetAnimation();

        const animationSteps = getDijkstraAnimationSteps('A', 'F');
        dijkstraAnimationTimeline = gsap.timeline();

        animationSteps.forEach(step => {
            dijkstraAnimationTimeline.add(() => {
                switch(step.action) {
                    case 'setCurrent':
                        cyDijkstra.getElementById(step.elementId).addClass('current');
                        break;
                    case 'setVisited':
                        step.elementIds.forEach(id => {
                            const el = cyDijkstra.getElementById(id);
                            el.addClass(el.isNode() ? 'visited-node' : 'visited-edge');
                        });
                        break;
                    case 'unsetCurrent':
                        cyDijkstra.getElementById(step.elementId).removeClass('current');
                        break;
                }
            }, '+=0.4');
        });

        dijkstraAnimationTimeline.eventCallback("onComplete", () => {
            btnIcon.text('replay');
            if (btnTextNode) btnTextNode.nodeValue = ' Reiniciar';
            btn.prop('disabled', false).css({
                'background-color': '#555',
                'color': '#f0f0f0'
            });
        });

        $(this).prop('disabled', true).css({
            'background-color': '#333',
            'color': '#ffffff'
        });
        dijkstraAnimationTimeline.play();
    });
}