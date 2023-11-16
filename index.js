const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));

let posts = [{
        id: uuidv4(),
        username: "amrithSingh",
        content: "As a solo traveller I always prefer upper berth, specially while travelling in non-ac slepper class and 3AC class. 1.Always opt upper berth as your preference while booking your ticket. 9 out of 10 times , you will get an upper berth for your journey. "
    },
    {
        id: uuidv4(),
        username: "pallavigaikwad",
        content: "Capt Ashutosh, selected for both IIT & NDA. He chose NDA to serve the Indian army & made supreme sacrifice in Machhil sector, Kupwara along LoC. These young Men are made of different steel."
    },
    {
        id: uuidv4(),
        username: "ShradhaSharma",
        content: "A giant ship's engine broke down and no one could repair it, so they hired a Mechanical Engineer with over 30 years of experience. He inspected the engine very carefully, from top to bottom. After seeing everything, the engineer unloaded his bag and pulled out a small hammer. He knocked something gently. Soon, the engine came to life again. The engine has been fixed! A week later the engineer mentioned to the ship owner that the total cost of repairing the giant ship was $20,000."
    },
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(post);
    res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => p.id === id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log("Listening to a port:", port);
});