import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
                book={book}
                onChangeShelf={onChangeBookShelf}
              />
            </li>
          )))}
        </ol>
      </div>
    </div>
  );
}

class Book extends Component {

  changeShelf = (e) => {
    const { onChangeShelf, book } = this.props;
    console.log(`change to ${e.target.value}`);
    onChangeShelf(book, e.target.value);
  }
  render() {
    const { book: {title, authors, imageLinks: { thumbnail: cover }, shelf } } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 192,
              backgroundImage: `url(${cover}`,
            }}
          />
          <div className="book-shelf-changer">
            <select value={shelf} onChange={this.changeShelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.join(', ')}</div>
      </div>
    );
  }
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