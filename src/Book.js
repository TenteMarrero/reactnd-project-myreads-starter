import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    search: PropTypes.bool.isRequired,
    book: PropTypes.object.isRequired,
    updateBookInShelf: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      shelf: this.props.shelf
    }
  }

  updateBook = (shelf) => {
    this.setState({shelf})
    this.props.updateBookInShelf(this.props.book, shelf)
  }

  render() {
    const {search, book} = this.props
    return (
      <div className="book">
        <div className="book-top">
          {book.imageLinks && 
            (<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>)
          }
          <div className="book-shelf-changer">
            <select value={this.state.shelf} onChange={(event) => this.updateBook(event.target.value)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              {!search && (
                <option value="none">None</option>
              )}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors && book.authors.join(' & ')}</div>
      </div>
    )
  }
}

export default Book