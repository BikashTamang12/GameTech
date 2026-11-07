<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$conn = new mysqli("localhost", "root", "", "game_tech");

if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit;
}

$category = $_GET['category'] ?? ''; 


if (empty($category)) {
    echo json_encode(["error" => "Category is required."]);
    exit;
}


$query = "SELECT product_id, title, category, price, description, main_image, sub_image FROM products WHERE LOWER(category) = LOWER(?)";
$stmt = $conn->prepare($query);

if ($stmt === false) {
    echo json_encode(["error" => "Failed to prepare query: " . $conn->error]);
    exit;
}

$stmt->bind_param("s", $category);


if ($stmt->execute()) {
    $result = $stmt->get_result();
    $products = [];

    if ($result->num_rows === 0) {
        echo json_encode(["error" => "No products found for the specified category."]);
        exit;
    }

    while ($row = $result->fetch_assoc()) {
       
        if ($row['main_image']) {
            $row['main_image'] = base64_encode($row['main_image']); 
        } else {
            $row['main_image'] = null; 
        }

        if ($row['sub_image']) {
            $row['sub_image'] = base64_encode($row['sub_image']);  
        } else {
            $row['sub_image'] = null; 
        }

        $products[] = $row;
    }

    
    header('Content-Type: application/json');
    echo json_encode($products);

} else {
    echo json_encode(["error" => "Failed to execute query: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
