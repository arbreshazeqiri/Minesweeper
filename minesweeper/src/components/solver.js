const Solver = (inputBoard) => {
    const rows = inputBoard.length;
    const cols = inputBoard[0].length;
    let move = null;

    let board = new Array(inputBoard.length).fill(0).map(() => new Array(inputBoard[0].length).fill(0));
    for (let i = 0; i < inputBoard.length; i++) {
        for (let j = 0; j < inputBoard[i].length; j++) {
            if (inputBoard[i][j].isRevealed && inputBoard[i][j].count === 0) {
                board[i][j] = 'E';
            } else if (inputBoard[i][j].isRevealed && inputBoard[i][j].count > 0) {
                board[i][j] = inputBoard[i][j].count + '';
            }
            else if (inputBoard[i][j].isFlagged) {
                board[i][j] = 'F';
            }
            else {
                board[i][j] = '-';
            }

        }
    }
    console.log(board)

    // Look for a 1 that has all adjacent cells revealed except for the presumed mine
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (board[i][j] === '1') {
                const neighbors = getNeighbors(i, j, rows, cols);
                const unrevealed = neighbors.filter((neighbor) => board[neighbor[0]][neighbor[1]] === '-' || board[neighbor[0]][neighbor[1]] === 'F')
                if (unrevealed.length === 1 && board[unrevealed[0][0]][unrevealed[0][1]] !== 'F') {
                    move = unrevealed;
                    console.log(`Flag ${move}`)
                    break;
                }
                if (unrevealed.length > 1 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 1) {
                    console.log(`Reveal unflagged neighbors of ${i}, ${j}`)
                    break;

                }
            }
        }
        if (move) break;
    }

    // // If there are no empty cells adjacent to a number, choose an empty cell at random
    // if (!move) {
    //     const emptyCells = [];
    //     for (let i = 0; i < rows; i++) {
    //         for (let j = 0; j < cols; j++) {
    //             if (board[i][j] === 'E') {
    //                 emptyCells.push([i, j]);
    //             }
    //         }
    //     }
    //     const randomIndex = Math.floor(Math.random() * emptyCells.length);
    //     move = emptyCells[randomIndex];
    // }

    function getNeighbors(i, j, rows, cols) {
        const deltas = [-1, 0, 1];
        const neighbors = [];
        for (const di of deltas) {
            for (const dj of deltas) {
                const ni = i + di;
                const nj = j + dj;
                if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && (di !== 0 || dj !== 0)) {
                    neighbors.push([ni, nj]);
                }
            }
        }
        return neighbors;
    }
}


export default Solver