import date from './modules/date.js';
import Book from './modules/Book.js';
// ui class:handle the ui interface
class UI {
  static displayBooks() {
    const books = UI.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#tablebody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.author}</td>
        <td>${book.title}</td>
        <td><input type="button" value="remove" class="delete" ></td>
  
        `;
    list.appendChild(row);
  }

  static clearfields() {
    document.querySelector('#authorname').value = '';
    document.querySelector('#titlename').value = '';
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  // local storage
  static getBooks() {
    let books;
    if (localStorage.getItem('books') == null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = UI.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(book) {
    const books = UI.getBooks();
    books.splice(books.indexOf(book), 1);
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// add book event
document.querySelector('#form-Book').addEventListener('submit',
  (e) => {
    // prevent actual submit
    e.preventDefault();
    // get form values
    const author = document.getElementById('authorname').value;
    const title = document.getElementById('titlename').value;
    // instatiate book
    const book = new Book(author, title);
    // adding book to ui
    UI.addBookToList(book);
    // adding book to store
    UI.addBook(book);

    UI.clearfields();
  });

// remove event
document.querySelector('#tablebody').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  UI.removeBook(e.target);
});
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// adding navigation buttons
const list = document.querySelector('#list-btn');
const addNew = document.querySelector('#add-btn');
const contacts = document.querySelector('#contact-btn');
const addBook = document.querySelector('#new-book');
const contactForm = document.querySelector('#contact');
const bookSections = document.querySelector('#all-books');

// adding events

list.addEventListener('click', () => {
  addBook.classList.add('inactive');
  contactForm.classList.add('inactive');
  bookSections.classList.remove('inactive');
});

addNew.addEventListener('click', () => {
  addBook.classList.remove('inactive');
  bookSections.classList.add('inactive');
  contactForm.classList.add('inactive');
});

contacts.addEventListener('click', () => {
  contactForm.classList.remove('inactive');
  bookSections.classList.add('inactive');
  addBook.classList.add('inactive');
});

// handle dates actions

const handleTime = () => {
  const myDate = document.querySelector('#myclock');
  myDate.innerHTML = date;
};

handleTime();