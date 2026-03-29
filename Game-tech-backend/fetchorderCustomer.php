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
    $custId=$_POST["id"];
    $query = "SELECT order_id, title, main_image, price, delivery_date, status, quantity 
              FROM placed_oders
              WHERE customer_status != 'Canceled' and id='$custId'"; 

    if ($stmt = $conn->prepare($query)) {
        $stmt->execute();
        $result = $stmt->get_result();
        $orders = [];

        while ($order = $result->fetch_assoc()) {
           
            $order['main_image'] = base64_encode($order['main_image']);

           
            if ($order['status'] === 'Cancelled') {
                $order['delivery_date'] = 'Canceled';
            } elseif ($order['delivery_date']) {
                
                $order['delivery_date'] = $order['delivery_date'];
            } else {
               
                $order['delivery_date'] = 'Pending';
            }

           
            $orders[] = $order;
        }

        
        echo json_encode(['success' => true,'orders'=>$orders]);
        $stmt->close();
    } else {
        echo json_encode(['success' => false,"message" => "Failed to prepare the query"]);
    }
}

$conn->close();
?>
