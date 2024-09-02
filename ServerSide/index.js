
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const TodoModel = require('./Models/todo')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/test')

app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})


app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
        .catch(err => res.json(err))
})


app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.put('/edit/:id', (req, res) => {
    const { id } = req.params;
    const updatedData = req.body; 

   
    if (!updatedData || !updatedData.task) {
        return res.status(400).json({ error: 'Invalid data' });
    }

 
    TodoModel.findByIdAndUpdate(id, updatedData, { new: true })
        .then(result => {
            if (result) {
                res.json(result);
            } else {
                res.status(404).json({ error: 'Task not found' });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});


app.listen(3001, () => {
    console.log("Server is Running")
})