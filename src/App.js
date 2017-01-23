import React, { Component } from 'react';
import reactLogo from './logo.svg';
import microLogo from './micro.svg'
import LikeButton from './LikeButton'
import './App.css';
import { get } from 'axios'
import store from 'store'

const ENDPOINT = 'http://localhost:3000'
const LOCAL_STORAGE_KEY = 'likeState'
const urlPath = window.location.href || 'https://hannanali.tech'

class App extends Component {
  constructor () {
    super()

    const storeState = store.get(LOCAL_STORAGE_KEY) || {}
    this.state = {
      like: storeState.like || false,
      id: storeState.id || undefined,
      count: undefined
    }

    this.syncWithStore = this.syncWithStore.bind(this)
    this.requestLike = this.requestLike.bind(this)
    this.requestUnlike = this.requestUnlike.bind(this)
    this.onLike = this.onLike.bind(this)
  }

  /**
   * syncWithStore
   * called in order to sync the keys with the store
   */
  syncWithStore () {
    store.set(LOCAL_STORAGE_KEY, {
      id: this.state.id,
      like: this.state.like
    })
  }

  componentDidMount () {
    this.requestCount()
  }

  onLike () {
    const { like } = this.state
    if (like) {
      this.requestUnlike()
    } else {
      this.requestLike()
    }
  }

  /**
   * requestCount
   * requests the count
   */
  async requestCount () {
    const url = `${ENDPOINT}/${urlPath}`
    const { data } = await get(url)
    const { count } = data

    this.setState({
      count
    })
  }

  async requestLike () {
    try {
      const url = `${ENDPOINT}/${urlPath}?increment=true` 
      const { data } = await get(url)
      const { count, key: id, increment } = data

      if (increment) {
        this.setState({
          count,
          id,
          like: true
        })
        this.syncWithStore()
      }
    } catch (error) {
      console.error('Error occured while requesting a like')
      console.error(error)
    }
  }

  async requestUnlike () {
    const { id } = this.state
    const url =  `${ENDPOINT}/${urlPath}?decrement=true&id=${id}`
    const { data } = await get(url)
    const { count, decrement } = data
    if (decrement) {
      this.setState({
        count,
        id: undefined,
        like: false
      })
      this.syncWithStore()
    }
  }

  getDescription () {
    return (
      <div className='App-description'>
        <p>
          Kudos UI Demo demonstrates the use of <a href="https://github.com/abdulhannanali/micro-kudos">Micro Kudos</a> in order
          to build <b>Like/Unlike</b> or <b>Kudo/Dekudo</b> functionality within your
          application. The Micro Kudo allows the use of the id provided when Liking which can be later used to
          decrement the count. We use localStorage module in order to store the like id for the browser, so the
          users, can unlike the like they did before, and don't necessarily perform an extra like.
        </p>
        <h3>Check out <a href="https://github.com/abdulhannanali/micro-kudos">MicroKudos Github Repository</a></h3>
      </div>
    )
  }

  render() {
    const { count, id } = this.state

    let countDisplay
    let idDisplay
    if (count) {
      countDisplay = (
        <div className="count-display">
          <p>{count}</p>
        </div>
      )
    }

    idDisplay = (
      <div className="id-display">
        Like ID: {id || 'None'}
      </div>
    )


    return (
      <div className="App">
        <div className="App-header">
          <img src={reactLogo} alt="React Logo" className="React-logo"/>
          <img src={microLogo} alt="Micro Logo" className="Micro-logo" />
          <h2>Micro Kudos Demo</h2>
        </div>
        <div className='App-body'>
          {this.getDescription()}
          <div className='App-container'>
            {countDisplay}
            {idDisplay}
            <LikeButton like={this.state.like} onClick={this.onLike}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
