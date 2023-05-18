//3-4-5 pattern

else if (board[i][j] === '3' && board[i][j + 1] === '4' && board[i][j + 2] === '5' && i >= 0 && i < rows && j >= 0 && j + 2 < cols) {
    const firstNeighbors = getNeighbors(i, j, rows, cols);
    const middleNeighbors = getNeighbors(i + 1, j, rows, cols);
    const lastNeighbors = getNeighbors(i + 2, j, rows, cols);

    // 3,4,5 mbi prekin mure
    if (board[i - 1][j] === '-' && board[i - 1][j + 1] === '-' && board[i - 1][j + 2] === '-') {
        // 3 ka 2 flags => reduces to 1, 4 ka 2 flags => reduces to 2, 5 ka 4 flags => reduces to 1
        // pra 345 reduces to 121
        if (firstNeighbors.filter(neighbor => board[neighbor[0]][neighbor[1]] === 'F').length === 2 &&
            middleNeighbors.filter(neighbor => board[neighbor[0]][neighbor[1]] === 'F').length === 2 &&
            lastNeighbors.filter(neighbor => board[neighbor[0]][neighbor[1]] === 'F').length === 4
        ) {
            const toFlag = [
                [i - 1, j],
                [i - 1, j + 2]
            ];
            if (toFlag.length === 2) {
                move = { type: 'flag', cells: toFlag };
                return move;
            }
        }
    }
}