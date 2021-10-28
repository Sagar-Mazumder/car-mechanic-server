const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())
//gIg32FfUfWlGECTt
//caruser1
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.iymhd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// console.log(uri)
async function run() {
      try {
            await client.connect();
            const database = client.db("carMechanic");
            const servicesCollection = database.collection("services");

            // get multiple document
            app.get('/services', async (req, res) => {
                  const cursor = servicesCollection.find({});
                  const result = await cursor.toArray();
                  res.send(result)
            })
            // get single item  
            app.get('/services/:id', async (req, res) => {
                  const id = req.params.id
                  const query = { _id: ObjectId(id) }
                  const result = await servicesCollection.findOne(query);
                  res.send(result)


            })
            app.delete('/services/:id', async (req, res) => {
                  const id = req.params.id
                  const query = { _id: ObjectId(id) }
                  const result = await servicesCollection.deleteOne(query);
                  // console.log(result)
                  res.json(result)


            })

            // insert a document 
            app.post('/services', async (req, res) => {
                  // console.log('i am hitted', req)
                  const service = req.body
                  const result = await servicesCollection.insertOne(service)
                  // console.log(result)
                  res.json(result)
            })


      } finally {
            //   await client.close();
      }
}
run().catch(console.dir);
app.get('/', (req, res) => {
      res.send('i am installing bro')
})
app.listen(port, () => {
      console.log('addressing at the port', port)
})