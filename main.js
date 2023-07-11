const {mongodb,ObjectId} = require('mongodb').MongoClient;
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const url = 'mongodb://127.0.0.1:27017/aptech';



// Create a new student
app.post('/create', (req, res) => {
  mongodb.connect(url)
    .then(async con => {
      const db = con.db();
      const collection = db.collection('student');
      const student = req.body;
      const result = await collection.insertOne(student);
      res.send(result);
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send('An error occurred');
    });
});


// List all students
app.get('/list', (req, res) => {
    mongodb.connect(url)
      .then(async con => {
        const db = con.db();
        const collection = db.collection('student');
        const students = await collection.find().toArray();
        res.send(students);
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).send('An error occurred');
      });
  });



  // Update a student
app.put('/update/:id', (req, res) => {
    const studentId = req.params.id;
    const updatedData = req.body;
  
    mongodb.connect(url)
      .then(async con => {
        const db = con.db();
        const collection = db.collection('student');

        console.log(studentId);
        console.log(updatedData);
        

        const filter = { _id: ObjectId(studentId) };
        const update = { $set: updatedData };

        const result = await collection.updateOne(filter, update);;

        if (result.matchedCount === 1) {
          res.send('Student updated successfully');
        } else {
          res.status(404).send('Student not found');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).send('An error occurred');
      });
  });
  
  

  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
