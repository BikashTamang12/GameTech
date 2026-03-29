<?php 


error_reporting(E_ALL);
ini_set('display_errors', 1);


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");


$conn = new mysqli("localhost", "root", "", "game_tech");


if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}


$product_id = isset($_GET['product_id']) ? intval($_GET['product_id']) : 0;


$query = "SELECT product_id, title, main_image, sub_image, price, description FROM products WHERE product_id = $product_id";
$result = $conn->query($query);


$product = null;

if ($result && $result->num_rows > 0) {
    $product = $result->fetch_assoc();
    $product['main_image'] = base64_encode($product['main_image']);
    $product['sub_image'] = base64_encode($product['sub_image']); 
}


if ($product) {
    echo json_encode($product); 
} else {
    echo json_encode(["error" => "Product not found"]); 
}


$conn->close();

?>
