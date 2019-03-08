const apiKey = "5c72bc66f25b5"
const apiKey2 = "2279d04a235e69caf5a0500eb061e7f4";
const apiKey3 = 'AIzaSyAOnPrXIPeJHHzNBAZIcx7EP6A1ktWLvRg';
const exchangeRateURL = 'https://bankersalgo.com/apicalc2/';
const bypassCorsURL = 'https://cors-anywhere.herokuapp.com/';
const placesURL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
const updatedURL = bypassCorsURL + exchangeRateURL;
const updatedLocationURL = bypassCorsURL + placesURL;


function hamburgerCross(bar) {
    bar.classList.toggle("change");
}

function navLanding() {
    $('#nav-landing').click(event => {
        goToLandingPage();
    })
}

function navLocations() {
    $('#nav-locations').click(event => {
        event.preventDefault();
        $('.find-bank').removeClass('hidden');
        goToFindBankPage();
    })
}

function hamburgerDropDown() {
    $('.hamburger').click(event => {
        event.preventDefault();
        $('.responsive-menu').toggle();
    });
}

function displayCurrencySelections() {
    $('.old-currencies').removeClass('hidden');
    $('.source-currency-btn').on('click',function(event) {
        event.preventDefault();
        sourceCurrency = this.value;
        $('.old-currencies').addClass('hidden');
        displayDesiredCurrencySelection(sourceCurrency);
    });
}

function displayDesiredCurrencySelection(sourceCurrency) {
    $('.amount').addClass('hidden');
    $('.old-currencies').addClass('hidden');
    $('.new-currencies').removeClass('hidden');
    $('.desired-currency-btn').on('click', function(event) {
        event.preventDefault();
        desiredCurrency = this.value;
        $('.new-currencies').addClass('hidden');
        displayInputPage(sourceCurrency, desiredCurrency);
    });
}

function displayInputPage(sourceCurrency, desiredCurrency) {
    $('.amount').removeClass('hidden');
    $('#submit').on('click', function(event) {
        event.preventDefault();
        exchangeAmount = document.getElementById("user-input-amount").value;
        displayConfirmation(sourceCurrency, exchangeAmount, desiredCurrency);
    })
}

function displayConfirmation(sourceCurrency, exchangeAmount, desiredCurrency) {
    $('.amount').addClass('hidden');
    $('#confirmation').removeClass('hidden');
    $('#js-confirmation').append(
        `<h2> IS THIS CORRECT?<h2>
        <h1>${sourceCurrency} ${exchangeAmount} to ${desiredCurrency}</h1>
        <button id ="js-yes-btn" value="yes">YES</button>
        <button id="js-no-btn" value="no">NO</button>`
    );
    const yesButton = $('#js-yes-btn').val();
    const noButton = $('#js-no-btn').val();
    
    $('button').on('click', function(event) {
        event.preventDefault();
        if (this.value == yesButton) {
            getExchangedRate(apiKey, apiKey2, sourceCurrency, exchangeAmount, desiredCurrency);
            $('.confirmation').addClass('hidden');
        } else if (this.value == noButton) {
            alert(`CLICK 'HOME' IN THE NAVBAR TO START OVER!!`);
        }
    })
}

function formatExchangeQueryParams(exchangeParams) {
    const queryItems1 = Object.keys(exchangeParams)
        .map(key => `${encodeURIComponent(exchangeParams[key])}`)
    return queryItems1.join('/');
}

function formatLocationQueryParams(locationParams) {
    const queryItems2 = Object.keys(locationParams)
        .map(key => `${encodeURIComponent(key)}=
        ${encodeURIComponent(locationParams[key])}`)
    return queryItems2.join('&');
}

function formatLocationQueryParams(locationParams2) {
    const queryItems3 = Object.keys(locationParams2)
        .map(key => `${encodeURIComponent(key)}=
        ${encodeURIComponent(locationParams2[key])}`)
    return queryItems3.join('&');
}

function getExchangedRate(apiKey, apiKey2, sourceCurrency, exchangeAmount, desiredCurrency) {
    
    const exchangeParams = {
        apiKey,
        apiKey2,
        sourceCurrency,
        desiredCurrency,
        exchangeAmount
    }

    const queryString1 = formatExchangeQueryParams(exchangeParams)
    const currencyConversionURL = updatedURL +  queryString1;

    fetch(currencyConversionURL)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayCurrencyResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function getGooglePlaces(apiKey3, bankInput) {

    const locationParams = {
        query : bankInput,
        key : apiKey3
    }

    const queryString2 = formatLocationQueryParams(locationParams)
    const locationURL = updatedLocationURL + '?' + queryString2;

    fetch(locationURL)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayLocationResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        })
}

function getBankInfo(apiKey3, findBankInput) {

    const locationParams2 = {
        query : findBankInput,
        key : apiKey3
    }

    const queryString3 = formatLocationQueryParams(locationParams2)
    const locationURL = updatedLocationURL + '?' + queryString3;

    fetch(locationURL)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayLocationResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        })
}

function displayCurrencyResults(responseJson) {
    console.log(responseJson);
    $('#results-list').append(
        `<li class="results-list-items">${responseJson.result}</li>`
    );
    $('.results').removeClass('hidden');
    newSearch();
    findBankEventListener();
}

function displayLocationResults(responseJson) {
    console.log(responseJson);
    $('.locations').removeClass('hidden');
    for (let i = 0; i <= responseJson.results.length; i++) {
        $('#locations-list').append(
            `<li class="location-list-items"><h3>${responseJson.results[i].name}</h3>
            <p><a id="bank-address" href="https://www.google.com/maps/search/${responseJson.results[i].formatted_address}">${responseJson.results[i].formatted_address}</a></p>
            </li>`
        );
    }
}

function findBankEventListener() {
    $('#find-bank-btn').click(event => {
        event.preventDefault();
        var zip = $('#zip-code-search').val();
        if (zip >= 1 && /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip)) {
            goToLocationPage();
        } else {
            $('#js-error-message').text(`Must enter valid US zip code`);
            $('.amount').addClass('hidden');
            $('#find-bank-btn').click(event => {
                event.preventDefault();
                goToLocationPage();
            })
        }
    })
}

function findBank() {
    $('#js-find-bank-btn').click(event => {
        event.preventDefault();
        const findBankInput = 'bank ' + $('#js-zip-code-search').val();
        getBankInfo(apiKey3, findBankInput);
        $('.find-bank').addClass('hidden');
        $('.amount').addClass('hidden');
    })
}

function newSearch() {
    $('#new-search-btn').click(event => {
        goToLandingPage();
    })
}

function goToLandingPage() {
    document.location.reload();
}

function goToLocationPage() {
    const bankInput = 'bank ' + $('#zip-code-search').val();
    $('.select-currency').addClass('hidden');
    $('.results').addClass('hidden');
    $('.amount').addClass('hidden');
    $('.confirmation').addClass('hidden');
    getGooglePlaces(apiKey3, bankInput);
}

function goToFindBankPage() {
    $('.select-currency').addClass('hidden');
    $('.results').addClass('hidden');
    $('.amount').addClass('hidden');
    $('.confirmation').addClass('hidden');
    $('.landing').addClass('hidden');
    $('.locations').addClass('hidden');
    findBank();
}

function watchForm() {
    $('#landing-btn').on('click', event => {
        event.preventDefault;
        $('.landing').addClass('hidden');
        displayCurrencySelections(); 
    });
}

function handleFunction() {
    watchForm();
    navLanding();
    navLocations();
    hamburgerDropDown();
}

$(document).ready(handleFunction);