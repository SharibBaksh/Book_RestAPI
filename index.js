const express = require("express");
const app = express();

const port = 3000;

app.use(express.json());  //Middleware to parse JSON

let books = [
    {
        id: 1,
        title: "It Starts with Us",
        author: "Colleen Hoover"
    },
    {
        id: 2,
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki"
    }
];

// GET all books
app.get("/books", (req, res) => {
    res.json(books);
});

//POST a new book
app.post("/books", (req, res) => {
    let newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

//PUT (update book by id)
app.put("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) return res.status(404).json({ message: "Book not found" });

    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    res.json(book);
});

//DELETE a book by id
app.delete("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    books = books.filter(b => b.id !== id);
    res.json({ message: "Book deleted successfully" });
});

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});