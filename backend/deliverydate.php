<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$host = 'localhost';
$dbname = 'game_tech'; 
$username = 'root'; 
$password = ''; 


$conn = new mysqli($host, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$input = json_decode(file_get_contents('php://input'), true);

$orderId = $input['orderId'];
$newDate = $input['newDate'];


$sql = "UPDATE placed_oders SET delivery_date = ? WHERE order_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param('si', $newDate, $orderId);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Delivery date updated successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to update delivery date']);
}

$stmt->close();
$conn->close();
?>
