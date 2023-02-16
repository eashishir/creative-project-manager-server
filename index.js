const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId, CURSOR_FLAGS } = require('mongodb');
require('dotenv').config();

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
      const CreateProjectCollections = client.db('creative-manager').collection('create-project');
      const projectCollections = client.db('creative-manager').collection('Projects')
      const usersCollections = client.db('creative-manager').collection('users')
      const goalsCollections = client.db('creative-manager').collection('goals')
      // const editedProjectCollections = client.db('creative-manager').collection('edited-project')
      // const blogCollections = client.db('creative-manager').collection('blog-article')
      const membersCollections = client.db('creative-manager').collection('members')
      // const productivitiesCollections = client.db('creative-manager').collection('productivity')
   


      




      //post create project
      
      app.post('/create-project', async (req, res) => {
         const createProject = req.body;
         const result = await CreateProjectCollections.insertOne(createProject);
         res.send(result);
      });

      //get create project
      app.get('/create-project', async (req, res) => {
         const query = {}
         const projects = await CreateProjectCollections.find(query).toArray();
         res.send(projects);
      })

     
      //todo
      app.post('/todoTask', async (req, res) => {
         const todo = req.body;
         console.log(todo);
         const result = await todoCollection.insertOne(todo);
         res.send(result);
      });

     
      //User information -----------
      app.post('/users', async (req, res) => {
         const user = req.body;
         const result = await usersCollections.insertOne(user)
         res.send(result);

      })

  
      //Goal modal data post-------robin
      app.post('/goals', async (req, res) => {
         goals = req.body
         const result = await goalsCollections.insertOne(goals)
         res.send(result)
      })
  

      //create project---Rokeya

      //post project
      app.post('/project', async (req, res) => {
         const project = req.body;
         const result = await projectCollections.insertOne(project);
         res.send(result);
      });

      ////Goal modal data get-------robin
      app.get('/goals', async (req, res) => {
         const query = {}
         const goals = await goalsCollections.find(query).toArray();
         res.send(goals);
      })

   


      //get project by user
      // app.get('/project', async (req, res) => {
      //    let query = {};
      //    if (req.query.email) {
      //       query = {
      //          email: req.query.email
      //       }
      //    }
      //    const cursor = projectCollections.find(query);
      //    const project = await cursor.toArray();
      //    res.send(project);
      // });

   //edited project

// app.post('/project-edited',async (req,res)=>{
//    const project= req.body;
//    const result = await editedProjectCollections.insertOne(project);
//    res.send(result);
// });

//get edited projects by user
// app.get('/project-edited',async(req,res)=>{
//    // console.log(req.query);
//    let query = {};
//    if(req.query.email){
//       query={
//          email:req.query.email
//       }
//    }
//    const cursor = editedProjectCollections.find(query);
//    const editedProject = await cursor.toArray();
//    res.send(editedProject);
// });
  

//get blog article
// app.get('/blog-article', async (req, res) => {
//    const query = {}
//    const article = await blogCollections.find(query).toArray();
//    res.send(article);
// });


//get members

app.get('/members', async (req, res) => {
   const query = {}
   const members = await membersCollections.find(query).toArray();
   res.send( members);
});

//post productivity

// app.post('/productivity',async (req,res)=>{
//    const productivity = req.body;
//    const result = await productivitiesCollections.insertOne(productivity);
//    res.send(result);
// });

//get productivity
// app.get('/productivity', async (req, res) => {
//    const query = {}
//    const  productivities  = await productivitiesCollections.find(query).toArray();
//    res.send( productivities);
// });


   }
   finally {

   }

}
run().catch(console.log)


app.get('/', async (req, res) => {
   res.send('Creative product manager is running');
})

app.listen(port, () => console.log(`Creative project manager running on ${port}`))



