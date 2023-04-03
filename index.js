const mongoose=require('mongoose');
const express=require('express');
const Person=require('./models/person');
var bodyParser = require('body-parser');
const person = require('./models/person');
require('dotenv').config();
const app=express();
//setting up Mongoose:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 1) Installing and setting up Mongoose:
mongoose.connect(process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB', err));

  // 3)Create person records 
const createPerson = async () => {
  const person = new Person({
    firstName: 'John ',
    lastName: 'Doe',
    age: 30,
    profession:'teacher',
    favoriteHobbies:['swimming','dancing'],
    favoriteFoods:['lasagne','spaguetty']
  });
  try {
    const result = await person.save();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
createPerson();



// 4)Create Many Records with model.create()
const createManyPersons = async persons => {
  try {
    const result = await Person.create(persons);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

createManyPersons([
  {
    firstName: 'John ',
    lastName: 'Doe',
    age: 30,
    profession:'teacher',
    favoriteHobbies:['swimming','dancing'],
    favoriteFoods:['burritos','spaguetty']
  },
  {
    firstName: 'Mary',
    lastName: 'Doe',
    age: 30,
    profession:'teacher',
    favoriteHobbies:['swimming','dancing'],
    favoriteFoods:['lasagne','spaguetty']
  },
  {
    firstName: 'Mary',
    lastName: 'Doe',
    age: 30,
    profession:'teacher',
    favoriteHobbies:['swimming','dancing'],
    favoriteFoods:['lasagne','spaguetty']
  },
    {
      firstName: 'touta ',
      lastName: 'zin',
      age: 22,
      profession:'developer',
      favoriteHobbies:['sport','design'],
      favoriteFoods:['burritos','spaguetty']
    },
  

]);

// 5)Find all the people having a given name
const getPersons=async()=>{
try {
  const persons = await Person.find();
  console.log(persons);
} catch (error) {
  console.log(err);
}
};
getPersons();

// 6)find one person with his fovouriteFood
const getOnePerson=async()=>{
  try {
    const person= await Person.findOne({favoritFoods:"lasagne"});
    console.log(person);
  } catch (error) {
    console.log(err);
  }
  };
  getOnePerson();

// 7)find one person with his id
const getOnePersonById=async(personId)=>{
    try {
      const person= await Person.findById({_id:personId});
      console.log(person);
    } catch (error) {
      console.log(err);
    }
    };
    getOnePersonById("63f93547f4af78d75519efd0");

// 8) Perform Classic Updates by Running Find, Edit, then Save
//updateOne()
const updatePerson = async (id, newFood) => {
  try {
     const result=await Person.updateOne(
      { _id: id },
      { $push: { "favoriteFoods": newFood } }
    );
    console.log(result);
    
  } catch (err) {
    console.error(err);
  }
};
updatePerson('63f93547f4af78d75519efd0',"hamburger");

//find person with id and add humberger to favoriteFoods :findByIdAndUpdate()
const updatePerson1 = async (id,newFood) => {
try{
    const person = await Person.findByIdAndUpdate(
      id,
      {
        $push:{ "favoriteFoods": newFood } ,
      },
      { new: true }
    );

    console.log(person);
  } catch (err) {
    console.error(err);
  };
}
updatePerson1("63f93fdfdeb43bb6533c67f7","hamburger");

// 9)Perform New Updates on a Document Using model.findOneAndUpdate()

const updateOne=async(personName,newAge)=>{
  try {
    const result = await Person.findOneAndUpdate(
      {personName:"lastName"},
      {$set: { age: newAge }},
      {new: true }
  );
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

updateOne("zin",22);

//10)Delete One Document Using model.findByIdAndRemove
   const deletePerson =async(personId)=>{
  try {
    const person =await Person.findByIdAndRemove({ _id: personId });
  } catch (err) {
    console.log(err)
  }
}
deletePerson('63f93fdfdeb43bb6533c67f7');

//11) Delete Many Documents with model.remove()

const removePersons=()=>{
      Person.remove({firstName: "Mary" },function(err,result){
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        done(result); 
      }
    });
  }
    removePersons();

//12)Chain Search Query Helpers to Narrow Search Results
   const searchData=()=>{
Person.find({ favoriteFood: 'burritos' })
.sort({ lastName: 1 })
.limit(2)
.select('-age')
.exec(function(err, data) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
} ;
searchData();