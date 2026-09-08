const mbSwiper = new Swiper(".mb-management-slider", {
    loop: true,
    spaceBetween: 25,
    slidesPerView: 1,
    navigation: {
      nextEl: ".mb-next-btn",
      prevEl: ".mb-prev-btn",
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });