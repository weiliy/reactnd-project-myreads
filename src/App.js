import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks.js';
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => this.setState({books}));
  }

  updateBook = (book, shelf) => {
    book.shelf = shelf;
    BooksAPI.update(book, shelf)
      .then(() => this.setState(state => ({
          books: state.books.filter((b) => b.id !== book.id).concat(book),
      })));
  }

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Route exact path="/search" render={() =>
          <SearchBooks
            onChangeBookShelf={this.updateBook}
          />
        } />
        <Route exact path="/" render={() => (
          <ListBooks
            books={books}
            onChangeBookShelf={this.updateBook}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
