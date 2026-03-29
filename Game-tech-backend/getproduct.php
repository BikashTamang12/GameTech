<?php 


error_reporting(E_ALL);
ini_set('display_errors', 1);


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


$conn = new mysqli("localhost", "root", "", "game_tech");


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$sql = "SELECT * FROM products";
$result = $conn->query($sql);


$products = [];

if (!$result) {
    die("Query failed: " . $conn->error);
}

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
       
        $row['main_image'] = base64_encode($row['main_image']);
        
       

        $products[] = $row; 
    }
}


$conn->close();
header('Content-Type: application/json');

echo json_encode($products);
?>
