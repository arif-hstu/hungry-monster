
// function to search meal
const searchMeal = () => {
    // select html element by Id name
    const cardHolder = idSelector('card-holder');
    const detailsHolder = idSelector('details-holder');
    const inputMeal = idSelector('input-meal');

    const searchedMeal = inputMeal.value;

    // check if the input is empty and show warning
    if (searchedMeal === '') {
        cardHolder.innerHTML = "";
        detailsHolder.innerHTML = `
        <div id='info'>
        <h6> Please Input the Name of Your Favourite Meal! </h6>
        </div>
        `;
    } else {
        // clear previous searched items and information
        cardHolder.innerHTML = '';
        detailsHolder.innerHTML = '';

        // fetch data from themealdb.com
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedMeal}`)
            .then(res => res.json())
            .then(data => {
                const mealsArray = data.meals;

                // check if the input is not valid
                if (mealsArray === null) {
                    cardHolder.innerHTML = "";
                    detailsHolder.innerHTML = `
                    <div id='warning'>
                    <h6> Please Input a VALID Name of Your Favourite Meal! </h6>
                    </div>
                    `;

                    // if the input is valid
                } else {
                    mealsArray.forEach(meal => {
                        createHtmlElement(meal);
                    });
                }
            })

        // call the function to display the details of the clicked item
        displayDetails(searchedMeal);
    }

}

// function to select the html element by Id 
const idSelector = id => {
    const selectedId = document.getElementById(id);
    return selectedId;
}

// create cards of the searched meals
const createHtmlElement = meal => {
    // select the card-holder div
    const cardHolder = idSelector('card-holder');

    // create cards with proper html elements
    const card = document.createElement('div');
    card.className = 'card';
    const cardInfo = `
        <img src='${meal.strMealThumb}'>
        <h3>${meal.strMeal}</h2>
        `;
    card.innerHTML = cardInfo;
    cardHolder.appendChild(card);
}


// function to display details in card
const displayDetails = (searchedMeal) => {
    // select the html elements by Id 
    const inputGroup = idSelector('input-group');
    const cardHolder = idSelector('card-holder');

    // add click event listener to the cards of meals
    cardHolder.addEventListener('click', function (event) {

        // clear the div with card-holder class name
        cardHolder.innerHTML = '';
        
        // hide the search option
        inputGroup.style.display = 'none';
        
        // target the clicked element by event bubble
        const mealName = event.target.parentNode.children[1].innerHTML;
        
        // convert the targeted meal name into URI object
        const convertedMealName = encodeURI(mealName);
        
        // call the function getDetails to find the details info
        getDetails(convertedMealName);

    })


    const getDetails = (convertedMealName) => {
        // fetch the data from themealdb.com with the specific meal name
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${convertedMealName}`)
            .then(res => res.json())
            .then(data => {
                const mealsArray = data.meals;
                const meal = mealsArray[0];
                createDetails(meal);
            })
    }

    // function to create details information of the clicked item
    const createDetails = meal => {
        // import the box-tick icon
        const icon = `<img src='icons/box-tick.svg'>`;

        // select html element by Id name
        const detailsHolder = idSelector('details-holder');

        // clear previous info
        detailsHolder.innerHTML = '';

        // create new element with details
        const card = document.createElement('div');
        card.className = 'details-card';

        const cardInfo = `
            <img src='${meal.strMealThumb}'>
            <h2>${meal.strMeal}</h2>
            <h3>Ingredients</h3>
            <ul>
                <li>${icon} ${meal.strMeasure1} ${meal.strIngredient1}<li>
                <li>${icon} ${meal.strMeasure2} ${meal.strIngredient3}<li>
                <li>${icon} ${meal.strMeasure3} ${meal.strIngredient2}<li>
                <li>${icon} ${meal.strMeasure4} ${meal.strIngredient4}<li>
                <li>${icon} ${meal.strMeasure5} ${meal.strIngredient5}<li>
                <li>${icon} ${meal.strMeasure6} ${meal.strIngredient6}<li>
                <li>${icon} ${meal.strMeasure7} ${meal.strIngredient7}<li>
                <li>${icon} ${meal.strMeasure8} ${meal.strIngredient8}<li>
                <li>${icon} ${meal.strMeasure9} ${meal.strIngredient9}<li>
                <li>${icon} ${meal.strMeasure10} ${meal.strIngredient10}<li>
                <li>${icon} ${meal.strMeasure11} ${meal.strIngredient11}<li>
                <li>${icon} ${meal.strMeasure12} ${meal.strIngredient12}<li>
                <li>${icon} ${meal.strMeasure13} ${meal.strIngredient13}<li>
                <li>${icon} ${meal.strMeasure14} ${meal.strIngredient14}<li>
                <li>${icon} ${meal.strMeasure15} ${meal.strIngredient15}<li>
                <li>${icon} ${meal.strMeasure16} ${meal.strIngredient16}<li>
                <li>${icon} ${meal.strMeasure17} ${meal.strIngredient17}<li>
                <li>${icon} ${meal.strMeasure18} ${meal.strIngredient18}<li>
                <li>${icon} ${meal.strMeasure19} ${meal.strIngredient19}<li>
                <li>${icon} ${meal.strMeasure20} ${meal.strIngredient20}<li>
            </ul>
            <button onclick='window.location.reload();' type='button'>Search Again
            </button>
            `;

        card.innerHTML = cardInfo;
        detailsHolder.appendChild(card);

        // select html elements with querySelector
        const ul = document.querySelector('ul');
        const liList = document.querySelectorAll('li');

        // select html element by Id
        const ingredient = idSelector('ingredient');

        // remove the specific li with empty string 
        for (let i = 0; i < liList.length; i++) {
            const li = liList[i];

            // if the ingredient's string from the api is empty
            if (li.innerText.length < 2) {
                li.innerText = '';
                console.log(li.innerText)
            }
        }
    }
}

// function to reload window when necessary
const reloadWindow = () => {
    window.location.reload();
}

