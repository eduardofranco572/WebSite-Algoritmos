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
    
    nextBtn.show();
    prevBtn.show();
    
    let currentIndex = 0;
    const totalItems = items.length;

    function updateCarousel() {
        const newTransform = -currentIndex * 100;
        track.css('transform', `translateX(${newTransform}%)`);
    }

    // Remove eventos antigos para não acumular
    nextBtn.off('click');
    prevBtn.off('click');

    nextBtn.on('click', function() {
        currentIndex++;
        if (currentIndex >= totalItems) {
            currentIndex = 0; // Volta para o primeiro
        }
        updateCarousel();
    });

    prevBtn.on('click', function() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = totalItems - 1; // Vai para o último
        }
        updateCarousel();
    });
    
    updateCarousel();
}