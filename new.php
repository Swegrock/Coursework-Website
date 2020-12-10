<?php
//Add in the helper for navigation.
require 'php/pagecontent.php';

//Create the top of the page.
showTop("Submit - CSC-20021", "Submit for CSC-20021");
?>
<h1 id="page-title">New Event</h1>
<div id="board">
	<br/>
	<div class="notepad">
		<div class="notepad-page">
			<form class="event-form" action="php/submit.php" method="POST">
				<ul class="notepad-list-lined">
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
showBottom();
?>
            