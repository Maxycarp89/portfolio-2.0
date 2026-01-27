"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, RotateCcw, Gamepad2, Joystick } from "lucide-react";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };

const GRID_SIZE = 15;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

// Exportamos el boton para usar en otras partes
export function ArcadeButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#A855F7] text-white px-6 py-3 border-2 border-foreground shadow-brutal font-bold flex items-center gap-2 hover-brutal"
    >
      <Gamepad2 className="w-5 h-5" />
      PLAY SNAKE
    </button>
  );
}

export function ArcadeGame() {
  const [isOpen, setIsOpen] = useState(false);

  // Expose open function globally
  useEffect(() => {
    (window as unknown as { openArcadeGame: () => void }).openArcadeGame = () => setIsOpen(true);
    return () => {
      delete (window as unknown as { openArcadeGame?: () => void }).openArcadeGame;
    };
  }, []);

  return (
    <>

      {/* Game Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-card border-4 border-foreground shadow-brutal-lg max-w-md w-full"
            >
              {/* Header */}
              <div className="bg-foreground text-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5" />
                  <span className="font-bold tracking-wider">SNAKE.EXE</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-card/20 p-1 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Game */}
              <SnakeGame />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>([{ x: 7, y: 7 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const directionRef = useRef<Direction>("RIGHT");

  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 7, y: 7 }];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection("RIGHT");
    directionRef.current = "RIGHT";
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
  }, [generateFood]);

  // Game loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const currentDirection = directionRef.current;
        let newHead: Position;

        switch (currentDirection) {
          case "UP":
            newHead = { x: head.x, y: head.y - 1 };
            break;
          case "DOWN":
            newHead = { x: head.x, y: head.y + 1 };
            break;
          case "LEFT":
            newHead = { x: head.x - 1, y: head.y };
            break;
          case "RIGHT":
            newHead = { x: head.x + 1, y: head.y };
            break;
        }

        // Check collision with walls
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          setGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }

        // Check collision with self
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check if food eaten
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((prev) => {
            const newScore = prev + 10;
            setHighScore((high) => Math.max(high, newScore));
            return newScore;
          });
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, INITIAL_SPEED - Math.min(score, 100));
    return () => clearInterval(interval);
  }, [isPlaying, gameOver, food, score, generateFood]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;

      const key = e.key;
      const current = directionRef.current;

      if ((key === "ArrowUp" || key === "w") && current !== "DOWN") {
        directionRef.current = "UP";
        setDirection("UP");
      } else if ((key === "ArrowDown" || key === "s") && current !== "UP") {
        directionRef.current = "DOWN";
        setDirection("DOWN");
      } else if ((key === "ArrowLeft" || key === "a") && current !== "RIGHT") {
        directionRef.current = "LEFT";
        setDirection("LEFT");
      } else if ((key === "ArrowRight" || key === "d") && current !== "LEFT") {
        directionRef.current = "RIGHT";
        setDirection("RIGHT");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying]);

  return (
    <div className="p-4">
      {/* Score */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-muted-foreground">SCORE:</span>
          <span className="bg-secondary text-secondary-foreground px-2 py-1 border-2 border-foreground text-sm font-bold">
            {score}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-secondary" />
          <span className="text-sm font-bold">{highScore}</span>
        </div>
      </div>

      {/* Game Board */}
      <div 
        className="bg-[#0D0D0D] border-4 border-foreground mx-auto relative"
        style={{ 
          width: GRID_SIZE * CELL_SIZE, 
          height: GRID_SIZE * CELL_SIZE 
        }}
      >
        {/* Grid lines */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, #fff 1px, transparent 1px),
              linear-gradient(to bottom, #fff 1px, transparent 1px)
            `,
            backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
          }}
        />

        {/* Snake */}
        {snake.map((segment, index) => (
          <motion.div
            key={`${segment.x}-${segment.y}-${index}`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="absolute border-2 border-foreground"
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
              backgroundColor: index === 0 ? "#00FF88" : "#00CC6A",
            }}
          />
        ))}

        {/* Food */}
        <motion.div
          key={`food-${food.x}-${food.y}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute bg-primary border-2 border-foreground"
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE - 2,
            height: CELL_SIZE - 2,
          }}
        />

        {/* Game Over / Start Screen */}
        {(!isPlaying || gameOver) && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
            {gameOver ? (
              <>
                <span className="text-primary font-bold text-xl mb-2">GAME OVER</span>
                <span className="text-card text-sm mb-4">Score: {score}</span>
              </>
            ) : (
              <span className="text-card font-bold text-lg mb-4">READY?</span>
            )}
            <button
              onClick={resetGame}
              className="bg-secondary text-secondary-foreground px-4 py-2 border-2 border-foreground font-bold text-sm flex items-center gap-2 hover:bg-secondary/80 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              {gameOver ? "RETRY" : "START"}
            </button>
          </div>
        )}
      </div>

      {/* Controls hint */}
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Use <span className="bg-muted px-1 border border-foreground">WASD</span> or{" "}
          <span className="bg-muted px-1 border border-foreground">Arrow Keys</span> to move
        </p>
      </div>

      {/* Mobile Controls */}
      <div className="mt-4 grid grid-cols-3 gap-2 max-w-37.5 mx-auto lg:hidden">
        <div />
        <MobileButton direction="UP" onClick={() => {
          if (directionRef.current !== "DOWN") {
            directionRef.current = "UP";
            setDirection("UP");
          }
        }} />
        <div />
        <MobileButton direction="LEFT" onClick={() => {
          if (directionRef.current !== "RIGHT") {
            directionRef.current = "LEFT";
            setDirection("LEFT");
          }
        }} />
        <MobileButton direction="DOWN" onClick={() => {
          if (directionRef.current !== "UP") {
            directionRef.current = "DOWN";
            setDirection("DOWN");
          }
        }} />
        <MobileButton direction="RIGHT" onClick={() => {
          if (directionRef.current !== "LEFT") {
            directionRef.current = "RIGHT";
            setDirection("RIGHT");
          }
        }} />
      </div>
    </div>
  );
}

function MobileButton({ direction, onClick }: { direction: Direction; onClick: () => void }) {
  const arrows = {
    UP: "^",
    DOWN: "v",
    LEFT: "<",
    RIGHT: ">",
  };

  return (
    <button
      onClick={onClick}
      className="w-12 h-12 bg-muted border-2 border-foreground shadow-brutal-sm font-bold text-lg active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
    >
      {arrows[direction]}
    </button>
  );
}
