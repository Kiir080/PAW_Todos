let cities = ['Nashville', 'Charlotte', 'Asheville', 'Austin', 'Boulder'];

let nums = [1, 50, 75, 200, 350, 525, 1000];

//1.
//Replace the word method in the first method call with a method that will do something to each of the values in the array and return undefined.

//  Choose a method that will return undefined
cities.forEach(city => console.log('Have you visited ' + city + '?'));

//2.
//In the second method call, replace the word method with a method that will return a new array with only those elements longer than 7 characters.

// Choose a method that will return a new array
let longCities = cities.filter(city => city.length > 7);

//3.
//In the third method call, replace the word method with a method that will return a new array of numbers returned from the function.

// Choose a method that will return a new array
let smallerNums = nums.map(num => num - 5);

//4.
//In the fourth method call, replace the word method with a method that will return a boolean value.

// Choose a method that will return a boolean value
nums.some(num => num < 0);