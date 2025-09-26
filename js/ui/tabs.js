$(document).ready(function() {
    $('.opitons-menu-demo .menu-option').on('click', function() {
        if ($(this).hasClass('active')) return;

        // Lógica para trocar a classe 'active'
        $('.opitons-menu-demo .menu-option').removeClass('active');
        $(this).addClass('active');

        // Esconde todos os conteúdos
        $('.body-content').fadeOut(150);

        const tabIndex = $(this).index();
        const activeTab = $('.body-content').eq(tabIndex);

        // Mostra o conteúdo da aba clicada
        activeTab.delay(150).fadeIn(150, function() {
            // Verifica a aba que se tornou ativa
            if (activeTab.hasClass('body-explanation')) {
                // Se for a de explicação, reinicia o carrossel
                initCustomCarousel();
            }
            else if (activeTab.hasClass('body-example')) {
                // Se for a de exemplo, busca a função de inicialização no array global
                // que foi definido no journey.js
                const initFunctionName = window.algoritmos[window.currentIndex].exampleInitFunction;

                // Verifica se a função existe no escopo global e a executa
                if (typeof window[initFunctionName] === 'function') {
                    window[initFunctionName]();
                } else {
                    console.error("Função de inicialização do exemplo não encontrada:", initFunctionName);
                }
            }
            else if (activeTab.hasClass('body-coding')) {
                // Se for a de código, atualiza o conteúdo e aciona o realce de sintaxe
                const code = window.algoritmos[window.currentIndex].code;
                $('.body-coding pre code').text(code);
                Prism.highlightAll();
            }
        });
    });

    // Garante que o carrossel inicialize na primeira vez que a página carrega
    if ($('.body-explanation').is(':visible')) {
        initCustomCarousel();
    }
});