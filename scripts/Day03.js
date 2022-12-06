'use strict';



/*
	--- Day 3: Rucksack Reorganization ---
	One Elf has the important job of loading all of the rucksacks with supplies for the jungle journey. Unfortunately, that Elf didn't quite follow the
	packing instructions, and so a few items now need to be rearranged.
	Each rucksack has two large compartments. All items of a given type are meant to go into exactly one of the two compartments. The Elf that did the
	packing failed to follow this rule for exactly one item type per rucksack.
	The Elves have made a list of all of the items currently in each rucksack (your puzzle input), but they need your help finding the errors. Every item
	type is identified by a single lowercase or uppercase letter (that is, a and A refer to different types of items).
	The list of items for each rucksack is given as characters all on a single line. A given rucksack always has the same number of items in each of its
	two compartments, so the first half of the characters represent items in the first compartment, while the second half of the characters represent items
	in the second compartment.

	For example, suppose you have the following list of contents from six rucksacks:
		vJrwpWtwJgWrhcsFMMfFFhFp
		jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
		PmmdzqPrVvPwwTWBwg
		wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
		ttgJtRGJQctTZtZT
		CrZsJsPPZsGzwwsLwLmpwMDw

		The first rucksack contains the items vJrwpWtwJgWrhcsFMMfFFhFp, which means its first compartment contains the items vJrwpWtwJgWr, while the
			second compartment contains the items hcsFMMfFFhFp. The only item type that appears in both compartments is lowercase p.
		The second rucksack's compartments contain jqHRNqRjqzjGDLGL and rsFMfFZSrLrFZsSL. The only item type that appears in both compartments is
			uppercase L.
		The third rucksack's compartments contain PmmdzqPrV and vPwwTWBwg; the only common item type is uppercase P.
		The fourth rucksack's compartments only share item type v.
		The fifth rucksack's compartments only share item type t.
		The sixth rucksack's compartments only share item type s.

	To help prioritize item rearrangement, every item type can be converted to a priority:
		Lowercase item types a through z have priorities 1 through 26.
		Uppercase item types A through Z have priorities 27 through 52.

	In the above example, the priority of the item type that appears in both compartments of each rucksack is
	16 (p), 38 (L), 42 (P), 22 (v), 20 (t), and 19 (s); the sum of these is 157.
	Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?
	Your puzzle answer was 7917.

	--- Part Two ---
	As you finish identifying the misplaced items, the Elves come to you with another issue.
	For safety, the Elves are divided into groups of three. Every Elf carries a badge that identifies their group. For efficiency, within each group
	of three Elves, the badge is the only item type carried by all three Elves. That is, if a group's badge is item type B, then all three Elves will
	have item type B somewhere in their rucksack, and at most two of the Elves will be carrying any other item type.
	The problem is that someone forgot to put this year's updated authenticity sticker on the badges. All of the badges need to be pulled out of the
	rucksacks so the new authenticity stickers can be attached.
	Additionally, nobody wrote down which item type corresponds to each group's badges. The only way to tell which item type is the right one is by
	finding the one item type that is common between all three Elves in each group.
	Every set of three lines in your list corresponds to a single group, but each group can have a different badge item type. So, in the above example,
	the first group's rucksacks are the first three lines:
		vJrwpWtwJgWrhcsFMMfFFhFp
		jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
		PmmdzqPrVvPwwTWBwg

	And the second group's rucksacks are the next three lines:
		wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
		ttgJtRGJQctTZtZT
		CrZsJsPPZsGzwwsLwLmpwMDw

	In the first group, the only item type that appears in all three rucksacks is lowercase r; this must be their badges. In the second group, their
	badge item type must be Z.
	Priorities for these items must still be found to organize the sticker attachment efforts: here, they are 18 (r) for the first group and 52 (Z)
	for the second group. The sum of these is 70.
	Find the item type that corresponds to the badges of each three-Elf group. What is the sum of the priorities of those item types?
	Your puzzle answer was 2585.
*/



function solveDay03() {
	function getRucksackContent(value) {
		let result = [];

		for (let i in value) {
			let pocketContent = ["", ""];
			let buffer = value[i];
			const BufferHalf = value[i].length/2;

			pocketContent[0] = buffer.slice(0, BufferHalf);
			pocketContent[1] = buffer.slice(BufferHalf);

			result.push(pocketContent);
		}

		return result;
	}



	function getDoubleLetters(pairs) {
		// Finds the *first* letter, that is in both strings of pair
		function getDoubleLetter(pair) {
			for (let i in pair[0]) {
				for (let j in pair[1]) {
					if (pair[0][i] === pair[1][j]) {
						return pair[0][i];
					}
				}
			}

			alert("No pair found. getDoubleLetter()");
			return "";
		}



		let result = [];

		for (let i in pairs) {
			result.push(getDoubleLetter(pairs[i]));
		}

		return result;
	}



	function getGroupBadges(value) {
		// TODO: Refactor - One function that returns a string of all common letters of two strings, run two times / maybe merge with Method from part 1: value for exit early
		function getBadgeLetter(triplet) {
			for (let i in triplet[0]) {
				for (let j in triplet[1]) {
					if (triplet[0][i] === triplet[1][j]) {
						for (let k in triplet[2]) {
							if (triplet[0][i] === triplet[2][k]) {
								return triplet[0][i];
							}
						}
					}
				}
			}

			alert("No triplet found. getBadgeLetter()");
			return "";
		}



		let result = [];
		const GroupSize = 3;

		for (let i = 0; i < value.length; i += GroupSize) {
			result.push(getBadgeLetter([value[i], value[i+1], value[i+2]])); // TODO: add values dependend on GroupSize
		}

		return result;
	}



	function getPriorities(value) {
		function getPriority(charValue) {
			const ParseOffset = 9;
			const UppercaseOffset = 26;

			if (charValue.length !== 1) {
				alert("Invalid Input getPriority(). Only one letter allowed");
				return -1;
			}

			if (charValue === charValue.toUpperCase()) {
				return parseInt(charValue, 36) - ParseOffset + UppercaseOffset;
			} else {
				return parseInt(charValue, 36) - ParseOffset;
			}
		}



		let result = 0;

		for (let i in value) {
			result += getPriority(value[i]);
		}

		return result;
	}



	const Input = document.getElementById("data_input").value.split("\n");
	const InputData = getRucksackContent(Input);
	const DoubleLetters = getDoubleLetters(InputData);
	const GroupBadges = getGroupBadges(Input);

	document.getElementById('solution_d03_p1').innerHTML = getPriorities(DoubleLetters);
	document.getElementById('solution_d03_p2').innerHTML = getPriorities(GroupBadges);
}
