var express = require("express");
var cors = require('cors')
var app = express();

var corsOptions = {
  origin: 'http://localhost:3333',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/todos", (req, res, _next) => {
  const allTodos = [{ id: 1, description: "Learn Stencil" }, { id: 2, description: "Learn Redux" }, { id: 3, description: "???" }, { id: 4, description: "Profit" }]
  const todos = req.query?.energyLevel == 'tired' ? [allTodos[0]] : allTodos;
  res.json(todos);
});

app.get("/user-details", (_req, res) => {
  res.json({ name: "John Doe" });
})
