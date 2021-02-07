const searchMeal = () => {
    
    const searchedMeal = idSelector('input-meal').value;
    // remove previous searched items
    const cardHolder = idSelector('card-holder');
    cardHolder.innerHTML = "";

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedMeal}`)
        .then(res => res.json())
        .then(data => {
            const mealsArray = data.meals;
            mealsArray.forEach(meal => {
                createHtmlElement(meal);
            });
        })

    displayDetails(searchedMeal);
}

const idSelector = id => {
    const selectedId = document.getElementById(id);
    return selectedId;
}

const createHtmlElement = meal => {
    const cardHolder = document.getElementById('card-holder');

    const card = document.createElement('div');
    card.className = 'card';
    const cardInfo = `
        <img src='${meal.strMealThumb}'>
        <h3>${meal.strMeal}</h2>
        `;
    card.innerHTML = cardInfo;
    cardHolder.appendChild(card);
}

const displayDetails = (searchedMeal) => {
    
    const inputGroup = document.getElementById('input-group');
    const cardHolder = document.getElementById('card-holder');
    cardHolder.addEventListener('click', function(event){
        cardHolder.innerHTML = '';
        inputGroup.style.display = 'none';

        const cards = document.querySelectorAll('.card');
        const mealName = event.target.parentNode.children[1].innerHTML;
        const convertedMealName = encodeURI(mealName);
        getDetails(convertedMealName);

    })
    
    
    const getDetails = (convertedMealName) => {
        // selecting specific object
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${convertedMealName}`)
    .then(res => res.json())
    .then(data => {
        const mealsArray = data.meals;
        const meal = mealsArray[0];
        createDetails(meal);
    })
    }

    const createDetails = meal => {

        const cardHolder = document.getElementById('details-holder');
    
        const card = document.createElement('div');
        card.className = 'details-card';
        const cardInfo = `
            <img src='${meal.strMealThumb}'>
            <h3>${meal.strMeal}</h2>
            <button onclick='window.location.reload();' type='button'>Button
            </button>
            `;
        card.innerHTML = cardInfo;
        cardHolder.appendChild(card);
    }

}


