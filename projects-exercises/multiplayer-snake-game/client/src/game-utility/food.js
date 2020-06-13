import { randomGridPosition } from './game-board';

const drawFood = (gameBoard, food) => {
  if (!gameBoard) return;
  const foodElement = document.createElement('div');
  foodElement.style.gridColumnStart = food[0];
  foodElement.style.gridRowStart = food[1];
  foodElement.classList.add('food');
  gameBoard.appendChild(foodElement);
};

const getRandomFoodPosition = (boardSize) => {
  let newFoodPosition;
  newFoodPosition = randomGridPosition(boardSize);
  console.log(newFoodPosition);
  return newFoodPosition;
};

export { drawFood, getRandomFoodPosition };
