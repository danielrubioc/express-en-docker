require("dotenv").config();
const { Client } = require("pg");

module.exports.getTodos = async () => {
    const client = new Client();
    await client.connect();
    const res = await client.query("SELECT * from todos");
    await client.end();
    return res.rows;
};

module.exports.getTodoById = async (id) => {
    const client = new Client();
    await client.connect();
    const query = {
        text: "SELECT * from todos where id = $1;",
        values: [id],
    };
    const res = await client.query(query);
    await client.end();
    return res.rows;
};

module.exports.deleteTodo = async (id) => {
    const client = new Client();
    await client.connect();
    const query = {
        text: "DELETE FROM todos WHERE id=$1 RETURNING*",
        values: [id],
    };
    const res = await client.query(query);
    await client.end();
    return res.rows;
};

module.exports.createTodo = async (data) => {
    const client = new Client();
    await client.connect();
    const { name, description } = data;
    const query = {
        text: "INSERT INTO todos (title, description)  values ($1, $2) RETURNING*",
        values: [name, description],
    };

    const res = await client.query(query);
    await client.end();
    return res.rows;
};
