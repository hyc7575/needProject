$.fn.yjBgResize = function() {
    var area = $(this);
    if(area.length < 1){return;}
    var src = this.css('background-image');
		src = src.replace('url(', '');
		src = src.replace(')', '');
    var img = '<div class="yjBgResize"><img src='+src+' /></div>';
	this.append(img);
	this.css('background', 'none');
    var box = area.find('.yjBgResize');
    var boxImg = box.children('img');
    area.css({
        'overflow': 'hidden',
        'position': 'relative'
    });
    box.css({
        'position': 'absolute',
        'top': '0px',
        'left': '0px',
        'z-index': '-1',
        'overflow': 'hidden'
    });
    boxImg.css('position', 'relative');

    function resizeAction(){
		var areaPT = parseInt(area.css('padding-top')),
			areaPB = parseInt(area.css('padding-bottom')),
			areaPR = parseInt(area.css('padding-right')),
			areaPL = parseInt(area.css('padding-left')),
			areaW = parseInt(area.css('width')),
			areaH = parseInt(area.css('height')),
			boxW = areaPR+areaPL+areaW,
			boxH = areaPT+areaPB+areaH,
			aw = boxW,
			ah = boxH,
			tw = boxImg.width(),
			th = boxImg.height(),
			ratio1 = tw / th,
			ratio2 = th / tw,
			rw = Math.round(ah * (1 / ratio2)),
			rh = Math.round(aw * (1 / ratio1));

			box.css({'width':boxW+'px','height':boxH+'px'});

			/*console.log('영역넓이 : '+aw);
			console.log('영역높이 : '+ah);
			console.log('이미지넓이 : '+tw);
			console.log('이미지높이 : '+th);
			console.log('비율넓이 : '+rw);
			console.log('비율높이 : '+rh);*/

		if(aw > ah){
			if(tw > th){
				boxImg.css('width',aw);
				boxImg.css('height',rh);
				if (rh < ah){
					boxImg.css('width',rw);
					boxImg.css('height',ah);
				}
			}else{
				boxImg.css('width',rw);
				boxImg.css('height',ah);
			}
		}else{
			boxImg.css('width',rw);
			boxImg.css('height',ah);
		}

        if(boxImg.width() > aw){
			var cssLeft = (tw-aw) / 2;
			boxImg.css({'top':0,'left':-cssLeft});
        }
        if(boxImg.height() > ah){
			var cssTop = (th-ah) / 2;
			boxImg.css({'left':0,'top':-cssTop});
        }
        //$('.yjBgResize').css({'visibility':'visible'})
    }

    $(window).bind('load', function(){
        resizeAction();
		setTimeout(function(){
			resizeAction();
		},100);
    })

	var yJreSizeTimeOut = null;
    $(window).bind('resize', function(){
        resizeAction();

		clearTimeout(yJreSizeTimeOut);
		yJreSizeTimeOut = setTimeout(function(){
			resizeAction();
		},100);
    })
}