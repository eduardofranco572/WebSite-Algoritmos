let cyBFS;
let bfsAnimationTimeline;

/**
 * Inicializa e renderiza o grafo de exemplo para a demonstração do BFS (Busca em Largura).
 */
function initBFSGraph() {
    if (cyBFS) { cyBFS.destroy(); }
    if (bfsAnimationTimeline) { bfsAnimationTimeline.kill(); }

    const bfsElements = [
        { data: { id: 'A' }, position: { x: 200, y: 50 } }, { data: { id: 'B' }, position: { x: 100, y: 150 } },
        { data: { id: 'C' }, position: { x: 300, y: 150 } }, { data: { id: 'D' }, position: { x: 50, y: 250 } },
        { data: { id: 'E' }, position: { x: 200, y: 250 } }, { data: { id: 'F' }, position: { x: 350, y: 250 } }
    ];
    const bfsEdges = [
        { data: { id: 'AB', source: 'A', target: 'B' } }, { data: { id: 'AC', source: 'A', target: 'C' } },
        { data: { id: 'BD', source: 'B', target: 'D' } }, { data: { id: 'BE', source: 'B', 'target': 'E' } },
        { data: { id: 'CE', source: 'C', target: 'E' } }, { data: { id: 'CF', source: 'C', 'target': 'F' } }
    ];

    cyBFS = cytoscape({
        container: document.getElementById('cy-graph'),
        elements: bfsElements.concat(bfsEdges),

        style: [
            {
                selector: 'node',
                style: {
                    'background-color': '#555',
                    'label': 'data(id)',
                    'color': '#ccc',
                    'font-size': '12px',
                    'text-valign': 'center',
                    'text-halign': 'center',
                    'width': '30px',
                    'height': '30px',
                    'border-width': 2,
                    'border-color': '#888',
                    'transition-property': 'background-color, border-color, color',
                    'transition-duration': '0.5s'
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 3,
                    'line-color': '#555',
                    'target-arrow-color': '#555',
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'bezier',
                    'transition-property': 'line-color, target-arrow-color',
                    'transition-duration': '0.5s'
                }
            },
            {
                selector: '.visited-node',
                style: {
                    'background-color': '#9307e4',
                    'border-color': '#ffffff',
                    'color': '#FFFFFF'
                }
            },
            {
                selector: '.visited-edge',
                style: {
                    'line-color': '#9307e4',
                    'target-arrow-color': '#9307e4'
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

    cyBFS.ready(function() {
        cyBFS.center();
        cyBFS.fit(undefined, 30);
    });

    setupAnimationButton();
    return cyBFS;
}

/**
 * Configura o botão de animação, cria a timeline da animação BFS com GSAP
 * e define os eventos de clique para controlar a animação (iniciar, reiniciar).
 */
function setupAnimationButton() {
    const btn = $('#animate-btn');
    const btnIcon = btn.find('.material-symbols-outlined');
    const btnTextNode = btn.contents().filter(function() {
        return this.nodeType === 3;
    })[0];

    bfsAnimationTimeline = gsap.timeline({
        paused: true
    });

    const bfsResult = cyBFS.elements().bfs({
        root: '#A',
        directed: false
    });

    bfsResult.path.forEach((element, i) => {
        bfsAnimationTimeline.add(() => {
            element.addClass(element.isNode() ? 'visited-node' : 'visited-edge');
        }, i * 0.5);
    });

    bfsAnimationTimeline.eventCallback("onComplete", () => {
        btnIcon.text('replay');
        if (btnTextNode) btnTextNode.nodeValue = ' Reiniciar';
        btn.prop('disabled', false).css({
            'background-color': '#555',
            'color': '#f0f0f0'
        });
    });

    /**
     * Reseta a animação para o estado inicial, limpando estilos e reiniciando a timeline.
     */
    function resetAnimation() {
        cyBFS.elements().removeClass('visited-node visited-edge');
        btnIcon.text('play_arrow');
        if (btnTextNode) btnTextNode.nodeValue = ' Animar';

        btn.prop('disabled', false).css({
            'background-color': '#f0f0f0',
            'color': '#0e0416'
        });
        bfsAnimationTimeline.restart().pause();
    }

    resetAnimation();

    /**
     * Evento de clique para o botão de animação.
     * Inicia a animação se ela não estiver em andamento, ou a reinicia se já tiver sido concluída.
     */
    btn.off('click').on('click', function() {
        if (bfsAnimationTimeline.isActive()) {
            return;
        }
        if (bfsAnimationTimeline.progress() === 1) {
            resetAnimation();
        } else {
            $(this).prop('disabled', true).css({
                'background-color': '#333',
                'color': '#ffffff'
            });
            bfsAnimationTimeline.play();
        }
    });
}