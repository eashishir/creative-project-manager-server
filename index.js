const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require ('dotenv').config()
const port = process.env.PORT || 5000;


const app = express();

// middleware
app.use(cors())
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@cluster0.gb5uzf7.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function  run(){
   try{
      console.log('db connected');
      const taskCollections = client.db('creative-manager').collection('tasks');
      const projectCollections = client.db('creative-manager').collection('Projects')
      const editedProjectCollections = client.db('creative-manager').collection('edited-project')

      
    app.post('/task', async (req, res) => {
         const task = req.body;
         const result = await taskCollections.insertOne(task);
         res.send(result);

      });

      app.get('/task',async(req,res)=>{
         const query= {};
         const cursor = taskCollections.find(query)
         const tasks = await cursor.toArray();
         console.log(tasks);
         res.send(tasks)
      });


   

//create project manager---Rokeya

//post project name
  app.post('/project',async (req,res)=>{
         const project= req.body;
         const result = await projectCollections.insertOne(project);
         res.send(result);
      });

//get all project
app.get('/project',async(req,res)=>{
   const query = {};
   const cursor = projectCollections.find(query)
   const projects = await cursor.toArray();
   res.send(projects);
});

//project by get id
app.get('/project/:id', async (req, res) => {
   const id = req.params.id;
   const query = { _id: ObjectId(id) };
   const  result = await projectCollections.findOne(query);
   res.send(result);
});


//get project by user
app.get('/project',async(req,res)=>{

 let query = {};
 if(req.query.email){
   query={
      email:req.query.email
   }
 }
 const cursor = projectCollections.find(query);
   const project = await cursor.toArray();
res.send(project);

});


//edited project

app.post('/project-edited',async (req,res)=>{
   const project= req.body;
   const result = await editedProjectCollections.insertOne(project);
   res.send(result);
});


   }
   finally{

   }
}
run().catch(console.log)


app.get('/' , async(req, res) => {
    res.send('Creative product manager is running');
})

app.listen(port, () => console.log(`Creative project manager running on ${port}`))



