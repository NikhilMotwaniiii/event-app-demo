
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
 
        $email = $dData['email'];
        $pass = $dData['pass'];
        $result = "";
 
        if($email != "" and $pass != ""){
            $sql = "SELECT * FROM user WHERE email='$email';";
            $res = mysqli_query($conn, $sql);
 
            if(mysqli_num_rows($res) != 0){
                $row = mysqli_fetch_array($res);
                
                if( !password_verify($pass, $row['pass']) ){
                    $result = "Invalid Password!";
                }
                else{
                    $result = "Logged in successfully! Redirecting...";
                }
            }
            else{
                $result = "Invalid Email!";
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