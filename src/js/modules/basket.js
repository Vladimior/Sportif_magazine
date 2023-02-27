//корзина товарів, додавання в localStorage, вивід данних
export function basketProduct (array, busketOut, BuyButtonsSelector, TotalPriceOut) {
    const busketOutput = document.querySelector(busketOut);
    const catalogBuyButtons = document.querySelector(BuyButtonsSelector);
    const TotalPriceOutput = document.querySelector(TotalPriceOut);
    function isInArray(id, arr) { //перевірка чи є такий артикль в масиві
        return !!arr.some(e => ((e.article === id) ));
    }
    function getChoiceProp (type, article) { // отримуємо характеристики товару (колір, розмір) які вибрані
        let item = [...document.querySelectorAll(`#article-${type}${article} input:checked`)].map(n => n.value);
        if (item.length === 0) {
            item = document.getElementById(`${type}${article}.0`).value.split(' ');
        }
        return item;
    }
    function addChoiseItems (busket, articles, color, size, arr) { // додаємо вибраний товар в масив, якщо він вже є збільшуємо кількість
        if (isInArray(parseInt(articles), busket)) {
            busket.forEach((e) => {
                if (e.article === parseInt(articles)) {
                    e.count += 1;
                    e.color = color;
                    e.size = size;
                }
            })
        } else {
            for (let key of arr) {
                if (key.article === parseInt(articles)) {
                    key.color = color;
                    key.size = size;
                    key.count = 1;
                    busket.push(key);
                }
            }
        }
    }
    function getFromLocalStorage (id) { // отримуємо збережений масив з локального сховища
        const productsLocalStorage = localStorage.getItem(id);
        if (productsLocalStorage !== null) {
            return JSON.parse(productsLocalStorage);
        }
        return [];
    }

    function putLocalStorage (key, value) { // зберігаємо масив вибраних товарів в локальне сховище
        localStorage.setItem(key, JSON.stringify(value));
    }
    let busketCatalogGoods = getFromLocalStorage ('product');
    // логіка для кнопки купити на товарі
    catalogBuyButtons && catalogBuyButtons.addEventListener('click', (e) =>{
        if (e.target.hasAttribute('data-buy')) {
            e.preventDefault();
            const articleItem = e.target.dataset.article;
            let colorItem = getChoiceProp ('color', articleItem);
            let sizeItem = getChoiceProp ('size', articleItem);
            addChoiseItems (busketCatalogGoods, articleItem, colorItem, sizeItem, array);
        }
        putLocalStorage('product', busketCatalogGoods);
        renderBusketItems (busketOutput, getFromLocalStorage ('product'));
    });

    function renderBusketItems (parentBox, busketCatalog) { // виводимо товари та загальну ціну до кошика
        parentBox.innerHTML = '';
        TotalPriceOutput.innerHTML = '';
        const totalPrice = [];
        const totalItemCount = [];
        const elementTotalPrice = document.createElement('div');
        busketCatalog.forEach((e) => {
            totalPrice.push(e.price * e.count);
            totalItemCount.push(e.count);
            const busketElement = document.createElement('div');
            busketElement.classList.add('basket__card');
            busketElement.innerHTML = `
                        <a href="./product.html?id=${e.article}" class="card__page-link" data-page> 
                            <img src="${e.image}" alt="image">
                        </a>
                        <div class="basket__card-color">
                            Color: <input type="color" name="head" value="${e.color}" disabled>
                        </div>
                        <div class="basket__card-size">
                            Size: <span>${e.size}</span>
                        </div>
                        <div class="basket__card-counter">
                            <button data-count-minus data-article = ${e.article}>-</button>
                            <span>${e.count}</span>
                            <button data-count-plus data-article = ${e.article}>+</button>
                        </div>
                        <div>
                        Price: <span>${(e.price * e.count).toFixed(2)}$</span>
                        </div>
                        <button class="basket__card-del" data-busket-del data-article = ${e.article}>&#10006;</button>
        `

            parentBox.append(busketElement);
        })
        const resultTotal = totalPrice.reduce((sum, elem) => {return sum + elem}, 0);
        elementTotalPrice.innerHTML = `
        <span>Total price: ${resultTotal.toFixed(2)}$</span>
        `
        TotalPriceOutput.append(elementTotalPrice);
        const totalItems = totalItemCount.reduce((sum, elem) => {return sum + elem}, 0);
        const busketItemsTotal = document.querySelector('#basket__item');
        const busketItemsElement = document.createElement('span');
        busketItemsTotal.innerHTML = '';
        busketItemsElement.innerHTML = `${totalItems}`;
        busketItemsTotal.append(busketItemsElement);
        deleteItem ();
    }
    renderBusketItems (busketOutput, getFromLocalStorage ('product'));
    function deleteItem () {
        const [...delItemBusket] = document.querySelectorAll('[data-busket-del]');
        delItemBusket.forEach((el) => {
            el.addEventListener('click', (evt) => {
                const target = evt.target.dataset.article;
                busketCatalogGoods.forEach((value, index) => {
                    if (value.article === parseInt(target)) {
                        busketCatalogGoods.splice(index, 1);
                    }
                })
                putLocalStorage('product', busketCatalogGoods);
                renderBusketItems (busketOutput, getFromLocalStorage ('product'));
            })
        })
        const [...counterButtonsPlus] = document.querySelectorAll('[data-count-plus]');
        counterButtonsPlus.forEach((elem) => {
            elem.addEventListener('click', (e) => {
                const target = e.target.dataset.article;
                busketCatalogGoods.forEach((element) => {
                    if (element.article === parseInt(target) && element.count >= 1) {
                        element.count += 1;
                    }
                })
                putLocalStorage('product', busketCatalogGoods);
                renderBusketItems (busketOutput, getFromLocalStorage ('product'));
            })
        })
        const [...couterButtonMinus] = document.querySelectorAll('[data-count-minus]');
        couterButtonMinus.forEach((el) => {
            el.addEventListener('click', (e) => {
                const target = e.target.dataset.article;
                busketCatalogGoods.forEach((item, index) => {
                    if (item.article === parseInt(target) && item.count === 1) {
                        busketCatalogGoods.splice(index, 1);
                    } else if (item.article === parseInt(target) && item.count > 1) {
                        item.count -= 1;
                    }
                })
                putLocalStorage('product', busketCatalogGoods);
                renderBusketItems (busketOutput, getFromLocalStorage ('product'));
            })
        })
    }
}
