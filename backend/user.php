<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


$db_conn = mysqli_connect("localhost", "root", "", "game_tech");


if ($db_conn === false) {
    die("Error: " . mysqli_connect_error());
}


$method = $_SERVER['REQUEST_METHOD'];


switch($method){
   case "GET":
   $alluser =   mysqli_query($db_conn, "SELECT * FROM  customer");
   if(mysqli_num_rows($alluser)>0){

      while($row=mysqli_fetch_array($alluser))
      {

         $json_array["userdata"][]=array ("id"=>$row['id'],
     "username"=>$row["username"],
     "address"=>$row["address"],
     "phonenumber"=>$row["phonenumber"],
     "email"=>$row["email"],

     "password"=>$row["password"],
   );

      }
      echo json_encode($json_array["userdata"]);
     return;
   }else{
      echo json_encode(["result"=>"no data"]);
      return;
   }
   break;

   case "POST":
      $userpostdata= json_decode(file_get_contents("php://input"));


      $username= $userpostdata->username;
      $address= $userpostdata->address;
      $phone= $userpostdata->phone;
      $email= $userpostdata->email;
      $password= $userpostdata->password;

      $duplicateEmail = mysqli_query($db_conn, "SELECT * FROM customer WHERE  email = '$email' ");
      if(mysqli_num_rows($duplicateEmail)>0){
         echo json_encode(["success"=> false, "message"=>"Email already exists try new email!"]);
      return;
      }
      
      
      
      $result = mysqli_query($db_conn,"INSERT INTO customer(username,address,phonenumber,email,password) 
      VALUES(' $username',' $address','$phone','$email','$password') 
      ");


      if($result){
      echo json_encode(["success"=>"sucessful regestration"]);
      return;
      }else{
      
       echo json_encode(["success"=>"check data!"]);
      }

      
      break;
}



?>
