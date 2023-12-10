<?php
 
    header("Access-Control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests to these endpoints:
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
 
    $conn = new mysqli("localhost", "root", "", "event-demo-app");
    if(mysqli_connect_error()){
        echo mysqli_connect_error();
        exit();
    }
    else{
        $eData = file_get_contents("php://input");
        $dData = json_decode($eData, true);
 
        $username = $dData['username'];
        $email = $dData['email'];
        $pass =  password_hash($dData['pass'], PASSWORD_DEFAULT);
 
        $result = "";
 
        if($username != "" and $email != "" and $pass != ""){
            $sql = "INSERT INTO user(username, email, pass) VALUES('$username', '$email', '$pass');";
            $res = mysqli_query($conn, $sql);
            if($res){
                $result = "You have registered successfully!";
            }
            else{
                $result = "";
            }
        }
        else{
            $result = "";
        }
 
        $conn -> close();
        $response[] = array("result" => $result);
        echo json_encode($response);
    }
 
?>