const myLibrary = [];

// Book constructor
function Book(title, author, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

// Add book to library array
function addBookToLibrary(title, author, read) {
  const newBook = new Book(title, author, read);
  myLibrary.push(newBook);
  console.log('Book added to library:', newBook);
  return newBook;
}

// Append book to table in the DOM
function appendBookToTable(book) {
  const tableBody = document.getElementById('libraryBody');
  if (!tableBody) {
    console.error('Table body with ID "libraryBody" not found');
    return;
  }

  const row = document.createElement('tr');

  // Hidden ID cell
  const idCell = document.createElement('td');
  idCell.textContent = book.id;
  idCell.className = 'hidden-id';
  row.appendChild(idCell);

  // Title cell
  const titleCell = document.createElement('td');
  titleCell.textContent = book.title;
  row.appendChild(titleCell);

  // Author cell
  const authorCell = document.createElement('td');
  authorCell.textContent = book.author;
  row.appendChild(authorCell);

  // Read status cell
  const readCell = document.createElement('td');
  readCell.textContent = book.read ? 'Yes' : 'No';
  row.appendChild(readCell);

  // Action buttons cell
  const actionCell = document.createElement('td');

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.className = 'action-btn remove-btn';
  removeBtn.dataset.id = book.id;
  removeBtn.addEventListener('click', removeBook);
  actionCell.appendChild(removeBtn);

  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = 'Toggle Read';
  toggleBtn.className = 'action-btn toggle-btn';
  toggleBtn.dataset.id = book.id;
  toggleBtn.addEventListener('click', toggleReadStatus);
  actionCell.appendChild(toggleBtn);

  row.appendChild(actionCell);
  tableBody.appendChild(row);

  console.log('Book appended to table:', book);
}

// Display all books in table
function displayBooks() {
  const tableBody = document.getElementById('libraryBody');
  if (!tableBody) {
    console.error('Table body with ID "libraryBody" not found');
    return;
  }
  tableBody.innerHTML = '';
  myLibrary.forEach(book => appendBookToTable(book));
}

// Remove book from table and library
function removeBook(e) {
  const id = e.target.dataset.id;
  const index = myLibrary.findIndex(book => book.id === id);
  if (index > -1) {
    myLibrary.splice(index, 1);
    e.target.closest('tr').remove();
    console.log('Book removed:', id);
  }
}

// Toggle read status and update UI
function toggleReadStatus(e) {
  const id = e.target.dataset.id;
  const book = myLibrary.find(book => book.id === id);
  if (book) {
    book.toggleRead();
    const readCell = e.target.closest('tr').querySelector('td:nth-child(4)');
    if (readCell) {
      readCell.textContent = book.read ? 'Yes' : 'No';
    }
    console.log('Toggled read status:', book);
  }
}

// Handle "New Book" button
document.getElementById('newBookBtn').addEventListener('click', () => {
  document.getElementById('addBookDialog').showModal();
});

// Handle form submission
document.getElementById('addBookForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const read = document.getElementById('read').checked;

  if (title && author) {
    const newBook = addBookToLibrary(title, author, read);
    appendBookToTable(newBook);
    document.getElementById('addBookDialog').close();
    e.target.reset();
  } else {
    alert('Please fill in both title and author.');
  }
});

// Handle cancel button
document.getElementById('cancelBtn').addEventListener('click', () => {
  document.getElementById('addBookDialog').close();
  document.getElementById('addBookForm').reset();
});

// Initial table render
window.onload = displayBooks;
