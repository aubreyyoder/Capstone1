function hamburgerCross(bar) {
    bar.classList.toggle("change");
}



// For Google Places (key = apiKey)
const apiKey = "AIzaSyD6YRvxkkHP2wzt6lR9tZUty9mVCGp8d_M";

// Get the latest foreign exchange reference rates
const exchangeRateURL = 'https://api.exchangeratesapi.io/latest'

// Get places in Google Maps
const placesURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/output'


// ----------------------------------------------------------------


// Create function navebar buttons take to certain pages
function navBarReroutes() {

}

// Create button to drop down menu for hamburger menu
function hamburgerDropDown() {

}

// Create function to make currency symbols select from API
function attachCurrencyToSymbol() {

}

// Create function that attaches currency button to value


// Create function to display select-currency page
function displayCurrencySelections() {
    $('.old-currencies').append(
        `<li class="currency"><button id="EUR" value="EURO">€ (EUR)</button></li>
        <li class="currency"><button id="JAP" value="JAP">¥ (JAP)</button></li>
        <li class="currency"><button id="GBD" value="GBD">£ (GBD)</button></li>
        <li class="currency"><button id="CAD" value="CAD">$ (CAD)</button></li>
        <li class="currency"><button id="USD" value="USD">$ (USD)</button></li>
        <li class="currency"><button id="NZD" value="NZD">$ (NZD)</button></li>
        <li class="currency"><button id="MXN" value="MXN">$ (MEX)</button></li>
        <li class="currency"><button id="AUD" value="AUD">$ (AUD)</button></li>`
    );
    $('.old-currencies').removeClass('hidden');
    var oldCurrency = '';
    $('button').on('click',function(event) {
        var oldCurrency = this.value;
        console.log(oldCurrency);
        //$('.old-currencies').addClass('hidden');
        displayInputPage(oldCurrency);
    });
}

// Create function to display number input page with selected currency symbol
function displayInputPage(oldCurrency) {
    const exchangeAmount = $('#js-amount-input').val();
    
    $('#input-currency-symbol').append(
        `<li id="input-symbol">${oldCurrency}</li>`
    );
    $('.amount').removeClass('hidden');
    $('#submit').on('click', event => {
        displayDesiredCurrencySelection(oldCurrency, exchangeAmount);
    })
}

// Create function to display desired currency page
function displayDesiredCurrencySelection(oldCurrency, exchangeAmount) {
    $('.new-currencies').removeClass('hidden');
    $('.new-currencies').append(
        `<li class="currency"><button id="EUR" value="EURO">€ (EUR)</button></li>
        <li class="currency"><button id="JAP" value="JAP">¥ (JAP)</button></li>
        <li class="currency"><button id="GBD" value="GBD">£ (GBD)</button></li>
        <li class="currency"><button id="CAD" value="CAD">$ (CAD)</button></li>
        <li class="currency"><button id="USD" value="USD">$ (USD)</button></li>
        <li class="currency"><button id="NZD" value="NZD">$ (NZD)</button></li>
        <li class="currency"><button id="MXN" value="MXN">$ (MEX)</button></li>
        <li class="currency"><button id="AUD" value="AUD">$ (AUD)</button></li>`
    );
    $('.amount').addClass('hidden');
    $('.old-currencies').addClass('hidden');
    
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
        `<h1>JUST TO CONFIRM:<br></h1>
        <h3>You'd like to convert "${oldCurrency} ${exchangeAmount}" to "${newCurrency}".<br>
        CORRECT?"</h3><br>
        <button value="yes">YES</button>
        <button value="no">NO</button>`
    );
    console.log('paragraph replaced');
    $('button').on('click', function(event) {
        if (this.value == yes) {
            displayResults();
        } else if (this.value == no) {
            alert(`YOU MUST CLICK 'YES'!!`);
        }
    })
}

// Creates a function that fetches API info for exchange rates
function getExchangeRates() {
    console.log('...Fetching exchange rates');
    
}

// Create function to append results
function displayResults() {

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
    console.log();
    $('#landing-btn').on('click', event => {
        event.preventDefault;
        $('.landing').addClass('hidden');
        displayCurrencySelections(); 
    });
}




$(watchForm);