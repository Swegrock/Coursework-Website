<!-- This is the standard top of a webpage. -->
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="description" content="<?php echo $page_description; ?>" />
		<meta name="author" content="Seb Heron" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title><?php echo $page_title; ?></title>
		<link rel="icon" href="img/favicon.png">
			<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous">
				<link href="https://fonts.googleapis.com/css2?family=Acme&family=Indie+Flower&display=swap" rel="stylesheet" />
				<link href="style/main.css" rel="stylesheet" />
				<link href="style/login.css" rel="stylesheet" />
				<link href="style/events.css" rel="stylesheet" />
			</head>
			<body>
				<div id="wallpaper">
					<header>
						<nav>
							<a href="index.html" title="Logo"><img id="logo" src="img/logo.png"/></a>
							<a href="index.html" title="Home"><i id="home-button" class="fas fa-home"></i></a>
							<a href="cv.html" title="CV"><i id="cv-button" class="fas fa-clipboard"></i></a>
							<a title="Login" class="show-login hang-right"><i id="login-menu-button" class="fas fa-sign-in-alt"></i></a>
							<a title="Logout" class="logout-user hang-right"><i id="logout-menu-button" class="fas fa-sign-out-alt"></i></a>
							<a href="submit.php" class="hang-right" id="new-button" title="Add New Event"><i id="add-icon" class="fas fa-calendar-plus"></i></i></a>
						</a>
						<a href="events.html" title="View Events">
							<i id="view-icon" class="fas fa-calendar-alt"></i>
						</a>
					</nav>
					<div id="arrow"></div>
					</header>
					<!-- The rest of the document should be loaded after this. -->