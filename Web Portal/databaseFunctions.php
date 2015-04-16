<?php
function connectToDB()
{
        // connect to db
        $link = mysqli_connect("localhost", "liferay-user", "1234567", "lportal");
        if(mysqli_connect_errno())
        {
                return false;
        }
        else {
                return $link;
        }
}
function executeQuery($link, $query)
{
        $result = mysqli_query($link, $query);
	mysqli_close($link);
        if($result === false)
        {
                return false;
        }
        else
        {
		if($result === true) {
			return true;
		}
		else { 
			$rows = array(); 
	                while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
	                {
       	                 	$rows[] = $row;
       	         	}
                	return $rows;
		} 
        }
}
?>
