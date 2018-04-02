/**
 * Arrays with let and const
 * You may recall that you can declare variables with both the let and const keywords.Variables declared with let can be reassigned.
 * Variables that are assigned with const cannot be reassigned. However, arrays that are declared with const remain mutable, or changeable.
 * This means that we can change the contents of an array, but cannot reassign the variable name to a new array or other data type.
 * The instructions below will illustrate this more clearly. Pay close attention to the similiarities and differences between the condiments array and the utensils array as you complete the steps.
 */

let condiments = ['Ketchup', 'Mustard', 'Soy Sauce', 'Sriracha'];
const utensils = ['Fork', 'Knife', 'Chopsticks', 'Spork'];

//Below the two existing arrays, add your favorite condiment to the condiments array using.push().
//Log the updated array to the console.
condiments.push('Cheese');

//Below your code from Step 1, reassign condiments to be an array that contains a single string.
//Log the result to the console.
condiments=['cheese'];
console.log(condiments);

//Below your code from Step 2, remove the last item from the utensils array using .pop().
//Log the updated array to the console.
utensils.pop();
console.log(utensils);

//Below your code from Step 3, reassign the utensils array to be a new array with only your favorite utensil inside of it.
//You should have received an error!
utensils=['cheese'];
