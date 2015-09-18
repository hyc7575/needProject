$(document).ready(function() {
	startClick();
});

var saveCard; // 이전 클릭한 카드 저장 공간
var time = 0; //timer 시간
var wrong = 0; // 실패 횟수
var m_time = 10000 // maxCard 값에 따라 5초, 10초로 결정.
var card = []; // 이미지 src 배열
maxCard = prompt('몇 쌍의 카드로 플레이 할까요?(최대 18쌍)');
chk(maxCard);
//card 배열안에 src 삽입.
for(var i = 1; i<=maxCard; i++) {
	card.push('card'+i+'.jpg');
	card.push('card'+i+'.jpg');
}
//배열 랜덤 함수 적용
var card = cardShuffle(card);
//배열 랜덤 함수
function cardShuffle (arr) {
	//배열의 길이-1 만큼 for문 돕니당.
	for(var i = arr.length -1; i>0; i--) {
		var num = Math.floor(Math.random() * (i+1));
		var temp = arr[i]; 
		arr[i] = arr[num];
		arr[num]= temp;
		/*
			1.배열의 마지막 원소의 인덱스가 5라면 4까지의 인덱스 요소중 한개를 랜덤으로 선택하여 바꿔준다.
			2.전에 바꾸었던 원소의 인덱스 값이 5라면, 4번째 인덱스 값을 0~3 까지의 인덱스에 담긴 값들중 한개와 바꿔준다.
			3.반복
		*/
	}
	return arr;
}

//카드 갯수 체크(재귀)
function chk(num) {
	if(num > 18 || num <=0) {
		alert('경고 --');
		maxCard = prompt('1~18사이에서만');
		if(maxCard > 18 || maxCard <=0) {
			//계속 틀릴경우 재귀로 끝까지 정해진 값을 받아내도록!
			alert(maxCard+'가(이) 1~18 사이 인가요 ㅡㅡ?');
			chk(maxCard);
		}
		return maxCard;
	} else {
		return maxCard = num;
	}
}
if(maxCard <= 10) {
	m_time = 5000;
}
/************************************************/

//초기 게임 셋팅, 랜덤 배열 이미지 뿌리기
function gameSetting () {
	for (var i = 0; i<card.length; i++) {
		$('#wrap').append('<div class="card"><div class="front closed hidden"><img src="images/back.jpg" ></div><div class="back show"><img src="images/'+card[i]+'" alt=""></div></div>');
	}
	//10초뒤에 카드 가리기
	setTimeout(function() {
		$('.front').removeClass('closed hidden').addClass('show');
		$('.back').removeClass('show').addClass('closed hidden');
	},m_time);
}

//카드 컨트롤
function cardCtrl () {
	var $card = $('.card').not('.collect');
	var saveCard;
	var allow_open = true;
	var wrong = 0;
	$card.click(function() {
		if($(this).hasClass('open') || $(this).hasClass('collect')) {
			return false;
		}
		if(allow_open === true) {
			allow_open = false;
			var $this = $(this);
			var $open = $('.open');
			var $openCard = $this.find('.closed').siblings();
			var firstCard = $(this).children('.back').html();

			//front,back 클래스를 감싼 div에 open 상태임을 표시.
			$this.addClass('open');

			$this.find('.closed').removeClass('closed').addClass('show');
			$openCard.removeClass('show').addClass('closed');
			$this.find('.closed').removeClass('hidden');
			

			//open 이라는 클래스가 2개 등장했을때.
			setTimeout(function() {
				//ps- 이게 왜 1로 해야하는지 아직도 이해가 가지 않음.
				if($open.length === 1) {
					console.log('saveCard : ' + saveCard + ' //// firstCard : ' + firstCard);
					//open 된 2개의 카드 src 값을 비교하였는데 같을때
					if(saveCard === firstCard) {
						//0.2초뒤 두개의 카드에 collect라는 클래스를 부여한다.
						setTimeout(function() {
							$open.removeClass('open').addClass('collect');
							$this.removeClass('open').addClass('collect');
							//if문으로 전부 맞추었는지 체크합니다.
							clearGame();
						},200);
					} else if(saveCard !== firstCard) {
						setTimeout(function() {
							//왜 open으로 두개가 안잡히지 이유?
							$open.removeClass('open').find('.front').addClass('show').removeClass('closed');
							$open.find('.back').addClass('closed hidden').removeClass('show');
							
							$this.find('.back').addClass('closed hidden').removeClass('show');
							$this.removeClass('open').find('.front').addClass('show').removeClass('closed');
						},200);
						wrong++;
						$('.wrong > span').html(wrong);
					}
				}
				//이 전 카드를 저장해둔다.
				saveCard = firstCard;
			},500);
			//다시 클릭하면 함수 실행하도록 true값 주기.
			allow_open = true;
		} else {
			return false;
		}
	});
}

function clearGame () {
	if($('.collect').length === card.length) {
		clearInterval(show_timer);
		alert('수고하셨습니다.(' + time +'초)');
	}
}

function timer () {
	show_timer = setInterval("increaseTime()",1000);
}
function increaseTime () {
	time++;
	$('#timer').text('시간 '+ time + '초');
}


function startClick() {
	$('.start_btn').one('click',function() {
		gameSetting();
		setTimeout('cardCtrl(),timer()',m_time);
	});
}

/************************************************/
/*
prototype 연습


//타이머 설정
function timer (option) {
	var self = this;

	self._init(option);
	self._initEvent();
}
timer.prototype._init = function(target) {
	var self = this;

	self.timeArea = $('target');
	self.show_timer = setInterval("q._increaseTime()",1000);
	self.time = 0;
};
timer.prototype._initEvent = function () {
	var self = this;

	self._show();
	self._increaseTime();
};
timer.prototype._show = function() {
	self.show_timer;
}
timer.prototype._increaseTime = function() {
	self.time++;
	self.timeArea.text('시간 '+ self.time + '초');
}
*/
