<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');  

$servername = "localhost";  
$username = "root";         
$password = "";             
$dbname = "game_tech";  


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}


$sql = "SELECT order_id, title, main_image, price, recievername, recieverphone, recieveraddress, quantity, paymentMode, delivery_date, status, customer_status
        FROM placed_oders 
        WHERE status != 'Cancelled' AND customer_status != 'Canceled'";  

$result = $conn->query($sql);


if ($result->num_rows > 0) {
    $orders = [];
    
 
    while($row = $result->fetch_assoc()) {
       
        $main_image_base64 = base64_encode($row['main_image']);
        
        $orders[] = [
            'order_id' => $row['order_id'],
            'title' => $row['title'],
            'main_image' => $main_image_base64,
            'price' => $row['price'],
            'recievername' => $row['recievername'],
            'recieverphone' => $row['recieverphone'],
            'recieveraddress' => $row['recieveraddress'],
            'quantity' => $row['quantity'],
            'paymentMode' => $row['paymentMode'],
            'delivery_date' => $row['delivery_date'],
            'status' => $row['status'],
            'customer_status' => $row['customer_status'] 
        ];
    }

    
    echo json_encode($orders);
} else {
    
    echo json_encode(["status" => "error", "message" => "No orders found"]);
}


$conn->close();
?>
