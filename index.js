const express = require("express");
const { engine } = require("express-handlebars");
const {
    getTodos,
    getTodoById,
    deleteTodo,
    createTodo,
} = require("./get-todos");
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("public"));
app.engine(".handlebars", engine());
app.set("view engine", ".handlebars");
app.set("views", "./views");

app.get("/", async (req, res) => {
    const todos = await getTodos();
    res.render("index", { todos });
});

app.get("/todo-create", async (req, res) => {
    res.render("create");
});

app.post("/todos", async (req, res) => {
    const { name, description } = req.body;
    const response = await createTodo({ name, description });
    return res.json({ data: response, ok: true });
});

app.get("/todos/:id", async (req, res) => {
    const { id } = req.params;
    const response = await getTodoById(id);
    const todo = await response[0];
    res.render("delete", { todo });
});

app.delete("/todos/:id", async (req, res) => {
    const { id } = req.params;
    const response = await deleteTodo(id);
    return res.json({ data: response, ok: true });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
