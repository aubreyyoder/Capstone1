function hamburgerCross(bar) {
    bar.classList.toggle("change");
}



// For Google Places (key = apiKey)
const apiKey = "ceWcXsB3ARU6PnLvQ6tvgKEM3Djqrm";

// Get the latest foreign exchange reference rates
const exchangeRateURL = 'https://www.amdoren.com/api/currency.php'

// Get places in Google Maps
const placesURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/output'



let oldCurrency = '';
let newCurrency = '';
let exchangeAmount='';


// ----------------------------------------------------------------


// Create function navbar buttons take to certain pages
function navBarReroutes() {

}

// Create button to drop down menu for hamburger menu
function hamburgerDropDown() {

}

// Create function to display select-currency page
function displayCurrencySelections() {
    $('.old-currencies').append(
        `<li class="currency"><button id="EUR" value="€">€ (EUR)</button></li>
        <li class="currency"><button id="JAP" value="¥">¥ (JAP)</button></li>
        <li class="currency"><button id="GBD" value="£">£ (GBD)</button></li>
        <li class="currency"><button id="CAD" value="$ (CAD)">$ (CAD)</button></li>
        <li class="currency"><button id="USD" value="$ (USD)">$ (USD)</button></li>
        <li class="currency"><button id="NZD" value="$ (NZD)">$ (NZD)</button></li>
        <li class="currency"><button id="MXN" value="$ (MEX)">$ (MEX)</button></li>
        <li class="currency"><button id="AUD" value="$ (AUD)">$ (AUD)</button></li>`
    );
    $('.old-currencies').removeClass('hidden');
    $('button').on('click',function(event) {
        const oldCurrency = $(this).val();
        console.log(oldCurrency);
        //$('.old-currencies').addClass('hidden');
        displayInputPage(oldCurrency);
    });
}

// Create function to display number input page with selected currency symbol
function displayInputPage(oldCurrency) {
    
    $('#input-currency-symbol').append(
        `<li id="input-symbol">${oldCurrency}</li>`
    );
    $('.amount').removeClass('hidden');
    $('#submit').on('click', function(event) {
        let exchangeAmount = document.getElementById("user-input-amount").value;
        console.log(exchangeAmount);
        displayDesiredCurrencySelection(oldCurrency, exchangeAmount);
    })
}

// Create function to display desired currency page
function displayDesiredCurrencySelection(oldCurrency, exchangeAmount) {
    $('.new-currencies').removeClass('hidden');
    $('.new-currencies').append(
        `<li class="currency"><button id="EUR" value="€">€ (EUR)</button></li>
        <li class="currency"><button id="JAP" value="¥">¥ (JAP)</button></li>
        <li class="currency"><button id="GBD" value="£">£ (GBD)</button></li>
        <li class="currency"><button id="CAD" value="$ (CAD)">$ (CAD)</button></li>
        <li class="currency"><button id="USD" value="$ (USD)">$ (USD)</button></li>
        <li class="currency"><button id="NZD" value="$ (NZD)">$ (NZD)</button></li>
        <li class="currency"><button id="MXN" value="$ (MEX)">$ (MEX)</button></li>
        <li class="currency"><button id="AUD" value="$ (AUD)">$ (AUD)</button></li>`
    );
    $('.amount').addClass('hidden');
    $('.old-currencies').addClass('hidden');
    $('button').on('click', function(event) {
        const newCurrency = $(this).val();
        console.log(newCurrency);
        $('.new-currencies').addClass('hidden');
        displayConfirmation(oldCurrency, exchangeAmount, newCurrency);
    });
}

// Create function to show "is this correct? Page"
function displayConfirmation(oldCurrency, exchangeAmount, newCurrency) {
    $('.confirmation').removeClass('hidden');
    $('#confirmation-paragraph').replaceWith(
        `<h1>${oldCurrency} ${exchangeAmount} to ${newCurrency}</h1>
        <button id ="js-yes-btn" value="yes">YES</button>
        <button id="js-no-btn" value="no">NO</button>`
    );
    console.log('paragraph replaced');
    const yesButton = $('#js-yes-btn').val();
    const noButton = $('#js-no-btn').val();
    
    $('button').on('click', function(event) {
        if (this.value == yesButton) {
            console.log(yesButton);
            getExchangeRates();
        } else if (this.value == noButton) {
            console.log(noButton);
            alert(`CLICK 'HOME' IN THE NAVBAR TO START OVER!!`);
        }
    })
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

// Creates a function that fetches API info for exchange rates
function getExchangeRates() {
    console.log('...Fetching exchange rates');
    const params = {
        'api_key': apiKey,
        'from': oldCurrency,
        'to': newCurrency,
        'amount': exchangeAmount
    }
    const queryString = formatQueryParams(params)
    const url = exchangeRateURL + '?' + queryString;

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
}

// Create Favorites button that saves to favorites page
function saveToFavorites() {

}

// Create favorites page
function goToFavoritesPage() {

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




$(watchForm);