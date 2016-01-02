angular.module('sudokuSolver.controllers').controller('SudokuCtrl', [
    '$scope',
    '$translate',
    'SudokuSvc',
    function($scope, $translate, SudokuSvc) {
        
        var regExp = new RegExp("[^0-9]|^0", "g");
        var regExp2 = new RegExp("[^1-9]", "g");
        var boxSize;
        var preset;
        
        $scope.selectedSudokuSize = "9";
        $scope.selectedLanguage = $translate.use();
        
        $scope.firstChild = function(index) {
            return index == 0;
        };
        
        $scope.nthChild = function(index) {
            return index % boxSize == (boxSize-1);
        };
        
        $scope.changeLanguage = function() {
            $translate.use($scope.selectedLanguage);
        };

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
                empty = false;
            }
            else if ($scope.input[row][col] === "") {
                $scope.sudoku[row][col] = 0;
                preset[row][col] = 0;
            }
            else {
                $scope.input[row][col] = ($scope.sudoku[row][col] == 0) ? "" : $scope.sudoku[row][col];
            }
        };
        
        $scope.solve = function() {
            SudokuSvc.solve($scope.sudoku, boxSize, $scope.selectedSudokuSize);
            $scope.input = angular.copy($scope.sudoku);
            if (!preset) {
                preset = angular.copy($scope.sudoku);
            }
        };
        
        $scope.clear = function() {
            preset = angular.copy($scope.sudoku);
            $scope.sudoku = SudokuSvc.createEmpty($scope.selectedSudokuSize);
            $scope.input = [];
            boxSize = Math.sqrt($scope.selectedSudokuSize);
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
        
        $scope.clear();
        
    }
]);
