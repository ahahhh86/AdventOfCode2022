'use strict';


function solveDay04() {
	function parseInput(value) {
		let result = [];

		for (let i in value) {
			const elf = value[i].split(",");
			const elfOne = elf[0].split("-");
			const elfTwo = elf[1].split("-");

			result.push([Number(elfOne[0]), Number(elfOne[1]), Number(elfTwo[0]), Number(elfTwo[1])]);
		}

		return result;
	}



	function getAllFullyContains(value) {
		function getFullyContain(rooms) {
			const lengthA = rooms[1] - rooms[0];
			const lengthB = rooms[3] - rooms[2];
			
			if (lengthA >= lengthB) {
				if (rooms[0] <= rooms[2]) {
					if (rooms[3] <= rooms[1]) {
						return true;
					}
				} else {
					if (rooms[1] <= rooms[3]) {
						return true;
					}
				}
			} else {
				if (rooms[2] <= rooms[0]) {
					if (rooms[1] <= rooms[3]) {
						return true;
					}
				} else {
					if (rooms[3] <= rooms[1]) {
						return true;
					}
				}
			}

			return false;
		}


		let result = 0;
		for (let i in value) {
			if (getFullyContain(value[i])) {
				++result;
			}
		}

		return result;
	}



	function getAllOverlaps(value) {
		function getOverlap(rooms) {
			if (rooms[0] <= rooms[2] && rooms[2] <= rooms[1]) {
				return true;
			}
			if (rooms[0] <= rooms[3] && rooms[3] <= rooms[1]) {
				return true;
			}
			if (rooms[2] <= rooms[0] && rooms[0] <= rooms[3]) {
				return true;
			}
			if (rooms[2] <= rooms[1] && rooms[1] <= rooms[3]) {
				return true;
			}

			return false;
		}


		let result = 0;
		for (let i in value) {
			if (getOverlap(value[i])) {
				++result;
			}
		}

		return result;
	}



	const input = document.getElementById("data_input").value.split("\n");
	const inputData = parseInput(input);

	document.getElementById('solution_d04_p1').innerHTML = getAllFullyContains(inputData);
	document.getElementById('solution_d04_p2').innerHTML = getAllOverlaps(inputData);
}
