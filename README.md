This app was developed to allow the user to view foreign exchange rates in multiple currencies as well as convert an amount of money in one currency to another.

The user may add different conversions to a 'FAVORITES' tab that will allow easy access for future conversions.

After each conversion, the user may search for nearby locations that have the ability to process the conversions they desire.








// Rates are quoted against the Euro by default. Quote against a different currency by setting the base parameter in your request.
// change base parameter: https://api.exchangeratesapi.io/latest?base=USD

// Request specific exchange rates by setting the symbols parameter.
// change symbols parameter: https://api.exchangeratesapi.io/latest?symbols=USD,GBP



//Google API:
//Required parameters

key — Your application's API key. This key identifies your application. See Get     a key for more information.
location — The latitude/longitude around which to retrieve place information.       This must be specified as latitude,longitude.
radius — Defines the distance (in meters) within which to return place results.     The maximum allowed radius is 50 000 meters. Note that radius must not be       included if rankby=distance (described under Optional parameters below) is      specified.

//Optional parameters

keyword — A term to be matched against all content that Google has indexed for this place, including but not limited to name, type, and address, as well as customer reviews and other third-party content.
