let person = {
    _name: 'Lu Xun',
    _age: 137,

    set age(ageIn) {
        if (typeof ageIn === 'number') {
            this._age = ageIn;
        }
        else {
            console.log('Invalid input');
            return 'Invalid input';
        }
    },
    get age() {
        return `${this._name} is ${this._age} years old.`;
    }
};

//Ex13
person.age = 'Thirty-nine'; //Invalid Input
person.age = 39;


//Ex14

console.log(person.age);