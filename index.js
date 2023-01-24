const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;


const app = express();

// middleware
app.use(cors())
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4qgafns.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
   try {
      const usersCollection = client.db('creativeProjectManager').collection('users');
      const taskCollection = client.db('creativeProjectManager').collection('task');


      app.get('/users', async (req, res) => {
         const query = {};
         const users = await usersCollection.find(query).toArray();
         res.send(users)
      })

      app.post('/task', async (req, res) => {
         const task = req.body;
         const result = await taskCollection.insertOne(task);
         res.send(result);

      })

   }
   finally {

   }
}
run().catch(console.log)


app.get('/', async (req, res) => {
   res.send('creative product manager is running');
})

app.listen(port, () => console.log(`creative project manager running on ${port}`))



