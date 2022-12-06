'use strict';



function solveDay05() {
	function getStacks(value) {
		let result = [];

		let stackHeight = 0;
		for (let i in value) {
			if (value[i].startsWith(" 1   2   3")) {
				stackHeight = i;
				break;
			}
		}

		const StackCount = value[stackHeight].split("   ").length;

		const StackOffset = 1;
		const StackSpace = 4;

		for (let i = 0; i < StackCount; ++i) {
			let buffer = [];
			const StackPos = StackOffset+i*StackSpace;

			for (let j = stackHeight-1; j >= 0; --j) {
				const StackContent = value[j][StackPos];
				if (StackContent != " ") {
					buffer.push(value[j][StackPos]);
				}
			}

			result.push(buffer);
		}

		return result;
	}



	function getMoves(value) {
		let result = [];
		let movesStart = -1;

		for (let i in value) {
			if (value[i] === "") {
				movesStart = Number(i) + 1;
				break;
			}
		}

		for (let i = movesStart; i < value.length; ++i) {
			let buffer = value[i].split(" ");
			result.push({count: Number(buffer[1]), from: Number(buffer[3]), to: Number(buffer[5])});
		}

		return result;
	}



	function moveCrates9000(stack, moves) {
		let result = [];
		for (let i in stack) {
			result.push([...stack[i]]);
		}

		for (let i in moves) {
			for (let j = 0; j < moves[i].count; ++j) {
				result[moves[i].to-1].push(result[moves[i].from-1].pop());
			}
		}

		return result;
	}



	function moveCrates9001(stack, moves) {
		let result = [];
		for (let i in stack) {
			result.push([...stack[i]]);
		}

		for (let i in moves) {
			let buffer = [];

			for (let j = 0; j < moves[i].count; ++j) {
				buffer.push(result[moves[i].from-1].pop());
			}
			buffer.reverse();

			for (let j = 0; j < buffer.length; ++j) {
				result[moves[i].to-1].push(buffer[j]);
			}
		}

		return result;
	}



	function getTopCrates(stack) {
		let result = "";

		for (let i in stack) {
			const CrateCount = stack[i].length;
			result += stack[i][CrateCount-1];
		}

		return result;
	}


	const input = document.getElementById("data_input").value.split("\n");
	const inputStack = getStacks(input);
	const inputMoves = getMoves(input);
	const MovedCrates9000 = moveCrates9000(inputStack, inputMoves);
	const MovedCrates9001 = moveCrates9001(inputStack, inputMoves);

	document.getElementById('solution_d05_p1').innerHTML = getTopCrates(MovedCrates9000);
	document.getElementById('solution_d05_p2').innerHTML = getTopCrates(MovedCrates9001);
}
