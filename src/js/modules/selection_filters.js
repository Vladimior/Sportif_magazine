import {renderColorSize} from "./product_card.js";

export function selectionFilters (array, menuSizeSelector, menuColorSelector, menuTypeSelector) {
    const allSizeCatalog = [];
    const allColorCatalog = [];
    const allTypeCatalog = [];

    const menuSize = document.querySelector(menuSizeSelector);
    const menuColor = document.querySelector(menuColorSelector);
    const menuType = document.querySelector(menuTypeSelector);


    for (let i = 0; i < array.length; i++) {
        for (let key in array[i].size) {
            allSizeCatalog.push(array[i].size[key]);
        }
        for (let key in array[i].color) {
            allColorCatalog.push(array[i].color[key]);
        }
        for (let key in array[i].title) {
            allTypeCatalog.push(array[i].title);
        }
    }
    const newAllSizeCatalog = new Set(allSizeCatalog);
    const newAllColorCatalog = new Set(allColorCatalog);
    const newAllTypeCatalog = new Set(allTypeCatalog);
    const uniqueSizeCatalog = Array.from(newAllSizeCatalog);
    const uniqueColorCatalog = Array.from(newAllColorCatalog);
    const uniqueTypeCatalog = Array.from(newAllTypeCatalog);
    renderColorSize (uniqueSizeCatalog, menuSize, 'size', 'checkbox');
    renderColorSize (uniqueColorCatalog, menuColor, 'color', 'checkbox');
    renderColorSize (uniqueTypeCatalog, menuType, 'type', 'checkbox');

}