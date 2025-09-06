$(document).ready(function() {
    // LÓGICA DE TROCA DE ABAS
    $('.opitons-menu-demo span').on('click', function() {
        if ($(this).hasClass('active')) return;

        $('.opitons-menu-demo span').removeClass('active');
        $(this).addClass('active');

        $('.body-content').fadeOut(200);
        const tabIndex = $(this).index();
        const activeTab = $('.body-content').eq(tabIndex);

        activeTab.delay(200).fadeIn(200, function() {
            if (activeTab.hasClass('body-explanation')) {
                 if (!activeTab.data('carousel-initialized')) {
                    initCustomCarousel();
                    activeTab.data('carousel-initialized', true);
                }

            } else if (activeTab.hasClass('body-example')) {
                const cy = initBFSGraph(); 
                
            } else if (activeTab.hasClass('body-coding')) {
                 Prism.highlightAll();
            }
        });
    });
});