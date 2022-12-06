'use strict';



/*
	--- Day 5: Supply Stacks ---
	The expedition can depart as soon as the final supplies have been unloaded from the ships. Supplies are stored in stacks of marked crates, but because
	the needed supplies are buried under many other crates, the crates need to be rearranged.
	The ship has a giant cargo crane capable of moving crates between stacks. To ensure none of the crates get crushed or fall over, the crane operator
	will rearrange them in a series of carefully-planned steps. After the crates are rearranged, the desired crates will be at the top of each stack.
	The Elves don't want to interrupt the crane operator during this delicate procedure, but they forgot to ask her which crate will end up where, and they
	want to be ready to unload them as soon as possible so they can embark.
	They do, however, have a drawing of the starting stacks of crates and the rearrangement procedure (your puzzle input). For example:

	    [D]    
	[N] [C]    
	[Z] [M] [P]
	 1   2   3 

	move 1 from 2 to 1
	move 3 from 1 to 3
	move 2 from 2 to 1
	move 1 from 1 to 2

	In this example, there are three stacks of crates. Stack 1 contains two crates: crate Z is on the bottom, and crate N is on top. Stack 2 contains three
	crates; from bottom to top, they are crates M, C, and D. Finally, stack 3 contains a single crate, P.
	Then, the rearrangement procedure is given. In each step of the procedure, a quantity of crates is moved from one stack to a different stack. In the
	first step of the above rearrangement procedure, one crate is moved from stack 2 to stack 1, resulting in this configuration:

	[D]        
	[N] [C]    
	[Z] [M] [P]
	 1   2   3 

	In the second step, three crates are moved from stack 1 to stack 3. Crates are moved one at a time, so the first crate to be moved (D) ends up below
	the second and third crates:

		[Z]
		[N]
	    [C] [D]
	    [M] [P]
	 1   2   3

	Then, both crates are moved from stack 2 to stack 1. Again, because crates are moved one at a time, crate C ends up below crate M:

		[Z]
		[N]
	[M]     [D]
	[C]     [P]
	 1   2   3

	Finally, one crate is moved from stack 1 to stack 2:

		[Z]
		[N]
		[D]
	[C] [M] [P]
	 1   2   3

	The Elves just need to know which crate will end up on top of each stack; in this example, the top crates are C in stack 1, M in stack 2, and Z in
	stack 3, so you should combine these together and give the Elves the message CMZ.
	After the rearrangement procedure completes, what crate ends up on top of each stack?
	Your puzzle answer was ZBDRNPMVH.

	--- Part Two ---
	As you watch the crane operator expertly rearrange the crates, you notice the process isn't following your prediction.
	Some mud was covering the writing on the side of the crane, and you quickly wipe it away. The crane isn't a CrateMover 9000 - it's a CrateMover 9001.
	The CrateMover 9001 is notable for many new and exciting features: air conditioning, leather seats, an extra cup holder, and the ability to pick up
	and move multiple crates at once
	Again considering the example above, the crates begin in the same configuration:

	    [D]    
	[N] [C]    
	[Z] [M] [P]
	 1   2   3 

	Moving a single crate from stack 2 to stack 1 behaves the same as before:

	[D]        
	[N] [C]    
	[Z] [M] [P]
	 1   2   3 

	However, the action of moving three crates from stack 1 to stack 3 means that those three moved crates stay in the same order, resulting in this
	new configuration:

		[D]
		[N]
	    [C] [Z]
	    [M] [P]
	 1   2   3

	Next, as both crates are moved from stack 2 to stack 1, they retain their order as well:

		[D]
		[N]
	[C]     [Z]
	[M]     [P]
	 1   2   3

	Finally, a single crate is still moved from stack 1 to stack 2, but now it's crate C that gets moved:

		[D]
		[N]
		[Z]
	[M] [C] [P]
	 1   2   3

	In this example, the CrateMover 9001 has put the crates in a totally different order: MCD.
	Before the rearrangement process finishes, update your simulation so that the Elves know where they should stand to be ready to unload the
	final supplies. After the rearrangement procedure completes, what crate ends up on top of each stack?
	Your puzzle answer was WDLPFNNNB.
*/



function solveDay05() {
	function getStacks(value) {
		let result = [];

		let stackHeight = 0; // TODO: const function for finding
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
			const StackPos = StackOffset + i * StackSpace;

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


	const Input = document.getElementById("data_input").value.split("\n");
	const InputStack = getStacks(Input);
	const InputMoves = getMoves(Input);
	const MovedCrates9000 = moveCrates9000(InputStack, InputMoves);
	const MovedCrates9001 = moveCrates9001(InputStack, InputMoves);

	document.getElementById('solution_d05_p1').innerHTML = getTopCrates(MovedCrates9000);
	document.getElementById('solution_d05_p2').innerHTML = getTopCrates(MovedCrates9001);
}
