"use strict";

    /*ФОРМИРОВАНИЕ СЛАЙДЕРА И СОЗДАНИЕ ОСНОВНЫХ ПЕРЕМЕННЫХ===============*/
    /*ПЕРЕМЕННЫЕ*/
    let GALLERY = document.querySelector('#gallery00');
    let SLIDER = GALLERY.querySelector('.slider');
    let SLIDER_WRAPPER = GALLERY.querySelector('.slider__wrapper');
    let sliderItemSRCArray = [];//Создание пустого массива с сылками на привью изображения.
    let sliderItemSRCZoomArrey = [];//Создание пустого массива с сылками на большое изображения.
    let slidesNum;//Общее количество слайдов в галерее.
    let lastInd;//Индекс последнего слайда в невидимой области.
    let visFieldLength = 1;//Количество слайдов в поле видимости.
    let imgWidth = 570;//Исходная ширина слайда.