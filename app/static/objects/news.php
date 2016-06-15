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
    public $active;

    public $SECRET_STRING = 'unsubscribemeFromthisTormentIreallydontcareAnymore';

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // create product
    function create()
    {
        // query to insert record
        $query = "INSERT INTO " . $this->table_name . " (`email`, `created_at`) VALUES (?,?)";

        // posted values
        $this->email=htmlspecialchars(strip_tags($this->email));
        $this->created_at=htmlspecialchars(strip_tags($this->created_at));

        // prepare query
        if ($stmt = $this->conn->prepare($query))
        {
            // bind values
            $stmt->bind_param("ss", $this->email, $this->created_at);
            //$stmt->bind_param(":created_at", $this->created_at);
            
            // execute it and all...
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
        else
        {
            die("Errormessage: ". $this->conn->error);
        }
    }

    function unsubscribe($token)
    {
        $expected = md5( $this->id . $this->SECRET_STRING );
        if( $token != $expected )
            throw new Exception("Validation failed.");

        //sql("UPDATE users SET wants_newsletter = FALSE WHERE id = " . escape($_GET['id']);
        if($stmt = mysqli_query($this->conn, "UPDATE ". $this->table_name ." SET active = REM WHERE id = " $this->id))
        {

        }
    }

    // read products
    function readAll()
    {
        // select all query
        $query = "SELECT
                    id, email, created_at, active
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
    function readOne($mail)
    {
        // query to read single record
        $mail = "'" . $mail . "'";
        $query = "SELECT 
                    id, email, created_at, active
                FROM
                    " . $this->table_name . "
                WHERE
                    email LIKE " . $mail . "
                LIMIT
                    0,1";

        $stmt = mysqli_query($this->conn, $query);

        // get retrieved row
        $row=mysqli_fetch_assoc($stmt);

        // set values to object properties
        $this->id = $row['id'];
        $this->email = $row['email'];
        $this->created_at = $row['created_at'];
        $this->active = $row['active'];

        // Free result set
        mysqli_free_result($stmt);
        //$stmt->close();
    }
}
?>