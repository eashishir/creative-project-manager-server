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
      // resurces -----------mofassel
      const projectPlanning = client.db('creative-manager').collection('project-planning')
      const inspireImpact = client.db('creative-manager').collection('inspire-impact')
      const projectManagementResources = client.db('creative-manager').collection('project-management')
      const allResources = client.db('creative-manager').collection('all-resources')
      const collabiratinResources = client.db('creative-manager').collection('collaboration')
      const businessStrategy = client.db('creative-manager').collection('business-strategy')
      const GoalsBlogsResources = client.db('creative-manager').collection('goals-blog')
      // --------------------------------
      const goalsCollections = client.db('creative-manager').collection('goals')
      const editedProjectCollections = client.db('creative-manager').collection('edited-project')
      const blogCollections = client.db('creative-manager').collection('blog-article')
      const membersCollections = client.db('creative-manager').collection('members')
      const productivitiesCollections = client.db('creative-manager').collection('productivity')


      //get members


      app.get('/members', async (req, res) => {
         const query = {}
         const members = await membersCollections.find(query).toArray();
         res.send(members);
      })



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
      // all user get ----------Mofassel
      app.get("/allusers", async (req, res) => {
         const query = {}
         const cursor = await usersCollections.find(query).toArray()
         res.send(cursor)
      })
      // project-planning ----------Mofassel Hosain
      app.get("/project-planning", async (req, res) => {
         const query = {}
         const cursor = await projectPlanning.find(query).toArray()
         res.send(cursor)
      })


      app.get("/project-planning/:id", async (req, res) => {
         const id = req.params.id;

         const query = { _id: ObjectId(id) }
         const result = await projectPlanning.findOne(query)
         res.send(result)
         console.log(result);
      })
      // inspire-impact

      app.get("/inspire-impact", async (req, res) => {
         const query = {}
         const cursor = await inspireImpact.find(query).toArray()
         res.send(cursor)
      })
      app.get("/inspire-impact/:id", async (req, res) => {
         const id = req.params.id;

         const query = { _id: ObjectId(id) }
         const result = await inspireImpact.findOne(query)
         res.send(result)
         console.log(result);
      })
      //   project-management =======Mofassel
      app.get("/project-management", async (req, res) => {
         const query = {}
         const cursor = await projectManagementResources.find(query).toArray()
         res.send(cursor)
      })
      app.get("/project-management/:id", async (req, res) => {
         const id = req.params.id;

         const query = { _id: ObjectId(id) }
         const result = await projectManagementResources.findOne(query)
         res.send(result)
         console.log(result);
      })
      //   alll-resources ------Mofassel
      app.get("/all-resources", async (req, res) => {
         const query = {}
         const cursor = await allResources.find(query).toArray()
         res.send(cursor)
      })
      app.get("/all-resources/:id", async (req, res) => {
         const id = req.params.id;

         const query = { _id: ObjectId(id) }
         const result = await allResources.findOne(query)
         res.send(result)
         console.log(result);
      })
      //   collabiration ------  Mofassel
      app.get("/collaboration", async (req, res) => {
         const query = {}
         const cursor = await collabiratinResources.find(query).toArray()
         res.send(cursor)
      })
      app.get("/collaboration/:id", async (req, res) => {
         const id = req.params.id;

         const query = { _id: ObjectId(id) }
         const result = await collabiratinResources.findOne(query)
         res.send(result)
         console.log(result);
      })
      //   business-strategy --------- Mofassel
      app.get("/business", async (req, res) => {
         const query = {}
         const cursor = await businessStrategy.find(query).toArray()
         res.send(cursor)
      })
      app.get("/business/:id", async (req, res) => {
         const id = req.params.id;

         const query = { _id: ObjectId(id) }
         const result = await businessStrategy.findOne(query)
         res.send(result)
         console.log(result);
      })


      // -------------------------------------------------------
      //   Goals-blogs --------- Mofassel
      app.get("/goals-blog", async (req, res) => {
         const query = {}
         const cursor = await GoalsBlogsResources.find(query).toArray()
         res.send(cursor)
      })
      app.get("/goals-blog/:id", async (req, res) => {
         const id = req.params.id;

         const query = { _id: ObjectId(id) }
         const result = await  GoalsBlogsResources.findOne(query)
         res.send(result)
         console.log(result);
      })


      // -------------------------------------------------------

      // user delete  ----Mofassel
      app.delete("/allusers/:id", async (req, res) => {
         const id = req.params.id;
         const filter = { _id: ObjectId(id) }
         const result = await usersCollections.deleteOne(filter)
         res.send(result)
      })
      //   --------------------------
      // Create Admin ------Mofassel
      app.put("/user/admin/:id", async (req, res) => {
         const id = req.params.id
         const filter = { _id: ObjectId(id) }
         const options = { upsert: true }
         const updateDoc = {
            $set: {
               role: "admin"
            },
         }
         const result = await usersCollections.updateOne(filter, updateDoc, options)
         res.send(result)
         console.log(result)
      })
      // ---------------------------------
      // Admin roll ----Mofasse
      app.get('/adminRole/:email', async (req, res) => {
         const email = req.params.email
         const query = { email }
         const user = await usersCollections.findOne(query)
         res.send({ isAdminRole: user.role === 'admin' })
      })
      //   --------------------------------
      //Goal modal data post-------robin

      app.get('/users', async (req, res) => {
         const email = req.query.email
         const query = { email: email }
         const user = await usersCollections.findOne(query)
         res.send(user)
      })

      app.put('/users/:id', async (req, res) => {
         const id = req.params.id;
         const unique = { _id: ObjectId(id) };
         const oldUser = req.body;
         console.log(oldUser);
         const option = { upsert: true };
         const updateUserInfo = {
            $set: {
               name: oldUser.name,
               email: oldUser.email,
               profilePhoto: oldUser.img
            }
         }
         const result = await usersCollections.updateOne(unique, updateUserInfo, option);
         res.send(result);
      })




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


      // get project by user
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

      // edited project

      app.post('/project-edited', async (req, res) => {
         const project = req.body;
         const result = await editedProjectCollections.insertOne(project);
         res.send(result);
      });

      // get edited projects by user
      app.get('/project-edited', async (req, res) => {
         // console.log(req.query);
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


      // get blog article
      app.get('/blog-article', async (req, res) => {
         const query = {}
         const article = await blogCollections.find(query).toArray();
         res.send(article);
      });


      // post productivity

      app.post('/productivity', async (req, res) => {
         const productivity = req.body;
         const result = await productivitiesCollections.insertOne(productivity);
         res.send(result);
      });

      // get productivity
      app.get('/productivity', async (req, res) => {
         const query = {}
         const productivities = await productivitiesCollections.find(query).toArray();
         res.send(productivities);
      });

      ////Goal modal data get-------robin


      app.get('/myGoals/:id', async (req, res) => {
         const id = req.params.id;
         const query = { _id: ObjectId(id) };
         const goal = await goalsCollections.findOne(query);
         res.send(goal)
      })

      app.get('/goals', async (req, res) => {
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
      })

      // jahid members collection
       // create team member
       app.post('/create_member', async (req, res) => {
         const teamData = req.body;
         console.log(teamData)
         const result = await teamMembersCollections.insertOne(teamData)
         res.send(result)
      })

      //get team members in team member list
      app.get('/create_member', async (req, res) => {
         const query = {};
         const filter = await teamMembersCollections.find(query).toArray()
         res.send(filter)
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



