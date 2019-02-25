function hamburgerCross(bar) {
    bar.classList.toggle("change");
}



// For Google Places (key = apiKey)
const apiKey = "5c72bc66f25b5/2279d04a235e69caf5a0500eb061e7f4";

// Get the latest foreign exchange reference rates
const exchangeRateURL = 'https://bankersalgo.com/apicalc2/'

// Get places in Google Maps
const placesURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/output'





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
        const oldCurrency = this.value;
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
        const newCurrency = this.value;
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
            getExchangedRate(oldCurrency, exchangeAmount, newCurrency);
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
function getExchangedRate(apiKey, oldCurrency, exchangeAmount, newCurrency) {
    console.log('...Fetching exchange rates');
    console.log(apiKey);
    console.log(oldCurrency);
    console.log(exchangeAmount);
    console.log(newCurrency);

    
    const params = {
        apiKey,
        oldCurrency,
        newCurrency,
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
        `<li class="results-list-items">${oldCurrency} ${exchangeAmount} = 
        ${newCurrency} ${responseJson.result}</li>`
    );
    $('.results').removeClass('hidden');
}

// Create Favorites button that saves to favorites page
function addToFavorites() {
    $('#add-to-favorites-btn').click(event => {
        event.preventDefault();
        console.log('add-to-favorites-btn clicked');
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