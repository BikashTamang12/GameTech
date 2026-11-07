<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

ob_start();

$conn = new mysqli("localhost", "root", "", "game_tech");

if (mysqli_connect_error()) {
    echo mysqli_connect_error();
    exit();
}

$eData = file_get_contents("php://input");
$dData = json_decode($eData, true);
$email = $dData['email'];
$password = $dData['password'];

$response = [];

if ($email != "" && $password != "") {
    $sql = "SELECT * FROM customer WHERE email='$email'";
    $res = mysqli_query($conn, $sql);

    if (mysqli_num_rows($res) === 0) {
        $response = ["result" => "wrong email"];
    } else {
        $user = mysqli_fetch_assoc($res);

        if ($user['password'] === $password) {
            switch ($user['Role']) {
                case "admin":
                    $response = ["result" => "Admin Login successful", "id" => $user['id']];
                    break;

                default:
                    $response = ["result" => "Login successful", "id" => $user['id']];
                    break;
            }
        } else {
            $response = ["result" => "wrong password"];
        }
    }
} else {
    $response = ["result" => "email password required"];
}

$conn->close();
echo json_encode([$response]);

ob_end_flush();
?>
