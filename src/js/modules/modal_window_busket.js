// модальне вікно кошика товарів

export function ModalWindowBusket (buttonSelector, basketSelector) {
    const basketButton = document.querySelector(buttonSelector);
    const basket = document.querySelector(basketSelector);
    function openModal() { // відкриття модального вікна
        basket.classList.add('show');
        basket.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }
    basketButton.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
// перебираємо всі отримані кнопки й відкриваємо модальне вікно
    function closeModal() { // закриваємо модальне вікно
        basket.classList.add('hide');
        basket.classList.remove('show');
        document.body.style.overflow = '';
    }
    basket.addEventListener('click', (e) => { // закриваємо модальне вікно якщо клацнути на підложку
        if (e.target === basket || e.target.getAttribute('data-close') === '') {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => { // закриваємо модальне вікно якщо клацнути на ескейп
        if (e.code === "Escape" && basket.classList.contains('show')) {
            closeModal();
        }
    });
}