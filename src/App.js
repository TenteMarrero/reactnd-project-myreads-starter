import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBookShelf = (book, shelf) => {
    if (shelf && shelf !== 'none') {
      this._changeBookShelf(book, shelf)
    } else {
      this._unlistBook(book)
    }
    BooksAPI.update(book, shelf)
  }

  _changeBookShelf = (book, shelf) => {
    this.setState((state) => ({
      books: state.books.map((b) => {
        if (b.id === book.id) {
          b.shelf = shelf
        }
        return b;
      })
    }))
  }

  _unlistBook = (book) => {
    this.setState((state) => ({
      books: state.books.filter((b) => b.id !== book.id)
    }))
  }

  createBook = (book, shelf) => {
    if (shelf !== 'none') {
      book.shelf = shelf
      this.setState((state) => ({
        books: state.books.concat([book])
      }))
      BooksAPI.update(book, shelf)
    }
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListBooks books={this.state.books} updateBookInShelf={this.updateBookShelf} />
        )} />
        <Route path='/search' render={({ history }) => (
          <SearchBooks
            existingBooks={this.state.books}
            updateBookInShelf={this.createBook}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
