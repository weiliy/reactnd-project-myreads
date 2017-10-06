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

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Route exact path="/search" component={SearchBooks} />
        <Route exact path="/" render={() => (
          <ListBooks books={books} />
        )} />
      </div>
    )
  }
}

export default BooksApp
