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
      const editedProjectCollections = client.db('creative-manager').collection('edited-project')
      // Mofassel-----------
      const UploadImage = client.db('UploadImage').collection('images')
      // --------------

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
      })

      //User information -----------robin
      app.post('/users', async (req, res) => {
         const user = req.body;
         const result = await usersCollections.insertOne(user)
         res.send(result);

      })
      // all user get ----------Mofassel
      app.get("/allusers", async (req, res) => {
         const query = {}
         const cursor = await usersCollections.find(query).toArray()
         res.send(cursor)
      })
      // user delete  ----Mofassel
      app.delete("/allusers/:id", async (req, res) => {

         const id = req.params.id;
         const query = { _id: ObjectId(id) }
         // const result = await usersCollections.deleteOne(query)
         // res.send(result)
         console.log(id, query);
      })
      // Admin roll ----Mofasse
      app.get('/adminRole/:email', async (req, res) => {
         const email = req.params.email
         const query = { email }
         const user = await usersCollections.findOne(query)
         res.send({ isAdminRole: user.role === 'admin' })
      })
      //Goal modal data post-------robin
      app.post('/goals', async (req, res) => {
         goals = req.body
         const result = await goalsCollections.insertOne(goals)
         res.send(result)
      })
      ////Goal modal data get-------robin
      app.get('/goals', async (req, res) => {
         // const email = req.query.email
         const query = {}
         const goals = await goalsCollections.find(query).toArray();
         res.send(goals);
      })
      // image ling ----Mofassel
      app.post('/upImg', async (req, res) => {
         const UpImage = req.body
         console.log(UpImage);
         const result = await UploadImage.insertOne(UpImage)
         res.send(result)
         console.log(result);
      })

      //create project---Rokeya

      //post project
      app.post('/project', async (req, res) => {
         const project = req.body;
         const result = await projectCollections.insertOne(project);
         res.send(result);
      });


      //get project by user
      app.get('/project', async (req, res) => {
         let query = {};
         if (req.query.email) {
            query = {
               email: req.query.email
            }
         }
         const cursor = projectCollections.find(query);
         const project = await cursor.toArray();
         res.send(project);
      });

      //edited project

      app.post('/project-edited', async (req, res) => {
         const project = req.body;
         const result = await editedProjectCollections.insertOne(project);
         res.send(result);
      });

      //get edited projects by user
      app.get('/project-edited', async (req, res) => {
         console.log(req.query);
         let query = {};
         if (req.query.email) {
            query = {
               email: req.query.email
            }
         }
         const cursor = editedProjectCollections.find(query);
         const editedProject = await cursor.toArray();
         res.send(editedProject);
      });








   }
   finally {

   }

}
run().catch(console.log)

app.get('/', async (req, res) => {
   res.send('Creative product manager is running');
})

app.listen(port, () => console.log(`Creative project manager running on ${port}`))



