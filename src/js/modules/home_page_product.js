import {ProductCard} from "./product_card.js";
import {renderRating} from "./rating.js";

export function homePageCardDisplay (amount, parentTarget, array, className) {
    for (let i = 0; i < amount; i++) {
        new ProductCard (
            `${array[i].image}`,
            'product',
            `${array[i].description}`,
            5,
            `${array[i].price}`,
            `${array[i].color}`,
            `${array[i].size}`,
            `${array[i].article}`,
            `${parentTarget}`,
            className).render();
    }
}