// import { Express } from "express";
import express from "express";
import {
  getUser,
  createUser,
  getUserById,
  deleteUser,
} from "../services/userservice";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await createUser(name, email, password);
    res.status(200).json(user);
  } catch {
    res.status(400).json({ error: "error creating user" });
  }
});

router.get("/", async (req, res) => {
  const users = await getUser();
  res.status(200).json(users);
});

// user find by id
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const user = await getUserById(id);

  if (user) {
    res.json(user);
  } else {
    res.status(400).json({ error: "id cant find" });
  }
});

// delete user api
router.delete("/", async (req, res) => {
  const { id } = req.body;
  try {
    const user = await deleteUser(id);
    res.status(200).json(user);
  } catch(e) {
    res.status(400).json({ error: "cant find id" });
  }
});

export default router;
