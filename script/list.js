//The message we've received. Empty until we've sent the request.
var message = '';

//Create the XMLHttpRequest object we'll use to get information for displaying events.
const xmlObj = new XMLHttpRequest();

//Get the display element so we can add to its inner-html.
const notepad_multiple_display = document.querySelector(".notepad-multiple-display");

//Gets a new element built from the value supplied.
function buildEventElement(id, title, date, time, color) {
    //Get the size to render the title at.
    //We'll do this by getting the length and making sure its smaller than 40.
    //But we'll cap the minimum size at 8.
    let titleSize = 30 - title.length / 2;
    titleSize = Math.max(titleSize, 8);

    //Create the calendar, clock and title elements.
    let calendar = $("<p><i class=\"fas fa-calendar\"></i> " + date + "</p>");
    let clock = $("<p><i class=\"fas fa-clock\"></i> " + time + "</p>");
    let head = $("<h1 style=\"font-size: " + titleSize + "px\">" + title + "</h1>");

    //Create the cover.
    let cover = $("<div>", {
        'class': "notepad-cover"
    });
    //Add the calendar and clock to it.
    calendar.appendTo(cover);
    clock.appendTo(cover);

    //Create the main container.
    let main_container = $("<div>", {
        'class': "notepad-multiple"
    });
    //Set the background color.
    main_container.css("background-color", color);
    //Append the cover and head to the main container.
    cover.appendTo(main_container);
    head.appendTo(main_container);

    //Finally create the link and add the main container to it.
    let link = $("<a>", {
        href: "display.php?id=" + id
    });       
    main_container.appendTo(link);

    //Then return our new element.
    return link;
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
function handleRequestStateChange(msg){  
    //We need to get the response so we can figure out what to do with it.
    let response = getResponseType(msg);

    //If the message is a list then we should iterate through requesting the events.
    if (message == 'list') {
        //Parse the events from the response.
        let events = parseIdsString(response);

        //Loop through each of the events.
        for (let i = 0; i < events.length; i++) {
            //Add a version of the event we can display.
            let event = buildEventElement(events[i][0], events[i][1], events[i][2], events[i][3], events[i][4]);
            //Append the event to the main display.
            event.appendTo(notepad_multiple_display);
        }
    }
    //Otherwise we've failed and shouldn't do anything.
}

//Get the response type and remove the response type from the string.
//More responses could be added for now only 1 will be used.
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

//AJAX post call to the list php file.
$.ajax({
    type: "POST",
    url: "php/list.php",
    success: handleRequestStateChange
});