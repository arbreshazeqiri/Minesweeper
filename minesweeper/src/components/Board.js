import React, { useState, useEffect } from 'react';
import { Text, Button, Box, Flex, Tooltip, useToast } from '@chakra-ui/react'
import { BsEmojiSmile, BsEmojiSunglasses, BsEmojiDizzy } from 'react-icons/bs'

import Solver from './solver.js'
import loseAudio from './../assets/Lose.mp3';
import winAudio from './../assets/Win.mp3';
import one from './../assets/1.mp3';
import two from './../assets/2.mp3';
import three from './../assets/3.mp3';
import four from './../assets/4.mp3';
import five from './../assets/5.mp3';
import six from './../assets/6.mp3';
import seven from './../assets/7.mp3';
import eight from './../assets/8.mp3';

const Board = () => {
    // initialize the board state
    const [board, setBoard] = useState([]);
    const [level, setLevel] = useState('intermediate');
    const [algorithm, setAlgorithm] = useState('BFS');
    // const [isCustom, setIsCustom] = useState(false);
    // const [custom, setCustom] = useState({ width: 0, height: 0, mines: 0 });
    const [rows, setRows] = useState(null)
    const [cols, setCols] = useState(null)
    const [mines, setMines] = useState(null)

    // initialize the game state
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);

    // initialize the flags count state
    const [flagsCount, setFlagsCount] = useState(0);

    //revealed count
    const [revealedCount, setRevealedCount] = useState(0);

    //initialize timer
    const [timer, setTimer] = useState(0);

    //initialize toast
    const toast = useToast()


    //initialize sound
    const playLose = () => new Audio(loseAudio).play();
    const playWin = () => new Audio(winAudio).play();
    const playOne = () => new Audio(one).play();
    const playTwo = () => new Audio(two).play();
    const playThree = () => new Audio(three).play();
    const playFour = () => new Audio(four).play();
    const playFive = () => new Audio(five).play();
    const playSix = () => new Audio(six).play();
    const playSeven = () => new Audio(seven).play();
    const playEight = () => new Audio(eight).play();

    // generate the board with mines and counts
    const generateBoard = (rows, cols, mines) => {
        // create empty board
        const board = Array(rows).fill(null).map(() =>
            Array(cols).fill(null).map(() => ({ isMine: false, count: 0, isRevealed: false, isFlagged: false, isRed: false }))
        );

        // randomly place mines on the board
        let minesPlaced = 0;
        while (minesPlaced < mines) {
            const row = Math.floor(Math.random() * rows);
            const col = Math.floor(Math.random() * cols);
            if (!board[row][col].isMine) {
                board[row][col].isMine = true;
                minesPlaced++;
            }
        }

        // calculate counts for each cell
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (board[row][col].isMine) {
                    // don't count mines
                    continue;
                }
                // count adjacent mines
                let count = 0;
                for (let r = row - 1; r <= row + 1; r++) {
                    for (let c = col - 1; c <= col + 1; c++) {
                        if (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c].isMine) {
                            count++;
                        }
                    }
                }
                board[row][col].count = count;
            }
        }

        return board;
    };

    useEffect(() => {
        if (level === 'beginner') {
            setRows(9)
            setCols(9)
            setMines(10)
        }
        if (level === 'intermediate') {
            setRows(16)
            setCols(16)
            setMines(40)
        }
        if (level === 'expert') {
            setRows(16)
            setCols(30)
            setMines(99)
        }
        const generatedBoard = generateBoard(rows, cols, mines);
        setBoard(generatedBoard);
    }, [level, algorithm, rows, cols, mines])

    useEffect(() => checkWin(), [flagsCount])

    useEffect(() => {
        if (gameOver || win) {
            return;
        }
        const gameTimer = setTimeout(() => {
            setTimer(timer + 1);
        }, 1000);

        return () => {
            clearTimeout(gameTimer);
        };
    }, [timer, gameOver, win])

    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setRows(e.target[1].value)
        setCols(e.target[0].value)
        setMines(e.target[2].value)
    };

    // handle cell click
    const handleClick = (row, col) => {
        if (gameOver || win) {
            return;
        }

        // if the clicked cell is a mine, game over
        if (board[row][col].isMine) {
            // playLose()
            if (revealedCount === 0) {
                setBoard(generateBoard(rows, cols, mines))
                return
            }
            setGameOver(true);
            board[row][col].isRed = true;

            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    if (board[i][j].isMine)
                        board[i][j].isRevealed = true;
                }
            }
        } else {
            // reveal the clicked cell and all adjacent cells with count=0
            if (algorithm === 'BFS')
                revealCellBFS(row, col)
            else revealCellDFS(row, col)
            // check if player wins
            let cellAction = Solver(board)
            if (!cellAction) {
                console.log(cellAction)
                toast({
                    title: 'Solver cannot detect any more patterns. Try to open a cell randomly.',
                    status: 'info',
                })
            }
            if (cellAction)
                console.log(cellAction)
            if (cellAction && cellAction?.type === 'flag') {
                cellAction.cells.forEach(tupple => {
                    board[tupple[0]][tupple[1]].isFlagged = true
                })
                setFlagsCount(flagsCount + cellAction.cells.length)
            }
            if (cellAction && cellAction?.type === 'reveal') {
                cellAction.cells.forEach(tupple => {
                    if (algorithm === 'BFS')
                        revealCellBFS(tupple[0], tupple[1])
                    else revealCellDFS(tupple[0], tupple[1])
                })
            }
            checkWin()
        }
    };


    // handle cell right-click (flag)
    const handleFlag = (event, row, col) => {
        event.preventDefault();
        // toggle flagged state of cell
        if (gameOver) {
            return;
        }
        const cell = board[row][col];
        if (!cell.isRevealed) {
            const newBoard = [...board];
            newBoard[row][col].isFlagged = !cell.isFlagged;
            setBoard(newBoard);
            // update flags count
            const delta = cell.isFlagged ? 1 : -1;
            setFlagsCount(flagsCount + delta);
        }
    };

    // reveal a cell and recursively reveal all adjacent cells with count=0, BFS approach
    const revealCellBFS = (row, col) => {
        const queue = [{ row, col }];
        while (queue.length > 0) {
            const { row, col } = queue.shift();
            const cell = board[row][col];
            if (!cell.isRevealed) {
                // reveal the cell
                const newBoard = [...board];
                cell.isRevealed = true;
                setRevealedCount(revealedCount + 1)
                if (cell.count === 1) playOne()
                else if (cell.count === 2) playTwo()
                else if (cell.count === 3) playThree()
                else if (cell.count === 4) playFour()
                else if (cell.count === 5) playFive()
                else if (cell.count === 6) playSix()
                else if (cell.count === 7) playSeven()
                else if (cell.count === 8) playEight()
                else;
                setBoard(newBoard);
                // if the cell has count 0, add adjacent cells to queue
                if (cell.count === 0) {
                    console.log(row + " " + col)
                    for (let i = Math.max(row - 1, 0); i <= Math.min(row + 1, rows - 1); i++) {
                        for (let j = Math.max(col - 1, 0); j <= Math.min(col + 1, cols - 1); j++) {
                            if (i !== row || j !== col) {
                                queue.push({ row: i, col: j });
                            }
                        }
                    }
                }
            }
        }
    };

    // reveal a cell and recursively reveal all adjacent cells with count=0, DFS approach
    const revealCellDFS = (row, col) => {
        const stack = [{ row, col }];
        while (stack.length > 0) {
            const { row, col } = stack.pop();
            const cell = board[row][col];
            if (!cell.isRevealed) {
                // reveal the cell
                const newBoard = [...board];
                cell.isRevealed = true;
                setRevealedCount(revealedCount + 1);
                if (cell.count === 1) playOne();
                else if (cell.count === 2) playTwo();
                else if (cell.count === 3) playThree();
                else if (cell.count === 4) playFour();
                else if (cell.count === 5) playFive();
                else if (cell.count === 6) playSix();
                else if (cell.count === 7) playSeven();
                else if (cell.count === 8) playEight();
                else;
                setBoard(newBoard);
                // if the cell has count 0, add adjacent cells to stack
                if (cell.count === 0) {
                    console.log(row + " " + col)
                    for (let i = Math.max(row - 1, 0); i <= Math.min(row + 1, rows - 1); i++) {
                        for (let j = Math.max(col - 1, 0); j <= Math.min(col + 1, cols - 1); j++) {
                            if (i !== row || j !== col) {
                                stack.push({ row: i, col: j });
                            }
                        }
                    }
                }
            }
        }
    };


    // check if the player wins
    const checkWin = () => {
        // count the number of revealed cells that are not mines
        let flaggedCount = 0;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (board[row][col].isFlagged && board[row][col].isMine) {
                    flaggedCount++;
                }
            }
        }
        // check if the player has revealed all non-mine cells
        if (flaggedCount === mines) {
            setWin(true);
            // playWin()
        }
    };

    const Cell = ({ row, col, isMine, isFlagged, isRevealed, isRed, count, onClick, onRightClick }) => {

        // render the cell
        return (
            <Tooltip label={row + ', ' + col} placement='top'>
                <Flex
                    onClick={() => onClick(row, col)}
                    onContextMenu={(event) => onRightClick(event, row, col)}
                    height="2em" width="2em"
                    backgroundColor={'#C0C0C0'}
                    borderTop={!isRevealed ? '4px solid white' : '1px solid gray'}
                    borderLeft={!isRevealed ? '4px solid white' : '1px solid gray'}
                    borderBottom={!isRevealed ? '4px solid #808080' : ''}
                    borderRight={!isRevealed ? '4px solid #808080' : '1px solid gray'}
                    justifyContent={'center'}
                    alignItems='center'
                    cursor={!gameOver && "pointer"}
                >
                    {isRevealed && !isMine && count > 0 ? (
                        <Text fontWeight="bold" fontSize="2xl" color={count === 1 ? 'blue' : count === 2 ? 'green' : count === 3 ? 'red' : count === 4 ? 'darkblue' : count === 5 ? 'darkred' : count === 6 ? 'cyan' : count === 7 ? 'black' : 'lighgray'}>{count}</Text>
                    ) : isFlagged ? (
                        <Text fontWeight="bold" fontSize="2xl">&#x2691;</Text>
                    ) : isRevealed && isMine ? (
                        <Text fontWeight="bold" backgroundColor={isRed && 'red'} fontSize="2xl">&#x1f4a3;</Text>
                    ) : <Text fontWeight="bold" fontSize="2xl" />}
                </Flex>
            </Tooltip >
        );
    };

    // render the board
    return (
        <Flex flexDir="column" width="100%" gap="1em">
            <Flex flexDir='column' width="fit-content" alignSelf="center">
                <Flex justifyContent={'space-between'} gap="1em">
                    <Text onClick={() => {
                        setLevel('beginner')
                        // setIsCustom(false)
                    }} cursor="pointer" fontWeight={level === 'beginner' && 'bold'}>Beginner</Text>
                    <Text onClick={() => {
                        setLevel('intermediate')
                        // setIsCustom(false)
                    }
                    } cursor="pointer" fontWeight={level === 'intermediate' && 'bold'}>Intermediate</Text>
                    <Text onClick={() => {
                        setLevel('expert')
                        // setIsCustom(false)
                    }} cursor="pointer" fontWeight={level === 'expert' && 'bold'}>Expert</Text>
                    {/* <Text cursor="pointer" fontWeight={isCustom && 'bold'}>Custom</Text> */}
                </Flex>
                {/* {isCustom && <Flex>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="width" css={{ border: '2px solid black' }}>Width:</label>
                        <input style={{ border: '1px solid black', width: '2em' }} type="number" id="width" />
                        <label htmlFor="height">Height:</label>
                        <input style={{ border: '1px solid black', width: '2em' }} type="number" id="height" />
                        <label htmlFor="customMines">Mines:</label>
                        <input style={{ border: '1px solid black', width: '2em' }} type="number" id="customMines" />
                        <Button type="submit">Update board</Button>
                    </form>
                </Flex>} */}
                <Flex justifyContent={'space-between'} gap="1em">
                    <Text onClick={() => setAlgorithm('BFS')} fontWeight={algorithm === 'BFS' && 'bold'} cursor="pointer">Breadth-First Search</Text>
                    <Text onClick={() => setAlgorithm('DFS')} fontWeight={algorithm === 'DFS' && 'bold'} cursor="pointer">Depth-First Search</Text>
                </Flex>
            </Flex>
            <Flex width="fit-content" alignSelf="center" flexDir="column" backgroundColor={'#C0C0C0'} padding="1em 0.8em" borderLeft="6px solid white" borderTop="6px solid white" borderRight="6px solid #808080" borderBottom="6px solid #808080">
                <Flex padding="0.8em" justifyContent="space-between" borderRight="6px solid white" borderBottom="6px solid white" borderLeft="6px solid #808080" borderTop="6px solid #808080" marginBottom="0.8em">
                    <Text fontSize="4xl" backgroundColor="black" fontFamily="monospace" color="red" borderRight="3px solid white" borderBottom="3px solid white" borderLeft="3px solid #808080" borderTop="3px solid #808080">{mines - flagsCount < 0 ? '0' + (mines - flagsCount) : mines - flagsCount < 10 ? '00' + (mines - flagsCount) : '0' + (mines - flagsCount).toString()}</Text>
                    <Box border="2px solid #808080" cursor="pointer" onClick={() => {
                        setBoard(generateBoard(rows, cols, mines))
                        setFlagsCount(0)
                        setRevealedCount(0)
                        setTimer(0)
                        setGameOver(false)
                        setWin(false)
                    }}>
                        <Text padding="0.1em" fontSize="3.5em" color="black" borderLeft="4px solid white" borderTop="4px solid white" borderRight="4px solid #808080" borderBottom="4px solid #808080" as={gameOver ? BsEmojiDizzy : win ? BsEmojiSunglasses : BsEmojiSmile} />
                    </Box>
                    <Text fontSize="4xl" fontFamily="monospace" backgroundColor="black" color="red" borderRight="3px solid white" borderBottom="3px solid white" borderLeft="3px solid #808080" borderTop="3px solid #808080">{timer === 0 ? '000' : timer < 10 ? '00' + timer : timer >= 10 ? '0' + timer : timer}</Text>
                </Flex>
                <Flex flexDir="column" borderRight="6px solid white" borderBottom="6px solid white" borderLeft="6px solid #808080" borderTop="6px solid #808080">
                    {board.map((row, rowIndex) =>
                        <Flex key={rowIndex} className="row">
                            {row.map((cell, colIndex) =>
                                <Cell
                                    key={rowIndex + ', ' + colIndex}
                                    row={rowIndex}
                                    col={colIndex}
                                    isMine={cell.isMine}
                                    isFlagged={cell.isFlagged}
                                    isRevealed={cell.isRevealed}
                                    isRed={cell.isRed}
                                    count={cell.count}
                                    onClick={handleClick}
                                    onRightClick={handleFlag}
                                />
                            )}
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Flex >
    );
};



export default Board