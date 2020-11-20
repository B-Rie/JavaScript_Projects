
///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, 
but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/


// 1. Calculate the dog age in human years using the following formula: 
// 	if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
// 	 humanAge = 16 + dogAge * 4.
// 2. Exclude all dogs that are less than 18 human years old 
// 	(which is the same as keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs 
// 	(you should already know from other challenges how we calculate averages 😉)



// Similar to Challenegs 2, using data transfomration CHAINING ( map, filter, and reduce)
const testData = [5, 2, 4, 1, 15, 8, 3];

const calcAverageHumanAge = ages => ages
	.map(age => (age <= 2 ? (age*2) : (16+age*4)))
	.filter(dogAge => dogAge >= 18)
	.reduce((acc, age, i, arr) => acc+age/arr.length, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));