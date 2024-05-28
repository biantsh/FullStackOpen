const mongoose = require('mongoose');

if (![3, 5].includes(process.argv.length)) {
    console.log(`Usage: node mongo.js yourpassword name number\nor\nnode mongo.js yourpassword`);
    process.exit(1);
}

const [_, __, password, ...userDetails] = process.argv;
const url = `mongodb+srv://fullstackopen:${password}@fullstackopen.kuvhcia.mongodb.net/?retryWrites=true&w=majority&appName=FullStackOpen`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = mongoose.Schema({
    userName: String,
    userNumber: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('Phonebook:');

        result.forEach(person => {
            console.log(`${person.userName} ${person.userNumber}`);
        });

        mongoose.connection.close();
    });
} else {
    const [userName, userNumber] = userDetails;
    const person = new Person({ userName, userNumber });

    person.save().then(result => {
        console.log('Person saved!');
        mongoose.connection.close();
    });
}
