const express = require('express')
const { Server } = require('http')
const app = express()
app.use(express.json());
const {generateUniqueIDs} = require("./HELPER")
const {db: fruits} = require("./DB")

app.get('/', (req,res) => {
    res.send('Hello World!')
})
app.post('/fruits', (req,res) => {
const _id = generateUniqueIDs();
const {name, rating} = req.body;

fruits[_id] = {_id, name, rating } 

    res.send({ status:200})
})

app.get('/fruits', (req,res) => {
    res.send(fruits);
})

app.put('/fruits', (req,res) => {
    const {_id } = req.query;
    const {name, rating} = req.body;
    
    // console.log(_id)
    
    if (_id === undefined) {
        return res.status(400).send({ message: '?_id is off'});
    }
    
    if (fruits[_id] === undefined){
        return res.status(410).send({ message: 'no fruit with that id exists'})
    }
    
    fruits[_id] = { _id , name, rating } 

    if (name !== undefined){
        fruits[_id].name = name;
    }

    if (rating !== undefined){
        fruits[_id].rating = rating;
    }

    res.send({ status:200 })
})

app.delete('/fruits', (req,res) => {
    const {_id } = req.query;

    if (_id === undefined) {
        return res.status(400).send({ message: '?_id is off'});
    }
    
    if (fruits[_id] === undefined){
        return res.status(410).send({ message: 'no fruit with that id exists'})
    }

    delete fruits[_id]
    
    res.redirect('/fruits')
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
})
