import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import _ from 'lodash';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class SearchBooks extends Component {

  state =  {
    query: '',
    books: []
  }

  searchBooks = _.debounce(() => {
    const q = this.state.query.trim();

    if( q ) {
      BooksAPI.search(q)
        .then(books => this.setState({ books }))
        .catch(() => {
          this.setState({ books: [] });
        });
    } else {
      this.setState({ books: [] });
    }
  }, 400);

  updateQuery = query => this.setState({ query }, this.searchBooks)

  updateBook = (book, shelf) => {
    book.shelf = shelf;
    this.setState(state => ({
      books: state.books.map((b) => b.id === book.id ? book : b)
    }));
    this.props.onChangeBookShelf(book, shelf);
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to="/"
          >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(e) => this.updateQuery(e.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {(this.state.books.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  onChangeShelf={shelf => this.updateBook(book, shelf)}
                />
              </li>
            )))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
