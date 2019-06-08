"use strict";

/*ФОРМИРОВАНИЕ СЛАЙДЕРА И СОЗДАНИЕ ОСНОВНЫХ ПЕРЕМЕННЫХ===============*/
/*ПЕРЕМЕННЫЕ*/
let GALLERY_00 = document.querySelector('#gallery00');
let SLIDER_00 = GALLERY_00.querySelector('.slider');
let SLIDER_WRAPPER_00 = GALLERY_00.querySelector('.slider__wrapper');
let sliderItemSRCArray = [];//Создание пустого массива с сылками на привью изображения.
let sliderItemSRCZoomArrey = [];//Создание пустого массива с сылками на большое изображения.
let SLIDES_NUM;//Общее количество слайдов в галерее.
let lastInd;//Индекс последнего слайда в невидимой области.
let VIS_FIELD_LENGTH = 1;//Количество слайдов в поле видимости.
let imgWidth = 570;//Исходная ширина слайда.