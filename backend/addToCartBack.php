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


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['product_id'], $_POST['title'], $_POST['price'], $_POST['main_image'], $_POST['id'])) {
        
        
        $product_id = $_POST['product_id'];
        $title = $_POST['title'];
        $price = $_POST['price'];
        $customerid=$_POST['id'];//added now
       
        $base64Image = $_POST['main_image'];
        
       
        $main_image = base64_decode($base64Image); 
        
        
        $stmt = $conn->prepare("INSERT INTO cart (product_id, title, price, main_image,id) VALUES (?, ?, ?, ?,?)");
        
        if ($stmt) {
          
            $null = NULL;  
            $stmt->bind_param("issbi", $product_id, $title, $price, $null,$customerid);
            
            
            $stmt->send_long_data(3, $main_image); 
            
            
            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Product added to cart successfully.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to add product to cart: ' . $stmt->error]);
            }

            $stmt->close();
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to prepare SQL statement.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Missing required data or image not uploaded correctly.']);
    }
}


$conn->close();
?>
