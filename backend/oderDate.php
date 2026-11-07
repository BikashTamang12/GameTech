<?php


error_reporting(E_ALL);
ini_set('display_errors', 1);


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json"); 





$servername = "localhost";
$username = "root";
$password = "";
$dbname = "game_tech";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$order_id = $_POST['order_id'];
$order_date = $_POST['order_date'];


$sql = "UPDATE placed_oders SET order_date='$order_date' WHERE order_id='$order_id'";

if ($conn->query($sql) === TRUE) {
    echo "Order date updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
?>
