<?php
/*
This contains methods for the logging in and creating new users.
*/

$filepath = 'accounts.json';

/*
Method for getting the current accounts JSON or creating a new element if one doesn't exist.
This method just requires a filepath to find the accounts JSON document.
*/
function getJSON($filepath) {
    //If JSON data already exists load it.
    if (file_exists($filepath)) {
        $data = file_get_contents($filepath);
        return json_decode($data, true);
    }
    //Return an empty array otherwise.
    return [];
}

/*
Method for saving the loaded JSON to a file.
This method just requires a filepath and the array to save as a JSON.
*/
function saveJSON($filepath, $array) {
    //Encode the array to JSON.
    $data = json_encode($array);
    //Then save it to the filepath specified.
    $fp = fopen($filepath, 'w');
    fwrite($fp, $data);
    fclose($fp);
}

/*
Method for creating a new account.
This method requires a username and password.
*/
function createAccount($filepath, $username, $password) {
    //Get the JSON file (or an empty array if one doesn't exist).
    $accounts = getJSON($filepath);
    //Hash the password.
    $hashed_password = md5($password);
    //Check if the account already exists
    if (isset($accounts[$username])) {
        //Return false as username is in use.
        return false;
    }
    //Add the new account.
    $accounts[$username] = $hashed_password;
    //Save the modified array.
    saveJSON($filepath, $accounts);
    //Return true as account creation was successful.
    return true;
}

/*
Method for determining whether an account exists and the details supplied are correct.
Takes the filepath for the accounts JSON and a username and password.
*/
function tryAccountDetails($filepath, $username, $password) {
    //Get the JSON file (or an empty array if one doesn't exist).
    $array = getJSON($filepath);
    //Hash the password.
    $hashed_password = md5($password);
    //Check if the username exists and the password supplied is correct.
    if (isset($array[$username]) && $array[$username] == $hashed_password) {
        //If it works, return 1.
        return '1';
    }
    //Otherwise return 0.
    return '0';
}

/*
Using account.php we can login, logout and create new accounts.
*/
if (isset($_GET['login']) && isset($_GET['username']) && isset($_GET['password'])) {
    session_start();

    //Try and login.
    if (tryAccountDetails($filepath, $_GET['username'], $_GET['password'])) {
        //If we succeed set logged in to true.
        $_SESSION['loggedin'] = true;
        echo '1';
        die();
    }
    echo '0';
}
else if (isset($_GET['logout'])) {
    session_start();
    session_destroy();
}
else if (isset($_GET['logged'])) {
    session_start();
    if (isset($_SESSION['loggedin'])){
        echo '1';
    }
}
else if (isset($_GET['add']) && isset($_GET['username']) && isset($_GET['password'])) {
    //Create an account based on the details passed in.
    echo createAccount($filepath, $_GET['username'], $_GET['password']);
}
?>