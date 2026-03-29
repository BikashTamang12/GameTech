<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");





$host = "localhost";
$username = "root";
$password = "";
$dbname = "game_tech"; 

$conn = new mysqli($host, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$cart_id = $_POST['cart_id'];
$quantity = $_POST['quantity'];


$sql = "UPDATE cart SET quantity = ? WHERE cart_id = ?";


$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $quantity, $cart_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}


$stmt->close();
$conn->close();
?>
