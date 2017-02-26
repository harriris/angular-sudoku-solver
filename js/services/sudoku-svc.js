angular.module('sudokuSolver.services').factory('SudokuSvc', [
    function() {
        var solveSudoku = function(sudoku, boxSize, size) {
            if ( !isEmpty(sudoku, size) ) {
                return true;
            }

            var x = 0;
            var y = 0;
            var smallest = size + 1;
            var v = [];

            // find the cell with the smallest amount of candidate solutions
            for (var i = 0; i < size; i++) {
                for (var j = 0; j < size; j++) {
                    if (sudoku[i][j] === 0) {
                        var options = [];
                        var len = 0;

                        for (var n = 1; n <= size; n++) {
                            if ( isAllowed(sudoku, n, i, j, boxSize, size) ) {
                                len++;
                                options.push(n);	
                            }
                        }

                        if (len < smallest) {
                            smallest = len;
                            x = i;
                            y = j;
                            v = [];
                            var k = smallest;
                            while(k--) { 
                                v[k] = options[k]; 
                            }
                        }
                    }
                    if (smallest === 0) {
                        break;
                    }
                }
                if (smallest === 0) {
                    break;
                }
            }

            // try out the candidate solutions to the selected cell
            while(smallest--) { 
                sudoku[x][y] = v[smallest];
                if ( solveSudoku(sudoku, boxSize, size) ) {
                    return true; 
                }
            }

            sudoku[x][y] = 0;
            return false;            
        };
        
        var isEmpty = function(sudoku, size) {
            for (var i = 0; i < size; i++) {
                for (var j = 0; j < size; j++) {
                    if (sudoku[i][j] === 0) {
                        return true;
                    }
                }
            }

            return false;
        };
        
        var isAllowed = function(sudoku, number, row, column, boxSize, len) {
            for (var i = 0; i < len; i++) { // check the row
                if ( (sudoku[row][i] === number) && (i !== column) ) {
                    return false;
                }
            }

            for (var i = 0; i < len; i++) { // check the column
                if ( (sudoku[i][column] === number) && (i !== row) )  {
                    return false;
                }
            }

            var x = row - row % boxSize;
            var y = column - column % boxSize;
            for (var i = 0; i < boxSize; i++) { // check the box
                for (var j = 0; j < boxSize; j++) {
                    var boxRow = i+x;
                    var boxCol = j+y;
                    if ( (sudoku[boxRow][boxCol] === number) && 
                         (boxRow !== row) && (boxCol !== column) ) {
                        return false;
                    }
                }
            }

            return true;
        }
        
        return {
            createEmpty: function(sudokuSize) {
                var emptySudokuGrid = [];

                for (var i = 0; i < sudokuSize; i++) {
                    emptySudokuGrid[i] = [];
                    for (var j = 0; j < sudokuSize; j++) {
                        emptySudokuGrid[i].push(0);
                    }
                }

                return emptySudokuGrid;                
            },
            isSolvable: function(sudoku, boxSize, sudokuSize) {
                for (var row = 0; row < sudokuSize; row++) {
                    for (var col = 0; col < sudokuSize; col++) {
                        if (sudoku[row][col] > 0) {
                            if ( !isAllowed(sudoku, sudoku[row][col], row, col,
                                            boxSize, sudokuSize) ) {	
                                return false;
                            }
                        }
                    }
                }
                
                return true;
            },
            solve: function(sudoku, boxSize, sudokuSize) {
                solveSudoku(sudoku, boxSize, sudokuSize);
            }
        };
    }
]);
