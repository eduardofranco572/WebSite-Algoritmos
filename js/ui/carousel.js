/**
 * Inicializa o carrossel, configurando a navegação entre os slides.
 */
function initCustomCarousel() {
    const track = $('.carousel-track');
    const items = $('.carousel-item');
    const nextBtn = $('.carousel-btn.next');
    const prevBtn = $('.carousel-btn.prev');

    const totalItems = items.length;

    if (items.length <= 1) {
        nextBtn.hide();
        prevBtn.hide();
        return;
    }
    
    nextBtn.show();
    prevBtn.show();
    
    let currentIndex = 0;
    
    /**
     * Atualiza a posição visual do carrossel com base no índice atual.
     */
    function updateCarousel() {
        const newTransform = -currentIndex * 100;
        track.css('transform', `translateX(${newTransform}%)`);
    }

    nextBtn.off('click');
    prevBtn.off('click');

    /**
     * Evento de clique para o botão "próximo" do carrossel.
     */
    nextBtn.on('click', function() {
        currentIndex++;
        if (currentIndex >= totalItems) {
            currentIndex = 0;
        }
        updateCarousel();
    });

    /**
     * Evento de clique para o botão "anterior" do carrossel.
     */
    prevBtn.on('click', function() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = totalItems - 1;
        }
        updateCarousel();
    });
    l
    updateCarousel();
}