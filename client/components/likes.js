import React from 'react'

export default class Likes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false
    }
    this.clickedLikes = this.clickedLikes.bind(this)
  }

  clickedLikes(event) {
    let buttons = document.getElementsByClassName('like__btn')
    buttons = Array.from(buttons)
    buttons.map((button, indx) => {
      let likeIcon = event.target.querySelector('#icon'),
        count = event.target.querySelector('#count')
      if (!this.state.clicked) {
        likeIcon.innerHTML = `<i class="fas fa-thumbs-up"></i>`
        count.textContent++
        this.setState({
          clicked: true
        })
      } else {
        likeIcon.innerHTML = '<i class="far fa-thumbs-up"></i>'
        count.textContent--
        this.setState({
          clicked: false
        })
      }
    })
  }
  render() {
    return (
      <div id="body">
        <button type="button" className="like__btn" onClick={this.clickedLikes}>
          <span id="icon">
            <i className="far fa-thumbs-up" />
          </span>
          <span id="count">0</span> Like
        </button>
      </div>
    )
  }
}
