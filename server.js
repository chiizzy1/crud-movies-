const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

const PORT = 7001


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
        
        movieCollection.insertOne({title: req.body.title, genre: req.body.genre, year: req.body.year, thumbUp: 0 })
        .then(result => {
            res.redirect('/')
            console.log('db updated');
          })
        .catch(error => console.error(error))
    })

   
    
    app.put('/movies', (req, res) => {
        movieCollection.findOneAndUpdate(
            { title: req.body.title, genre: req.body.genre, year: req.body.year },
            {
              $set: {
                thumbUp: req.body.thumbUp + 1,
              }
            },
            {
              sort: {_id: -1},
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
            { title: req.body.title, genre: req.body.genre }
        )
            .then(result => {
                res.json(`Deleted movie`)
            })
             .catch(error => console.error(error))
    })


    app.listen(process.env.PORT || PORT, function() {
        console.log('listening on 7100')
    })
  })


  .catch(error => console.error(error))





