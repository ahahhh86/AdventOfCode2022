'use strict';

/* TODO: reduce to one button */



/*
A for Rock, B for Paper, and C for Scissors
X for Rock, Y for Paper, and Z for Scissors
1 for Rock, 2 for Paper, and 3 for Scissors
Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock
*/



function solveDay02Part1() {
	function calculateScore(input) {
		function calculateScoreForEachRound(me, opponent) {
			function charToScore(value) {
				let result = -1;

				switch(value) {
					case 'A': // Rock
					case 'X':
						result = 1;
						break;
					case 'B': // Paper
					case 'Y':
						result = 2;
						break;
					case 'C': // Scissors
					case 'Z':
						result = 3;
						break;
					default: // Invalid
						alert(`Invalid input. CharToScore should not be "${value}".`);
						break;
				}

				return result;
			}

			const DrawScore = 3;
			const WinScore = 6;

			const myScore = charToScore(me);
			const opponentScore = charToScore(opponent);

			if (myScore === opponentScore) { // Draw
				return DrawScore + myScore;
			}

			if (myScore === 1 && opponentScore === 3 || // I win
				myScore === 3 && opponentScore === 2 ||
				myScore === 2 && opponentScore === 1) {
					return WinScore + myScore;
			}

			return myScore;
		}



		let result = 0;
		for (let i in input) {
			const Me = input[i][2];
			const Opponent = input[i][0];

			result += calculateScoreForEachRound(Me, Opponent);
		}
		
		return result;
	}



	const input = document.getElementById("data_input").value.split("\n");
	document.getElementById("solution_d02_p1").innerHTML = calculateScore(input);
}



function solveDay02Part2() {
	function calculateScore(input) {
		function calculateScoreForEachRound(me, opponent) {
			function charToScore(value) {
				let result = -1;

				switch(value) {
					case 'A': // Rock
						result = 1;
						break;
					case 'B': // Paper
						result = 2;
						break;
					case 'C': // Scissors
						result = 3;
						break;
					default: // Invalid
						alert(`Invalid input. CharToScore should not be "${value}".`);
						break;
				}

				return result;
			}


			function charToWin(value) {
				let result = -1;

				switch(value) {
					case 'X': // Lose
						result = 0;
						break;
					case 'Y': // Draw
						result = 3;
						break;
					case 'Z': // Win
						result = 6;
						break;
					default: // Invalid
						alert(`Invalid input. CharToScore should not be "${value}".`);
						break;
				}

				return result;
			}
			
			
/* 1 for Rock, 2 for Paper, and 3 for Scissors
 Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock */

			function calculateMyShape(opponent, win = true) {
				if (win) {
					switch(opponent) {
						case 1: return 2;
						case 2: return 3;
						case 3: return 1;
					}
				} else {
					switch(opponent) {
						case 1: return 3;
						case 2: return 1;
						case 3: return 2;
					}
				}
			}



			let myScore = charToWin(me);
			let opponentScore = charToScore(opponent);
			
			switch(myScore) {
				case 0:
					return calculateMyShape(opponentScore, false);
				case 3:
					return myScore + opponentScore;
				case 6:
					return myScore + calculateMyShape(opponentScore, true);
				default: // Invalid
					alert(`Invalid input. WinToScore should not be "${myScore}".`);
					break;
			}
			
			return -1; // Invalid
		}



		let result = 0;
		for (let i in input) {
			const Me = input[i][2];
			const Opponent = input[i][0];
			const AddScore = calculateScoreForEachRound(Me, Opponent);

			result += AddScore;
		}
		
		return result;
	}



	const input = document.getElementById("data_input").value.split("\n");
	document.getElementById("solution_d02_p2").innerHTML = calculateScore(input);
}
