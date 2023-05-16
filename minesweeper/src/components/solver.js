const Solver = (inputBoard) => {
    const rows = inputBoard.length;
    const cols = inputBoard[0].length;
    let move = null

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

    // Look for a 1 that has all adjacent cells revealed except for the presumed mine
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (board[i][j] === '1') {
                const neighbors = getNeighbors(i, j, rows, cols);
                const unrevealed = neighbors.filter((neighbor) => board[neighbor[0]][neighbor[1]] === '-' || board[neighbor[0]][neighbor[1]] === 'F')
                if (unrevealed.length === 1 && board[unrevealed[0][0]][unrevealed[0][1]] !== 'F') {
                    move = { type: 'flag', cells: unrevealed }
                    return move
                }
                if (unrevealed.length > 1 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 1) {
                    move = { type: 'reveal', cells: neighbors.filter((neighbor) => board[neighbor[0]][neighbor[1]] !== 'F') }
                    return move
                }
            }
            else if (board[i][j] === '2') {
                const neighbors = getNeighbors(i, j, rows, cols);
                const unrevealed = neighbors.filter((neighbor) => board[neighbor[0]][neighbor[1]] === '-' || board[neighbor[0]][neighbor[1]] === 'F')
                if (unrevealed.length === 2 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-').length === 2) {
                    move = { type: 'flag', cells: unrevealed }
                    return move
                }
                if (unrevealed.length === 2 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 1) {
                    move = { type: 'flag', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
                if (unrevealed.length > 2 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 2) {
                    move = { type: 'reveal', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
            }
            else if (board[i][j] === '3') {
                const neighbors = getNeighbors(i, j, rows, cols);
                const unrevealed = neighbors.filter((neighbor) => board[neighbor[0]][neighbor[1]] === '-' || board[neighbor[0]][neighbor[1]] === 'F')
                if (unrevealed.length === 3 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-').length === 3) {
                    move = { type: 'flag', cells: unrevealed }
                    return move
                }
                if (unrevealed.length === 3 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 2) {
                    move = { type: 'flag', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
                if (unrevealed.length === 3 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 1) {
                    move = { type: 'flag', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
                if (unrevealed.length > 3 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 3) {
                    move = { type: 'reveal', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
            }
            else if (board[i][j] === '4') {
                const neighbors = getNeighbors(i, j, rows, cols);
                const unrevealed = neighbors.filter((neighbor) => board[neighbor[0]][neighbor[1]] === '-' || board[neighbor[0]][neighbor[1]] === 'F')
                if (unrevealed.length === 4 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-').length === 4) {
                    move = { type: 'flag', cells: unrevealed }
                    return move
                }
                if (unrevealed.length === 4 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 3) {
                    move = { type: 'flag', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
                if (unrevealed.length === 4 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 2) {
                    move = { type: 'flag', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
                if (unrevealed.length === 4 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 1) {
                    move = { type: 'flag', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
                if (unrevealed.length > 4 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 4) {
                    move = { type: 'reveal', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
            }
            else if (board[i][j] === '5') {
                const neighbors = getNeighbors(i, j, rows, cols);
                const unrevealed = neighbors.filter((neighbor) => board[neighbor[0]][neighbor[1]] === '-' || board[neighbor[0]][neighbor[1]] === 'F')
                if (unrevealed.length === 5 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-').length === 5) {
                    move = { type: 'flag', cells: unrevealed }
                    return move
                }
                if (unrevealed.length === 5 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 4) {
                    move = { type: 'flag', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
                if (unrevealed.length === 5 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 3) {
                    move = { type: 'flag', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
                if (unrevealed.length === 5 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 2) {
                    move = { type: 'flag', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
                if (unrevealed.length === 5 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 1) {
                    move = { type: 'flag', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
                if (unrevealed.length > 5 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 5) {
                    move = { type: 'reveal', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
            }
            else if (board[i][j] === '6') {
                const neighbors = getNeighbors(i, j, rows, cols);
                const unrevealed = neighbors.filter((neighbor) => board[neighbor[0]][neighbor[1]] === '-' || board[neighbor[0]][neighbor[1]] === 'F')
                if (unrevealed.length === 6 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-').length === 6) {
                    move = { type: 'flag', cells: unrevealed }
                    return move
                }
                if (unrevealed.length === 6 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 5) {
                    move = { type: 'flag', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
                if (unrevealed.length === 6 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 4) {
                    move = { type: 'flag', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
                if (unrevealed.length === 6 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 3) {
                    move = { type: 'flag', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
                if (unrevealed.length === 6 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 2) {
                    move = { type: 'flag', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
                if (unrevealed.length === 6 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 1) {
                    move = { type: 'flag', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
                if (unrevealed.length > 6 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 6) {
                    move = { type: 'reveal', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
            }
            else if (board[i][j] === '7') {
                const neighbors = getNeighbors(i, j, rows, cols);
                const unrevealed = neighbors.filter((neighbor) => board[neighbor[0]][neighbor[1]] === '-' || board[neighbor[0]][neighbor[1]] === 'F')
                if (unrevealed.length === 7 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-').length === 7) {
                    move = { type: 'flag', cells: unrevealed }
                    return move
                }
                if (unrevealed.length === 7 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 6) {
                    move = { type: 'flag', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
                if (unrevealed.length === 7 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 5) {
                    move = { type: 'flag', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
                if (unrevealed.length === 7 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 4) {
                    move = { type: 'flag', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
                if (unrevealed.length === 7 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 3) {
                    move = { type: 'flag', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
                if (unrevealed.length === 7 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 2) {
                    move = { type: 'flag', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
                if (unrevealed.length === 7 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 1) {
                    move = { type: 'flag', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
                if (unrevealed.length > 7 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 7) {
                    move = { type: 'reveal', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
            }
            else if (board[i][j] === '8') {
                const neighbors = getNeighbors(i, j, rows, cols);
                const unrevealed = neighbors.filter((neighbor) => board[neighbor[0]][neighbor[1]] === '-' || board[neighbor[0]][neighbor[1]] === 'F')
                if (unrevealed.length === 8 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-').length === 8) {
                    move = { type: 'flag', cells: unrevealed }
                    return move
                }
                if (unrevealed.length === 8 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 7) {
                    move = { type: 'flag', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
                if (unrevealed.length === 8 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 6) {
                    move = { type: 'flag', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
                if (unrevealed.length === 8 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 5) {
                    move = { type: 'flag', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
                if (unrevealed.length === 8 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 4) {
                    move = { type: 'flag', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
                if (unrevealed.length === 8 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 3) {
                    move = { type: 'flag', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
                if (unrevealed.length === 8 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 2) {
                    move = { type: 'flag', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
                if (unrevealed.length === 8 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 1) {
                    move = { type: 'flag', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
                if (unrevealed.length > 8 && unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === 'F').length === 8) {
                    move = { type: 'reveal', cells: unrevealed.filter(unrev => board[unrev[0]][unrev[1]] === '-') }
                    return move
                }
            }
            //1-2-1 pattern horizontal
            else if (board[i][j] === '1' && board[i][j + 1] === '2' && board[i][j + 2] === '1' && i >= 0 && i < rows && j >= 0 && j + 2 < cols) {
                const firstNeighbors = getNeighbors(i, j, rows, cols);
                const middleNeighbors = getNeighbors(i, j + 1, rows, cols);
                const lastNeighbors = getNeighbors(i, j + 2, rows, cols);
                // nqs nalt jon empty
                if (firstNeighbors.filter(neighbor => neighbor[0] === i - 1 && neighbor[1] === j && board[neighbor[0]][neighbor[1]] === 'E').length === 1 && middleNeighbors.filter(neighbor => neighbor[0] === i - 1 && neighbor[1] === j + 1 && board[neighbor[0]][neighbor[1]] === 'E').length === 1 && lastNeighbors.filter(neighbor => neighbor[0] === i - 1 && neighbor[1] === j + 2 && board[neighbor[0]][neighbor[1]] === 'E').length === 1) {
                    // nqs poshte tyne jon tpaqelt
                    if (firstNeighbors.filter(neighbor => neighbor[0] === i + 1 && neighbor[1] === j && (board[neighbor[0]][neighbor[1]] === '-')).length === 1 && middleNeighbors.filter(neighbor => neighbor[0] === i + 1 && neighbor[1] === j + 1 && (board[neighbor[0]][neighbor[1]] === '-')).length === 1 && lastNeighbors.filter(neighbor => neighbor[0] === i + 1 && neighbor[1] === j + 2 && (board[neighbor[0]][neighbor[1]] === '-')).length === 1) {
                        const toFlag = firstNeighbors.filter(neighbor => neighbor[0] === i + 1 && neighbor[1] === j && (board[neighbor[0]][neighbor[1]] === '-'))
                        const toFlagTwo = lastNeighbors.filter(neighbor => neighbor[0] === i + 1 && neighbor[1] === j + 2 && (board[neighbor[0]][neighbor[1]] === '-'))
                        toFlag.push(toFlagTwo[0])
                        if (toFlag.length === 2) {
                            move = { type: 'flag', cells: toFlag }
                            return move
                        }
                    }
                }
                // nqs poshte jon empty
                if (firstNeighbors.filter(neighbor => neighbor[0] === i + 1 && neighbor[1] === j && board[neighbor[0]][neighbor[1]] === 'E') && middleNeighbors.filter(neighbor => neighbor[0] === i + 1 && neighbor[1] === j + 1 && board[neighbor[0]][neighbor[1]] === 'E') && lastNeighbors.filter(neighbor => neighbor[0] === i + 1 && neighbor[1] === j + 2 && board[neighbor[0]][neighbor[1]] === 'E')) {
                    // nqs nalt tyne jon tpaqelt
                    if (firstNeighbors.filter(neighbor => neighbor[0] === i - 1 && neighbor[1] === j && (board[neighbor[0]][neighbor[1]] === '-')).length === 1 && middleNeighbors.filter(neighbor => neighbor[0] === i - 1 && neighbor[1] === j + 1 && (board[neighbor[0]][neighbor[1]] === '-')).length === 1 && lastNeighbors.filter(neighbor => neighbor[0] === i - 1 && neighbor[1] === j + 2 && (board[neighbor[0]][neighbor[1]] === '-')).length === 1) {
                        const toFlag = firstNeighbors.filter(neighbor => neighbor[0] === i - 1 && neighbor[1] === j && (board[neighbor[0]][neighbor[1]] === '-'))
                        const toFlagTwo = lastNeighbors.filter(neighbor => neighbor[0] === i - 1 && neighbor[1] === j + 2 && (board[neighbor[0]][neighbor[1]] === '-'))
                        toFlag.push(toFlagTwo[0])
                        if (toFlag.length === 2) {
                            move = { type: 'flag', cells: toFlag }
                            return move
                        }
                    }
                }
            }
            //1-2-1 pattern vertikal
            else if (board[i][j] === '1' && board[i + 1][j] === '2' && board[i + 2][j] === '1' && i >= 0 && i + 2 < rows && j >= 0 && j < cols) {
                const firstNeighbors = getNeighbors(i, j, rows, cols);
                const middleNeighbors = getNeighbors(i + 1, j, rows, cols);
                const lastNeighbors = getNeighbors(i + 2, j, rows, cols);
                // nqs para jon empty
                if (firstNeighbors.filter(neighbor => neighbor[0] === i && neighbor[1] === j - 1 && board[neighbor[0]][neighbor[1]] === 'E').length === 1 && middleNeighbors.filter(neighbor => neighbor[0] === i + 1 && neighbor[1] === j - 1 && board[neighbor[0]][neighbor[1]] === 'E').length === 1 && lastNeighbors.filter(neighbor => neighbor[0] === i + 2 && neighbor[1] === j - 1 && board[neighbor[0]][neighbor[1]] === 'E').length === 1) {
                    // nqs pas tyne jon tpaqelt
                    if (firstNeighbors.filter(neighbor => neighbor[0] === i && neighbor[1] === j + 1 && (board[neighbor[0]][neighbor[1]] === '-')).length === 1 && middleNeighbors.filter(neighbor => neighbor[0] === i + 1 && neighbor[1] === j + 1 && (board[neighbor[0]][neighbor[1]] === '-')).length === 1 && lastNeighbors.filter(neighbor => neighbor[0] === i + 2 && neighbor[1] === j + 1 && (board[neighbor[0]][neighbor[1]] === '-')).length === 1) {
                        const toFlag = firstNeighbors.filter(neighbor => neighbor[0] === i && neighbor[1] === j + 1 && (board[neighbor[0]][neighbor[1]] === '-'))
                        const toFlagTwo = lastNeighbors.filter(neighbor => neighbor[0] === i + 2 && neighbor[1] === j + 1 && (board[neighbor[0]][neighbor[1]] === '-'))
                        toFlag.push(toFlagTwo[0])
                        if (toFlag.length === 2) {
                            move = { type: 'flag', cells: toFlag }
                            return move
                        }
                    }
                }

                ///////////////
                //e shtojna kushtin nqs 1shi ska kojshi t djatht ose nese ka duhet me kane i qelt 
        else if (board[i][j] === '1' && board[i][j-1] != '-' && board[i][j-1] != 'F' && board[i][j + 1] === '1' && i >= 0 && i < rows && j >= 0 && j + 1 < cols) {
            // nqs qelizat poshte 11-shit jon empty
          if (board[i+1][j] === 'E' && board[i+1][j+1] === 'E'){
              // nqs qelizat nalt 11-shit sjon qel hala
              if (board[i-1][j] === '-' && board[i-1][j+1] === '-' && board[i-1][j+2] === '-') {
                  const toReveal = [[i-1, j+2]];
                  if (toReveal.length === 1) {
                      move = { type: 'reveal', cells: toReveal }
                      return move
                  }
              }
          }
          // nqs qelizat nalte 11shit jon empty
        if (board[i-1][j] === 'E' && board[i-1][j+1] === 'E'){
              // nqs qelizat nalt 11-shit sjon qel hala
              if (board[i+1][j] === '-' && board[i+1][j+1] === '-' && board[i+1][j+2] === '-') {
                  const toReveal = [[i+1, j+2]];
                  if (toReveal.length === 1) {
                      move = { type: 'reveal', cells: toReveal }
                      return move
                  }
              }
          }
        }
                /////////////////
                // nqs pas jon empty
                if (firstNeighbors.filter(neighbor => neighbor[0] === i && neighbor[1] === j + 1 && board[neighbor[0]][neighbor[1]] === 'E') && middleNeighbors.filter(neighbor => neighbor[0] === i + 1 && neighbor[1] === j + 1 && board[neighbor[0]][neighbor[1]] === 'E') && lastNeighbors.filter(neighbor => neighbor[0] === i + 2 && neighbor[1] === j + 1 && board[neighbor[0]][neighbor[1]] === 'E')) {
                    // nqs para tyne jon tpaqelt
                    if (firstNeighbors.filter(neighbor => neighbor[0] === i && neighbor[1] === j - 1 && (board[neighbor[0]][neighbor[1]] === '-')).length === 1 && middleNeighbors.filter(neighbor => neighbor[0] === i + 1 && neighbor[1] === j - 1 && (board[neighbor[0]][neighbor[1]] === '-')).length === 1 && lastNeighbors.filter(neighbor => neighbor[0] === i + 2 && neighbor[1] === j - 1 && (board[neighbor[0]][neighbor[1]] === '-')).length === 1) {
                        const toFlag = firstNeighbors.filter(neighbor => neighbor[0] === i && neighbor[1] === j - 1 && (board[neighbor[0]][neighbor[1]] === '-'))
                        const toFlagTwo = lastNeighbors.filter(neighbor => neighbor[0] === i + 2 && neighbor[1] === j - 1 && (board[neighbor[0]][neighbor[1]] === '-'))
                        toFlag.push(toFlagTwo[0])
                        if (toFlag.length === 2) {
                            move = { type: 'flag', cells: toFlag }
                            return move
                        }
                    }

                }
            }
            // reveal if one of the adj cells is empty (its a number so its safe)
            else
                if (board[i][j] === '-') {
                    const neighbors = getEmptyNeighbors(i, j, rows, cols);
                    if (neighbors.length > 0) {
                        move = { type: 'reveal', cells: [[i, j]] }
                        return move
                    }
                }
        }
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

    function getEmptyNeighbors(i, j, rows, cols) {
        const deltas = [-1, 0, 1];
        const neighbors = [];
        for (const di of deltas) {
            for (const dj of deltas) {
                const ni = i + di;
                const nj = j + dj;
                if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && (di !== 0 || dj !== 0) && board[ni][nj] === 'E') {
                    neighbors.push([ni, nj]);
                }
            }
        }
        return neighbors;
    }
}
             
export default Solver