<?php


error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");




$servername = "localhost";
$username = "root";
$password = "";
$dbname = "game_tech"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}


$data = json_decode(file_get_contents('php://input'), true);
$orderId = $data['orderId'];


$sql = "UPDATE placed_oders SET status='Cancelled' WHERE order_id=$orderId";

if ($conn->query($sql) === TRUE) {
  echo json_encode(["message" => "Order cancelled successfully"]);
} else {
  echo json_encode(["message" => "Error updating record: " . $conn->error]);
}

$conn->close();
?>
