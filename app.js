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

        // import icon
        const icon = `<img src='icons/box-tick.svg'>`;

        const cardInfo = `
            <img src='${meal.strMealThumb}'>
            <h2>${meal.strMeal}</h2>
            <h3>Ingredients</h3>
            <ul>
                <li>${icon} ${meal.strIngredient1}<li>
                <li>${icon} ${meal.strIngredient2}<li>
                <li>${icon} ${meal.strIngredient3}<li>
                <li>${icon} ${meal.strIngredient4}<li>
                <li>${icon} ${meal.strIngredient5}<li>
                <li>${icon} ${meal.strIngredient6}<li>
                <li>${icon} ${meal.strIngredient7}<li>
                <li>${icon} ${meal.strIngredient8}<li>
                <li>${icon} ${meal.strIngredient9}<li>
                <li>${icon} ${meal.strIngredient10}<li>
                <li>${icon} ${meal.strIngredient11}<li>
                <li>${icon} ${meal.strIngredient12}<li>
                <li>${icon} ${meal.strIngredient13}<li>
                <li>${icon} ${meal.strIngredient14}<li>
                <li>${icon} ${meal.strIngredient15}<li>
                <li>${icon} ${meal.strIngredient16}<li>
                <li>${icon} ${meal.strIngredient17}<li>
                <li>${icon} ${meal.strIngredient18}<li>
                <li>${icon} ${meal.strIngredient19}<li>
                <li>${icon} ${meal.strIngredient20}<li>
            </ul>
            <button onclick='window.location.reload();' type='button'>Search Again
            </button>
            `;
        
       
        card.innerHTML = cardInfo;
        cardHolder.appendChild(card);

        const ul = document.querySelector('ul');
        const liList = document.querySelectorAll('li');
        for (let i = 0; i < liList.length; i++) {
            const li = liList[i];


            
             if (li.innerText.length < 3){
                li.innerText = '';
            } 
        }
         
    }

}


