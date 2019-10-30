// Tic-tac-toe
let game = [];
let size = 3;
let round = 0;
let prevprev = null;
let prev = null;
// Player 1: X
// Player 2: O
let turn = 1;
let symbol = "X";

function is_win_condition() {
    // check horizontal and vertical rows
    let truth_val = false;
    for (let i = 0; i < size && !truth_val; i = i + 1) {
        let check = true;
        for (let j = 1; j < size; j = j + 1) {
            check = check && (game[i][j - 1] === game[i][j]);
        }
        truth_val = truth_val || check;
    }
    for (let j = 0; j < size && !truth_val; j = j + 1) {
        let check = true;
        for (let i = 1; i < size; i = i + 1) {
            check = check && (game[i - 1][j] === game[i][j]);
        }
        truth_val = truth_val || check;
    }

    // check diagonal (top left to bottom right)
    let check = true;
    for (let n = 1; n < size && !truth_val; n = n + 1) {
        check = check && (game[n - 1][n - 1] === game[n][n]);
    }
    truth_val = truth_val || check;

    // check diagonal (top right to bottom left)
    check = true;
    for (let n = 1; n < size && !truth_val; n = n + 1) {
        check = check && (game[n - 1][size - n] === game[n][size - 1 - n]);
    }
    truth_val = truth_val || check;

    return truth_val;
}

// Use to change size of game. By default n = 3
function change_board(n) {
    size = n;
    display("Changed to " + n + "x" + n + " board");
    display("Type start(); to begin");
}

// Use to start a new game
function start() {
    game = [];
    round = 0;
    prevprev = null;
    prev = null;
    turn = 1;
    symbol = "X";

    // Create Board
    for (let i = 0; i < size; i = i + 1) {
        game[i] = [];
        for (let j = 0; j < size; j = j + 1) {
            game[i][j] = stringify(size * i + j + 1);
        }
    }

    const x = prompt("Player 1 - X" + "\n" + "Player 2 - O" +
        "\n\n" + "Type anything to continue");
    next();
}

// Prompt for next move
function next() {
    //Functions Declaration
    function display_state() {
        const first = "Round " + stringify(round);
        let second = "";
        let third = "";
        if (turn === 1) {
            second = "Player 1's Last move - X to " + stringify(prevprev);
            third = "Player 2's Last move - O to " + stringify(prev);
        } else {
            second = "Player 2's Last move - O to " + stringify(prevprev);
            third = "Player 1's Last move - X to " + stringify(prev);
        }
        let fourth = "";
        for (let i = 0; i < size; i = i + 1) {
            fourth = fourth + "\n" + stringify(game[i]);
        }
        return first + "\n" + second + "\n" + third + "\n" + fourth;
    }

    function is_valid_move(val) {
        return (stringify(val) ===
            game[math_floor((val - 1) / size)][(val - 1) % size]);
    }

    // Running code
    round = round + 1;
    let temp = prompt(display_state() + "\n" + "Player " +
        stringify(turn) + "'s Move (" + symbol + ")");
    temp = parse_int(temp, 10);

    // Re-prompt player for a valid move
    while (temp !== temp || !is_valid_move(temp) ||
        temp < 1 || temp > size * size) {
        temp = prompt(display_state() + "\n" + "Invalid Move - Player " +
            stringify(turn) + "'s Move (" + symbol + ")");
        temp = parse_int(temp, 10);
    }

    prevprev = prev;
    prev = temp;

    // Place move piece
    game[math_floor((prev - 1) / size)][(prev - 1) % size] = symbol;

    if (is_win_condition()) {
        const fresh = prompt(display_state() + "\n" + "Player " +
            stringify(turn) + " WINS" + "\n" + "Type 'N' to start new game");

        if (fresh === "n" || fresh === "N") {
            start();
        } else {
            display("Player " + stringify(turn) + " WINS");
        }
    } else {
        if (round === size * size) {
            const fresh = prompt(display_state() + "\n" + "Tie Game" +
                "\n" + "Type 'N' to start new game");

            if (fresh === "n" || fresh === "N") {
                start();
            } else {
                display("Tie Game");
            }
        } else {
            if (turn === 1) {
                turn = 2;
                symbol = "O";
            } else {
                turn = 1;
                symbol = "X";
            }
            next();
        }
    }
}
