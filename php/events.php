<?php
/*
This contains methods event creation, loading and handling.
*/

//The file location for the events data.
$filepath = 'events.xml';

/*
Method for getting the element inside an XML element by its ID.
This method requires an XML document and an ID to search for.
*/
function getEventByID($xml, $id) {
    foreach ($xml->children() as $event) {
        if ($event['id'] == $id) {
            return $event;
        }
    }
    return null;
}

/*
Method for getting the event values.
This method takes the names of the values requested and the event to get them from.
*/
function getEventValues($requests, $event) {
    //Create new array which we will return.
    $values = [];

    //Now we want to loop through all the requested values and add them to the values array.
    foreach ($requests as $request){
        switch ($request) {
            //This works by using a switch statement to get the value requested.
            case 'title':
                //Then it is retrieved from the XML.
                $title = (string)$event->title;
                //Then added to the array.
                $values['title'] = $title;
                break;
            case 'organiser':
                $organiser = (string)$event->organiser;
                $values['organiser'] = $organiser;
                break;
            case 'date':
                $date = (string)$event->date;
                $values['date'] = $date;
                break;
            case 'time':
                $time = (string)$event->time;
                $values['time'] = $time;
                break;
            case 'building':
                $building = (string)$event->building;
                $values['building'] = $building;
                break;
            case 'color':
                $color = (string)$event->color;
                $values['color'] = $color;
                break;
        }
    }

    //Return the requested values.
    return $values;
}

/*
Method for loading an event.
This method needs the filepath of the XML document, the ID of the event and an array of value titles.
*/
function loadEvent($filepath, $id, $requests = array('title', 'organiser', 'date', 'time', 'building', 'color')) {
    //If the file doesn't exist we return null.
    if (!file_exists($filepath)){
        return null;
    }
    //Load the XML.
    $xml = simplexml_load_file($filepath);

    //Get the requested ID.
    $event = getEventByID($xml, $id);

    if ($event == null) {
        return $event;
    }

    //Return the requested values.
    return getEventValues($requests, $event);
}

/*
Method for creating a new event.
This method takes all the values required to make an event (title, organiser, date and time), adds an id and color and tries to either add or append to an XML document and save.
*/
function createNewEvent($filepath, $title, $organiser, $date, $time, $building) {
    //Create the empty XML or load it.
    $xml = getXML($filepath);
    //Get the new id and color.
    $id = getNewId();
    $color = getNewColor();

    //Add the new data to the XML.
    addData($xml, $id, $title, $organiser, $date, $time, $building, $color);

    //Then write the XML to the file.
    $file = fopen($filepath, 'w');
    fwrite($file, $xml->asXML());

    //Return the id of the event created.
    return $id;
}
?>