import {catalog} from "./catalog_array.js";
import {renderColorSize} from "./product_card.js";


export function singlePageProduct (pageProductSelector, linkName, array) {
    const pageForProduct = document.querySelector(pageProductSelector);
    if (pageForProduct) {
        const idProduct = new URLSearchParams(window.location.search).get('id');
        const currentUrl = document.querySelector(linkName);
        for (let value of array) {
            if (value.article === parseInt(idProduct)) {
                const element = document.createElement('div');
                const urlName = document.createElement('span');
                urlName.innerHTML = `${value.description}`;
                currentUrl.append(urlName);
                element.classList.add('goods__page');
                const price = parseFloat(value.price).toFixed(2);
                element.innerHTML = `
                    <div class="goods__image">
                        <div id="goods__max" class="goods__image-max">
                            <img class="goods__max" src="${value.image}" alt="pant">
                        </div>
                        <div class="goods__image-min">
                            <div class="active">
                                <img class="goods__min" src="${value.image}" alt="pant">
                            </div>
                            <div>
                                <img class="goods__min" src="${value.image2}" alt="pant">
                            </div>
                        </div>
                    </div>
                    <div class="goods__text">
                        <div class="goods__title">
                            ${value.description} <span>ITEM # ${value.article}670170</span>
                        </div>
                    <div class="rating rating_set rating${value.article}">
                        <div class="rating__body">
                            <div class="rating__active"></div>
                            <div class="rating__items">
                                <input type="radio" class="rating__item" value="1" name="rating">
                                <input type="radio" class="rating__item" value="2" name="rating">
                                <input type="radio" class="rating__item" value="3" name="rating">
                                <input type="radio" class="rating__item" value="4" name="rating">
                                <input type="radio" class="rating__item" value="5" name="rating">
                            </div>
                        </div>
                    </div>
                        <div class="goods__price">
                            As low as
                            <div>$ ${price}</div>
                        </div>
                        <div class="goods__color">
                            COLOR:
                            <div class="goods__color-choise color-input" id="article-color${value.article}">

                            </div>
                        </div>
                        <div class="goods__size">
                            SIZE:
                            <div class="goods__size-choise" id="article-size${value.article}">

                            </div>
                        </div>
                        <div class="goods__buttons">
                            <a href="" class="card__buy uppercase" data-buy data-article="${value.article}">
                                <img src="./img/icon/bag.svg" alt="bag">
                                add to bag
                            </a>
                            <a href="" class="card__buy uppercase" data-wishlist>
                                <img src="./img/icon/heart.svg" alt="bag">
                                add to wishlist
                            </a>
                        </div>
                        <div class="goods__social">
                            <img src="./img/icon/facebook.svg" alt="facebook">
                            <img src="./img/icon/twitter.svg" alt="twitter">
                            <img src="./img/icon/pinterest.svg" alt="pinterest">
                            <img src="./img/icon/link.svg" alt="link">
                        </div>
                        <div class="goods__delivery">
                            <div class="delivery__title">
                                - Worry Free Shopping -
                            </div>
                            <div class="delivery__title-line"></div>
                            <div class="delivery__description">
                                <div class="delivery__icon">
                                    <img src="./img/icon/free-delivery.svg" alt="free-delivery">
                                    <div>FREE PRIORITY SHIPPING ON <br> ORDERS $99+*</div>
                                </div>
                                <div class="delivery__exchange">
                                    <img src="./img/icon/exchange.png" alt="exchange">
                                    <div>FREE RETURNS & EXCHANGES*</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
                pageForProduct.append(element);
                const availableColorGoods = value.color;
                const cardColor = document.getElementById(`article-color${value.article}`);
                renderColorSize(availableColorGoods, cardColor, value.article, 'radio');

                const arraySize = value.size;
                const cardSize = document.getElementById(`article-size${value.article}`);
                renderColorSize(arraySize, cardSize, value.article, 'radio');
            }
        }
    }
}

//слайдер зображення
export function sliderImageProduct (imageSelector, minImageSelector) {
    const minImages = document.querySelector(imageSelector);

    minImages && minImages.addEventListener('click', (event) => {
        if (event.target.className === "goods__min") {
            const target = event.target.getAttribute('src');
            document.querySelector('.goods__max').setAttribute('src', target);
            const [...allMinImageDiv] = document.querySelectorAll(minImageSelector);
            if (event.target.parentNode.className !== "active") {
                allMinImageDiv.forEach( (e) => {
                    e.classList.toggle('active');
                })
            }
        }
    });
}