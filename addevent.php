<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$conn = new mysqli("localhost", "root", "", "event-demo-app");

if (mysqli_connect_error()) {
    echo mysqli_connect_error();
    exit();
}

$eventName = $_POST['eventName'];
$description = $_POST['description'];
$startTime = $_POST['startTime'];
$endTime = $_POST['endTime'];
$location = $_POST['location'];
$eventCity = $_POST['eventCity'];
$category = $_POST['category'];

// Handle file upload
$image = $_FILES["image"];
$imageName = $image["name"];
$imageTempPath = $image["tmp_name"];
$imagePath = "public/assets/" . $imageName;

$result = "";

if ($eventName != "" && $description != "" && $startTime != "" && $endTime != "" && $location != "" && $category != "" && $eventCity != "") {
    $sql = "INSERT INTO event_table(event_name, event_desc, start_time, end_time, event_location, event_city, category, banner_image) VALUES('$eventName', '$description', '$startTime', '$endTime', '$location', '$eventCity', '$category', '$imageName');";
    $res = mysqli_query($conn, $sql);

    if ($res) {
        move_uploaded_file($imageTempPath, $imagePath);
        $result = "You have added an item successfully!";
    } else {
        $result = "Database insertion failed";
    }
} else {
    $result = "Missing required fields";
}

$conn->close();
$response = array("result" => $result);
echo json_encode($response);
?>
