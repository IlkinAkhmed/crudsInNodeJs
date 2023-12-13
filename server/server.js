import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

dotenv.config();

const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    description: { type: String, required: true },
    name: { type: String, required: true }
  },
  { timestamps: true }
);

const Categories = mongoose.model("category", categorySchema);

// get all users
app.get("/categories", async (req, res) => {
  try {
    const data = await Categories.find({});
    res.send(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// get user by id
app.get("/categories/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Categories.findById(id);
    res.send(category);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// delete user
app.delete("/categories/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Categories.findByIdAndDelete(id);
    res.status(200).json({ message: "category deleted" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// post user
app.post("/categories", async (req, res) => {
  try {
    await Categories.create(req.body);
    res.status(200).json({ message: "category created" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// update user

app.put("/categories/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Categories.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: "category updated" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

const url = process.env.CONNECTION_URL.replace(
  "<password>",
  process.env.PASSWORD
);
mongoose.connect(url).catch((err) => console.log("Db not connect" + err));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server 5000 portunda isleyir");
});

// https://github.com/hnuruzada/StaticUserNodeWithoutMongo/
