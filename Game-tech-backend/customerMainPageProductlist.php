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


$query = "SELECT product_id, title, main_image, price FROM products";
$result = $conn->query($query);


$products = [];

if (!$result) {
    echo json_encode(["error" => "Query failed"]);
    exit();
}


if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = [
            'product_id' => $row['product_id'],
            'title' => $row['title'],
            'main_image' => base64_encode($row['main_image']), 
            'price' => $row['price']
        ];
    }
}


if (empty($products)) {
    echo json_encode(["error" => "No products found"]);
} else {
    
    echo json_encode($products);
}


$conn->close();
?>
