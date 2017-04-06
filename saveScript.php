<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	
	<?php
		$loc = "http://s1.localhost/Birthday/index.html";
		if ($_POST["content"]) {
			if ( preg_match('#<h2 class="text-center">People</h2>#', $_POST["content"]) ) {
				$snippet = fopen("snippets/people-snippet.html", 'w');

			} 
			else if ( preg_match('#<h2 class="text-center">Food</h2>#', $_POST["content"]) ) {
				$snippet = fopen("snippets/food-snippet.html", 'w');
				$loc .= '#Food';
			}
			fwrite($snippet, $_POST["content"]);	
			fclose($snippet);
			$script = 
			'<script type="text/javascript">
				location.reload();
				window.location ="'.$loc.'"
			 </script>';		 
			echo $script;
		}
	 ?>

</body>
</html>