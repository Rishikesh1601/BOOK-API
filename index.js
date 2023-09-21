const express = require('express');
//database
const database = require("./database");
//initialize express
const booky = express();


//FIRST BUILD ALL BOOK RELEATED APIS

//get all books api
booky.get("/", (req,res)=>{
    return res.json(database.books);
})

//get a specific book
booky.get("/is/:isbn",(req,res)=>{
    const getSpecificBook = database.books.filter((book) => book.ISBN === req.params.isbn);
    if(getSpecificBook.length === 0){
        return res.json({
            error: `No book with ${req.params.isbn} found`
        })
    }
    return res.json(getSpecificBook);
})

//get list of books based on category
booky.get("/c/:category",(req,res)=>{
    // now to get a thing from array we basically use for loop but here we can use INCLUDE
    const getSpecificBook = database.books.filter((book) => book.category.includes(req.params.category));
    if(getSpecificBook.length === 0){
        return res.json({
            error: `no books with ${req.params.category} category`
        })
    }
    return res.json({book:getSpecificBook});
})

//get list of books based on language
booky.get("/l/:language",(req,res)=>{
    const getSpecificBook = database.books.filter((book)=>book.language.includes(req.params.language));
    if(getSpecificBook.length === 0){
        return res.json({
            error:`No books found with language ${req.params.language}`
        })
    }
    return res.json(getSpecificBook);
})


//NOW DO IT FOR AUTHORS

//get all the authors
booky.get("/authors",(req,res)=>{
    return res.json(database.authors)
})

//get specific author
booky.get("/authors/book/:isbn",(req,res)=>{
    const getSpecificAuthor = database.authors.filter((author) => author.books.includes(req.params.isbn));
    if(getSpecificAuthor.length === 0){
        return res.json({
            error:`no id matches with ${req.params.isbn}`
        })
    }
    return res.json({author:getSpecificAuthor})
})

//get author details based on authors name
booky.get("/authors/:name",(req,res)=>{
    const getSpecificAuthor = database.authors.filter((author)=>author.name === req.params.name);
    if(getSpecificAuthor.length === 0){
        return res.json({
            error:`no author found with name ${req.params.name}`
        })
    }
    return res.json({names:getSpecificAuthor});
})


//NOW DO IT FOR PUBLICATIONS

//get all the details of the publication
booky.get("/publications",(req,res)=>{
    return res.json(database.publications);
})

//get a specific publication
booky.get("/publications/:name",(req,res)=>{
    const getSpecificPublication = database.publications.filter((publication)=>publication.name === req.params.name);
    if(getSpecificPublication.length === 0){
        return res.json({
            error:`no publications found with name ${req.params.name}`
        })
    }
    return res.json({publication:getSpecificPublication});
})

//to get list of publications based on books
booky.get("/publications/is/:isbn",(req,res)=>{
    const getSpecificPublication = database.publications.filter((publication)=>publication.books.includes(req.params.isbn));
    if(getSpecificPublication.length === 0){
        return res.json({
            error:`no publication found with isbn ${req.params.isbn}`
        })
    }
    return res.json({publication:getSpecificPublication});
})


//the port where we are deploying things
booky.listen(3000, ()=> console.log("listning"));