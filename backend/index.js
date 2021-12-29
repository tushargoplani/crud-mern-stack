var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;




var app = express();
app.use(cors());

var client = new MongoClient("mongodb+srv://myadminuser:myadminuser@school.ivhuh.mongodb.net/myadmin?retryWrites=true&w=majority", { useNewURLParser: true, useUnifiedTopology: true });
var connection;
client.connect((err, db) => {
    if (!err) {
        connection = db;
        console.log("Database Connected Successfully");
    }
    else {
        console.log("Database could not connect");
    }
})



// APIs
app.get('/list-student', (req, res) => {
    var studentCollection = connection.db('myadmin').collection('student');
    studentCollection.find().toArray((err, docs) => {
        if (!err) {
            res.send({ status: "OK", data: docs })
        }
        else {
            res.send({ status: "Failed", data: err })
        }
    })
});

app.get('/student-by-id', (req, res) => {
    var studentCollection = connection.db('myadmin').collection('student');
    studentCollection.find({ _id: ObjectId(req.query.id) }).toArray((err, docs) => {
        if (!err) {
            res.send({ status: "OK", data: docs })
        }
        else {
            res.send({ status: "Failed", data: err })
        }
    })
});

app.get('/delete-student', (req, res) => {
    var studentCollection = connection.db('myadmin').collection('student');
    studentCollection.remove({ _id: ObjectId(req.query.id) }, (err, result) => {
        if (!err) {
            res.send({ status: "OK", data: "Student Deleted successfully" })
        }
        else {
            res.send({ status: "Failed", data: err })
        }
    })
});

app.post('/create-student', bodyParser.json(), (req, res) => {
    var studentCollection = connection.db('myadmin').collection('student');
    studentCollection.insert({ name: req.body.name, marks: req.body.marks, age: req.body.age, email: req.body.email, city: req.body.city }, (err, result) => {
        if (!err) {
            res.send({ status: "OK", data: "Student Created successfully" })
        }
        else {
            res.send({ status: "Failed", data: err })
        }
    })
}
)

app.post('/update-student', bodyParser.json(), (req, res) => {
    var studentCollection = connection.db('myadmin').collection('student');
    studentCollection.update({ _id: ObjectId(req.body.stId) }, { $set: { name: req.body.name, age: req.body.age, marks: req.body.marks, email: req.body.email, city: req.body.city } }, (err, result) => {
        if (!err) {
            res.send({ status: "OK", data: "Student Updated successfully" })
        }
        else {
            res.send({ status: "Failed", data: err })
        }
    })
}
)



app.listen(3000, () => {
    console.log("Server is started on port 3000");
})