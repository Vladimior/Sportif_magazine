// створення пагінації на сторінці каталогу
import {ProductCard} from "./product_card.js";
import {renderRating} from "./rating.js";
import {catalog} from "./catalog_array.js";

function hideOverPages(target, hidePagButton, hideClass) { //робота кнопок перемикання пагінації
    const [...items] = document.querySelectorAll(hidePagButton);
    items.forEach((item) => item.classList.add(hideClass));
    if (target) {
        target.classList.remove(hideClass);
    }
    if (target) {
        if (target.nextElementSibling) {
            target.nextElementSibling.classList.remove(hideClass);
        }
    }
    if (target) {
        if (target.previousElementSibling) {
            target.previousElementSibling.classList.remove(hideClass);
        }
    }
}

export function paginationRender({
                                     nameCatalog,
                                     paginationParentSelector,
                                     paginationButtonSelector,
                                     nextPageSelector,
                                     activePageSelector,
                                     hidePaginationButtons,
                                     paginationParentClass,
                                     numberProductsCards,
                                     classForActive,
                                     classForHide}) {
    const paginationParentOutput = document.querySelector(paginationParentSelector);
    const paginationButton = document.querySelector(paginationButtonSelector);
    const nextPage = document.querySelector(nextPageSelector);
    let catalog = nameCatalog;
    let active;
    if (paginationButton) {
        paginationButton.innerHTML = '';
    }
    const noteOnPage = numberProductsCards;
    const countOfPages = Math.ceil(nameCatalog.length / noteOnPage);
    const items = [];
    for (let i = 1; i <= countOfPages; i++) {
        const span = document.createElement('span');
        span.innerText = i;
        paginationButton && paginationButton.append(span);
        items.push(span);
    }
    itemsPagination(items[0], activePageSelector, classForActive);
    for (let i of items) {
        i.addEventListener('click', function() {
            itemsPagination(this, activePageSelector, classForActive);
            renderRating (catalog);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        });
    }

    function itemsPagination(item, activePages, activeClass) {
        active = item;
        if (item === undefined) {
            paginationParentOutput.innerHTML = 'Товарів не знайдено';
        } else {
            const activePage = document.querySelector(activePages);
            activePage && activePage.classList.remove(activeClass);
            item.classList.add(activeClass);
            const pageNum = +item.innerHTML;
            const start = (pageNum - 1) * noteOnPage;
            const end = start + noteOnPage;
            const notes = nameCatalog.slice(start, end);
            if (paginationParentOutput) {
                paginationParentOutput.innerHTML = '';
            }
            for (let n of notes) {
                new ProductCard(
                    `${n.image}`,
                    'product',
                    `${n.description}`,
                    5,
                    `${n.price}`,
                    `${n.color}`,
                    `${n.size}`,
                    `${n.article}`,
                    paginationParentSelector,
                    paginationParentClass).render();
            }
        }
        hideOverPages(active, hidePaginationButtons, classForHide);
    }
    nextPage && nextPage.addEventListener("click", function() {
        if (active) {
            if (active.nextElementSibling) {
                itemsPagination(active.nextElementSibling, activePageSelector, classForActive);
                renderRating (catalog);
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }
        }
    });
}