function hamburgerCross(bar) {
    bar.classList.toggle("change");
}



// For Google Places (key = apiKey)
const apiKey = "5c72bc66f25b5/2279d04a235e69caf5a0500eb061e7f4";

// Get the latest foreign exchange reference rates
const exchangeRateURL = 'https://bankersalgo.com/apicalc2/'

// Get places in Google Maps
const placesURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/output'

let desiredCurrency = '';
let sourceCurrency = '';
let exchangeAmount = '';



// ----------------------------------------------------------------


// Create function navbar buttons take to certain pages
function navLanding() {
    $('#nav-landing').click(event => {
        event.preventDefault();
        watchForm();
    })
}

function navFavorites() {
    $('#nav-favorites').click(event => {
        event.preventDefault();
        goToFavoritesPage();
    })
}

function navLocations() {
    $('#nav-locations').click(event => {
        event.preventDefault();
        goToLocationPage();
    })
}

// Create button to drop down menu for hamburger menu
function hamburgerDropDown() {

}

// Create function to display select-currency page
function displayCurrencySelections() {
    $('.old-currencies').append(
        `<li class="currency"><button id="EUR" name="€" value="EUR">€ (EUR)</button></li>
        <li class="currency"><button id="JAP" name="¥"value="JAP">¥ (JAP)</button></li>
        <li class="currency"><button id="GBD" name="£" value="GBD">£ (GBD)</button></li>
        <li class="currency"><button id="CAD" name="$ (CAD)" value="CAD">$ (CAD)</button></li>
        <li class="currency"><button id="USD" name="$ (USD)" value="USD">$ (USD)</button></li>
        <li class="currency"><button id="NZD" name="$ (NZD)" value="NZD">$ (NZD)</button></li>
        <li class="currency"><button id="MXN" name="$ (MEX)" value="MEX">$ (MEX)</button></li>
        <li class="currency"><button id="AUD" name="$ (AUD)" value="AUD">$ (AUD)</button></li>`
    );
    $('.old-currencies').removeClass('hidden');
    $('button').on('click',function(event) {
        event.preventDefault();
        sourceCurrency = this.value;
        console.log(sourceCurrency);
        //$('.old-currencies').addClass('hidden');
        displayInputPage(sourceCurrency);
    });
}

// Create function to display number input page with selected currency symbol
function displayInputPage(sourceCurrency) {
    
    $('#input-currency-symbol').append(
        `<li id="input-symbol">${sourceCurrency}</li>`
    );
    $('.amount').removeClass('hidden');
    $('#submit').on('click', function(event) {
        event.preventDefault();
        exchangeAmount = document.getElementById("user-input-amount").value;
        console.log(exchangeAmount);
        displayDesiredCurrencySelection();
    })
}

// Create function to display desired currency page
function displayDesiredCurrencySelection() {
    $('.amount').addClass('hidden');
    $('.old-currencies').addClass('hidden');
    $('.new-currencies').removeClass('hidden');
    $('.new-currencies').append(
        `<li class="currency"><button id="EUR" name="€" value="EUR">€ (EUR)</button></li>
        <li class="currency"><button id="JAP" name="¥"value="JAP">¥ (JAP)</button></li>
        <li class="currency"><button id="GBD" name="£" value="GBD">£ (GBD)</button></li>
        <li class="currency"><button id="CAD" name="$ (CAD)" value="CAD">$ (CAD)</button></li>
        <li class="currency"><button id="USD" name="$ (USD)" value="USD">$ (USD)</button></li>
        <li class="currency"><button id="NZD" name="$ (NZD)" value="NZD">$ (NZD)</button></li>
        <li class="currency"><button id="MXN" name="$ (MEX)" value="MEX">$ (MEX)</button></li>
        <li class="currency"><button id="AUD" name="$ (AUD)" value="AUD">$ (AUD)</button></li>`
    );
    $('button').on('click', function(event) {
        event.preventDefault();
        desiredCurrency = this.value;
        console.log(desiredCurrency);
        $('.new-currencies').addClass('hidden');
        displayConfirmation(sourceCurrency, exchangeAmount, desiredCurrency);
    });
}


// Create function to show "is this correct? Page"
function displayConfirmation(sourceCurrency, exchangeAmount, desiredCurrency) {
    $('.confirmation').removeClass('hidden');
    $('#confirmation-paragraph').replaceWith(
        `<h1>${sourceCurrency} ${exchangeAmount} to ${desiredCurrency}</h1>
        <button id ="js-yes-btn" value="yes">YES</button>
        <button id="js-no-btn" value="no">NO</button>`
    );
    console.log('paragraph replaced');
    const yesButton = $('#js-yes-btn').val();
    const noButton = $('#js-no-btn').val();
    
    $('button').on('click', function(event) {
        if (this.value == yesButton) {
            console.log(yesButton);
            getExchangedRate(sourceCurrency, exchangeAmount, desiredCurrency);
        } else if (this.value == noButton) {
            console.log(noButton);
            alert(`CLICK 'HOME' IN THE NAVBAR TO START OVER!!`);
        }
    })
    $('.confirmation').addClass('hidden');
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(params[key])}`)
    return queryItems.join('/');
}

// Creates a function that fetches API info for exchange rates
function getExchangedRate(apiKey, sourceCurrency, exchangeAmount, desiredCurrency) {
    console.log('...Fetching exchange rates');
    console.log(apiKey);
    console.log(sourceCurrency);
    console.log(exchangeAmount);
    console.log(desiredCurrency);

    
    const params = {
        apiKey,
        sourceCurrency,
        desiredCurrency,
        exchangeAmount
    }

    const queryString = formatQueryParams(params)
    const url = exchangeRateURL + queryString;

    console.log(url);
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

// Create function to display results
function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').append(
        `<li class="results-list-items">${sourceCurrency} ${exchangeAmount} = 
        ${desiredCurrency} ${responseJson.result}</li>`
    );
    $('.results').removeClass('hidden');
}

// Create Favorites button that saves to favorites page
function addToFavorites() {
    $('#add-to-favorites-btn').click(event => {
        event.preventDefault();
        console.log('add-to-favorites-btn clicked');
        $('#faves-list').append(
            `<li class="fav-items">${sourceCurrency} to ${desiredCurrency}</li>`
        )
    })

}

function findBank() {
    $('#find-bank-btn').click(event => {
        event.preventDefault();
        console.log('find-bank-btn clicked');
    })
}

function newSearch() {
    $('#new-search-btn').click(event => {
        event.preventDefault();
        console.log('new-search-btn clicked');
    })
}

// Create favorites page
function goToFavoritesPage() {
    $('#')

}

function goToLocationPage() {

}

// Create function for landing button to take to '#select-currency' page
function watchForm() {
    // event handler
    $('#landing-btn').on('click', event => {
        event.preventDefault;
        $('.landing').addClass('hidden');
        displayCurrencySelections(); 
    });
}


function handleFunction() {
    watchForm();
    navLanding();
    navFavorites();
    navLocations();
}

$(handleFunction);
