// показ рейтингу

export function renderRating (array) {
    array.forEach((e) => {
        const ratings = document.querySelectorAll(`.rating${e.article}`);
        if (ratings.length > 0) {
            initRatings(`${e.rating.toString()}`, `${e.article}`);
        }
    })

    function initRatings(getRating, target) {
        let ratingActive, ratingValue;
        const ratings = document.querySelectorAll(`.rating${target}`);
        for (let index = 0; index < ratings.length; index++) {
            const rating = ratings[index];
            initRating(rating);
        }
        function initRatingVars(rating) {
            ratingActive = rating.querySelector('.rating__active');
            ratingValue = getRating;
        }
        function setRatingActiveWidth(index) {
            const ratingActiveWidth = index / 0.05;
            ratingActive.style.width = `${ratingActiveWidth}%`;
        }
        function initRating(rating) {
            initRatingVars(rating);
            setRatingActiveWidth(ratingValue);
        }
    }
}