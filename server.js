const express = require('express')
const {connectToDb,getDb} = require('./db');
// const apiRoutes = require('./routes')
const { ObjectId } = require('mongodb');
const app = express();

//middleware
app.use(express.json())
app.use((req,res,next) => {
    console.log(req.path,req.params,req.query)
    next()
})

//routes
// app.use("/api/v3/app",apiRoutes)

//db connection and listen
let db;
connectToDb((err) => {
    if(!err) {   
        app.listen(process.env.PORT || 3500,() => {
            console.log(`Connected to db and Server started on port on ${process.env.PORT || 3500}`);
        })
        db = getDb();
    }
    else {
        console.log(err);
    }
})


app.get("/api/v3/app/events",(req,res) => {
 
    let list = []
    let eventsPerPage = Number(req.query.limit);
    let pages = Number.parseInt(req.query.page);

    if(ObjectId.isValid(req.query.id)){
    db.collection('doc').find({_id : new ObjectId(req.query.id)})
    .sort({name : 1})
    .forEach(emp => list.push(emp))
    .then(() => {
        // console.log(list)
       return res.status(200).json({list : list})
    })
    .catch(err => {
        return res.status(500).json({error : 'Could not fetch the documents'})
    }
        )
    }
    else {
        db.collection('doc').find()
            .sort({name : 1})
            .skip(pages * eventsPerPage)
            .limit(eventsPerPage)
            .forEach(emp => list.push(emp))
            .then(() => {
                // console.log(list)
               return res.status(200).json({list : list})
            })
            .catch(err => {
                return res.status(500).json({error : 'Could not fetch the documents'})
            }
        )
    }
})

app.post("/api/v3/app/events",(req,res) => {
    // const body = req.body
    // res.status(200).json({info : body})
    let newRec = req.body;
    newRec.schedule = new Date().toUTCString();
    console.log(newRec.schedule)
    db.collection('doc').insertOne(newRec)
        .then(e => res.status(200).json({msg : e}))
})

app.delete("/api/v3/app/events/:id",(req,res) => {
    if(ObjectId.isValid(req.params.id)) {
        db.collection('doc').deleteOne({_id : new ObjectId(req.params.id)})
            .then((doc) => {
                return res.status(200).json({record : doc})
            })
            .catch(err => {
                return res.status(500).json({error : 'Could not delete the document'})
            })
    }
    else {
        res.status(400).json({msg : "Invalid id"})
    }
})

app.put("/api/v3/app/events/:id",(req,res) => {
    const body = req.body

    if(ObjectId.isValid(req.params.id)) {
        db.collection('doc').updateOne({_id : new ObjectId(req.params.id)},{$set : req.body})
            .then((doc) => {
                return res.status(200).json({record : doc})
            })
            .catch(err => {
                return res.status(500).json({error : 'Could not update the document'})
            })
    }
    else {
        res.status(400).json({msg : "Invalid id"})
    }
})

