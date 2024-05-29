const mongoose = require('mongoose');

if (![3, 5].includes(process.argv.length)) {
  console.log('Usage: node mongo.js yourpassword name number\nor\nnode mongo.js yourpassword');
  process.exit(1);
}

const [, , password, ...userDetails] = process.argv;
const url = `mongodb+srv://fullstackopen:${password}@fullstackopen.kuvhcia.mongodb.net/?retryWrites=true&w=majority&appName=FullStackOpen`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('Phonebook:');

    result.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });

    mongoose.connection.close();
  });
} else {
  const [name, number] = userDetails;
  const person = new Person({ name, number });

  person.save().then(() => {
    console.log('Person saved!');
    mongoose.connection.close();
  });
}
