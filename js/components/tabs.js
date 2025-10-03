$(document).ready(function() {
    /**
     * Evento de clique para as opções do menu.
     * Troca o conteúdo exibido e inicializa funcionalidades específicas da aba ativa.
     */
    $('.opitons-menu-demo .menu-option').on('click', function() {
        if ($(this).hasClass('active')) return;

        $('.opitons-menu-demo .menu-option').removeClass('active');
        $(this).addClass('active');

        $('.body-content').fadeOut(150);

        const tabIndex = $(this).index();
        const activeTab = $('.body-content').eq(tabIndex);

        activeTab.delay(150).fadeIn(150, function() {
            if (activeTab.hasClass('body-explanation')) {
                initCustomCarousel();
            }
            else if (activeTab.hasClass('body-example')) {
                const initFunctionName = window.algoritmos[window.currentIndex].exampleInitFunction;
                if (typeof window[initFunctionName] === 'function') {
                    window[initFunctionName]();
                } else {
                    console.error("Função de inicialização do exemplo não encontrada:", initFunctionName);
                }
            }
            else if (activeTab.hasClass('body-coding')) {
                const code = window.algoritmos[window.currentIndex].code;
                $('.body-coding pre code').text(code);
                Prism.highlightAll();
            }
        });
    });

    if ($('.body-explanation').is(':visible')) {
        initCustomCarousel();
    }
});