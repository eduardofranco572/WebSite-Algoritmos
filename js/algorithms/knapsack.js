function initKnapsackAnimation() {
    const container = $('#knapsack-animation-container');
    if (!container.length || container.data('initialized')) return;

    container.html('');

    const items = [
        { name: 'Joia', weight: 2, value: 20, img: './img/knapsack/gem.png' },
        { name: 'Coroa', weight: 3, value: 30, img: './img/knapsack/crown.png' },
        { name: 'Moedas', weight: 4, value: 50, img: './img/knapsack/coins.png' },
        { name: 'Colar', weight: 5, value: 60, img: './img/knapsack/necklace.png' }
    ];
    const capacity = 8;

    let html = `
        <h2>Problema da Mochila</h2>
        <div class="knapsack-wrapper">
            <div class="items-list">
                <h3>Itens Disponíveis</h3>
    `;
    items.forEach((item, index) => {
        html += `
            <div class="item" id="item-${index}" data-weight="${item.weight}" data-value="${item.value}">
                <img src="${item.img}" alt="${item.name}">
                <p><strong>${item.name}</strong></p>
                <p>Peso: ${item.weight} | Valor: ${item.value}</p>
            </div>
        `;
    });
    html += `
            </div>
            <div class="knapsack-area">
                <h3>Mochila (Capacidade: ${capacity})</h3>
                <div class="knapsack-items"></div>
            </div>
        </div>
        <div class="knapsack-result"></div>
        <button id="knapsack-animate-btn" class="btn-animate">Animar Solução</button>
    `;
    container.html(html);
    container.data('initialized', true);

    $('#knapsack-animate-btn').on('click', function() {
        $(this).prop('disabled', true);
        runKnapsackAnimation();
    });

    function knapsack(items, capacity) {
        const n = items.length;
        const dp = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));

        for (let i = 1; i <= n; i++) {
            for (let w = 1; w <= capacity; w++) {
                if (items[i - 1].weight <= w) {
                    dp[i][w] = Math.max(dp[i - 1][w], items[i - 1].value + dp[i - 1][w - items[i - 1].weight]);
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }

        let res = dp[n][capacity];
        let w = capacity;
        const selectedItems = [];
        for (let i = n; i > 0 && res > 0; i--) {
            if (res !== dp[i - 1][w]) {
                selectedItems.push(items[i - 1]);
                res -= items[i - 1].value;
                w -= items[i - 1].weight;
            }
        }
        return selectedItems.reverse();
    }

    function runKnapsackAnimation() {
        const solution = knapsack(items, capacity);
        const resultContainer = $('.knapsack-result');
        let totalValue = 0;
        let totalWeight = 0;

        const tl = gsap.timeline({
            onComplete: () => {
                $('#knapsack-animate-btn').text('Reiniciar').prop('disabled', false).off('click').on('click', () => {
                    container.data('initialized', false);
                    initKnapsackAnimation();
                });
            }
        });

        solution.forEach(item => {
            const itemIndex = items.findIndex(i => i.name === item.name);
            const itemElement = $(`#item-${itemIndex}`);

            tl.to(itemElement, {
                duration: 0.5,
                borderColor: '#9307e4',
                backgroundColor: '#f3e5ff',
                scale: 1.1,
                ease: "power2.out"
            })
            .to(itemElement, {
                duration: 1,
                opacity: 0,
                ease: "power2.inOut",
                onComplete: () => {
                    totalValue += item.value;
                    totalWeight += item.weight;
                    resultContainer.html(`<h3>Valor Total: ${totalValue}</h3><h3>Peso Total: ${totalWeight}</h3>`);
                    const knapsackArea = $('.knapsack-items');
                    const clone = itemElement.clone().css({opacity: 1, borderColor: '#ddd', backgroundColor: '#fff', scale: 1});
                    knapsackArea.append(clone);
                }
            });
        });
    }
}