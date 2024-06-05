const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}

// Object Destruction
const book = getBook(1);
const { title, author, pages, publicationDate, genres, hasMovieAdaptation } =
  book;
console.log(title, author, genres);

// Array Destruction
// const primaryGenres = genres[0];
// const secondaryGenres = genres[1];

const [primaryGenres, secondaryGenres, ...otherGenres] = genres; // rest operator
console.log(primaryGenres, secondaryGenres, otherGenres);

// Spread operator
const newGenres = [...genres, "epic fantacy"]; // spread operator in array
console.log(newGenres);

const updatedBook = {
  // spread operator in object
  ...book,
  moviePublicationDate: 2021 - 12 - 1,
  pages: 2010, // can overwrite the existing property
};
console.log(updatedBook);

// Template Literal
const summary = `${title}, is a ${pages} pages book and published in ${
  publicationDate.split("-")[0]
}`;
console.log(summary);

// Logical Operator
console.log(true && "Some String"); // will return second value if first value is true
console.log(false && "Some String"); // will return first value if first value is false
// false value can be 0, '', null, undefined
console.log(0 && "Some String");

// Working with undefined
// To avoid undefined.anything, using ? to return undefined beforehead
// book.reviews?.librarything?.reviewsCount returns book.reviews.librarything.reviewsCount
// when book.reviews and book.reviews.librarything is not undefined, and return undefined otherwise
const count = book.reviews?.librarything?.reviewsCount ?? "no data"; // return second value only if first value is null or undefined, otherwise return first value
console.log(count);

// Map, filter, reduce, sort
const x = [1, 2, 3, 4, 5].map((element) => element + 1);
console.log(x);
const books = getBooks().map((ele) => ele.title);
console.log(books);

const y = [1, 2, 3, 4, 5].filter((element) => element > 2);
console.log(y);
const longBooks = getBooks()
  .filter((ele) => ele.pages > 500)
  .map((ele) => ele.title);
console.log(longBooks);

const z = [1, 2, 3, 4, 5].reduce((acc, element) => acc + element, 0);
console.log(z);

const xx = [6, 5, 3, 1, 2];
const sorted = [...xx].sort((a, b) => a - b); // change the original array, so copy the array first
console.log(sorted);
const sortedBooks = [...getBooks()]
  .sort((a, b) => a.pages - b.pages)
  .map((element) => {
    return { title: element.title, pages: element.pages };
  });
console.log(sortedBooks);

// Arrays
const newBook = {
  id: 6,
  title: "Harry Potter and chamber of secrets",
  author: "J.K.Rowling",
};
const booksAfterAdding = [...getBooks(), newBook];

const booksAfterDelete = getBooks().filter((book) => book.id !== 3);
console.log(booksAfterDelete);

const booksAfterUpdate = getBooks().map((book) =>
  book.id === 1 ? { ...book, pages: 1 } : book
);
console.log(booksAfterUpdate);
