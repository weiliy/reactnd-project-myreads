import React from 'react';

function Bookshelf(props) {
  const { title, books } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {(books.map((book) => (
            <li key={book.title}>
              <Book
                title={book.title}
                authors={book.authors.join(', ')}
                cover={book.cover || `url(${book.imageLinks.thumbnail}`}
              />
            </li>
          )))}
        </ol>
      </div>
    </div>
  );
}

function Book(props) {
  const { title, authors, cover } = props;

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 192,
            backgroundImage: cover,
          }}
        />
        <div className="book-shelf-changer">
          <select>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  );
}

function ListBooks(props) {
  const { books } = props;

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf
            title="Currently Reading"
            books={books.filter(b => b.shelf === 'currentlyReading')}
          />
          <Bookshelf
            title="Want to Read"
            books={books.filter(b => b.shelf === 'wantToRead')}
          />
          <Bookshelf
            title="Read"
            books={books.filter(b => b.shelf === 'read')}
          />
        </div>
      </div>
      <div className="open-search">
        <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
      </div>
    </div>
  )
}

export default ListBooks;