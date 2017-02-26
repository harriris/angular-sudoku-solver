angular.module('sudokuSolver.controllers').controller('SudokuCtrl', [
    '$scope',
    '$translate',
    'SudokuSvc',
    function($scope, $translate, SudokuSvc) {
        
        var boxSize;
        var preset;
        
        var initInputGrid = function(sudokuBoxSize) {
            $scope.sudokuPopover.inputGrid = [];
            for (var i = 0; i < sudokuBoxSize; i++) {
                $scope.sudokuPopover.inputGrid[i] = [];
                for (var j = 0; j < sudokuBoxSize; j++) {
                    $scope.sudokuPopover.inputGrid[i][j] = (i * sudokuBoxSize + 
                                                            j + 1);
                }
            }           
        };
        
        $scope.selectedSudokuSize = "9";
        $scope.selectedLanguage = $translate.use();
        
        $scope.firstChild = function(index) {
            return index === 0;
        };
        
        $scope.nthChild = function(index) {
            return index % boxSize === (boxSize-1);
        };
        
        $scope.changeLanguage = function() {
            $translate.use($scope.selectedLanguage);
        };
        
        $scope.openPopover = function(row, col) {
            $scope.sudokuPopover.row = row;
            $scope.sudokuPopover.col = col;
        };
        
        $scope.isPopoverOpen = function(row, col) {
            return $scope.sudokuPopover.row === row &&
                   $scope.sudokuPopover.col === col;
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
            var intValue = parseInt(value);

            $scope.sudoku[row][col] = intValue;
            preset[row][col] = intValue;
            
            $scope.sudokuPopover.row = -1;
            $scope.sudokuPopover.col = -1;
        };
        
        $scope.solveIfPossible = function() {
            var selectIntSize = parseInt($scope.selectedSudokuSize);
            if (SudokuSvc.isSolvable($scope.sudoku, boxSize, selectIntSize)) {
                SudokuSvc.solve($scope.sudoku, boxSize, selectIntSize);
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
            var selectIntSize = parseInt($scope.selectedSudokuSize);
            $scope.sudoku = SudokuSvc.createEmpty(selectIntSize);
            boxSize = Math.sqrt(selectIntSize);
            $scope.sudokuPopover.row = -1;
            $scope.sudokuPopover.col = -1;
            initInputGrid(boxSize);
        };
        
        $scope.undo = function() {
            if (preset) {
                var selectIntSize = parseInt($scope.selectedSudokuSize);
                for (var i = 0; i < selectIntSize; i++) {
                    for (var j = 0; j < selectIntSize; j++) {
                        if (preset[i][j] === 0) {
                            $scope.sudoku[i][j] = 0;
                        }
                        else {
                            $scope.sudoku[i][j] = preset[i][j];                 
                        }
                    }
                }
            }
        };
        
        $scope.init(false);
        
    }
]);
