const books = [
    {
        ISBN:"123456BOOK",
        title:"Getting Started with MERN",
        pubDate:"2021-11-25",
        language:"en",
        numPage:250,
        author:[1,2],
        publications: [1],
        category: ["tech","programming"]
    }
];

const authors = [
    {
        id: 1,
        name : "Rishikesh",
        books : ["123456BOOK","Mybook"]
    },
    {
        id: 2,
        name : "Shyam",
        books : ["123456BOOK"]
    }
];

const publications = [
    {
        id: 1,
        name : "Mundada",
        books : ["123456BOOK"]
    },
    {
        id: 2,
        name : "Mehta",
        books : []
    }
];

module.exports = {books,authors,publications};