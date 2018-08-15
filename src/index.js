import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
  // This is basically the return statement for what gets rendered on the page
  // heres how you have a button update the state
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    // here is where we define the initial state
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  // and here is where the logic starts to take shape for updating squares
  handleClick(i) {
    // slice duplicates the array rather than using existing array to keeps things immutable
    const squares = this.state.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // Here is a nice way to "log" prns during dev... alert(this.state.turn)
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({squares: squares,
                   xIsNext: !this.state.xIsNext,});
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
    const winner = calculateWinner(this.state.squares);
    let status; // declaring a variable to be used later

    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

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


// Working on API call here


class Stocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:8085/data/dow")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
        <h1> Dow List </h1>
        <ul>
          {items.map(item => (
            <li key={item.ticker}>
              {item.ticker} {item.total_score}
            </li>
          ))}
        </ul>
        </div>
      );
    }
  }
}








// ========================================
// This is like the main method in clojure and connects to <div id="root"></div> in index.html
ReactDOM.render(
  //<Game />, document.getElementById('root'),
  <Stocks />, document.getElementById('root'),
);


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
