<?
if($type=="map1"){
$upload_file = "map.ai";
$Path=$_SERVER[DOCUMENT_ROOT]."/down/".$upload_file;

}else if($type=="map2"){
$upload_file = "map.jpg";
$Path=$_SERVER[DOCUMENT_ROOT]."/down/".$upload_file;

}else if($type=="map3"){
$upload_file = "map.pdf";
$Path=$_SERVER[DOCUMENT_ROOT]."/down/".$upload_file;


}else{
$Path=$_SERVER[DOCUMENT_ROOT]."/upload/".$board."/".$bbs_code."/".$upload_file;
}
if($img_origin_name){
	$file_name = rawurldecode($img_origin_name);
}else{

$file_name = rawurldecode($upload_file); 
}

if (is_file($Path)) { 
 
    Header("Content-type:application/octet-stream"); 
    Header("Content-Length:".filesize($Path));    
    Header("Content-Disposition:attachment;filename=".$file_name); 
    Header("Content-type:file/unknown"); 
    Header("Content-Description:PHP3 Generated Data"); 
    Header("Pragma: no-cache"); 
    Header("Expires: 0"); 

    $fp = fopen($Path, "rb");    
    if (!fpassthru($fp)) fclose($fp); 
 clearstatcache(); 
} 
?> 
