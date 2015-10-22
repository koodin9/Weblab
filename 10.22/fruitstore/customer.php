<!DOCTYPE html>
<html>
	<head>
		<title>Fruit Store</title>
		<link href="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/pResources/gradestore.css" type="text/css" rel="stylesheet" />
	</head>

	<body>
		
		<?php
		# Ex 4 : 
		# Check the existance of each parameter using the PHP function 'isset'.
		# Check the blankness of an element in $_POST by comparing it to the empty string.
		# (can also use the element itself as a Boolean test!)
		if (!isset($_POST["name"])
			||!isset($_POST["id"])
			||!isset($_POST["checkBoxArray"])
			||!isset($_POST["cardNumber"])
			||!isset($_POST["cardKind"])
			||$_POST["name"] == ""
			||$_POST["id"] == ""
			||$_POST["checkBoxArray"] == ""
			||$_POST["cardNumber"] == ""
			||$_POST["cardKind"] == ""
			){	
		?>
		<h1>Sorry</h1>
			<p>You didn't fill out the form completely. <a link href="fruitstore.html"/>Try again?</a></p>
		<?php 
		}	
		?>
		<!-- Ex 4 : 
			Display the below error message : 
			<h1>Sorry</h1>
			<p>You didn't fill out the form completely. Try again?</p>
		--> 
			
		<?php
		# Ex 5 : 
		# Check if the name is composed of alphabets, dash(-), ora single white space.
		# } elseif () { 
		?>

		<!-- Ex 5 : 
			Display the below error message : 
			<h1>Sorry</h1>
			<p>You didn't provide a valid name. Try again?</p>
		--> 

		<?php
		# Ex 5 : 
		# Check if the credit card number is composed of exactly 16 digits.
		# Check if the Visa card starts with 4 and MasterCard starts with 5. 
		# } elseif () {
		?>

		<!-- Ex 5 : 
			Display the below error message : 
			<h1>Sorry</h1>
			<p>You didn't provide a valid credit card number. Try again?</p>
		--> 

		<?php
		# if all the validation and check are passed 
		# } else {
		?>

		<h1>Thanks!</h1>
		<p>Your information has been recorded.</p>
		
		<!-- Ex 2: display submitted data -->
		<ul> 
			<li>Name: <?= $_POST["name"]; ?></li>
			<li>Membership Number: <?= $_POST["id"]; ?></li>
			<?php 
				function processCheckbox($names){
				$result = implode(", ", $names);
				return $result;
			}
			?>
			<li>Options: <?= processCheckbox($_POST["checkBoxArray"]); ?></li>
			<li>Fruits: <?= (String)$_POST["Fruits"]; ?> - <?= (String)$_POST["Quantity"]; ?> </li>
			<li>Credit <?= $_POST["cardNumber"]; ?> (<?= $_POST["cardKind"]; ?>)</li>
		</ul>
		
		<!-- Ex 3 : 
			<p>This is the sold fruits count list:</p> -->
		<?php
			/* Ex 3: 
			 * Save the submitted data to the file 'customers.txt' in the format of : "name;membershipnumber;fruit;number".
			 * For example, "Scott Lee;20110115238;apple;3"
			 */
			$filename = "customers.txt";
			file_put_contents($filename, $_POST["name"].";".$_POST["id"].";".$_POST["Fruits"].";".$_POST["Quantity"]."\n", FILE_APPEND);
		?>
		
		<!-- Ex 3: list the number of fruit sold in a file "customers.txt".
			Create unordered list to show the number of fruit sold -->
			This is the sold fruits count list:

		<ul>
				
		<?php 
		$fruitcounts = soldFruitCount($filename);

		foreach($fruitcounts as $key => $value) {
		?>
			<li>
				<?= $key; ?> - <?= $value; ?>
			</li>
		<?php
		}
		?>
		</ul>
		
		<?php
		# }
		?>
		
		<?php
			/* Ex 3 :
			* Get the fruits species and the number from "customers.txt"
			* 
			* The function parses the content in the file, find the species of fruits and count them.
			* The return value should be an key-value array
			* For example, array("Melon"=>2, "Apple"=>10, "Orange" => 21, "Strawberry" => 8)
			*/
			function soldFruitCount($filename) { 
				$pieces = explode(";", file_get_contents($filename));
				$appleCount = 0;
				$melonCount = 0;
				$orangeCount = 0;
				$strawberryCount = 0;
				for($i = 0; $i < sizeof($pieces); $i++){
					if (strcmp($pieces[$i], "Apple") == 0) {
						$appleCount = (int)$appleCount + (int) $pieces[$i+1];
					} else if (strcmp($pieces[$i], "Melon") == 0){
						$melonCount = (int)$melonCount + (int) $pieces[$i+1];
					} else if (strcmp($pieces[$i], "Orange") == 0){
						$orangeCount = (int)$orangeCount + (int) $pieces[$i+1];
					} else if (strcmp($pieces[$i], "Strawberry") == 0){
						$strawberryCount = (int)$strawberryCount + (int) $pieces[$i+1];
					}

				}

				$array = array();
				$array["Apple"] = "$appleCount";
				$array["Melon"] = "$melonCount";
				$array["Orange"] = "$orangeCount";
				$array["Strawberry"] = "$strawberryCount";
				return $array;
			}
		?>
		
	</body>
</html>
