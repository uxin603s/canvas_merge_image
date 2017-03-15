<?php
if(isset($_GET['url']) && (strpos($_GET['url'],"http://")===0 || strpos($_GET['url'],"https://")===0)){
	echo @file_get_contents($_GET['url']);
}