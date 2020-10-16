function ticTacGame(rootClass) {

  let winner;
  let turn = 0;
  let field = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // 1 - x, 2 - o
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const titles = {
    turnX: 'Ход игрока Х',
    turnO: 'Ход игрока O',
    winX: 'Победил X',
    winO: 'Победил О',
    draw: 'Ничья',
  }

  let cells = [];
  let title;
  let button;

  function getCurrentTurnSign() {
    return turn % 2 === 0 ? 'X' : 'O';
  }

  function generateField() {
    let tableElement = document.createElement('table');
    tableElement.classList.add('jsField');
    for (let i = 0; i < 3; i++) {
      const tableRow = document.createElement('tr');
      for (let j = 0; j < 3; j++) {
        let tableCell = document.createElement('td');
        tableCell.classList.add('jsCell', 'cell');
        tableCell.dataset.cellNumber = i * 3 + j;
        tableRow.append(tableCell);
      }
      tableElement.append(tableRow);
    }
    return tableElement;
  }

  function generateScene(rootElement) {
    const scene = document.createElement('div');
    scene.classList.add('jsScene');

    const title = document.createElement('div');
    title.classList.add('jsTitle', 'title');
    title.innerText = titles.turnX;

    const field = generateField();

    const button = document.createElement('button');
    button.classList.add('jsRestartButton');
    button.innerText = 'Начать заново';
    button.style.display = 'none';

    scene.append(title);
    scene.append(field);
    scene.append(button);

    rootElement.append(scene);
  }

  function renderNextStep() {
    renderTitle();
    renderField();
    renderButton();
  }

  function renderTitle() {
    if (winner === 'Draw') {
      title.innerText = titles.draw;
    } else {
      const titleField = winner ? `win${winner}` : `turn${getCurrentTurnSign()}`;
      title.innerText = titles[titleField];
    }
  }

  function renderField() {
    for (let i = 0; i < 9; i++) {
      const cell = cells[i];
      if (field[i]) {
        cell.innerText = field[i];
        cell.classList.add(`player${field[i]}`);
      } else {
        cell.innerText = '';
        if (cell.classList.contains('playerX')) {
          cell.classList.remove('playerX');
        }
        if (cell.classList.contains('playerO')) {
          cell.classList.remove('playerO');
        }
      }
    }
  }

  function renderButton() {
    button.style.display = winner ? 'block' : 'none';
  }

  function checkWinner() {
    for (let c of winCombinations) {
      if (
        field[c[0]] !== 0 &&
        field[c[0]] === field[c[1]] && 
        field[c[1]] === field[c[2]]
      ) {
        winner = field[c[0]];
      }
    }
    if (turn === 9) {
      winner = 'Draw';
    }
  }

  function addHandlers() {
    cells.forEach(cell => {
      cell.addEventListener('click', e => {
        const cellNumber = e.target.dataset.cellNumber;
        if (!winner && field[cellNumber] === 0) {
          field[cellNumber] = getCurrentTurnSign();
          turn++;
          checkWinner();
          renderNextStep();
        }
      })
    });
    button.addEventListener('click', e => {
      turn = 0;
      field = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      winner = undefined;
      checkWinner();
      renderNextStep();
    })
  }

  const rootElement = document.getElementsByClassName(rootClass)[0];
  if (rootElement) {
    generateScene(rootElement);
    cells = document.querySelectorAll('.jsCell');
    title = document.querySelector('.jsTitle');
    button = document.querySelector('.jsRestartButton');
    addHandlers();
  }
}

ticTacGame('jsTicTacGame');