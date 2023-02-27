export function showHide (headerSelector, iconSelector, bodyMenuSelector, arrowSelector) {
// приховування/показ меню і стрілки наверх за допомогою rxJs
// constants DOM
    const headerEl = document.querySelector(headerSelector);
    const iconMenuEl = document.querySelector(iconSelector);
    const bodyMenuEl = document.querySelector(bodyMenuSelector);
    const arrowUpEl = document.querySelector(arrowSelector);
    iconMenuEl.addEventListener('click', () => {
        document.body.classList.toggle('body__lock');
        iconMenuEl.classList.toggle('menu__icon_active');
        bodyMenuEl.classList.toggle('menu__body_active');
    })

// import RxJs
    let { fromEvent } = window.rxjs;
    let {
        filter,
        pairwise,
        map,
        throttleTime,
    } = window.rxjs.operators;

// Constants stream
    const scrolling$ = fromEvent(document, 'scroll');

// Scrolling
    scrolling$.pipe(
        map(() => window.scrollY),
        throttleTime(190),
        pairwise(),
        filter((pixel) => (pixel[0] - pixel[1]) > 30 || (pixel[1] - pixel[0]) > 30),
        map((pixel) => pixel[1] < pixel[0]),
    ).subscribe((e) => {
        if (e) {
            headerEl.classList.remove('header_hidden');
            arrowUpEl.classList.add('hidden');
        } else {
            headerEl.classList.add('header_hidden');
            arrowUpEl.classList.remove('hidden');
        }
    });

    arrowUpEl.addEventListener('click', () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    })
}