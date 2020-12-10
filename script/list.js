//The message we've received. Empty until we've sent the request.
var message = '';

//Create the XMLHttpRequest object we'll use to get information for displaying events.
const xmlObj = new XMLHttpRequest();

//Get the display element so we can add to its inner-html.
const notepad_multiple_display = document.querySelector(".notepad-multiple-display");

//The starting method.
function start(){
    //Setup our handler for ready state changed.
    xmlObj.addEventListener("readystatechange", handleRequestStateChange);
    //Open a connection to the list php file.
    xmlObj.open("POST","php/list.php", false);
    //Send an empty request, we don't need to specify anything for the list php.
    xmlObj.send(null);
}

function buildEventElement(id, title, date, time, color) {
    //Get the size to render the title at.
    //We'll do this by getting the length and making sure its smaller than 40.
    //But we'll cap the minimum size at 8.
    //This isn't perfect, but it allows a decent range of event lengths.
    let titleSize = 40 - title.length / 2;
    titleSize = Math.max(titleSize, 8);

    //Build the HTML element inserting data where necessary.
    element = "<a href=\"display.php?id=" + id + "\">"
    element += "<div class=\"notepad-multiple\"";
    element += " style=\"background-color:" + color + "\">";
    element += "<div class=\"notepad-cover\">";
    element += "<p><i class=\"fas fa-calendar\"></i> " + date + "</p>";
    element += "<p><i class=\"fas fa-clock\"></i> " + time + "</p>";
    element += "</div>";
    element += "<h1 style=\"font-size: " + titleSize + "px\">" + title + "</h1>";
    element += "</div></div></a>";
    return element;
}

//Handles turning an ids string into an array of ids.
function parseIdsString(eventsString) {
    //Split the ids string where the comma character is present.
    let events = eventsString.split('.');
    let arrays = [];
    events.filter(Boolean).forEach(event => {
        arrays.push(event.split(','));
    });

    return arrays;
}
  
//Handling the request state changed.
function handleRequestStateChange(){  
    //We only want to get the data when the ready state is done and the status is 200 (ok meaning it was successful).
    if(xmlObj.readyState == XMLHttpRequest.DONE && xmlObj.status == 200){

        //We need to get the response so we can figure out what to do with it.
        let response = getResponseType(this.responseText);

        //If the message is a list then we should iterate through requesting the events.
        if (message == 'list') {
            //Parse the events from the response.
            let events = parseIdsString(response);

            //Create the body for the events display.
            let body = "";

            //Loop through each of the events.
            for (let i = 0; i < events.length; i++) {
                //Add a version of the event we can display to the body.
                body += buildEventElement(events[i][0], events[i][1], events[i][2], events[i][3], events[i][4]);
            }
            
            //Add the events to the display.
            notepad_multiple_display.innerHTML = body;
        }
        //Otherwise we've failed and shouldn't do anything.
    }
}

//Get the response type and remove the response type from the string.
function getResponseType(responseText) {
    let responseType = responseText.substring(0, 2);
    switch (responseType) {
        case '01':
            message = 'list';
            break;
        default:
            message = 'failed';
            break;
    }
    return responseText.substring(2);
}

//Assign the DOM ready method.
document.addEventListener('DOMContentLoaded', start, false);