<?php
/*
This contains methods for the submitting of new events.
*/

require 'helper.php';
require 'eventhandling.php';

/*
Method for getting the current XML or creating a new element if one doesn't exist.
This method just requires a filepath to find the XML document at.
*/
function getXML($filepath) {
    //Create the base XML element.
    $xml = new SimpleXMLElement('<events></events>');

    //If XML data already exists load it.
    if (file_exists($filepath)) {
        $xml = simplexml_load_file($filepath);
    }

    //Return the new or loaded XML.
    return $xml;
}

/*
Method for getting a random color as a hex value.
*/
function getNewColor() {
    //Create the R, G and B respectively, limited to between 85 and 210 so colors aren't too dark or too pastel colored.
    $r = mt_rand(85, 210);
    $g = mt_rand(85, 210);
    $b = mt_rand(85, 210);
    //Convert the RGB to HEX.
    return sprintf('#%02X%02X%02X', $r, $g, $b);
}

/*
Method for getting a random id.
*/
function getNewId() {
    //Create an ID. Firstly we set the seed and then the use that to create a random hashed ID.
    //We do this due to the fact com_create_guid method is missing unless importing Windows DLLs.
    mt_srand((double)microtime() * 10000);
    return md5(uniqid(rand(), true));
}


/*
Method for adding the new event data to the XML.
This method requires data will add the data in the required format to the XML document.
*/
function addData($xml, $id, $title, $organiser, $date, $time, $building, $color) {
    //Begin by adding a new event to the XML.
    $event = $xml->addChild('event');

    //Then add all the attributes.
    $event->addAttribute('id', $id);
    $event->addChild('title', $title);
    $event->addChild('organiser', $organiser);
    $event->addChild('date', $date);
    $event->addChild('time', $time);
    $event->addChild('building', $building);
    $event->addChild('color', $color);
}

//If the titles been set we can assume we're adding.
if (isset($_POST['title'])){
    //Get form values. If they've been submitted they'll have values if not they'll be empty.
    $title = $_POST['title'];
    $organiser = $_POST['organiser'];
    $date = $_POST['date'];
    $time = $_POST['time'];
    $building = $_POST['building'];

    //Do a check now to see if all the values are present
    if ($title == '' || $organiser == '' || $date == '' || $time == '' || $building == '') {
        echo 'Error';
        die();
    }

    //Create an event based on the passed in values.
    $id = createNewEvent($filepath, $title, $organiser, $date, $time, $building);
    //Navigate to the correct page.
    navigate('../display.php?id=' . $id);
}
?>