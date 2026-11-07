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


$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "Invalid input data."]);
    exit;
}


$product_id = $data['product_id'] ?? null;
$title = $data['title'] ?? null;
$price = $data['price'] ?? null;
$quantity = $data['quantity'] ?? 1;
$main_image = $data['main_image'] ?? null; 
$recievername = $data['recievername'] ?? null;
$recieverphone = $data['recieverphone'] ?? null;
$recieveraddress = $data['recieveraddress'] ?? null;
$paymentMode = $data['paymentMode'] ?? "Cash on Delivery";
$custId=$data['custId'];


if (!$product_id || !$title || !$price || !$recievername || !$recieverphone || !$recieveraddress) {
    echo json_encode(["status" => "error", "message" => "All fields are required."]);
    exit;
}


$main_image_blob = base64_decode($main_image);


$stmt = $conn->prepare("
    INSERT INTO placed_oders
    (product_id, title, price, quantity, main_image, recievername, recieverphone, recieveraddress, paymentMode,id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)
");

$stmt->bind_param(
    "isdisssssi", 
    $product_id,
    $title,
    $price,
    $quantity,
    $main_image_blob,
    $recievername,
    $recieverphone,
    $recieveraddress,
    $paymentMode,
    $custId
);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Order placed successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to place order: " . $conn->error]);
}


$stmt->close();
$conn->close();
?>
