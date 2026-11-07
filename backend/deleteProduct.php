<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");


$conn = new mysqli("localhost", "root", "", "game_tech");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


parse_str(file_get_contents("php://input"), $input);
$product_id = isset($input['id']) ? $input['id'] : null;

if ($product_id) {
    
    $sql = "DELETE FROM products WHERE product_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $product_id);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Product deleted successfully"]);
    } else {
        echo json_encode(["message" => "Failed to delete product"]);
    }

    $stmt->close();
} else {
    echo json_encode(["message" => "Product ID not provided"]);
}

$conn->close();
?>
