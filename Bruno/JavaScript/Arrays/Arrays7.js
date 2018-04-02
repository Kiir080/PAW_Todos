let groceryList = ['orange juice', 'bananas', 'coffee beans', 'brown rice', 'pasta', 'coconut oil', 'plantains'];

// Use the .shift() method to remove the first item from the array groceryList.
// Log the new groceryList to the console.

groceryList.shift();

//Use the .unshift() method to add 'popcorn' to the beginning of your grocery list.
//Log the new grocery list to the console.

groceryList.unshift('popcorn');
console.log(groceryList);

//You're in a hurry so you decide to ask a friend to help you with your grocery shopping. You want him to pick up the bananas, coffee beans, and brown rice.
//Use .slice() to provide him with a list of these three things.
//Log this part of the list to the console. Unlike the two previous checkpoints, you should do both of these steps in one line.


console.log(groceryList.slice(1,4));

//Log the grocery list to the console one more time.
//Notice that the groceryList array still contains the same items it had in Step 2.
console.log(groceryList);
