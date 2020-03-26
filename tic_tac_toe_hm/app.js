let boardLayout = 3,
  emptyBox = '&nbsp;',
  boxes = [],
  turn = 'X',
  score,
  moves;

function init() {
  let board = document.createElement('table');
  board.setAttribute('border', 1);
  board.setAttribute('cellspacing', 0);

  let identifier = 1;
  for (let i = 0; i < boardLayout; i++) {
    let row = document.createElement('tr');
    board.appendChild(row);
    for (let j = 0; j < boardLayout; j++) {
      let cell = document.createElement('td');
      cell.setAttribute('height', 120);
      cell.setAttribute('width', 120);
      cell.setAttribute('align', 'center');
      cell.setAttribute('valign', 'center');
      cell.classList.add('col' + j, 'row' + i);
      if (i == j) {
        cell.classList.add('diagonal0');
      }
      if (j == boardLayout - i - 1) {
        cell.classList.add('diagonal1');
      }
      cell.identifier = identifier;
      cell.addEventListener('click', set);
      row.appendChild(cell);
      boxes.push(cell);
      identifier += identifier;
    }
  }

  document.getElementById('tictactoe').appendChild(board);
  startNewGame();
}

function startNewGame() {
  score = {
    'X': 0,
    'O': 0
  };
  moves = 0;
  turn = 'X';
  boxes.forEach(function (square) {
    square.innerHTML = emptyBox;
  });
}

function win(clicked) {
  let memberOf = clicked.className.split(/\s+/);
  for (let i = 0; i < memberOf.length; i++) {
    let testClass = '.' + memberOf[i];
    let items = contains('#tictactoe ' + testClass, turn);
    if (items.length == boardLayout) {
      return true;
    }
  }
  return false;
}

function contains(selector, text) {
  let elements = document.querySelectorAll(selector);
  return [].filter.call(elements, function (element) {
    return RegExp(text).test(element.textContent);
  });
}

function set() {
  if (this.innerHTML !== emptyBox) {
    return;
  }
  this.innerHTML = turn;
  moves += 1;
  score[turn] += this.identifier;
  if (win(this)) {
    alert('Player ' + turn + ' You Have Won, Congrats!!!');
    startNewGame();
  } else if (moves === boardLayout * boardLayout) {
    alert('The Game is a Draw');
    startNewGame();
  } else {
    turn = turn === 'X' ? 'O' : 'X';
    document.getElementById('turn').textContent = 'Your Turn to Choose a Box Player ' + turn;
  }
}

init();