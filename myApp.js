require('dotenv').config();
const { response } = require('express');
const { Model } = require('mongoose');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]

});

const Person = mongoose.model("Person",personSchema);

const createAndSavePerson = (done) => {
  var anuj = new Person({name:'Anuj Magar', age:23, favoriteFoods:['eggs', 'chicken', 'fish']});
  anuj.save(function (err, data){
      if(err) return console.error(err);
      done(null, data);
  });
  
};

var arrayOfPeople =[
  {name: "Amrit Thapa", age: 21, favoriteFoods: ['Bhaisi', 'Machha', 'Bangur']},
  {name: "Sanjit Lama", age: 29, favoriteFoods: ['Gai', 'Bhaisi', 'Sungur']},
  {name: "Bigyan Pathak", age: 35, favoriteFoods: ['Bakhra', 'Kukhura', 'Langur']}
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people){
    if(err) return console.log(err);  
    done(null , people);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name :personName}, function (err, people) {
    if(err) return console.log(err);  
    done(null , people);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, person){
    if(err) return console.log(err);  
    done(null , person);
  });
  
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function(err, person){
    if(err) return console.log(err);
    done(null, person);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, function(err, person){
    if(err) return console.log(err);
    person.favoriteFoods.push(foodToAdd);
    person.save(function(err, person){
      if(err) return console.log(err);
      done(null, person);
    });
  });

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet},{new: true},function(err, updatedPerson){ 
    if(err) return console.log(err);
    done(null, updatedPerson);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id:personId}, function(err, deletedDoc){
    if(err) return console.log(err);
    done(null, deletedDoc);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove},function(err,res){
    if(err) return console.log(err);
    done(null, res);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  var people = Person.find({favoriteFoods:foodToSearch})
                     .sort({'name':1})
                     .limit(2)
                     .select({age:0});
  people.exec(function(err, docs){
    if(err) return console.log(err);
    done(null, docs);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
