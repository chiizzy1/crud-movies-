const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient




MongoClient.connect("mongodb+srv://movies:movies@movies.b48eem8.mongodb.net/?retryWrites=true&w=majority", { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')

    const db = client.db('movies')
    const movieCollection = db.collection('movie')

    app.set('view engine', 'ejs')
    app.use(express.static('public'))
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    

    app.get('/', (req, res) => {
        // res.sendFile(__dirname + '/index.html')
        db.collection('movie').find().toArray()
            .then(result => {
                res.render('index.ejs', { movies: result })
            })

            .catch(error => console.error(error))

        
    })
    
    app.post('/movies', (req, res) => {
        // console.log(req.body)
        movieCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
          })
        .catch(error => console.error(error))
    })
    
    app.put('/movies', (req, res) => {
        movieCollection.findOneAndUpdate(
            { name: 'likes' },
            {
              $set: {
                likes: req.body.likes + 1,
              }
            },
            {
              upsert: true
            }
          )
            .then(result => {
                res.json('Success');
            })
            .catch(error => console.error(error))
    })


    app.delete('/quotes', (req, res) => {
        quotesCollection.deleteOne(
            { name: req.body.name }
        )
            .then(result => {
                res.json(`Deleted movie`)
            })
             .catch(error => console.error(error))
    })


    app.listen(7100, function() {
        console.log('listening on 7100')
    })
  })


  .catch(error => console.error(error))





