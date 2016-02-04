angular.module('sudokuSolver.controllers').controller('SudokuCtrl', [
    '$scope',
    '$translate',
    'SudokuSvc',
    function($scope, $translate, SudokuSvc) {
        
        var regExp = new RegExp("[^0-9]|^0", "g");
        var regExp2 = new RegExp("[^1-9]", "g");
        var boxSize;
        var preset;
        
        var initInputGrid = function(sudokuBoxSize) {
            $scope.sudokuPopover.inputGrid = [];
            for (var i = 0; i < sudokuBoxSize; i++) {
                $scope.sudokuPopover.inputGrid[i] = [];
                for (var j = 0; j < sudokuBoxSize; j++) {
                    $scope.sudokuPopover.inputGrid[i][j] = i * sudokuBoxSize + j + 1;
                }
            }           
        };
        
        $scope.selectedSudokuSize = "9";
        $scope.selectedLanguage = $translate.use();
        $scope.input = [];
        
        $scope.firstChild = function(index) {
            return index == 0;
        };
        
        $scope.nthChild = function(index) {
            return index % boxSize == (boxSize-1);
        };
        
        $scope.changeLanguage = function() {
            $translate.use($scope.selectedLanguage);
        };
        
        $scope.openPopover = function(row, col) {
            $scope.sudokuPopover.row = row;
            $scope.sudokuPopover.col = col;
        };
        
        $scope.isPopoverOpen = function(row, col) {
            return $scope.sudokuPopover.row == row && $scope.sudokuPopover.col == col;
        };
        
        $scope.sudokuPopover = {
            templateUrl: 'popoverTemplate.html',
            inputGrid: [],
            row: -1,
            col: -1
        };
        
        $scope.insertValue = function(value) {
            preset = angular.copy($scope.sudoku);
            var row = $scope.sudokuPopover.row;
            var col = $scope.sudokuPopover.col;
            
            if (!$scope.input[row]) {
                $scope.input[row] = [];
            }
            
            $scope.input[row][col] = (value == 0) ? "" : value;
            $scope.sudoku[row][col] = value;
            preset[row][col] = value;
            
            $scope.sudokuPopover.row = -1;
            $scope.sudokuPopover.col = -1;
        };

        // this is not used in the current version
        $scope.checkValue = function(row, col) {
            preset = angular.copy($scope.sudoku);
            
            if ($scope.selectedSudokuSize < 16) {
                $scope.input[row][col] = $scope.input[row][col].replace(regExp2, '');
            }
            else {
                $scope.input[row][col] = $scope.input[row][col].replace(regExp, '');
            }
            var intVal = parseInt($scope.input[row][col]);
            if (!isNaN(intVal) && intVal <= $scope.selectedSudokuSize && (intVal.toString().length <= $scope.selectedSudokuSize.toString().length)) {
                $scope.sudoku[row][col] = intVal;
                preset[row][col] = intVal;
            }
            else if ($scope.input[row][col] === "") {
                $scope.sudoku[row][col] = 0;
                preset[row][col] = 0;
            }
            else {
                $scope.input[row][col] = ($scope.sudoku[row][col] == 0) ? "" : $scope.sudoku[row][col];
            }
        };
        
        $scope.solveIfPossible = function() {
            if (SudokuSvc.isSolvable($scope.sudoku, boxSize, $scope.selectedSudokuSize)) {
                SudokuSvc.solve($scope.sudoku, boxSize, $scope.selectedSudokuSize);
                $scope.input = angular.copy($scope.sudoku);
                if (!preset) {
                    preset = angular.copy($scope.sudoku);
                }
            }
            else {
                alert($translate.instant("NOT_SOLVABLE"));
            }
        };
        
        $scope.init = function(undoable) {
            preset = undoable ? angular.copy($scope.sudoku) : null;
            $scope.sudoku = SudokuSvc.createEmpty($scope.selectedSudokuSize);
            $scope.input = [];
            boxSize = Math.sqrt($scope.selectedSudokuSize);
            $scope.sudokuPopover.row = -1;
            $scope.sudokuPopover.col = -1;
            initInputGrid(boxSize);
        };
        
        $scope.undo = function() {
            if (preset) {
                for (var i = 0; i < $scope.selectedSudokuSize; i++) {
                    $scope.input[i] = [];
                    for (var j = 0; j < $scope.selectedSudokuSize; j++) {
                        if (preset[i][j] == 0) {
                            $scope.sudoku[i][j] = 0;
                            $scope.input[i][j] = "";
                        }
                        else {
                            $scope.sudoku[i][j] = preset[i][j];
                            $scope.input[i][j] = preset[i][j];                     
                        }
                    }
                }
            }
        };
        
        $scope.init(false);
        
    }
]);
