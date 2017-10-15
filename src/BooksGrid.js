import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BooksGrid extends Component {
  render() {
    const { books, onChangeBookShelf } = this.props;

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
}

BooksGrid.propTypes = {
  books:PropTypes.array.isRequired,
  onChangeBookShelf: PropTypes.func.isRequired,
};

export default BooksGrid;
