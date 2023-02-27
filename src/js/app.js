// імпортуємо інші javaScript
import * as flsFunctions from "./modules/functions.js";
import {showHide} from "./modules/show_hide.js";
import {acordion} from "./modules/acordion.js";
import {ModalWindowBusket} from "./modules/modal_window_busket.js";
import {homePageCardDisplay} from "./modules/home_page_product.js";
import {selectionFilters} from "./modules/selection_filters.js";
import {paginationRender} from "./modules/pagination.js";
import {renderRating} from "./modules/rating.js";
import {basketProduct} from "./modules/basket.js";
import {hideFilter, ProductFilter} from "./modules/filters.js";
import {singlePageProduct, sliderImageProduct} from "./modules/single_page.js";
import {searchCatalog} from "./modules/search_in_catalog.js";
import {getResource} from "./services/services.js";

flsFunctions.isWebp();

showHide('[data-header]', '[data-icon]', '[data-menu]', '[data-arrow-up]');

// меню акордіон фільтрів
acordion ('.dropdown__filter');

// модальне вікно кошика товарів
ModalWindowBusket ('[data-basket]', '.basket');

getResource('https://vladimior.github.io/catalog.json').then(data => {
    // показувати картки товарів на головній сторінці
    homePageCardDisplay(4, '.production__card', data, 'card');
    // створення пагінації на сторінці каталогу
    paginationRender({
        nameCatalog: data,
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
    // виводимо всі наявні розміри і кольори до меню фільтрації прибираючи повторення
    selectionFilters(data,'.menu-size', '.menu-color', '.menu-type');
    // створюємо фільтрацію товарів
    ProductFilter('.catalog__filter', '#clear-size', '#clear-color', '#set_rating', data);
    // перехід на сторінку товару
    singlePageProduct ('.goods__page', '.catalog__links-url', data);
    // кошик товарів
    basketProduct (data, '.basket__product', '.catalog__pagination', '.basket__totat_price');
    basketProduct (data, '.basket__product', '.goods__page', '.basket__totat_price');
    basketProduct (data, '.basket__product', '.production__card', '.basket__totat_price');
    // пошук на сторінці каталогу
    searchCatalog('#search__product', data);
    // промальовуємо рейтинг
    renderRating(data);
    // слайдер зображень на детальній сторінці товару
    sliderImageProduct('.goods__image', '.goods__image-min div');
});

//приховування блоку фільтрації
hideFilter('.catalog__filter-container', '.filter__icon');
