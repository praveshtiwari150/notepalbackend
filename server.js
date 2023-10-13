const express = require('express')
const app = express()
require("dotenv").config()
const cors = require('cors')
const Note = require('./models/Note')
const dbConnect = require("./config/database")

const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


dbConnect();

// CREATE 
app.post('/newNote', (req, res)=>{
    const title = req.body.title
    const note = req.body.note

    const newNote = new Note({
        title, note
    })
    newNote.save((err, data)=>{
        if(err){
            console.log(err)
        }
        res.send('OK')
    })
    console.log(newNote)
})
// READ
app.get('/notes', (req, res)=>{
    Note.find({}, function(err,data){
        if(err){
            console.log(err)
        }else{
            res.json(data)
        }
    })
})
// DELETE
app.delete('/deleteNote/:id', (req, res)=>{
    Note.deleteOne({_id: req.params.id}, function(err){
        if(err){
            console.log(err)
        }else{
            res.send('deleted')
        }
    })
})
// UPDATE
app.put('/update/:id', async (req, res)=>{
    req.data = await Note.findByIdAndUpdate(req.params.id)
    let data = req.data
    data.title = req.body.title
    data.note = req.body.note

   try{
    data = await data.save()
    res.send('updated')
   }catch(err){
    console.log(err)
   }
})



app.listen(PORT, ()=>{console.log(`Server started successfully`)} )