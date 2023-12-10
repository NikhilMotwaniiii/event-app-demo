<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    http_response_code(204);
    exit();
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");




$conn = new mysqli("localhost", "root", "", "event-demo-app");

if (mysqli_connect_error()) {
    
    echo json_encode(array("error" => "Database connection error"));
   
    exit();
}

$eData = file_get_contents("php://input");
$dData = json_decode($eData, true);


if (!$dData) {
    
    echo json_encode(array("error" => "Invalid JSON data received"));

    exit();
}

$eventDate = $dData['event_date'];
$eventCity = $dData['city'];
$eventCategory = $dData['event_category'];

if (!$eventDate || !$eventCity || !$eventCategory) {
    
    echo json_encode(array("error" => "Missing required input data"));
    
    exit();
}

$sql = "SELECT * FROM event_table 
        WHERE (('$eventDate' BETWEEN start_time AND end_time) OR ('$eventDate' = date(start_time)))
        AND category = '$eventCategory'
        AND event_city = '$eventCity'";



$res = mysqli_query($conn, $sql);

if (!$res) {
    
    echo json_encode(array("error" => "Query execution error: " . mysqli_error($conn)));
    exit();
}

$events = array();

while ($row = mysqli_fetch_assoc($res)) {
    $events[] = $row;
}

echo json_encode(array("events" => $events));

$conn->close();


?>
