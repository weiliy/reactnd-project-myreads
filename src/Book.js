import React, { Component } from 'react';

class Book extends Component {

  changeShelf = (e) => {
    this.props.onChangeShelf(e.target.value);
  }

  render() {
    const { book: {title, authors, imageLinks: { thumbnail: cover }, shelf = 'none' } } = this.props;

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

export default Book;