// //Get the iframe we'll place the
// const iframe = document.getElementById("notepad-map-box");

// //The starting method.
// function start() {
//     //We'll set the iframe source by taking the building we've stored inside it and changing the 
//     iframe.src = generateMapUrl()
// }

// //This will create a link which can be placed in an iFrame to show a building on the map.
// //We'll do this to circumvent the API key that google requires for using their maps.
// function generateMapUrl(building) {
//     let mapsUrl = "https://maps.google.com/maps";
//     let request = "?q=Keele University Staffordshire " + building + "&t=k&z=15&output=embed&";
//     return mapsUrl + encodeURI(request);
// }

// //Assign the DOM ready method.
// document.addEventListener('DOMContentLoaded', start, false);