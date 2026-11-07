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
   
    $data = json_decode(file_get_contents("php://input"));
    
    if (isset($data->order_id)) {
        $order_id = $data->order_id;
        
        
        $query = "UPDATE placed_oders SET customer_status = 'Canceled' WHERE order_id = ?";

        
        if ($stmt = $conn->prepare($query)) {
            $stmt->bind_param("i", $order_id); 
            $stmt->execute(); 

            
            if ($stmt->affected_rows > 0) {
               
                echo json_encode(["success" => true, "message" => "Order has been canceled."]);
            } else {
                
                echo json_encode(["success" => false, "message" => "Order not found or already canceled."]);
            }

            $stmt->close();
        } else {
            echo json_encode(["success" => false, "message" => "Failed to prepare the query"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Order ID not provided"]);
    }
}

$conn->close();
?>
