<?php
// db_connection.php
$user = 'u68831'; 
$password = '8442020'; 
try {
    $pdo = new PDO('mysql:host=localhost;dbname=u68857', $user, $password,
        [PDO::ATTR_PERSISTENT => true, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
} catch (PDOException $e) {
    die("<p style='color:red;'>Ошибка подключения к базе данных: " . $e->getMessage() . "</p>");
}
?>
