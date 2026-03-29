<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
 
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Methods: *");
 header("Access-Control-Allow-Headers: *");


 if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
     http_response_code(200);
     exit();
 }

 $conn= new mysqli("localhost","root","","game_tech");
 
 
 if(mysqli_connect_error()){
    echo mysqli_connect_error();
    exit();
 } 
 if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $product_id = $_POST['product_id'];
    $title = $_POST['title'];
    $category = $_POST['category'];
    $price = $_POST['price'];
    $description = $_POST['description'];
   

    
    $sql = "UPDATE products SET title = '$title', category = '$category', price = '$price', description = '$description'";
    
    $sql .= " WHERE product_id = '$product_id'";

   
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Product updated successfully"]);
    } else {
        echo json_encode(["message" => "Update failed: " . $conn->error]);
    }

 
    $conn->close();
} else {
    echo json_encode(["message" => "Invalid request"]);
}
?>
