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
      const taskCollections = client.db('creative-manager').collection('tasks')
      const usersCollections = client.db('creative-manager').collection('users')
      // resurces -----------mofassel
      const projectPlanning = client.db('creative-manager').collection('project-planning')
      const inspireImpact = client.db('creative-manager').collection('inspire-impact')
      const projectManagementResources = client.db('creative-manager').collection('project-management')
      const allResources = client.db('creative-manager').collection('all-resources')
      const collabiratinResources = client.db('creative-manager').collection('collabiration')
      const businessStrategy = client.db('creative-manager').collection('business-strategy')
      // --------------------------------
      const goalsCollections = client.db('creative-manager').collection('goals')
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
      app.get ("/allusers",async(req,res)=>{
         const query = {}
         const cursor =  await usersCollections.find(query).toArray()
        res.send(cursor)
      })
      // project-planning ----------Mofassel Hosain
      app.get ("/project-planning",async(req,res)=>{
         const query = {}
         const cursor =  await projectPlanning.find(query).toArray()
        res.send(cursor)
      })

      
      app.get ("/project-planning/:id",async(req,res)=>{
         const id = req.params.id;

         const query = {_id :ObjectId(id)}
         const result = await projectPlanning.findOne(query)
        res.send(result)
        console.log(result);
      })
      // inspire-impact
     
      app.get ("/inspire-impact",async(req,res)=>{
         const query = {}
         const cursor =  await inspireImpact.find(query).toArray()
        res.send(cursor)
      })
      app.get ("/inspire-impact/:id",async(req,res)=>{
         const id = req.params.id;

         const query = {_id :ObjectId(id)}
         const result = await inspireImpact.findOne(query)
        res.send(result)
        console.log(result);
      })
   //   project-management =======Mofassel
      app.get ("/project-management",async(req,res)=>{
         const query = {}
         const cursor =  await projectManagementResources.find(query).toArray()
        res.send(cursor)
      })
      app.get ("/project-management/:id",async(req,res)=>{
         const id = req.params.id;

         const query = {_id :ObjectId(id)}
         const result = await projectManagementResources.findOne(query)
        res.send(result)
        console.log(result);
      })
   //   alll-resources ------Mofassel
      app.get ("/all-resources",async(req,res)=>{
         const query = {}
         const cursor =  await allResources.find(query).toArray()
        res.send(cursor)
      })
      app.get ("/all-resources/:id",async(req,res)=>{
         const id = req.params.id;

         const query = {_id :ObjectId(id)}
         const result = await allResources.findOne(query)
        res.send(result)
        console.log(result);
      })
   //   collabiration ------  Mofassel
      app.get ("/collabiration",async(req,res)=>{
         const query = {}
         const cursor =  await collabiratinResources.find(query).toArray()
        res.send(cursor)
      })
      app.get ("/collabiration/:id",async(req,res)=>{
         const id = req.params.id;

         const query = {_id :ObjectId(id)}
         const result = await collabiratinResources.findOne(query)
        res.send(result)
        console.log(result);
      })
   //   business-strategy --------- Mofassel
      app.get ("/business-strategy",async(req,res)=>{
         const query = {}
         const cursor =  await businessStrategy.find(query).toArray()
        res.send(cursor)
      })
      app.get ("/business-strategy/:id",async(req,res)=>{
         const id = req.params.id;

         const query = {_id :ObjectId(id)}
         const result = await businessStrategy.findOne(query)
        res.send(result)
        console.log(result);
      })
     

// -------------------------------------------------------

      // user delete  ----Mofassel
      app.delete("/allusers/:id" ,async(req,res)=>{
         const id = req.params.id;
         const filter = {_id:ObjectId(id)}
         const result = await usersCollections.deleteOne(filter)
         res.send(result)
     })
   //   --------------------------
   // Create Admin ------Mofassel
   app.put("/user/admin/:id",async(req,res)=>{
     const id = req.params.id
     const filter = {_id:ObjectId(id)}  
    const options = { upsert: true }
    const updateDoc = {
      $set: {
        role:"admin" 
      },
   }
   const result = await usersCollections.updateOne(filter,updateDoc,options)
   res.send(result)
   console.log(result)
})
   // ---------------------------------
      // Admin roll ----Mofasse
          app.get('/adminRole/:email',async(req,res)=>{
            const email = req.params.email
            const query ={email}
            const user = await usersCollections.findOne(query)
            res.send({isAdminRole:user.role ==='admin'}) 
        })
      //   --------------------------------
      //Goal modal data post-------robin
      app.post('/goals', async (req, res) => {
         goals = req.body
         const result = await goalsCollections.insertOne(goals)
         res.send(result)
      })
      ////Goal modal data get-------robin
      app.get('/goals', async (req, res) => {
         const email = req.query.email
         const query = { email: email }
         const goals = await goalsCollections.find(query).toArray();
         res.send(goals);
      })
      // image ling ----Mofassel
      app.post('/upImg', async (req, res) => {
         const UpImage = req.body
         console.log(UpImage);
         const result = await UploadImage.insertOne(UpImage)
         res.send(result)
      })
      
   }
   finally {

   }
}
run().catch(console.log)

app.get('/', async (req, res) => {
   res.send('Creative product manager is running');
})

app.listen(port, () => console.log(`Creative project manager running on ${port}`))



