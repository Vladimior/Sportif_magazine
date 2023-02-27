import {paginationRender} from "./pagination.js";
import {renderRating} from "./rating.js";

export function ProductFilter (catalogSelector, clearSizeSelector, clearColorSelector, ratingSelector, array) {
    const filters = document.querySelector(catalogSelector);
    const clearSizeFilter = document.querySelector(clearSizeSelector);
    const clearColorFilter = document.querySelector(clearColorSelector);
    const inputRating = document.querySelector(ratingSelector);
    function filtersTwoArray (options, items) { // функція перевірки масиву наявності таких параметрів(кольорів, розмірів) в масиві каталогу
        const store = [];
        options.forEach((e) => {
            const value = items.includes(e);
            store.push(value);
        })
        if (store.length !== 0) {
            return store.includes(true);
        }
    }
    function filterGoods(array) { //фільтрації і відображення данних
        const filterSizeCheck = [...filters.querySelectorAll('.menu-size input:checked')].map(n => parseInt(n.value));
        const filterColorCheck = [...filters.querySelectorAll('.menu-color input:checked')].map(n => n.value);
        const filterTypeCheck = [...filters.querySelectorAll('.menu-type input:checked')].map(n => n.value);
        const priceMin = document.querySelector('#price-min').value;
        const priceMax = document.querySelector('#price-max').value;
        const rating = document.querySelector('#set_rating').value;
        const filterArr = array.filter(n => (
            (!filterTypeCheck.length || filterTypeCheck.includes(n.title)) &&
            (!filterSizeCheck.length || filtersTwoArray(filterSizeCheck, n.size)) &&
            (!filterColorCheck.length || filtersTwoArray(filterColorCheck, n.color)) &&
            (!priceMin || priceMin <= n.price) &&
            (!priceMax || priceMax >= n.price) &&
            (!rating || rating <= n.rating)
        ));
        paginationRender({
            nameCatalog: filterArr,
            paginationParentSelector: '.catalog__pagination',
            paginationButtonSelector: '.pagination__buttons-list',
            nextPageSelector: '.pagination__arrow_next',
            activePageSelector: '.pagination__buttons span.active',
            hidePaginationButtons: '.pagination__buttons-list span',
            paginationParentClass: 'card',
            numberProductsCards: 10,
            classForActive: 'active',
            classForHide: 'hide',
        });
        renderRating (array);
    }
    filters && filters.addEventListener('input', () => {filterGoods(array)});

    // функцію очистки фільтрів
    function clearFilter (filter) {
        const [...filterSizeCheck] = document.querySelectorAll(filter);
        filterSizeCheck.forEach((e) => {
            e.checked = false;
            filterGoods(array);
        })
    }
    clearSizeFilter && clearSizeFilter.addEventListener('click', () => {
        clearFilter ('.menu-size input');
    });
    clearColorFilter && clearColorFilter.addEventListener('click', () => {
        clearFilter ('.menu-color input');
    });

    // обмеження на ввід максимального і мінімального рейтингу

    inputRating && inputRating.addEventListener('input', (e) => {
        const min = +inputRating.min;
        const max = +inputRating.max;
        const value = +inputRating.value;
        if (value > max) { inputRating.value = max }
        else if (value < min) { inputRating.value = min }
    });
}

export function hideFilter (filterSelector, filterButtonSelector) {
    const filtersHide = document.querySelector(filterSelector);
    const filtersHideButton = document.querySelector(filterButtonSelector);
    filtersHideButton && filtersHideButton.addEventListener('click', () => {
        filtersHide.classList.toggle('filter_hide');
    })
}