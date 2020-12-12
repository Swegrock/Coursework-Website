<?php
/*
This helper php file contains all the methods required across the web application.
*/

/*
Method for navigating to another webpage.
This method takes the url to navigate to.
*/
function navigate($url) {
    ob_start();
    header('Location: '.$url);
    ob_end_flush();

    //Die to prevent further code execution.
    die();
}

/*
This method will encode a string for a URI.
Takes the URI to convert a string to.
*/
function encodeURI($uri) {
    //Remove special characters
    $new = str_replace(array("'", '(', ')'), '', $uri);
    //Replace spaces with %20 and return.
    return str_replace(' ', '+', $new);
}

/*
Method for creating a map urls.
This will create a link which can be placed in an iFrame to show a building on the map.
Google maps API is expensive and this does this trick for this project.
This method just takes a building to get the map for.
*/
function generateMapUrl($building) {
    $encoded = encodeURI($building);
    $request = "https://maps.google.com/maps?q=Keele+University+ST5+" . $encoded . "&t=k&z=17&output=embed";
    return $request;
}

/*
Method for checking if supplied values are safe to insert into the webpage.
Takes a value to investigate returns true if safe and false if not.
Code injection is common place and .
*/
function checkSafe($value) {
    if (!strpos($value, '<') && !strpos($value, '>')){
        return true;
    }
    return false;
}
?>