const drawSnake = (gameBoard, snakeBody, snakeColor) => {
  if (!gameBoard) return;
  // only remove class='snake' child nodes

  for (const node of gameBoard.childNodes) {
    if (node.classList.value === 'snake') {
      gameBoard.removeChild(node);
    }
  }

  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridColumnStart = segment[0];
    snakeElement.style.gridRowStart = segment[1];
    snakeElement.style.backgroundColor = snakeColor;
    snakeElement.classList.add('snake');
    gameBoard.appendChild(snakeElement);
  });
};

const updateSnake = (snakeRef) => {
  moveSnake(snakeRef);
};

const sendSnakeData = () => {};

const getSnakeHead = (snakeData) => {
  let snake = [...snakeData];
  return [...snake[0]];
};

const getSnakeBody = (snakeData) => {
  let snake = [...snakeData];
  snake.shift();
  return snake;
};

const isSnakeDead = (snakeRef) => {};

const moveSnake = (snakeRef) => {
  let oldSnakeBody = [...snakeRef.current.body];
  let newSnakeHead = getSnakeHead(oldSnakeBody);

  if (snakeRef.current.direction === 'left') {
    newSnakeHead[0] -= 1;
  }
  if (snakeRef.current.direction === 'right') {
    newSnakeHead[0] += 1;
  }
  if (snakeRef.current.direction === 'up') {
    newSnakeHead[1] -= 1;
  }
  if (snakeRef.current.direction === 'down') {
    newSnakeHead[1] += 1;
  }

  oldSnakeBody.pop();
  snakeRef.current.body = [newSnakeHead, ...oldSnakeBody];
};

export { drawSnake, updateSnake, sendSnakeData };
