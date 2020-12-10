<?php

require 'php/eventhandling.php';
require 'php/pagecontent.php';
require 'php/helper.php';

//Load the event requested
$values = loadEvent('php/' . $filepath, $_GET['id']);

//Check to see if the event exists. This will be null if an ID hasn't been specified either.
if ($values == null) {
    //Display the 404 page.
    showTop("Error 404", "Page not found");
    showBottom($missing);
    die();
}


//Create the top of the page. We'll add some extra HTML here.
showTop($values['title'] . " hosted by " . $values['organiser'], $values['title'] . " on " . $values['date']);

//Create page content.

//We do this by assigning the content variable to some HTML.
//We'll fill in certain values with values we've retrieved from loading the event.
$content =    "<h1 id=\"page-title\">Event</h1>"
            . "<div id=\"event-box\" "
            . "style=\"border-color: " . $values['color'] . ";\">"
            . "<div class=\"notepad-display\" "
            . "style=\"background-image: url('" . $buildings[$values['building']] . "');\">"
            . "<div><h1 "
            . "style=\"background-color: " . $values['color'] . ";\">"
            . $values['title']
            . "</h1><p><i class=\"fas fa-compass\"></i> "
            . "In the " . $values['building'] . " building. "
            . "</p><p><i class=\"fas fa-users\"></i> "
            . "Hosted by " . $values['organiser']
            . ".</p><p><i class=\"fas fa-calendar\"></i> "
            . "At " . $values['time'] . " on " . $values['date']
            . ".</p>"
            . "<iframe id=\"notepad-map-box\" src=\"" . generateMapUrl($values['building']) . "\"></iframe>"
            . "<br/></div></div></div>";

//Show the bottom of the page and the new content should be shown before.
showBottom($content);
?>