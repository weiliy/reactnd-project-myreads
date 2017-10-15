import React from 'react';
import Book from './Book';

function BookGrid(props) {
  const { books, onChangeBookShelf } = props;

  return (
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
  );
}

export default BookGrid;
