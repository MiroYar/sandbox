"use strict";

function Gallery(){
    
    /*ФОРМИРОВАНИЕ СЛАЙДЕРА И СОЗДАНИЕ ОСНОВНЫХ ПЕРЕМЕННЫХ===============*/
    /*ПЕРЕМЕННЫЕ*/
    let gallery = document.querySelector('#gallery00');
    let slider = gallery.querySelector('.slider');
    let sliderWrapper = gallery.querySelector('.slider__wrapper');
    let sliderItemSRCArray = [];//Создание пустого массива с сылками на привью изображения.
    let sliderItemSRCZoomArrey = [];
    let slidesNum;//Общее количество слайдов в галерее.
    let n;//Индекс последнего слайда в невидимой области.
    let visFieldLength = 1;//Количество слайдов в поле видимости.
    let imgWidth = 570;//Исходная ширина слайда.

    /*ФУНКЦИИ*/
    /*Функция отрисовки слайда, где:
    nextInd - индекс изображения из массива с данными,
    offset - индекс места для слайда от 0 до n, где крайние показатели находятся в невидимой облати*/
    function draw(nextInd, offset){
        let img = document.createElement('img');//Создание изображения.
        let sliderItemTranslate = offset*imgWidth - imgWidth;//Расчет его положения в соответсвии с индексом офсета, где нулевой индекс принимает отрицательное значение положения находясь левее за нулевой отметкой первого офсета.
        img.style.transform = 'translate('+sliderItemTranslate+'px, 0)';//Предустановка параметра положения изображения.
        img.src = sliderItemSRCArray[nextInd];//Предустанока ссылки на изображение.
        img.dataset.srcZoom = sliderItemSRCZoomArrey[nextInd]
        img.onclick = zoom;
        img.classList.add('slider__item');//Предустановка класса изображения для применения заданного CSS стиля.
        if (offset == 0){
            sliderWrapper.insertBefore(img, sliderWrapper.children[0]);//Добавление потомка в начало списка.
        }
        else {
            sliderWrapper.appendChild(img);//Добавление потомка в конец списка.
        };
    }

    /*Функция расчета следующего индекса для отрисовки, где:
    nexIndex - возвращаемое и расчетное значение,
    reverse - булевое значение, означающего в начало списка(true) либо в конец(false) предполагается отрисовывать новый слайд.*/
    function setNextInd(nextInd, reverse){
        if (reverse == false){
            if (n + 1 == slidesNum){//Проверка является ли текущий индекс из масива последним с учетом понимания, что индекс начинается от нуля, а длина не пустого массива всегда больше нуля.
                nextInd = 0;//Переход в начало массива.
                n = 0;//Присвоение текущему крайнему отрисованному слайду нового значения.
            }
            else {
                nextInd = n + 1;//Переход на одну позицию в большую сторону в массиве.
                n++;//Присвоение текущему последнему в списке отрисованному слайду нового значения.
            }
        }
        else {
            if (n - visFieldLength <= 1){
                nextInd = slidesNum + n - (visFieldLength + 2);//(visFieldLength + 2) - количество отрисованных слайдов, включая скрытых.
                nMin();
            }
            else {
                nextInd = n - (visFieldLength + 2);//(visFieldLength + 2) - количество отрисованных слайдов, включая скрытых.
                nMin();
            }
            /*Функция смещения индекса текущего последнего отрисованного слайда на одну меньшую позицию*/
            function nMin(){
                if (n == 0){
                    n = slidesNum - 1;
                }
                else {
                    n--;
                }
            }
        }
        return nextInd;
    }

    /*Цыкл на перезапись данных изображений в переменные массивов*/
    function setArrayVariables(i){
        let sliderItemArray = slider.querySelectorAll('.slider__item');//Создание временного массива с изображениями.
        for (var i=0; i< sliderItemArray.length; i++) {
            sliderItemSRCArray[i] = sliderItemArray[i].src;//Запись ссылки на изображение в массив.
            sliderItemSRCZoomArrey[i] = sliderItemArray[i].dataset.srcZoom;//Запись ссылки на увеличенное изображение в массив.
            
            sliderItemArray[i].remove();//Удаление изображений после записи данных в переменные.
        }
        return i;
    }


    /*Функция предзагрузки первых слайдов на страницу*/
    this.presetSlids = function(){
        slidesNum = setArrayVariables(0);
        n = slidesNum - 2;//Искуственное смещение последнего индекса слайда чтобы первым отрисовался слайд с последним индексом из общего списка.
        for (let i=0; i< visFieldLength + 2; i++){
            let nextInd = setNextInd(0, false);
            draw(nextInd, i);
        }
    }

    /*ПРЕДУСТАНОВКИ*/
    presetSlids();//Предзагрузка слайдов для просмотра.

    /*АДАПТИВНОСТЬ СЛАЙДЕРА*/
    /*ПЕРЕМЕННЫЕ*/
    let WH = 590 / 320;//Соотношение ширины и высоты (пропорция).

    /*СОБЫТИЯ*/
    window.addEventListener('resize', galleryResize);//Создание евента при изменении размеров окна браузера для изменения размеров галереи.

    /*ФУНКЦИИ*/
    /*Функция изменения высоты галереи*/
    function galleryResize(){
        gallery.style.height = gallery.offsetWidth / WH + 'px';
        imgWidth = gallery.offsetWidth - 20;//Изменение информации о ширине слайдов для правильного их смещения, где "20" - это значение паддинга слева и права (10+10).
    }

    /*ПЕРЕКЛЮЧЕНИЕ/ПЕРЕМЕЩЕНИЕ СЛАЙДОВ===================================*/
    /*ПЕРЕМЕННЫЕ*/
    let RIGHT_BTN = document.querySelector('.btnright');
    let LEFT_BTN = document.querySelector('.btnleft');
    let sliderIsFlip = false;//Булевая переменная, свидетельствующая об исполнении функции перелистывания слайдов влево или вправо.

    /*СОБЫТИЯ*/
    RIGHT_BTN.onclick = sliderItemFlipRight;
    LEFT_BTN.onclick = sliderItemFlipLeft;

    /*ФУНКЦИИ*/
    /*Функция смещения слайдов влево при нажатии кнопки "вправо"
    с удалением первого из двух слайдов оказавшихся в результате смещения в невидимой области слева
    и дорисовки нового слайда в невидимую область справа*/
    function left(){
        sliderIsFlip = true;
        let sliderItemArrayVisible = sliderWrapper.querySelectorAll('.slider__item');//Запись массива из отрисованных слайдов включая в невидидимой области.
        /*Цикл по смещению влево списка слайдов включая слайдов в невидимой области*/
        for (let i=0; i< sliderItemArrayVisible.length; i++){
            let sliderItemTranslate = (i - 1)*imgWidth - imgWidth;//|Расчет положения слайда в соответсвии с индексом офсета,
            //------------------------------------------------------|где нулевой индекс принимает отрицательное значение положения находясь левее за нулевой отметкой первого офсета.
            //------------------------------------------------------|(i-1) расчет нового индекса офсета для каждого слайда.
            sliderItemArrayVisible[i].style.transform = 'translate('+sliderItemTranslate+'px, 0)';
        }
        //Ожидание завершения CSS анимации для окончания операции.
        sliderItemArrayVisible[0].addEventListener('transitionend', function(){
            sliderItemArrayVisible[0].remove();//Удаление лишнего слайда смещенного в положение офсета с индексом "-1".
            let nextInd = setNextInd(0, false);
            draw(nextInd, visFieldLength + 1);//Добавление в освободившееся свободное положение офсета в невидимой области справа.
            sliderIsFlip = false;
        });
    }

    /*Функция смещения слайдов вправо при нажатии кнопки "влево"
    с удалением последнего из двух слайдов оказавшихся в результате смещения в невидимой области слева
    и дорисовки нового слайда в невидимую область справа*/
    function right(){
        sliderIsFlip = true;
        let sliderItemArrayVisible = sliderWrapper.querySelectorAll('.slider__item');
        /*Цикл по смещению вправо списка слайдов включая слайдов в невидимой области*/
        for (let i=0; i< sliderItemArrayVisible.length; i++){
            let sliderItemTranslate = i*imgWidth;//|Расчет положения слайда в соответсвии с индексом офсета,
            //-------------------------------------|где нулевой индекс принимает отрицательное значение положения находясь левее за нулевой отметкой первого офсета.
            //-------------------------------------|Формула расчета "(i+1)*imgWidth - imgWidth", где (i + 1) расчет нового индекса офсета для каждого слайда, принимает приведенный вид.
            sliderItemArrayVisible[i].style.transform = 'translate('+sliderItemTranslate+'px, 0)';
        }
        //Ожидание завершения CSS анимации для окончания операции.
        sliderItemArrayVisible[visFieldLength + 1].addEventListener('transitionend', function(){
            sliderItemArrayVisible[visFieldLength + 1].remove();//Удаление лишнего слайда смещенного в положение второго офсета в невидимой области справа.
            let nextInd = setNextInd(0, true);
            draw(nextInd, 0);//Добавление в освободившееся свободное положение офсета с индексом "0".
            sliderIsFlip = false;
        });
    }

    /*Предустановка функционала на кнопку "вправо" для слайдера*/
    function sliderItemFlipRight(){
        if (sliderIsFlip == false){
            left();
            slideshowRestart()
        }
    }

    /*Предустановка функционала на кнопку "влево" для слайдера*/
    function sliderItemFlipLeft(){
        if (sliderIsFlip == false){
            right();
            slideshowRestart()
        }
    }

    /*ПРСМОТР ИЗОБРАЖЕНИЙ В БОЛЬШЕМ МАСШТАБЕ=============================*/
    /*ПЕРЕМЕННЫЕ*/
    let POPUP = gallery.querySelector('.popup');
    let CLOSE_BTN = POPUP.querySelector('.closebtn');
    let SLIDESHOW_BTN = POPUP.querySelector('.slideshowbtn');
    let LEFT_BTNPOPUP = POPUP.querySelector('.btnleft');
    let RIGHT_BTNPOPUP = POPUP.querySelector('.btnright');

    /*СОБЫТИЯ*/
    CLOSE_BTN.onclick = closeZoom;
    SLIDESHOW_BTN.onclick = slideshowInputToggle;
    LEFT_BTNPOPUP.onclick = popupPictureFlipLeft;
    RIGHT_BTNPOPUP.onclick = popupPictureFlipRight;

    /*ФУНКЦИИ*/
    /*Функция включения модального окна с увеличенным изображением.*/
    function zoom(){
        POPUP.style.display = 'grid';
        console.log(this.naturalWidth + ' ' + this.naturalHeight);
        let srcZoom = this.dataset.srcZoom;
        let imgZoom = POPUP.querySelector('.popup__imgzoom');
        imgZoom.src = srcZoom;
        if (slideshow != null){
            clearTimeout(slideshow);
        }
    }

    /*Функция закрытия модального окна с увеличенным изображением.*/
    function closeZoom(){
        POPUP.style.display = 'none';
        let imgZoom = POPUP.querySelector('.popup__imgzoom');
        imgZoom.src = '#';
        if (slideshow != null){
            slideshowToggle();
        }
    }

    /*Функция включения/отключения инпута слайдшоу с соответсвующим действием слайдшоу*/
    function slideshowInputToggle(){
        if (SLIDESHOW_INPUT.checked){
            SLIDESHOW_INPUT.checked = false;
        }
        else {
            SLIDESHOW_INPUT.checked = true;
        }
        slideshowToggle();
    }

    /*Функция перелистывания увеличенных изображений вправо*/
    function popupPictureFlipRight(){
        let imgZoom = POPUP.querySelector('.popup__imgzoom');
        let imgZoomSRC = imgZoom.src;
        let ind = sliderItemSRCZoomArrey.indexOf(imgZoomSRC);
        if (ind + 1 == slidesNum){
            ind = 0;
        }
        else {
            ind++;
        }
        imgZoom.src = sliderItemSRCZoomArrey[ind];
    }

    /*Функция перелистывания увеличенных изображений влево*/
    function popupPictureFlipLeft(){
        let imgZoom = POPUP.querySelector('.popup__imgzoom');
        let imgZoomSRC = imgZoom.src;
        let ind = sliderItemSRCZoomArrey.indexOf(imgZoomSRC);
        if (ind == 0){
            ind = slidesNum - 1;
        }
        else {
            ind--;
        }
        imgZoom.src = sliderItemSRCZoomArrey[ind];
    }

    /*СЛАЙДШОУ===========================================================*/
    /*ПЕРЕМЕННЫЕ*/
    let SLIDESHOW_INPUT= slider.querySelector('.slideshow');//Инпут для включения опции слайдшоу.
    let slideshow = null;//Таймер для слайдшоу.
    let slideshowTime = 5000;//

    /*СОБЫТИЯ*/
    SLIDESHOW_INPUT.oninput = slideshowToggle;//Cобытие включения/выключения чекбокса слайдшоу.

    /*ФУНКЦИИ*/
    /*Функция на событие включения/выключения чекбокса слайдшоу.*/
    function slideshowToggle(){
        if (SLIDESHOW_INPUT.checked){
            slideshow = setTimeout(function tick() {//Включение интервального таймера для слайдшоу.
                left();
                slideshow = setTimeout(tick, slideshowTime);
            }, slideshowTime);
            SLIDESHOW_BTN.classList.add('slideshowbtn-stop');
        }
        else {
            clearTimeout(slideshow);//Выключение интервального таймера для слайдшоу.
            slideshow = null;//Обнуление значения таймера для возможной дальнейшей проверки на существование.
            SLIDESHOW_BTN.classList.remove('slideshowbtn-stop');
        }
    }

    /*Функция рестарта таймера для слайдшоу*/
    function slideshowRestart(){
        if (slideshow != null){
            clearTimeout(slideshow);
            slideshowToggle();
        }
    }

    /*ПРЕДУСТАНОВКИ*/
    slideshowToggle();//Проверка на наличие включенного слайдшоу по умолчанию.
}