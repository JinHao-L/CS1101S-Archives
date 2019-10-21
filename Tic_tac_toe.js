// Tic-tac-toe
let game = [];
let size = 3;
let round = 0;
let prev = 1;
// Player 1: X
// Player 2: O
let turn = 1;
let symbol = "X";

function is_win_condition() {
        let truth_val = false;
        for(let i = 0; i < size; i = i + 1){
            let check = true;
            for(let j = 1; j < size; j = j + 1) {
                check = check && (game[i][j-1] === game[i][j]);
            }
            truth_val = truth_val || check;
        }
        for(let j = 0; j < size; j = j + 1){
            let check = true;
            for(let i = 1; i < size; i = i + 1) {
                check = check && (game[i-1][j] === game[i][j]);
            }
            truth_val = truth_val || check;
        }
        let check = true;
        for(let n = 1; n < size; n = n + 1){
            check = check && (game[n-1][n-1] === game[n][n]);
        }
        truth_val = truth_val || check;
        
        check = true;
        for(let n = 1; n < size; n = n + 1){
            check = check && (game[n-1][size-n] === game[n][size-1-n]);
        }
        truth_val = truth_val || check;
        
        return truth_val;
    }

function change_board(n) {
    if (is_win_condition() || round === size*size || round === 0) {
        size = n;
        new_game();
        return "Tic-tac-toe " + stringify(n) + "x" + stringify(n) + " board";
    } else {
        return "Finish current game or reset game";
    }
}

function new_game() {
    game = [];
    round = 0;
    prev = 1;
    turn = 1;
    symbol = "X";
    
    display("Round " + stringify(round));
    display("-------------");
    for(let i = 0; i < size; i = i + 1) {
        game[i] = [];
        for(let j = 0; j < size; j = j + 1) {
            game[i][j] = stringify(size*i+j+1);
        }
        display(game[i]);
    }

    return "Player " + stringify(turn) + " next (" + symbol + ")";
}

function next() {
    //Functions Declaration
    function display_state() {
        display("Round " + stringify(round));
        display("Last move: Player " + stringify(turn) + " - " +
            game[math_floor((prev-1)/size)][(prev-1) % size] + 
            " to " +
            stringify(prev));
        display("-------------");
        for(let i = 0; i < size; i = i + 1){
            display(game[i]);
        }
    }
    
    function is_valid_move(val) {
        return (stringify(val) === game[math_floor((prev-1)/size)][(prev-1) % size]);
    }
    
    // Running code
    if (is_win_condition()) {
        return "Player " + stringify(turn) + " WINS \n Start New?";
    } else {
        if (round === size*size) {
            return "Tie Game \n Start New?";
        } else {
            round = round + 1;
            prev = prompt("Player " + 
                    stringify(turn) + 
                    "'s Move (" + symbol + ")");
            prev = parse_int(prev, 10);
            
            while (!is_valid_move(prev)) {
                prev = prompt("Invalid Move - Player " + 
                        stringify(turn) + "'s Move (" + symbol + ")");
                prev = parse_int(prev, 10);
            }
            
            game[math_floor((prev-1)/size)][(prev-1) % size] = symbol;
            
            display_state();
            
            if (is_win_condition()) {
                return "Player " + stringify(turn) + " WINS";
            } else {
                if (round === size*size) {
                    return "Tie Game";
                } else {
                    if (turn === 1) {
                        turn = 2;
                        symbol = "O";
                    } else {
                        turn = 1;
                        symbol = "X";
                    }
                    return "Player " + 
                        stringify(turn) + 
                        " next (" + symbol + ")";
                }
            }
        }
    }
}
