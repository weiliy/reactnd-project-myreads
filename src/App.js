import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks.js';
import ListBooks from './ListBooks';
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Route exact path="/search" component={SearchBooks} />
        <Route exact path="/" component={ListBooks} />
      </div>
    )
  }
}

export default BooksApp
