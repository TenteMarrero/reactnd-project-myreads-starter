import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBookInShelf: PropTypes.func.isRequired
  }

  render() {
    const { books, updateBookInShelf } = this.props
    const bookShelves = [
      { title: 'Currently Reading', id: 'currentlyReading' },
      { title: 'Want to Read', id: 'wantToRead' },
      { title: 'Read', id: 'read' }
    ]
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookShelves.map((bookShelf) => (
              <div className="bookshelf" key={bookShelf.id}>
                <h2 className="bookshelf-title">{bookShelf.title}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books.map((book) => (
                      (book.shelf === bookShelf.id &&
                      (<li key={book.id}>
                        <Book book={book} shelf={bookShelf.id} updateBookInShelf={updateBookInShelf} search={true}/>
                      </li>))
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks