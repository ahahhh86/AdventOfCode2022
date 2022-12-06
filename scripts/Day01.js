'use strict';



function solveDay01() {
	function SumCalories(value) {
		let result = [0];
		let j = 0;

		for (let i in value) {
			if (value[i] == '') { // TODO === ?
				++j;
				result[j] = 0;
			} else {
				result[j] += Number(value[i]);
			}
		}

		return result;
	}



	const input = document.getElementById('data_input').value.split('\n');
	let calories = SumCalories(input);

	calories.sort(function(a, b){return b - a});

	document.getElementById('solution_d01_p1').innerHTML = calories[0];
	document.getElementById('solution_d01_p2').innerHTML = calories[0]+calories[1]+calories[2];
}
