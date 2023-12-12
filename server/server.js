import express from "express";
const app = express();
import cors from "cors"

app.use(cors())

app.use(express.json());

const PORT = 5000;
let count = 6;
let users = [
  {
    id: 1,
    name: "Ilkin",
    surname: "Akhmedov",
  },
  {
    id: 2,
    name: "Mammadtaghi",
    surname: "Aliyev",
  },
  {
    id: 3,
    name: "Ali",
    surname: "Ismayilzade",
  },
  {
    id: 4,
    name: "Ehmed",
    surname: "Baghirov",
  },
  {
    id: 5,
    name: "Alpay",
    surname: "Abdullayev",
  },
];

app.get("/", (req, res) => {
  res.send(
    "<h1>Home Page</h1> <p>IlkinAkhmed <a href='#'>click here</a> </p> "
  );
  console.log("isledi");
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const item = users.find((x) => x.id == id);
  res.send(item);
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const item = users.find((x) => x.id == id);
  if (item) {
    const filteredUser = users.filter((x) => x.id != id);
    res.send(filteredUser);
  }
  res.send(item);
});

app.post("/users", (req, res) => {
  const newUser = {
    id: count++,
    name: req.body.name,
    surname: req.body.surname,
  };
  users.push(newUser);
  res.send(users);
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const item = users.find((x) => x.id == id);
  users = users.filter((x) => x.id != id);
  if (item) {
    const updatedUser = {
      id: +id,
      name: req.body.name,
      surname: req.body.surname,
    };
    users.push(updatedUser);
  }
  users.sort((a, b) => a.id - b.id);
  res.send(users);
});

// app.put('/users/:id',(req,res)=>{
//     const {id} = req.params
//     const index = users.findIndex(x=>x.id==id)
//     users[index]={
//         id:id,
//         ...req.body
//     }
//     res.send(users)
// })

app.listen(PORT, () => {
  console.log("server 5000 portunda isleyir");
});
