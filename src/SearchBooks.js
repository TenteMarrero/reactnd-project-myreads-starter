import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Debounce} from 'react-throttle'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {
  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    query = query.trim()
    this.setState({ query })
    if (query) {
      BooksAPI.search(query, 50).then(books => {
        if (Array.isArray(books)) {
          let mergedBooks = this._mergeSearchWithExistingBooks(books)
          this.setState({books: mergedBooks})
        } else {
          this.setState({books: []})
        }
      })
    }
  }

  _mergeSearchWithExistingBooks = (books) => {
    const { existingBooks } = this.props
    return books.map((book) => {
      let bookFound = existingBooks.find((b) => b.id === book.id)
      if (bookFound) {
        return bookFound
      } else {
        book.shelf = 'none'
        return book
      }
    })
  }

  render() {
    const { updateBookInShelf } = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="400" handler="onChange">
              <input
                autoFocus
                type="text"
                placeholder="Search by title or author"
                onChange={(event) => this.updateQuery(event.target.value)} />
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map((book) => (
              <li key={book.id}>
                <Book book={book} shelf={book.shelf} updateBookInShelf={updateBookInShelf} search={true}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
