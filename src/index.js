import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component {
  // This is a constructor that runs on startup and set initial state
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  // This is basically the return statement for what gets rendered on the page
  // heres how you have a button update the state
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      turn: 'X'
    };
  }

  // and here is where the logic starts to take shape for updating squares
  handleClick(i) {
    // slice duplicates the array rather than using existing array to keeps things immutable
    const squares = this.state.squares.slice();
    // Here is a nice way to "log" prns during dev... alert(this.state.turn)
    squares[i] = this.state.turn;
    this.setState({squares: squares});
    // change the players turn
    if (this.state.turn = 'X') {
      this.setState({turn: 'O'})
    } else {
      this.setState({turn: 'X'})}
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
      // here we are passing a function as an arg to the square function
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}
// Example usage: <ShoppingList name="Mark" />

// ========================================
// This is like the main method in clojure and connects to <div id="root"></div> in index.html
ReactDOM.render(
  <Game />, document.getElementById('root'),
);
