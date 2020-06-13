import { useCallback, useEffect, useRef } from 'react';

const useGameLoop = ({ snakeSpeed, updateSnakePosition, updateGameBoard }) => {
  const rafRef = useRef();
  let lastSnakeMovementTime = 0;
  const animate = useCallback(() => {
    rafRef.current = requestAnimationFrame(function animate(currentTime) {
      //   console.log('snake speed: ', snakeSpeed.current);
      const secondsSinceLastSnakeMove = currentTime - lastSnakeMovementTime;
      if (secondsSinceLastSnakeMove > snakeSpeed.current) {
        lastSnakeMovementTime = currentTime;
        // move local player snake inside this loop
        // this block will run according to local player snake speed
        updateSnakePosition();
      }

      {
        // update snake positions of other player snakes
        // this block will run every 16.67ms
        updateGameBoard();
      }

      rafRef.current = requestAnimationFrame(animate);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => animate(), 3000);
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);
};

export { useGameLoop };
