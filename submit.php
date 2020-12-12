<?php
/*
This contains the webpage for creating a new event.
*/

require 'php/helper.php';
require 'php/buildings.php';

//Check to make sure the user is logged in. The page cannot be accessed by an unregistered user.
session_start();
if (!isset($_SESSION['loggedin'])){
	require 'php/missing.php';
	die();
}

//Check if an error has been returned.
if (isset($_GET['error']) && checkSafe($_GET['error'])) {
	$error = $_GET['error'];
}

//Create the top of the page. We'll set the page values before hand.
$page_title = "Submit - CSC-20021";
$page_description = "Submit for CSC-20021";
require 'php/top.php';

?>
<h1 id="page-title">New Event</h1>
<div id="board">
	<br/>
	<div class="notepad">
		<div class="notepad-page">
			<form class="event-form" action="php/add.php" method="POST">
				<ul class="notepad-list-lined">
					<?php
					if (isset($error)) {
						echo "<li class=\"notepad-hover-show\"><p>" . $error . "</p></li>";
					}
					?>
					<li class="notepad-hover-show">
						<input class="notepad-title" name="title" placeholder="Event Title" type="text" autocomplete="off" required/>
					</li>
					<li class="notepad-hover-show">
						<input class="notepad-input-look" name="organiser" placeholder="Event Organiser" type="text" autocomplete="given-name" required/>
					</li>
					<li class="notepad-hover-show">
						<input class="notepad-shrink-and-nudge-date" name="date" type="date" required/>
					</li>
					<li class="notepad-hover-show">
						<input class="notepad-shrink-and-nudge-time" name="time" type="time" required/>
					</li>
					<li class="notepad-hover-show">
						<select name="building" class="notepad-location-select">
                            <?php
                            //For each building we'll want a new option present for the user to select.
                            foreach ($buildings as $building => $image) {
                                echo "<option value=\"$building\">$building</option>";
                            }
                            ?>
                        </select>
                    </li>
                    <li class="notepad-hover-show">
                        <button class="notepad-submit-button" type="submit">Submit</button>
                    </li>
                </ul>
            </form>
        </div>
    </div>
    <br />
</div>
<?php
//Create the bottom of the page.
require 'php/foot.php';
?>
            