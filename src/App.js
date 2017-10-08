import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SearchBooks from './SearchBooks.js';
import ListBooks from './ListBooks';
import NoMatch from './NoMatch';
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
        <Switch>
          <Route exact path="/" render={() => (
            <ListBooks
              books={books}
              onChangeBookShelf={this.updateBook}
            />
          )} />
          <Route path="/search" render={() => (
            <SearchBooks
              onChangeBookShelf={this.updateBook}
            />
          )} />
          <Route component={NoMatch}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp
