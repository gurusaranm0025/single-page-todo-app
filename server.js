import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  console.log("getting todos");
  const todos = await prisma.todo.findMany();
  console.log(todos);
  res.render("index.ejs", { todos: todos });
});

app.post("/", async (req, res) => {
  console.log("POST received.");
  const todo = await prisma.todo.create({ data: { todo: req.body.todo } });
  console.log(todo);
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  console.warn(`delete request received ${req.body}`);
  const todoDelete = await prisma.todo.delete({
    where: { id: Number(req.body.id) },
  });
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("app is listening on port 3000.");
});
