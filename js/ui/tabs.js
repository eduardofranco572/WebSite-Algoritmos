// Trab Maromo/js/ui/tabs.js

$(document).ready(function() {
    $('.opitons-menu-demo .menu-option').on('click', function() {
        if ($(this).hasClass('active')) return;

        $('.opitons-menu-demo .menu-option').removeClass('active');
        $(this).addClass('active');

        $('.body-content').fadeOut(150); // Fade out mais rápido
        const tabIndex = $(this).index();
        const activeTab = $('.body-content').eq(tabIndex);

        activeTab.delay(150).fadeIn(150, function() {
            // Verificamos qual aba está ativa após o fadeIn
            if (activeTab.hasClass('body-explanation')) {
                // **CHAMADA CORRETA**
                // Inicializa o carrossel agora que ele está visível
                initCustomCarousel();
            } else if (activeTab.hasClass('body-example')) {
                initBFSGraph();
            } else if (activeTab.hasClass('body-coding')) {
                Prism.highlightAll();
            }
        });
    });

    // Chama a inicialização uma vez no carregamento da página para a primeira aba
    if ($('.body-explanation').is(':visible')) {
        initCustomCarousel();
    }
});