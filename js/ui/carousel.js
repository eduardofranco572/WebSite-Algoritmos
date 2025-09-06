$(document).ready(function() {
    function initCustomCarousel() {
        const track = $('.carousel-track');
        const items = $('.carousel-item');
        const nextBtn = $('.carousel-btn.next');
        const prevBtn = $('.carousel-btn.prev');

        if (items.length <= 1) {
                nextBtn.hide();
                prevBtn.hide();
                return;
        }

        let currentIndex = 0;
        const totalItems = items.length;

        function updateCarousel() {
            const newTransform = -currentIndex * 100;
            track.css('transform', `translateX(${newTransform}%)`);
        }

        nextBtn.on('click', function() {
            currentIndex++;
            if (currentIndex >= totalItems) {
                currentIndex = 0;
            }
            updateCarousel();
        });

        prevBtn.on('click', function() {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = totalItems - 1; 
            }
            updateCarousel();
        });
        
        updateCarousel();
    }

    // Inicializa o carrossel da primeira aba por padrão
    initCustomCarousel();
    $('.body-explanation').data('carousel-initialized', true);
});