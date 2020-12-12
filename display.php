<?php
/*
This contains the webpage for displaying an event.
*/

require 'php/events.php';
require 'php/buildings.php';
require 'php/helper.php';

//Load the event requested
$values = loadEvent('php/' . $filepath, $_GET['id']);

//Check to see if the event exists. This will be null if an ID hasn't been specified either.
if ($values == null) {
    //Display the 404 page.
    $page_title = "Error 404";
    $page_description = "Page not found";
    require 'php/missing.php';
    die();
}

//Check all the values supplied are safe.
//If they aren't we want to kill the page.
foreach ($values as $key => $value) {
    if (!checkSafe($value)) {
        $page_title = "Error 404";
        $page_description = "Page not found";
        require 'php/missing.php';
        die();
    }
}

//Get all the values we need from the values array.
$title = $values['title'];
$organiser = $values['organiser'];
$date = $values['date'];
$time = $values['time'];
$color = $values['color'];
$building = $values['building'];
$image_url = $buildings[$building];
//Generate a map url based on the building name.
$map_url = generateMapUrl($values['building']);


//Create the top of the page. We'll set the page values before hand.
$page_title = $title . " hosted by " . $organiser;
$page_description = $title . " on " . $values['date'];
require 'php/top.php';

?>
<h1 id="page-title">Event</h1>
<div id="event-box" style="border-color: <?php echo $color; ?>">
    <div class="notepad-display" style="background-image: url('<?php echo $image_url; ?>');">
        <div>
            <h1 style="background-color: <?php echo $color; ?>;">
                <?php echo $title; ?>
            </h1>
            <p><i class="fas fa-compass"></i><?php echo "In the " . $building . " building"; ?></p>
            <p><i class="fas fa-users"></i><?php echo "Hosted by " . $organiser; ?></p>
            <p><i class="fas fa-calendar"></i><?php echo "At " . $time . " on " . $date; ?></p>
            <iframe id="notepad-map-box" src="<?php echo $map_url; ?>"></iframe>
            <br/>
        </div>
    </div>
</div>
<?php
//Show the bottom of the page.
require 'php/foot.php';
?>