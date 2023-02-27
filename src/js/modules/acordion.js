

export function acordion (acordSelector) {
    let i;
    const acord = document.querySelectorAll(acordSelector);
    for (i = 0; i < acord.length; i++) {
        acord[i].addEventListener("click", function() {
            this.classList.toggle("active");
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight){
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
}