$(document).ready(function() {

    const backgroundImages = [
        '../img/wallpaperM1.jpg',
        '../img/wallpaperM2.jpg',
        '../img/wallpaperM3.jpg',
        '../img/wallpaperM4.jpg',
        '../img/wallpaperM5.jpg'
    ];
    const initialWallpaper = '../img/wallpaperM.jpg';

    let currentBgIndex = 0;
    let currentIndex = 0;

    const nextAlgoBtn = $("#next-algo-btn");
    const backToStartBtn = $("#back-to-start-btn");
    const startJourneyBtn = $("#start-journey-btn");

    /**
     * Atualiza o conteúdo da página para exibir o algoritmo correspondente ao índice fornecido.
     * @param {number} index - O índice do algoritmo a ser exibido.
     */
    function updateAlgorithmView(index) {
        const algo = algoritmos[index];
        const carouselTrack = $('.carousel-track');
        const exampleContainer = $('#example-content-container');

        carouselTrack.empty();
        let carouselItemsHTML = '';

        const titleClass = "fs-2 fw-bold";
        const textClass = "fs-6 text-justify";

        algo.explicacao.forEach(slide => {
            const itemClasses = "carousel-item w-100 flex-shrink-0 d-flex flex-column align-items-center justify-content-center text-center";

            if (slide.imgExemple) {
                carouselItemsHTML += `
                    <div class="${itemClasses}">
                        <h3 class="${titleClass}">${slide.titulo}</h3>
                        <div class="d-flex justify-content-center align-items-center w-100">
                        <img class="w-100 h-100" style="max-width: 30rem;" src="${slide.imgExemple}" alt="Visualização do algoritmo">
                        </div>
                    </div>
                `;

            } else if (slide.imgBolsa && slide.texto) {
                carouselItemsHTML += `
                    <div class="${itemClasses} with-image user-select-none">
                        <h3 class="${titleClass}">${slide.titulo}</h3>
                        <p class="${textClass}">${slide.texto}</p>
                        <div class="image-container d-flex justify-content-end align-items-end">
                            <img class="imgBolsa w-100 h-100" src="${slide.imgBolsa}" alt="Animação de uma bolsa">
                        </div>
                    </div>
                `;

            } else if (slide.img && slide.texto) {
                carouselItemsHTML += `
                    <div class="${itemClasses} with-image">
                        <h3 class="${titleClass}">${slide.titulo}</h3>
                        <p class="${textClass}">${slide.texto}</p>
                        <div class="image-container d-flex justify-content-end align-items-end">
                            <img class="img-mascot w-100 h-100" src="${slide.img}" alt="Mascote Pinguim">
                        </div>
                    </div>
                `;

            } else if (slide.texto) {
                carouselItemsHTML += `
                    <div class="${itemClasses}">
                        <h3 class="${titleClass}">${slide.titulo}</h3>
                        <p class="${textClass}">${slide.texto}</p>
                    </div>
                `;
            }
        });

        carouselTrack.html(carouselItemsHTML);

        exampleContainer.html(algo.exampleHtml || '<p style="color: #fff;">Exemplo não disponível.</p>');

        $('.opitons-menu-demo .menu-option').removeClass('active').first().addClass('active');
        $('.body-content').hide().first().show();

        initCustomCarousel();
    }

    /**
     * Executa a animação de transição "warp", mudando o background e executando um callback.
     * @param {Function} onCompleteCallback - Função a ser executada no meio da transição.
     */
    function playWarpTransition(onCompleteCallback) {
        const tl = gsap.timeline();
        tl.call(triggerWarp);
        tl.to('#flash-overlay', { opacity: 1, duration: 1, ease: "power2.in" }, "+=0.5");

        tl.call(() => {
            currentBgIndex = (currentBgIndex + 1) % backgroundImages.length;
            $('body').css('background-image', `url('${backgroundImages[currentBgIndex]}')`);
            if (onCompleteCallback) onCompleteCallback();
        });

        tl.to('#flash-overlay', { opacity: 0, duration: 1.5 }, "+=0.2");
    }

    /**
     * Evento de clique para o botão "Iniciar Jornada", que inicia a transição da introdução para a visualização dos algoritmos.
     */
     $('#start-journey-btn').on('click', function() {
        if (window.introScrollTrigger) {
            window.introScrollTrigger.kill();
        }

        gsap.to(['header', 'main > .about', '.container-details'], {
            duration: 0.5,
            opacity: 0,
            onComplete: function() {
                $(this.targets()).addClass('hidden').css('display', 'none');

                if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
                    window.pJSDom[0].pJS.fn.vendors.destroypJS();
                }

                $('#particles-js').remove();
                $('#starfield').show();

                playWarpTransition(() => {
                    $('#journey-container').removeClass('hidden').css({ 'display': 'flex' });
                    nextAlgoBtn.removeClass('hidden');

                    gsap.fromTo('#journey-container', { scale: 0.5, autoAlpha: 0 }, { duration: 2.0, scale: 1, autoAlpha: 1, ease: "power2.out", delay: 1.5 });
                    gsap.fromTo(nextAlgoBtn, { autoAlpha: 0 }, { duration: 1, autoAlpha: 1, delay: 2.5 });
                });
            }
        });
    });

    /**
     * Evento de clique para o botão "Próximo Algoritmo", que avança para o próximo algoritmo da lista.
     */
    $('#next-algo-btn').on('click', function() {
        const button = $(this);

        gsap.to(button, {
            autoAlpha: 0,
            y: 10,
            duration: 0.3
        });

        gsap.to('.algoritmos', {
            duration: 0.4,
            autoAlpha: 0,
            scale: 0.9,
            ease: "power2.in",
            onComplete: () => {
                playWarpTransition(() => {
                    currentIndex++;
                    if (currentIndex >= algoritmos.length) {
                        currentIndex = 0;
                    }

                    window.currentIndex = currentIndex;
                    updateAlgorithmView(currentIndex);

                    if (currentIndex === algoritmos.length - 1) {
                        nextAlgoBtn.addClass('hidden');
                        backToStartBtn.removeClass('hidden');
                    }

                    gsap.fromTo('.algoritmos', {
                        scale: 0.5,
                        autoAlpha: 0
                    }, {
                        duration: 1.5,
                        scale: 1,
                        autoAlpha: 1,
                        ease: "power2.out",
                        delay: 1.0,
                        onComplete: () => {
                            if (currentIndex !== algoritmos.length - 1) {
                                gsap.to(button, {
                                    autoAlpha: 1,
                                    y: 0,
                                    duration: 0.5,
                                    delay: 0.2
                                });
                            }
                        }
                    });
                });
            }
        });
    });

    /**
     * Evento de clique para o botão "Voltar ao Início", que retorna à tela inicial.
     */
    $('#back-to-start-btn').on('click', function() {
        gsap.to('#journey-container', {
            duration: 0.5, autoAlpha: 0, scale: 0.9, ease: "power2.in",
            onComplete: () => {
                $('#journey-container, #back-to-start-btn').addClass('hidden');
                $('#starfield').hide();
                $('body').css('background-image', `url('${initialWallpaper}')`);

                if ($('#particles-js').length === 0) {
                    $('<div id="particles-js"></div>').insertBefore('#starfield');
                }

                initParticles();

                $('header, main > .about').removeClass('hidden').removeAttr('style');

                gsap.fromTo(['header', 'main > .about'], { opacity: 0 }, { duration: 1, opacity: 1, delay: 0.5 });

                currentIndex = 0;
                currentBgIndex = 0;
                window.currentIndex = 0;
                updateAlgorithmView(currentIndex);
            }
        });
    });

    updateAlgorithmView(currentIndex);

    /**
     * Aplica um efeito de preenchimento animado em um botão ao passar o mouse.
     * @param {jQuery} button - O botão ao qual a animação será aplicada.
     */
    function applyButtonAnimation(button) {
        if (button.length) {
            const btnFill = button.find(".btn-viagem-fill");

            /**
             * Evento de entrada do mouse para iniciar a animação de preenchimento.
             */
            button.on("mouseenter", function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                gsap.set(btnFill, { top: y, left: x });
                gsap.to(btnFill, {
                    scale: 4,
                    duration: 0.4,
                    ease: "power2.out",
                    overwrite: 'auto'
                });
            });

            /**
             * Evento de movimento do mouse para atualizar a posição do preenchimento.
             */
            button.on("mousemove", function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                gsap.to(btnFill, {
                    top: y,
                    left: x,
                    duration: 0.1,
                    overwrite: 'auto'
                });
            });

            /**
             * Evento de saída do mouse para reverter a animação de preenchimento.
             */
            button.on("mouseleave", function() {
                gsap.to(btnFill, {
                    scale: 0,
                    duration: 0.3,
                    ease: "power2.in",
                    overwrite: 'auto'
                });
            });
        }
    }

    applyButtonAnimation(startJourneyBtn);
    applyButtonAnimation(nextAlgoBtn);
    applyButtonAnimation(backToStartBtn);

    window.algoritmos = algoritmos;
    window.currentIndex = currentIndex;
});