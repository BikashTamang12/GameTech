<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "game_tech"; // Replace with your database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the customerId is provided
if (isset($_POST['id'])) {
    $customerId = $_POST['id'];

    // Prepare the SQL query to fetch cart items for the provided customerId
    $sql = "SELECT cart_id, product_id, quantity, title, price, main_image FROM cart WHERE id = ?";

    // Prepare the statement
    if ($stmt = $conn->prepare($sql)) {
        // Bind parameters
        $stmt->bind_param("i", $customerId);
        
        // Execute the statement
        $stmt->execute();
        
        // Bind the result variables to match the columns being selected
        $stmt->bind_result($cart_id, $product_id, $quantity, $title, $price, $main_image);
        
        // Fetch the results
        $items = [];
        while ($stmt->fetch()) {
            // Convert the BLOB image data to base64
            $imageBase64 = base64_encode($main_image);
            
            // Store the item data
            $items[] = [
                'cart_id' => $cart_id,
                'product_id' => $product_id,
                'quantity' => $quantity,
                'title' => $title,
                'price' => $price,
                'main_image' => $imageBase64
            ];
        }

        // Return the response
        if (count($items) > 0) {
            echo json_encode(['success' => true, 'items' => $items]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No items found in the cart.']);
        }

        // Close the statement
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to prepare the SQL query.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Customer ID is required.']);
}

// Close the database connection
$conn->close();
?>
