import {paginationRender} from "./pagination.js";
import {renderRating} from "./rating.js";
import {catalog} from "./catalog_array.js";

export function searchCatalog (searchInput, array) {
    const valueSearch = document.querySelector(searchInput);
    valueSearch && valueSearch.addEventListener('keyup', () => {
        if (valueSearch.value !== null) {
            const testing = array.filter((e) => (e.description.toLowerCase().includes(valueSearch.value.toLowerCase())) );
            paginationRender({
                nameCatalog: testing,
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
        }
        renderRating(catalog);
    });
}