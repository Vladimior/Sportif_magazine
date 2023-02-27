export function renderColorSize (array, parent, article, type) { // відмальовуємо розміри і кольори
    for (let value in array) {
        const elementOutput = document.createElement('input');
        const elementLabel = document.createElement('label');
        elementOutput.setAttribute('type', type);
        elementOutput.setAttribute('value', `${array[value]}`);
        if (array[value].length === 7) {
            elementOutput.setAttribute('name', 'color');
            elementOutput.setAttribute('id', `color${article}.${value}`);
            elementLabel.setAttribute('for', `color${article}.${value}`);
            elementLabel.style.backgroundColor = `${array[value]}`;
        } else {
            elementOutput.setAttribute('name', 'size');
            elementOutput.setAttribute('id', `size${article}.${value}`);
            elementLabel.setAttribute('for', `size${article}.${value}`);
            elementLabel.innerHTML = `<span>${array[value]}</span>`;
        }
        parent && parent.append(elementOutput, elementLabel);
    }
}
// використовуємо класи для створення карток товарів на сторінці
export class ProductCard { // створюємо картку
    constructor(src, alt, description, rating, price, color, size, article, parentSelector, ...classes) { //конструктор класу
        this.src = src;
        this.alt = alt;
        this.description = description;
        this.rating = rating;
        this.price = price;
        this.color = color;
        this.size = size;
        this.article = article;
        this.parentSelector = parentSelector;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
    }
    render() { //метод виводу даних на сторінку
        const element = document.createElement('div');
        const price = parseFloat(this.price).toFixed(2);
        if (this.classes.length === 0) { // при необхідності додаємо передані класи в rest аргументі
            this.classes = "card";
            element.classList.add(this.classes);
        } else {
            this.classes.forEach(className => element.classList.add(className));
        }
        element.innerHTML = `
                <div class="card__img-container">
                <a href="./product.html?id=${this.article}" class="card__page-link" data-page>
                    <div class="card__img">
                        <img src=${this.src} alt=${this.alt}>
                    </div>
                </a>
                </div>
                <div class="card__text-container">
                <a href="./product.html?id=${this.article}" class="card__page-link" data-page>
                    <div class="card__title">
                        ${this.description}
                    </div>
                </a>
                    <div class="rating rating_set rating${this.article}">
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
                    <div class="card__price">
                        As low as <span>$ ${price}</span>
                    </div>
                    <div class="card__color" id="article-color${this.article}">
                    </div>
                    <div class="card__size" id="article-size${this.article}">
                    </div>
                    <a href="" class="card__buy uppercase" data-buy data-article = ${this.article}>
                        <img src="./img/icon/bag.svg" alt="bag">
                        add to card
                    </a>
            `;
        this.parent && this.parent.append(element);
        const availableColor = this.color.split(',');
        const cardColor = document.getElementById(`article-color${this.article}`);
        renderColorSize(availableColor, cardColor, this.article, 'radio');

        const arraySize = this.size.split(',');
        const cardSize = document.getElementById(`article-size${this.article}`);
        renderColorSize(arraySize, cardSize, this.article, 'radio');

    }
}