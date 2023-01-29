const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');;
require('dotenv').config()
const port = process.env.PORT || 5000;


const app = express();

// middleware
app.use(cors())
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@cluster0.gb5uzf7.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
   try {
      console.log('db connected');
      const taskCollections = client.db('creative-manager').collection('tasks');
      const projectCollections = client.db('creative-manager').collection('Projects')
      const usersCollections = client.db('creative-manager').collection('users')
      const goalsCollections = client.db('creative-manager').collection('goals')


      app.post('/task', async (req, res) => {
         const task = req.body;
         const result = await taskCollections.insertOne(task);
         res.send(result);

      });

      app.get('/task', async (req, res) => {
         const query = {};
         const cursor = taskCollections.find(query)
         const tasks = await cursor.toArray();
         console.log(tasks);
         res.send(tasks)
      });

       //User information -----------
  app.post('/users', async (req, res) => {
   const user = req.body;
   const result = await usersCollections.insertOne(user)
   res.send(result);

})
   

//create project---Rokeya

//post project
  app.post('/project',async (req,res)=>{
         const project= req.body;
         const result = await projectCollections.insertOne(project);
         res.send(result);
      });

      ////Goal modal data get-------robin
      app.get('/goals', async (req, res) => {
         // const email = req.query.email
         const query = {}
         const goals = await goalsCollections.find(query).toArray();
         res.send(goals);
      })

      app.get('/goals/:id', async (req, res) => {
         const id = req.params.id;
         const query = { _id: ObjectId(id) };
         const goal = await goalsCollections.findOne(query);
         res.send(goal)
      })
      // robin part end-----
   }
   finally {

   }
}
run().catch(console.log)


app.get('/', async (req, res) => {
   res.send('Creative product manager is running');
})

app.listen(port, () => console.log(`Creative project manager running on ${port}`))



