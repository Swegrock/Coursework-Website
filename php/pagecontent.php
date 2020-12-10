<?php
/*
This file just contains variables for building a webpage.
*/

//The buildings available for each of the events.
$buildings = array('Bungalow 77' => 'https://s0.geograph.org.uk/geophotos/04/35/26/4352642_07102d9d.jpg', 'Bungalow 78' => 'https://s0.geograph.org.uk/geophotos/04/35/26/4352642_07102d9d.jpg', 'Central Science Laboratories (CSL)' => 'https://www.keele.ac.uk/discover/campuslife/futurecampus/centralscienceslaboratories/csl-1.jpg', "Chancellor's" => 'https://www.keele.ac.uk/connect/howtofindus/ChancellorsBuilding2-480x640.jpg', 'Chapel' => 'https://www.keele.ac.uk/students/lifeoutsideofstudy/faith/chapel-960x640-min.png', 'Claus Moser' => 'https://s0.geograph.org.uk/geophotos/04/16/98/4169833_8c5aab67.jpg', 'Clock House' => 'https://s0.geograph.org.uk/geophotos/05/05/30/5053003_77b0dbec.jpg', 'Colin Reeves' => 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Keele_University_Colin_Reeves_Building.jpg', 'Darwin' => 'https://www.keele.ac.uk/students/lifeoutsideofstudy/outofhourssupport/darwin%20960x640%20(1)%20(1).jpg', 'David Attenborough Laboratories' => 'https://s0.geograph.org.uk/geophotos/05/68/17/5681746_5b86538e.jpg', 'David Weatherhall' => 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Keele_University_Medical_School.JPG', 'Dorothy Hodgkin' => 'https://www.keele-conference.com/app/uploads/2018/11/7ST2144_1134.jpg', 'Health Centre' => 'https://s0.geograph.org.uk/geophotos/04/38/20/4382036_78a0a662.jpg', 'Hornbeam' => 'https://s0.geograph.org.uk/geophotos/04/16/98/4169877_f8fc6937.jpg', 'Huxley' => 'https://s0.geograph.org.uk/geophotos/05/68/17/5681746_5b86538e.jpg', 'Islamic Centre' => 'https://www.keele.ac.uk/students/lifeoutsideofstudy/faith/faithspaces/islamic-centre-960x640.jpg', 'Jack Ashley' => 'https://s0.geograph.org.uk/geophotos/05/68/31/5683120_b49c8d82.jpg', 'Denise Coates' => 'https://www.keele.ac.uk/discover/news/2019/august/business-school/kbs-building-960x640.jpg', 'Keele Hall' => 'https://www.venuesofexcellence.co.uk/wp-content/uploads/2019/03/Keele-Hall-2018_Helen-Cotton-Photography%C2%A9-3-1-672x372.jpg', 'Lennard-Jones Laboratories' => 'https://mapio.net/images-p/10176063.jpg', 'Library' => 'https://www.keele.ac.uk/k-core/media/meta/meta-logo-share.jpg', 'Mackay' => 'https://www.keele.ac.uk/media/keeleuniversity/alumni/easteregghunt2018/HistoryInBuildingsMoberly2010JohnNewby.jpg', 'Media' => 'https://mcckeele.files.wordpress.com/2014/11/06.jpg', 'Nursery' => 'https://www.hallidaymeecham.com/wp-wash/uploads/2015/10/Keele-University-Day-Nursery-3-1110x700.jpg', 'Observatory' => 'https://gostargazing.co.uk/wp-content/uploads/2017/02/keeleobservatory.jpg', 'Sports Centre' => 'https://www.keele.ac.uk/discover/campuslife/sportatkeele/sports-centre-facilities-2013-0150-960x640.jpg', "Students' Union" => 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Keele_University_Student_Union.jpg', 'Sustainability Hub' => 'https://www.keele.ac.uk/discover/sustainability/newsandevents/news/2019/january/sustainabilityintern/sustainability-hub-960x640.jpg', 'Tawney' => 'https://www.keele.ac.uk/media/k-web/k-connect/studentservices/disabilityanddyslexia/tawney%20(1).png', 'Walter Moberly' => 'https://www.becbms.com/wp-content/uploads/2015/09/walter-moberly.jpg', 'William Smith' => 'https://pbs.twimg.com/media/Dn16K7VXUAIe9Fx.jpg');

//The missing 404 page.
$missing = "<div class=\"big-break\"></div><h1 class=\"error\">404 Page Not Found</h1><div class=\"big-break\"></div>";

/*
The PHP docs recommend keeping the top page HTML and bottom page HTML (ie. Footer and Header) in a separate PHP file.
This allows access across the entire application and speeds up development.
This method shows the top. The page title and description will be filled in. The after will be shown after the top.
*/
function showTop($page_title, $page_description){
    echo  "<!DOCTYPE html><html lang=\"en\">"
        . "<head>"
        . "<meta charset=\"utf-8\" />"
        . "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />" 
        . "<meta name=\"description\" content=\"$page_description\" />"
        . "<meta name=\"author\" content=\"Seb Heron\" /><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />"
        . "<title>$page_title</title>"
        . "<link rel=\"icon\" href=\"img/favicon.png\">"
        . "<link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.15.1/css/all.css\" integrity=\"sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp\" crossorigin=\"anonymous\">"
        . "<link href=\"https://fonts.googleapis.com/css2?family=Acme&family=Indie+Flower&display=swap\" rel=\"stylesheet\" />"
        . "<link href=\"style/main.css\" rel=\"stylesheet\" /><link href=\"style/login.css\" rel=\"stylesheet\" />"
        . "<link href=\"style/events.css\" rel=\"stylesheet\" />"
        . "</head>"
        . "<body>"
        . "<div id=\"wallpaper\">"
        . "<header>"
        . "<nav>"
        . "<a href=\"index.html\" title=\"Logo\"><img id=\"logo\" src=\"img/logo.png\"/></a>"
        . "<a href=\"index.html\" title=\"Home\"><i id=\"home-button\" class=\"fas fa-home\"></i></a>"
        . "<a href=\"cv.html\" title=\"CV\"><i id=\"cv-button\" class=\"fas fa-clipboard\"></i></a>"
        . "<a title=\"Login\" class=\"show-login hang-right\"><i id=\"login-menu-button\" class=\"fas fa-sign-in-alt\"></i></a>"
        . "<a title=\"Logout\" class=\"logout-user hang-right\"><i id=\"logout-menu-button\" class=\"fas fa-sign-out-alt\"></i></a>"
        . "<a href=\"new.php\" class=\"hang-right\" id=\"new-button\" title=\"Add New Event\"><i id=\"add-icon\" class=\"fas fa-calendar-plus\"></i></i></a>"
        . "<a href=\"events.html\" title=\"View Events\"><i id=\"view-icon\" class=\"fas fa-calendar-alt\"></i></a>"
        . "</nav>"
        . "<div id=\"arrow\"></div>"
        . "</header>";
}

/*
This method shows the bottom. The before will be shown before the bottom.
*/
function showBottom($before = "") {
    echo $before . "<footer><h1>Seb Heron Coursework for CSC-20021 - Web Technologies</h1></footer><div class=\"dimmer\"></div><div class=\"popup\" id=\"login\"><form id=\"login-form\" class=\"form\"><h1><i class=\"fas fa-user-circle\"></i></h1><label id=\"login-error\" class=\"form-error\"l>Username or password incorrect</label><input id=\"login-username\" type=\"text\" placeholder=\"Username\" autocomplete=\"username\"><input id=\"login-password\" type=\"password\" placeholder=\"Password\" autocomplete=\"current-password\"><button id=\"login-button\" class=\"submit-button\" type=\"button\">Login</button><button class=\"close-button\" type=\"button\">X</button><a id=\"show-register\">Register an account.</a></form></div><div class=\"popup\" id=\"register\"><form id=\"register-form\" class=\"form\"><h1><i class=\"fas fa-id-badge\"></i></h1><label id=\"register-error\" class=\"form-error\"></label><input id=\"register-username\" type=\"text\" placeholder=\"Username\" autocomplete=\"off\" required><input id=\"register-password\" type=\"password\" placeholder=\"Password\" autocomplete=\"new-password\" required><br/><label for=\"terms\">Agree to terms and conditions?</label><input id=\"agreebox\" type=\"checkbox\" name=\"terms\" required><button id=\"register-button\" class=\"submit-button\" type=\"button\">Register</button><button class=\"close-button\" type=\"button\">X</button><a class=\"show-login\">Login to an account.</a></form></div></div><script src=\"script/main.js\" defer></script><script src=\"script/login.js\" defer></script></body></html>";
}
?>