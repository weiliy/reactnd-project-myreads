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
      .then(books => {
        this.setState({books});
        console.log(books);
      });
  }

  updateBook = (book, shelf) => {
    book.shelf = shelf;
    this.setState(state => ({
      books: state.books.map((b) => b.id === book.id ? book : b)
    }));
    BooksAPI.update(book, shelf);
  }

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Route exact path="/search" component={SearchBooks} />
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
