function initKnapsackAnimation() {
    const container = $('#knapsack-animation-container');
    if (!container.length || container.data('initialized')) {
        return;
    }

    container.html('');

    const items = [
        { id: 0, name: 'Joia', weight: 2, value: 20, img: './img/knapsack/gem.png' },
        { id: 1, name: 'Coroa', weight: 3, value: 30, img: './img/knapsack/crown.png' },
        { id: 2, name: 'Moedas', weight: 4, value: 50, img: './img/knapsack/coins.png' },
        { id: 3, name: 'Colar', weight: 5, value: 60, img: './img/knapsack/iphone.png' }
    ];
    const capacity = 8;

    let html = `
        <div class="knapsack-title">
            <h2>Problema da Mochila (Capacidade: ${capacity})</h2>
        </div>
        <div class="knapsack-main-content">
            <div class="knapsack-available-items">
                </div>
            <div class="knapsack-center-area">
                 <img src="./img/knapsack/backpack.png" alt="Mochila" class="knapsack-backpack-img"/>
            </div>
            <div class="knapsack-status-panel">
                <h3>Itens Selecionados</h3>
                <table class="knapsack-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Peso</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <div class="knapsack-totals">
                    <p><strong>Peso Total:</strong> <span id="total-weight">0</span> / ${capacity}</p>
                    <p><strong>Valor Total:</strong> <span id="total-value">0</span></p>
                </div>
            </div>
        </div>
        <div class="knapsack-controls">
            <button id="animate-btn" class="btn-animate d-flex align-items-center justify-content-center fs-6 rounded-3 user-select-none">
                <span class="material-symbols-outlined">play_arrow</span>
                <span class="btn-text">Animar</span>
            </button>
        </div>
    `;
    container.html(html);

    const availableItemsContainer = container.find('.knapsack-available-items');
    items.forEach(item => {
        const itemHtml = `
            <div class="knapsack-item" id="item-${item.id}">
                <img src="${item.img}" alt="${item.name}">
                <div class="item-info">
                    <p><strong>${item.name}</strong></p>
                    <p>Peso: ${item.weight} | Valor: ${item.value}</p>
                </div>
            </div>
        `;
        availableItemsContainer.append(itemHtml);
    });

    container.data('initialized', true);

    $('#animate-btn').on('click', function() {
        runKnapsackAnimation(items, capacity, $(this));
    });
}

function knapsack(items, capacity) {
    const n = items.length;

    const dp = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        const currentItem = items[i - 1];
        for (let w = 1; w <= capacity; w++) {
            if (currentItem.weight > w) {
                dp[i][w] = dp[i - 1][w];
            } else {
                const valueWithoutItem = dp[i - 1][w];
                const valueWithItem = dp[i - 1][w - currentItem.weight] + currentItem.value;
                dp[i][w] = Math.max(valueWithoutItem, valueWithItem);
            }
        }
    }

    const solution = [];
    let w = capacity;
    for (let i = n; i > 0 && w > 0; i--) {
        if (dp[i][w] !== dp[i - 1][w]) {
            const chosenItem = items[i - 1];
            solution.unshift(chosenItem);
            w -= chosenItem.weight;
        }
    }
    return solution;
}


function runKnapsackAnimation(items, capacity, btn) {
    const solution = knapsack(items, capacity);
    let currentWeight = 0;
    let currentValue = 0;
    
    const btnIcon = btn.find('.material-symbols-outlined');
    const btnText = btn.find('.btn-text');

    btn.prop('disabled', true);
    btnText.text('Animando...');

    const tl = gsap.timeline({
        onComplete: () => {
            btnIcon.text('replay');
            btnText.text('Reiniciar');
            btn.prop('disabled', false).off('click').on('click', () => {
                $('#knapsack-animation-container').data('initialized', false);
                initKnapsackAnimation();
            });
        }
    });

    solution.forEach(item => {
        const itemElement = $(`#item-${item.id}`);
        const backpackElement = $('.knapsack-backpack-img');
        
        const targetX = backpackElement.offset().left - itemElement.offset().left + (backpackElement.width() / 2) - (itemElement.width() / 2);
        const targetY = backpackElement.offset().top - itemElement.offset().top + (backpackElement.height() / 2) - (itemElement.height() / 2);

        tl.to(itemElement, {
            scale: 1.2,
            borderColor: '#9307e4',
            duration: 0.5,
            ease: 'power2.out',
            zIndex: 10
        }, "+=0.5")
        .to(itemElement, {
            x: targetX,
            y: targetY,
            opacity: 0,
            duration: 1,
            ease: 'power2.in',
            onComplete: () => {
                currentWeight += item.weight;
                currentValue += item.value;
                
                const newRow = `<tr><td>${item.name}</td><td>${item.weight}</td><td>${item.value}</td></tr>`;
                $('.knapsack-table tbody').append(newRow);
                $('#total-weight').text(currentWeight);
                $('#total-value').text(currentValue);
            }
        });
    });
}