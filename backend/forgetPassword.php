<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


$conn = new mysqli("localhost", "root", "", "game_tech");


if (mysqli_connect_error()) {
    echo json_encode(array("error" => mysqli_connect_error()));
    exit();
}




$inputData = file_get_contents("php://input");

$requestData = json_decode($inputData, true);

$email = $requestData['email'];
$phone = $requestData['phone'];
$newPassword = $requestData['newPassword'];

$result = "";


if (!empty($email) && !empty($phone) && !empty($newPassword)) {
    
    $sql = "SELECT * FROM customer WHERE email = '$email'";
    $res = mysqli_query($conn, $sql);

    if (mysqli_num_rows($res) === 0) {
        $result = "*Wrong email!!!";
    } else {
       
        $user = mysqli_fetch_assoc($res);

        if ($user['phonenumber'] !== $phone) {
            $result = "*Wrong phone number!!!";
        } else {
            
            $updateSql = "UPDATE customer SET password = '$newPassword' WHERE email = '$email'";

            if (mysqli_query($conn, $updateSql)) {
                $result = "Password updated successfully!";
            } else {
                $result = "Password update failed: " . mysqli_error($conn);
            }
        }
    }
} else {
    $result = "*Email, phone number and new password are required.";
}

$conn->close();
echo json_encode(array("result" => $result));
?>
