var lang_fi = {
    'LANGUAGE': 'Kieli',
    'SUDOKU_SOLVER': 'Sudokun ratkaisija',
    'SUDOKU_SIZE': 'Sudokun koko',
    'SOLVE': 'ratkaise',
    'CLEAR': 'tyhjennä',
    'UNDO': 'kumoa',
    'DESCRIPTION_SOLVE': 'ratkaise Sudoku',
    'DESCRIPTION_CLEAR': 'tyhjennä kaikki ruudut',
    'DESCRIPTION_UNDO': 'kumoa edellinen toiminto',
};

var lang_en = {
    'LANGUAGE': 'Language',
    'SUDOKU_SOLVER': 'Sudoku Solver',
    'SUDOKU_SIZE': 'Sudoku Size',
    'SOLVE': 'solve',
    'CLEAR': 'clear',
    'UNDO': 'undo',
    'DESCRIPTION_SOLVE': 'solve the Sudoku',
    'DESCRIPTION_CLEAR': 'clear all cells',
    'DESCRIPTION_UNDO': 'undo last action',
};

angular.module('sudokuSolver.translations', ['pascalprecht.translate'])
    .config(['$translateProvider', function($translateProvider) {
        $translateProvider
        .translations('fi', lang_fi)
        .translations('en', lang_en)
        .preferredLanguage('fi')
        .fallbackLanguage('en');
}]);
