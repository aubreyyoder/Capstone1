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
// Create function to display select-currency page
function displayCurrencySelections() {
    $('.currency-symbols').append(
        `<li><a href="USD">USD SYMBOL</a></li>
        <li><a href="EURO">EURO SYMBOL</a></li>
        <li><a href="GBD">GBD SYMBOL</a></li>
        <li><a href="CAD">CAD SYMBOL</a></li>
        <li><a href="CHF">CHF SYMBOL</a></li>
        <li><a href="SEK">SEK SYMBOL</a></li>
        <li><a href="MXN">MXN SYMBOL</a></li>
        <li><a href="AUD">AUD SYMBOL</a></li>`
    );
    $('.select-currency').removeClass('hidden');
}

// Create function to append currency symbols to '#select-currency' page
function currencySymbols() {

}

// Create function to display number input page with selected currency symbol
function displayInputPage() {

}

// Create function to display desired currency page
function displayDesiredCurrencySelection() {
    $('.currency-symbols').append(
        `<li><a href="USD">USD SYMBOL</a></li>
        <li><a href="EURO">EURO SYMBOL</a></li>
        <li><a href="GBD">GBD SYMBOL</a></li>
        <li><a href="CAD">CAD SYMBOL</a></li>
        <li><a href="CHF">CHF SYMBOL</a></li>
        <li><a href="SEK">SEK SYMBOL</a></li>
        <li><a href="MXN">MXN SYMBOL</a></li>
        <li><a href="AUD">AUD SYMBOL</a></li>`
    );


}

// Create function to show "is this correct? Page"
function displayConfirmation() {

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
    $('#landing-btn').on('click', event => {
        event.preventDefault;
        $('.landing').addClass('hidden');
        displayCurrencySelections(); 
    });
}




$(watchForm);