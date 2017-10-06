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
    console.log(book.title);
    book.shelf = shelf;
    this.setState(state => {
      const books = state.books.filter((b) => b.id !== book.id);
      books.push(book);
      return { books };
    });
    BooksAPI.update(book, shelf);
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
