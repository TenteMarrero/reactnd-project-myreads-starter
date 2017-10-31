import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              autoFocus
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event.target.value)} />
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
