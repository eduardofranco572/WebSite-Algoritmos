$(document).ready(function() {
    $('.opitons-menu-demo .menu-option').on('click', function() {
        if ($(this).hasClass('active')) return;

        $('.opitons-menu-demo .menu-option').removeClass('active');
        $(this).addClass('active');

        $('.body-content').fadeOut(150); // Fade out mais rápido

        const tabIndex = $(this).index();
        const activeTab = $('.body-content').eq(tabIndex);

        // Exibe a aba ativa com um fade-in após o fade-out completar
        activeTab.delay(150).fadeIn(150, function() {
            if (activeTab.hasClass('body-explanation')) {
                initCustomCarousel();
            } else if (activeTab.hasClass('body-example')) {
                initBFSGraph();
            } else if (activeTab.hasClass('body-coding')) {
                Prism.highlightAll();
            }
        });
    });

    // Chama a inicialização para primeira aba
    if ($('.body-explanation').is(':visible')) {
        initCustomCarousel();
    }
});