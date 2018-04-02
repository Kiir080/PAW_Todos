let animals = ['Hen', 'elephant', 'llama', 'leopard', 'ostrich', 'Whale', 'octopus', 'rabbit', 'lion', 'dog'];

// Create the secretMessage array below
let secretMessage = animals.map(function(x){
  return x[0];
});

let secretMessage = animals.map(x =>
    x[0]
  );

console.log(secretMessage.join(''));

let bigNumbers = [100, 200, 300, 400, 500];

// Create the smallNumbers array below
let smallNumbers= bigNumbers.map(function(x){
  return x/100;
})
    
let smallNumbers= bigNumbers.map(x => 
    x/100
 );