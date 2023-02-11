window.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.main__slide'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.main__slider'),
          slidesField = document.querySelector('.main__slider-wrapper'),
          width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1;
    let offset = 0;
    slidesField.style.width = 100 * slides.length + '%';
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slides.forEach(slide => {
        slide.style.width = width;
    });

    function plus() {
        if (offset == +width.slice(0, -2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset +=  +width.slice(0, -2);
        }
        
        slidesField.style.transform = `translateX(-${offset}px)`;
        if (slideIndex == slides.length){
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent =`0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function minus() {
        if (offset == 0) {
            offset = +width.slice(0, -2) * (slides.length - 1);
        } else {
            offset -=  +width.slice(0, -2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        
        if (slideIndex == 1){
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent =`0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function onWheel(event){
        if (event.deltaY < 0) {
            plus();
        } else {
            minus();
        }
    }

    function debounce(func, timeout = 300) {
        let timer;
        return function (...args) {
            if (!timer) {
                func.apply(this, args);
            }
            clearTimeout(timer);
            timer = setTimeout(() => {
                timer = undefined;
            }, timeout);
        }
    }
    const wheelChange = debounce(onWheel);

    slidesWrapper.addEventListener('wheel', wheelChange);

    //swipe
    const swipeChange = debounce(handleTouchMovie);
    slidesWrapper.addEventListener('touchstart', handleTouchStart);
    slidesWrapper.addEventListener('touchmove', swipeChange);

    let x1 = null;
    let y1 = null;

    function handleTouchStart(e) {
        const firstTouch = e.touches[0];
        x1 = firstTouch.clientX;
        y1 = firstTouch.clientY;
    }

    function handleTouchMovie(e) {
        if (!x1 || !y1) {
            return false;
        }
        let x2 = e.touches[0].clientX;
        let y2 = e.touches[0].clientY;
        let xDiff = x2 - x1;
        let yDiff = y2 - y1;

        if (Math.abs(xDiff) > Math.abs(yDiff)){
            if (xDiff >0) {
                minus(); 
            } else {
                plus();
            }
        }
    }


    //modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');
          modalCloseBtn = document.querySelector('[data-close]');

    function openModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }
    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    //burger

    const menuOpen = document.querySelector('.burger__open img'),
          menuClose = document.querySelector('.burger__close'),
          menu = document.querySelector('aside');
    
    menuOpen.addEventListener('click', () => {
        menu.style.display = 'flex';
        menuClose.style.display = 'block';
    });

    menuClose.addEventListener('click', () => {
        menu.style.display = 'none';
        menuClose.style.display = 'none';
    });

    //swipe 

    
});
