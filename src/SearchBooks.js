import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import _ from 'lodash';
import * as BooksAPI from './BooksAPI';
import BooksGrid from './BooksGrid';

class SearchBooks extends Component {

  state =  {
    query: '',
    books: []
  }

  searchBooks = _.debounce(() => {
    const q = this.state.query.trim();

    if( q ) {
      BooksAPI.search(q)
        .then(books => { 
          if ( !books.error ) {
            this.mergeBooks(books)
          } else {
            this.setState({ books: [] });
          }
        })
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

  mergeBooks = (books) => {
    const { allBooks } = this.props;

    const booksLength = books.length;
    const allBooksLength = allBooks.length;
    for (let i = 0; i < booksLength; i++) {
      for (let j = 0; j < allBooksLength; j++) {
        if( books[i].id === allBooks[j].id ) {
          books[i].shelf = allBooks[j].shelf;
          break;
        }
      }
    };
    this.setState({ books });
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
          <BooksGrid
            books={this.state.books}
            onChangeBookShelf={this.updateBook}
          />
        </div>
      </div>
    );
  }
}

export default SearchBooks;
