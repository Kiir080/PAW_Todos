let person = {
    name: 'Tyron',
    age: 40,
    weekendAlarm: 'No alarms needed',
    weekAlarm: 'Alarn set to 7AM',
    sayHello: () => {
        // return 'Hello, there!'

        //Ex10
        return `Hello, my name is ${this.name}`;
    },
    //Ex9
    sayGoodbye() {
        return 'Goodbye!'
    }
};


let friend = {
    name: 'xpto'
};



//Ex3
console.log(person.name);
console.log(person.age);

//Ex4
console.log(person['name']);
console.log(person['age']);

//Ex5
let day = 'Monday';
let alarm;

if (day === 'Saturday' || day === 'Sunday') {
    alarm = 'weekendAlarm';
} else {
    alarm = 'weekAlarm';
}

console.log(person[alarm]);


//Ex6
person.hobbies = ['Gaming', 'netflix'];
console.log(person.hobbies);
//Ex7
person.hobbies.pop();

console.log(person.hobbies);

//Ex8
console.log(person.sayHello());

//Ex11
friend.sayHello = person.sayHello;
console.log(friend.sayHello());

