require("dotenv").config();

const express = require('express');

//take mongoose
const mongoose = require("mongoose");

//take body-parser for the postman thing
var bodyParser = require("body-parser");

//database
const database = require("./database");

//models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication")

//initialize express
const booky = express();

//initialize body parser
booky.use(bodyParser.urlencoded({extended:true}));
booky.use(bodyParser.json());

//establish the database connection
mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => console.log("connection established"))
.catch(err => console.error("connection error:", err));


//FIRST BUILD ALL BOOK RELEATED APIS

/*
WHEN YOU ARE LOOKING FOT THE SINGLE VALUE THEN USE : await Model_name.findOne(condition)
WHEN YOU ARE LOOKIG FOR ARRAY OF THINGS THEN USE: await Model_name.find(condition)
*/

//get all books api
booky.get("/", async(req,res)=>{
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
})

//get a specific book
booky.get("/is/:isbn", async(req,res)=>{

    const getSpecificBook = await BookModel.findOne({ISBN:req.params.isbn});
    if(!getSpecificBook){
        return res.json({
            error: `No book with ${req.params.isbn} found`
        })
    }
    return res.json(getSpecificBook);
})

//get list of books based on category
booky.get("/c/:category", async(req,res)=>{
    
    const getSpecificBook = await BookModel.find({category:req.params.category});
    if(!getSpecificBook){
        return res.json({
            error: `no books with ${req.params.category} category`
        })
    }
    return res.json(getSpecificBook);
})

//get list of books based on language
booky.get("/l/:language", async (req, res) => {
    const getSpecificBook = await BookModel.find({language:req.params.language});
    if (!getSpecificBook) {
        return res.json({
            error: `No books found with language ${req.params.language}`
        });
    }
    return res.json(getSpecificBook);
});



//NOW DO IT FOR AUTHORS

//get all the authors
booky.get("/authors",async(req,res)=>{
    getAllAuthors = await AuthorModel.find()
    return res.json(AuthorModel)
})

//get specific author
booky.get("/authors/book/:isbn",async(req,res)=>{
    const getSpecificAuthor = await AuthorModel.findOne({books:req.params.isbn})
   
    if(!getSpecificAuthor){
        return res.json({
            error:`no id matches with ${req.params.isbn}`
        })
    }
    return res.json(getSpecificAuthor)
})

//get author details based on authors name
booky.get("/authors/:name",async(req,res)=>{
    const getSpecificAuthor = await AuthorModel.findOne({name:req.params.name})
    if(!getSpecificAuthor){
        return res.json({
            error:`no author found with name ${req.params.name}`
        })
    }
    return res.json(getSpecificAuthor);
})


//NOW DO IT FOR PUBLICATIONS

//get all the details of the publication
booky.get("/publications",async(req,res)=>{
    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications);
})

//get a specific publication
booky.get("/publications/:name",async(req,res)=>{
    const getSpecificPublication = await PublicationModel.findOne({name:req.params.name});
    if(!getSpecificPublication){
        return res.json({
            error:`no publications found with name ${req.params.name}`
        })
    }
    return res.json(getSpecificPublication);
})

//to get list of publications based on books
booky.get("/publications/is/:isbn",async(req,res)=>{
    const getSpecificPublication = await PublicationModel.findOne({books:req.params.isbn});
    if(!getSpecificPublication){
        return res.json({
            error:`no publication found with isbn ${req.params.isbn}`
        })
    }
    return res.json(getSpecificPublication);
})


//ADD NEW BOOKS
booky.post("/book/new",(req,res)=>{
    const newBook = req.body;
    database.books.push(newBook);
    return res.json({UpdatedBooks:database.books});
})
// now go the postman and make your own workspace

//ADD NEW AUTHORS
booky.post("/author/new",(req,res)=>{
    const newAuthor = req.body;
    database.authors.push(newAuthor);
    return res.json({UpadtedAuthors:database.authors});
})

//ADD NEW PUBLICATION
booky.post("/publication/new",(req,res)=>{
    const newPublication = req.body;
    database.publications.push(newPublication);
    return res.json({UPDATEDPUBLICATION:database.publications})
})


//UPDATE PUBLICATION AND BOOK
booky.put("/publication/update/book/:isbn" , (req,res)=>{
    //update publications db
    database.publications.forEach((publication)=>{
        if(publication.id === req.body.pubId){
            return publication.books.push(req.params.isbn)
        }
    })

    //update books db
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
            //here we are reassigning things thinking that one book have only one publication
            book.publications = req.body.pubId;
            return;
        }
    })

    return res.json({
        books:database.books,
        publications:database.publications,
        message:"Successfully Updated"
    })
})


//DELETE A BOOK
booky.delete("/book/delete/:isbn",(req,res)=>{
    const UpdatedBookDatabase = database.books.filter((book)=>book.ISBN !== req.params.isbn)
    database.books = UpdatedBookDatabase;
    return res.json({books: database.books})
})


//DELETE A AUTHOR FROM A BOOK AND BOOK FROM THE AUTHOR
booky.delete("/book/delete/author/:isbn/:authorId", (req,res)=>{
    //update the book database
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn) {
            const newAuthorList = book.author.filter((eachAuthor)=>eachAuthor !== parseInt(req.params.authorId));
            book.author = newAuthorList;
            return;
        }
    })

    //update the author database
    database.authors.forEach((author)=>{
        if(author.id === parseInt(req.params.authorId)){
            const newBooksList = author.books.filter((eachBook)=> eachBook !== req.params.isbn)
            author.books = newBooksList;
            return;
        }
    })

    return res.json({
        books: database.books,
        authors: database.authors,
        message: "Successfully Completed"
    })
})



//the port where we are deploying things
booky.listen(3000, ()=> console.log("listning"));