import React from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

function Bookshelf(props) {
  const { shelf, books, onChangeBookShelf } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {(books.map(book => (
            <li key={book.id}>
              <Book
                title={book.title}
                authors={book.authors || []}
                cover={book.imageLinks ? book.imageLinks.thumbnail : 'http://via.placeholder.com/128x193?text=No%20Cover'}
                shelf={book.shelf || 'none'}
                onChangeShelf={shelf => onChangeBookShelf(book, shelf)}
              />
            </li>
          )))}
        </ol>
      </div>
    </div>
  );
}

function ListBooks(props) {
  const { books, onChangeBookShelf } = props;

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf
            shelf="Currently Reading"
            books={books.filter(b => b.shelf === 'currentlyReading')}
            onChangeBookShelf={onChangeBookShelf}
          />
          <Bookshelf
            shelf="Want to Read"
            books={books.filter(b => b.shelf === 'wantToRead')}
            onChangeBookShelf={onChangeBookShelf}
          />
          <Bookshelf
            shelf="Read"
            books={books.filter(b => b.shelf === 'read')}
            onChangeBookShelf={onChangeBookShelf}
          />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}

export default ListBooks;
