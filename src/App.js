import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'

class BooksApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      if (shelf && shelf !== 'none') {
        this._changeBookShelf(book, shelf)
      } else {
        this._unlistBook(book)
      }
    })
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

  addBook = (book, shelf) => {
    if (shelf !== 'none') {
      book.shelf = shelf
      BooksAPI.update(book, shelf).then(() => {
        this.setState((state) => ({
          books: state.books.concat([book])
        }))
      })
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
            updateBookInShelf={this.addBook}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
