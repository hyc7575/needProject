function previewImage() {
var $file = $(this);
var imgPath = $file.val();
var extention = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
var $preview = $('.append-img');
console.log($preview);
if (extention == "gif" || extention == "png" || extention == "jpg" || extention == "jpeg") {
	if (typeof (FileReader) != "undefined") {
			var reader = new FileReader();

			reader.onload = function (e) {
				console.log('load ', e.target.result, $preview.css('background-image'));
				$preview.css('background-image', 'url(' + e.target.result + ')');
			}

			reader.readAsDataURL($(this)[0].files[0]);
	} else {
		//alert("FileReader ������");
	}
} else {
	alert("�̹������� (jpg,gif,png,bmp)�� ���ε� �����մϴ�.");
	}
}