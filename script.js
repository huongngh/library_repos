const { createElement } = require("react");

const myLibrary = [];

function Book(id, title, author, read) {
  // the constructor...
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.read = read;
}

function addBookToLibrary() {
  // take params, create a book then store it in the array
  const newBook = new Book(id, title, author, read);
  myLibrary.push(newBook);
  return newBook;
}

function displayBook(){
  const tableBody = document.getElementById('libraryBody');
  let tableContent = '';

  myLibrary.forEach(book => {
    //create row
    const row = document.createElement('tr');
    
    //create cell and append to table
    const idCell = document.createElement('td');
    idCell.textContent = book.id;
    row.appendChild(idCell);

    const titleCell = document.createElement('td');
    titleCell.textContent = book.title;
    row.appendChild(titleCell);

    const authorCell = document.createElement('td');
    authorCell.textContent = book.author;
    row.appendChild(authorCell);

    const readCell = document.createElement('td');
    readCell.textContent = book.read ? 'Yes' : 'No';
    row.appendChild(readCell);
    
    //append row to table body
    tableBody.appendChild(row);
  });
}

document.getElementById('add-book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const id = crypto.randomUUID();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const read = document.getElementById('read').checked;

  if (id && title && author) {
      addBookToLibrary(id, title, author, read);
      displayBooks(); // Refresh the table
      e.target.reset(); // Clear the form
  }
})



