<?php
class News
{
    // database connection and table name 
    private $conn;
    private $table_name = "newsletter";

    // object properties
    public $id;
    public $email;
    public $created_at;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // create product
    function create()
    {
        // query to insert record
        $query = "INSERT INTO " . $this->table_name . " SET `email`=:email, `created_at`=:created_at";

        // prepare query
        var_dump($stmt);
        $stmt = $this->conn->prepare($query);

        // posted values
        $this->email=htmlspecialchars(strip_tags($this->email));
        $this->created_at=htmlspecialchars(strip_tags($this->created_at));

        // bind values
        $stmt->bind_param(":email", $this->email);
        $stmt->bind_param(":created_at", $this->created_at);

        // execute query
        if($stmt->execute())
        {
            return true;
        }
        else
        {
            echo "<pre>";
                print_r($stmt->errorInfo());
            echo "</pre>";

            return false;
        }
    }

    // read products
    function readAll()
    {
        // select all query
        $query = "SELECT
                    id, email, created_at
                FROM
                    " . $this->table_name . "
                ORDER BY
                    id DESC";

        // prepare query statement
        $stmt = $this->conn->prepare( $query );

        // execute query
        $stmt->execute();

        return $stmt;
    }

    // used when filling up the update product form
    function readOne()
    {
        // query to read single record
        $query = "SELECT 
                    email, created_at
                FROM
                    " . $this->table_name . "
                WHERE
                    id = ?
                LIMIT
                    0,1";

        // prepare query statement
        $stmt = $this->conn->prepare( $query );

        // bind id of product to be updated
        $stmt->bindParam(1, $this->id);

        // execute query
        $stmt->execute();

        // get retrieved row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // set values to object properties
        $this->email = $row['email'];
        $this->created_at = $row['created_at'];
    }
}
?>