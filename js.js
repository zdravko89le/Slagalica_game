function game() {
	this.combination_ = ['karte/tref.png', 'karte/srce.png', 'karte/pik.png', 'karte/karo.png', 'karte/smajli.png', 'karte/zvezda.png'];
	// this.combination = _.sample(_.shuffle(this.combination_), 4);
	this.combination = []
	for (i=0;i<4;i++) {
		this.combination.push(_.sample(this.combination_))
	}

	this.firstRow = [];
	this.fristRowCheck = [];
	this.fields = {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : []
 	};
 	this.endRow = 0;

 	this.startGame = function startGame() {
 		var combination = this.combination;
 		var i = 0;

	 	setInterval(function() {
	 		var time = $('#timer').text();

	 		if (time == 6)
	 			$('#timer').css('color', 'red');

	 		if (time > 0) {
				$('#timer').html(time-1);
	 		} else {
	 			$('.pic').each(function() {
		 			$(this).unbind('click');
		 		});
		 		$('.choosePic').each(function() {
		 			$(this).unbind('click');
		 		});
		 		$('.answerPic').each(function() {
		 			$(this).attr('src', combination[i]);
		 			i++;
		 		});
	 		}
		}, 1000);
 	}

 	this.endGame = function endGame() {
 		var combination = this.combination;
 		var i = 0;

 		$('.answerPic').each(function() {
 			$(this).attr('src', combination[i]);
 			i++;
 		});

 		$('.pic').each(function() {
 			$(this).unbind('click');
 		});
 		$('.choosePic').each(function() {
 			$(this).unbind('click');
 		});
 		$('#timer').text(0)
 	}

	this.calculate = function calculate(index) {
		var naturaleColor = 'rgb(194, 214, 214)';
		var i = 0;
		var j = 0;
		var combination = this.combination;
		var fields = this.fields[index];
		var answerColor = this.check(index);
		var endRow = this.endRow;

		$('.check').each(function() {
			if (naturaleColor === $(this).css('background-color')) {

				if (i < 4) {
					console.log(answerColor[i]);
					$(this).css('background-color', answerColor[i]);
				}
				i++;
			}
		});

		$('.pic').each(function(){
			if (j < endRow * 4) {
				console.log('unbind');
				$(this).unbind('click');
			}
			j++;
		});
	}

	this.check = function check(index) {
		var combination = this.combination;	//real combination		
		var try_ = this.fields[index];	// try 		
		// var tryYellow = try_; //this.fields[index]; //try for yellow
		////////////////
		var a = try_[0];
		var b = try_[1];
		var c = try_[2];
		var d = try_[3];
		var tryYellow = [a,b,c,d];
		///////////////////////
		var red = 0;
		var yellow = 0;
		var i = 0;
		console.log('kombinacija: ', combination);
		console.log('pokusaj', try_);

		_.map(this.combination, function(val) {

			console.log(i);
			console.log(val , try_);
			if (val == try_[i]) 
				red++;
			i++;
			// var j = 0;
			for (var j=0; j<tryYellow.length; j++) {
				// console.log(val , tryYellow[j]);
				if (val === tryYellow[j]) {
					yellow++;
					tryYellow.splice(j, 1); 
					break;
				}
			}
		});
		console.log('red: ', red);
		console.log('yellow', yellow);

		answer = [];

		for(var i = 0; i < red; i++) {
			answer.push('red');
		}
		var x = yellow - red;
		for(var i = 0; i < x; i++) {
			answer.push('yellow');
		}
		var y = 4 - red - x;
		for(var i = 0; i < y; i ++) {
			answer.push('grey');
		}
		console.log(answer);
		if (red == 4) {
			this.endGame(); 
		}
		return answer;
	}

	this.enter = function enter(val) {
		// var endRow = this.endRow;
		var filled = false;
		var i = 0;
		var j = 1;
		fields = {
			1 : [],
			2 : [],
			3 : [],
			4 : [],
			5 : [],
			6 : []
	 	};
	 	var index = 0;

		// _.map(document.getElementsByClassName("pic"), function(node) {	//_.map
		$('.pic').each(function() {
			picture = $(this).attr('src');
			
			if (picture === undefined && filled == false) {
				// node.src = val;
				$(this).attr('src', val);
				fields[j].push(val);
				filled = true;
			} else {
				fields[j].push(picture);
				picture === undefined ? index++ : index;
			}	

			i++;
			if (i == 4) {
				i = 0;
				j++;
			};			
		});	
		this.fields = fields;
		// console.log(index);
		if (index % 4 == 0) {
		// if (endRow % 4 == 0) {
			this.endRow++;
			this.calculate(7 - (index + 4)/4);
			console.log('endRow' , this.endRow);
		}
		console.log('index' , index);
		if (index == 0) {
			this.endGame();
		}
		// this.endRow = endRow;
	}	

}//game


$(document).ready(function(e) {

	var gm = new game();
	gm.startGame();
	// console.log(gm);
	$('#pik').on('click', function() {
		gm.enter('karte/pik.png');
	});
	$('#herc').on('click', function() {
		gm.enter('karte/srce.png');
	});
	$('#skocko').on('click', function() {
		gm.enter('karte/smajli.png');
	});
	$('#zvezda').on('click', function() {
		gm.enter('karte/zvezda.png');
	});
	$('#tref').on('click', function() {
		gm.enter('karte/tref.png');
	});
	$('#karo').on('click', function() {
		gm.enter('karte/karo.png');
	});
	$('.pic').on('click', function () {
		$(this).removeAttr('src');
	});
});