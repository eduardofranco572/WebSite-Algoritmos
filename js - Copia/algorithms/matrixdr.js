/**
 * Inicializa a animação de navegação em matriz com vetores dr/dc.
 */
function initMatrixDRAnimation() {
    const container = $('#example-content-container');
    container.html('');

    if (window.matrixDRTimeline) {
        window.matrixDRTimeline.kill();
    }

    const rows = 4;
    const cols = 5;

    let html = `
        <div id="matrix-dr-container">
            <h2 class="example-title">Navegação em Matriz com Vetores dr/dc</h2>
            <div class="matrix-grid">
                </div>
            <div class="vectors-display">
                <div class="vector-group">
                    <h4>Vetor dr (Linha)</h4>
                    <div id="dr-vector" class="vector-boxes"></div>
                </div>
                <div class="vector-group">
                    <h4>Vetor dc (Coluna)</h4>
                    <div id="dc-vector" class="vector-boxes"></div>
                </div>
            </div>
            <div class="animation-controls matrixdr-ac">
                <button id="animate-btn" class="btn-animate d-flex align-items-center justify-content-center fs-6 rounded-3 user-select-none">
                    <span class="material-symbols-outlined">play_arrow</span>
                    <span class="btn-text">Animar</span>
                </button>
            </div>
        </div>
    `;
    container.html(html);

    const grid = $('.matrix-grid');
    const drVectorContainer = $('#dr-vector');
    const dcVectorContainer = $('#dc-vector');

    const matrix = [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 1, 0, 0, 1],
        [1, 1, 1, 1, 1]
    ];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid.append(`<div class="matrix-cell" data-row="${i}" data-col="${j}">${matrix[i][j]}</div>`);
        }
    }

    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];

    dr.forEach((val, index) => {
        drVectorContainer.append(`<div class="vector-box" data-index="${index}">${val}</div>`);
    });
    dc.forEach((val, index) => {
        dcVectorContainer.append(`<div class="vector-box" data-index="${index}">${val}</div>`);
    });

    setupMatrixDRAnimationButton(matrix);
}

/**
 * Configura o botão de animação e a lógica da timeline de animação com GSAP.
 * @param {Array<Array<number>>} matrix - A matriz de dados usada para a lógica de limites.
 */
function setupMatrixDRAnimationButton(matrix) {
    const btn = $('#animate-btn');
    const btnIcon = btn.find('.material-symbols-outlined');
    const btnText = btn.find('.btn-text');

    const initialRow = 1;
    const initialCol = 2;
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];

    /**
     * Reseta a animação para o estado inicial, limpando estilos e timelines.
     */
    function resetAnimation() {
        if (window.matrixDRTimeline) {
            window.matrixDRTimeline.kill();
        }

        $('.matrix-cell').removeClass('visited start').css('transform', '');
        $('.vector-box').removeClass('highlight');

        const initialCell = $(`.matrix-cell[data-row="${initialRow}"][data-col="${initialCol}"]`);
        initialCell.addClass('start');

        btnIcon.text('play_arrow');
        btnText.text('Animar');
        btn.prop('disabled', false);
    }

    resetAnimation();

    /**
     * Evento de clique para o botão de animação.
     * Inicia a animação da travessia da matriz se não estiver em andamento, ou a reinicia caso contrário.
     */
    btn.off('click').on('click', function() {
        if (window.matrixDRTimeline && window.matrixDRTimeline.isActive()) return;

        resetAnimation();
        const initialCell = $(`.matrix-cell[data-row="${initialRow}"][data-col="${initialCol}"]`);

        window.matrixDRTimeline = gsap.timeline();
        let currentRow = initialRow;
        let currentCol = initialCol;

        for (let i = 0; i < dr.length; i++) {
            const nextRow = currentRow + dr[i];
            const nextCol = currentCol + dc[i];
            const vectorBoxDr = $(`#dr-vector .vector-box[data-index="${i}"]`);
            const vectorBoxDc = $(`#dc-vector .vector-box[data-index="${i}"]`);

            window.matrixDRTimeline.call(() => {
                vectorBoxDr.addClass('highlight');
                vectorBoxDc.addClass('highlight');
            }, [], `step${i}`);

            if (nextRow >= 0 && nextRow < matrix.length && nextCol >= 0 && nextCol < matrix[0].length) {
                const nextCell = $(`.matrix-cell[data-row="${nextRow}"][data-col="${nextCol}"]`);

                window.matrixDRTimeline.to(nextCell, {
                    scale: 1.2,
                    repeat: 1,
                    yoyo: true,
                    duration: 0.4,
                    ease: "power2.inOut",
                    onComplete: () => {
                        nextCell.addClass('visited');
                    }
                }, `step${i}+=0.3`);

            } else {
                 window.matrixDRTimeline.to('.matrix-grid', { opacity: 0.5, repeat: 1, yoyo: true, duration: 0.3 }, `step${i}+=0.3`);
            }

            window.matrixDRTimeline.call(() => {
                vectorBoxDr.removeClass('highlight');
                vectorBoxDc.removeClass('highlight');
            }, [], `step${i}+=1.2`);
        }

        window.matrixDRTimeline.eventCallback("onComplete", () => {
            btnIcon.text('replay');
            btnText.text('Reiniciar');
            btn.prop('disabled', false);
            initialCell.removeClass('start');
        });

        $(this).prop('disabled', true);
        window.matrixDRTimeline.play();
    });
}