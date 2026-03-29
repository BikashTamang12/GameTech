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


$host = "localhost";
$user = "root"; 
$password = ""; 
$database = "game_tech";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $conn->real_escape_string($_POST['title']);
    $category = $conn->real_escape_string($_POST['category']);
    $price = $conn->real_escape_string($_POST['price']);
    $description = $conn->real_escape_string($_POST['description']);

    
    if (isset($_FILES['main_image']) && $_FILES['main_image']['error'] === UPLOAD_ERR_OK) {
        
        $mainImage = file_get_contents($_FILES['main_image']['tmp_name']);
        $mainImageBlob = $conn->real_escape_string($mainImage);
    } else {
        echo json_encode(["error" => "Main image upload error"]);
        exit();
    }

    

    $sql = "INSERT INTO products (title, category, price, description, main_image) VALUES ('$title', '$category', '$price', '$description', '$mainImageBlob')";

    if ($conn->query($sql) === TRUE) {
        header('Content-Type: application/json');
        echo json_encode(["message" => "Product added successfully"]);
    } else {
        echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
    }
    
 
    $conn->close();
    exit();
}


$conn->close();
?>
