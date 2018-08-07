	//List all variables neede to create game functions
	var startScreen;
	var gameHTML;
	var counter = 20;
	var questionArray = ["In what Disney animated feature is Earth referred to as 'Section 17, Area 51'?", "What Disney movie was the first full-length animated feature to be nominated for an Oscar for Best Picture?", "What is the only Disney animated feature film that has a title character who doesn't speak?", "In Sleeping Beauty, the cookies that the fairies eat with tea are shaped like what?", "What popular Disney character makes an appearance as a stuffed animal in 'Frozen?'", "How many sisters does Ariel have", "What is the name of Captain Hook's 'right hand man?", "Who said this quote: 'A wilderness explorer is a friend to all, be a plant, or fish, or a tiny mole'"];
	var answerArray = [["Treasure Planet", "Hercules", "Atlantis", "Lilo & Stitch"], ["Snow White","Bambi","Beauty & the Beast","Lion King"], ["Lilo & Stitch", "Lady & the Tramp", "Dumbo", "The Fox & the Hound"], ["Spinning Wheel","Pentagram","Castle","Mickey Mouse"], ["Tinkerbell", "Mickey Mouse", "Nemo", "Rapunzel"], ["Six","Eight","Seven","None, she is an only child"], ["Mr.Steve", "Mr.Sir", "Lieutenant Dan", "Mr.Snee"], ["Russell","Randy","Ralph","Dory"]];
	var correctAnswers = ["D. Lilo & Stitch", "C. Beauty & the Beast", "C. Dumbo", "D. Mickey Mouse", "B. Mickey Mouse", "A. Six", "D. Mr.Snee", "A. Russell"];
	var questionCounter = 0;
	var selecterAnswer;
	var theClock;
	var correctTally = 0;
	var incorrectTally = 0;
	var unansweredTally = 0;
	var clickSound = new Audio("assets/sound/button-click.mp3");
	var wrongSound = new Audio("assets/sound/wrong-answer.mp3");
	var correctSound = new Audio("assets/sound/correct-answer.mp3");
	//first function of most js should start with this......
	$(document).ready(function() {
	//creates start button
	function initialScreen() {
		startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
		$(".mainArea").html(startScreen);
	}
	
	initialScreen();
	//Function when start button is clicked
	$("body").on("click", ".start-button", function(event){
		event.preventDefault();  
		clickSound.play();
		generateHTML();
	
		timerWrapper();
	
	});
	//function that decides if user anwer correctly or not
	$("body").on("click", ".answer", function(event){
		
		clickSound.play();
		selectedAnswer = $(this).text();
		if(selectedAnswer === correctAnswers[questionCounter]) {
			
	
			clearInterval(theClock);
			generateWin();
		}
		else {
		
			clearInterval(theClock);
			generateLoss();
		}
	}); 
	//function that resets game when trivia completes
	$("body").on("click", ".reset-button", function(event){
		clickSound.play();
		resetGame();
	}); 
	
	});  
	//function that happens when user doesn't answer within 20 seconds
	function generateLossDueToTimeOut() {
		unansweredTally++;
		gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>";
		$(".mainArea").html(gameHTML);
		setTimeout(wait, 4000);  
	}
	//function that happens when user answers question correctly
	function generateWin() {
		correctTally++;
		correctSound.play();
		gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>";
		$(".mainArea").html(gameHTML);
		setTimeout(wait, 4000); 
	}
	//function that happens when user answers question incorrectly
	function generateLoss() {
		incorrectTally++;
		wrongSound.play();
		gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>";
		$(".mainArea").html(gameHTML);
		setTimeout(wait, 4000); 
	}
	//function that displays multiple choices for each question
	function generateHTML() {
		gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
		$(".mainArea").html(gameHTML);
	}
	//function that cycles through trivia questions and displays final score when finished
	function wait() {
		if (questionCounter < 7) {
		questionCounter++;
		generateHTML();
		counter = 20;
		timerWrapper();
		}
		else {
			finalScreen();
		}
	}
	//function that creates timer for each question
	function timerWrapper() {
		theClock = setInterval(twentySeconds, 1000);
		function twentySeconds() {
			if (counter === 0) {
				clearInterval(theClock);
				generateLossDueToTimeOut();
			}
			if (counter > 0) {
				counter--;
			}
			$(".timer").html(counter);
		}
	}
	//function that show final score tally when trivia complete
	function finalScreen() {
		gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>No more questions, here's your final score:" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
		$(".mainArea").html(gameHTML);
	}
	//funtion that resets all when user wants to try again
	function resetGame() {
		questionCounter = 0;
		correctTally = 0;
		incorrectTally = 0;
		unansweredTally = 0;
		counter = 20;
		generateHTML();
		timerWrapper();
	}
	
