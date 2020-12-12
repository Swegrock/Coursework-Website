<?php
/*
This contains the get all method used for retrieving all events.
*/

require 'events.php';

/*
This method gets all the ids for the events so we can list them.
Takes a filepath which links to the XML document.
*/
function getAllEvents($xml) {
    //Create an events array.
    $events = [];

    //For each of the children we want to the title, data, time and color for displaying in the list.
    foreach ($xml->children() as $event) {
        array_push($events, $event['id']);
    }

    //Return the events.
    return $events;
}

//If the XML file exists we can load it.
if (file_exists($filepath)){
    $xml = simplexml_load_file($filepath);
    $ids = getAllEvents($xml);
    $response = "01";

    foreach ($ids as $id) {
        $event = getEventByID($xml, $id);
        $values = getEventValues(array('title', 'date', 'time', 'color'), $event);
        $response .= '.' . $id . ',' . implode(',', $values);
    }

    echo $response;
}
else {
    echo '00';
}
?>