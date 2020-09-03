// 3x3 Tic-tac-toe (Player vs Com)
let game = [];
let size = 3;
let round = 0;
let com_prev = null;
let your_prev = null;
// You: X
// Com: O
let turn = "Computer";
let thinking = false;

// Globally accessible win_condition
function is_win_condition(game) {
    let win_count = 0;

    // check horizontal rows
    let truth_val = false;
    for (let i = 0; i < size && (thinking || !truth_val); i = i + 1) {
        let check = true;
        for (let j = 1; j < size; j = j + 1) {
            check = check && (game[i][j - 1] === game[i][j]);
        }
        // add associated win value
        if (thinking && check) {
            const com_won = (game[i][0] === "O");
            win_count = com_won ? win_count + 10 : win_count - 10;
        } else {}
        truth_val = truth_val || check;

    }

    // check vertical rows
    for (let j = 0; j < size && (thinking || !truth_val); j = j + 1) {
        let check = true;
        for (let i = 1; i < size; i = i + 1) {
            check = check && (game[i - 1][j] === game[i][j]);
        }
        // add associated win value
        if (thinking && check) {
            const com_won = (game[0][j] === "O");
            win_count = com_won ? win_count + 10 : win_count - 10;
        } else {}
        truth_val = truth_val || check;
    }

    // check diagonal (top left to bottom right)
    let check = true;
    for (let n = 1; n < size && (thinking || !truth_val); n = n + 1) {
        check = check && (game[n - 1][n - 1] === game[n][n]);
    }
    // add associated win value
    if (thinking && check) {
        const com_won = (game[0][0] === "O");
        win_count = com_won ? win_count + 10 : win_count - 10;
    } else {}
    truth_val = truth_val || check;

    // check diagonal (top right to bottom left)
    check = true;
    for (let n = 1; n < size && (thinking || !truth_val); n = n + 1) {
        check = check && (game[n - 1][size - n] === game[n][size - 1 - n]);
    }
    // add associated win value
    if (thinking && check) {
        const com_won = (game[size - 1][0] === "O");
        win_count = com_won ? win_count + 10 : win_count - 10;
    } else {}
    truth_val = truth_val || check;

    if (thinking) {
        return win_count;
    } else {
        return truth_val;
    }
}

// Use to change size of game. By default n = 3
function change_board(n) {
    size = n;
    display("Changed to " + n + "x" + n + " board");
    display("Type start(); to begin");
}

// Use to create a new game
function start() {
    function who_first() {
        const u_first = prompt("Go First? Y/N");
        if (u_first === "Y" || u_first === "y") {
            turn = "Player";
            next();
        } else if (u_first === "N" || u_first === "n") {
            turn = "Computer";
            next();
        } else {
            who_first();
        }
    }
    game = [];
    round = 0;
    com_prev = null;
    your_prev = null;
    for (let i = 0; i < size; i = i + 1) {
        game[i] = [];
        for (let j = 0; j < size; j = j + 1) {
            game[i][j] = stringify(size * i + j + 1);
        }
    }

    who_first();
}

// Use to start new game
function next() {
    //Functions Declaration
    //For prompting
    function display_state() {
        const first = "Round " + stringify(round);
        let second = "";
        let third = "";
        if (turn === "Computer") {
            second = "Player's Last move - X to " + stringify(your_prev);
            third = "Computer's Last move - O to " + stringify(com_prev);
        } else {
            second = "Computer's Last move - O to " + stringify(com_prev);
            third = "Player's Last move - X to " + stringify(your_prev);
        }
        let fourth = "";
        for (let i = 0; i < size; i = i + 1) {
            fourth = fourth + "\n" + stringify(game[i]);
        }
        return first + "\n" + second + "\n" + third + "\n" + fourth;
    }

    function is_valid_move(val, game) {
        return (stringify(val) ===
            game[math_floor((val - 1) / size)][(val - 1) % size]);
    }

    function your_move() {
        let temp = prompt(display_state() + "\n" + "Player's move (X)");
        temp = parse_int(temp, 10);

        // Re-prompt player for a valid move
        while (temp !== temp || temp < 1 
               || temp > size * size || !is_valid_move(temp, game)) {
            temp = prompt(display_state() + "\n" + "Invalid Move - Player's Move (X)");
            temp = parse_int(temp, 10);
        }

        your_prev = temp;

        // Place move piece
        game[math_floor((your_prev - 1) / size)][(your_prev - 1) % size] = "X";
    }

    function com_move() {
        // create simulated environment
        let sim = [];
        for (let i = 0; i < size; i = i + 1) {
            sim[i] = [];
            for (let j = 0; j < size; j = j + 1) {
                sim[i][j] = game[i][j];
            }
        }

        // function for getting the best possible value
        function optimal(arr, for_whom) {
            let best_index = null;
            let player_val = 0;
            let count = 0;
            // to choose a "randomised" move among the best choices
            function random(xs) {
                let priority = null;
                for (let i = xs; !is_null(i); i = tail(i)) {
                    if (head(i) === 5) {
                        priority = list(5);
                        break;
                    } else if (head(i) === 1) {
                        priority = pair(1, priority);
                    } else if (head(i) === 3) {
                        priority = pair(3, priority);
                    } else if (head(i) === 7) {
                        priority = pair(7, priority);
                    } else if (head(i) === 9) {
                        priority = pair(9, priority);
                    } else {}
                }
                if (is_null(priority)) {
                    return list_ref(xs,
                        math_floor(math_random() * count));
                } else {
                    return list_ref(priority,
                        math_floor(math_random() * length(priority)));
                }
            }

            for (let i = 0; i < array_length(arr); i = i + 1) {
                if (arr[i] === undefined) {
                    continue;
                } else {
                    if (for_whom === "Player") {
                        // sum all player's possible wins
                        player_val = player_val + arr[i];
                    } else {
                        // get computer's best move indexes
                        if (is_null(best_index)) {
                            best_index = list(i);
                        } else if (arr[i] > arr[head(best_index)]) {
                            count = 1;
                            best_index = list(i);
                        } else if (arr[i] === arr[head(best_index)]) {
                            count = count + 1;
                            best_index = pair(i, best_index);
                        } else {}
                    }
                }
            }
            if (for_whom === "Player") {
                return player_val;
            } else {
                // randomise a move from all the "best" choices
                return random(best_index);
            }
        }

        //start thinking mode
        thinking = true;
        let choice_arr = [];
        for (let i = 1; i <= size * size; i = i + 1) {
            if (is_valid_move(i, sim)) {
                sim[math_floor((i - 1) / size)][(i - 1) % size] = "O";
                const x = is_win_condition(sim);
                if (x > 0) {
                    // winning moves value
                    choice_arr[i] = x;
                } else {
                    let p_best_move = [];
                    // simulate player's move
                    for (let j = 1; j <= size * size; j = j + 1) {
                        if (is_valid_move(j, sim)) {
                            sim[math_floor((j - 1) / size)][(j - 1) % size] = "X";
                            p_best_move[j] = is_win_condition(sim);
                            // reset sim for next round
                            sim[math_floor((j - 1) / size)][(j - 1) % size] = stringify(j);
                        } else {
                            continue;
                        }
                    }
                    // save negative choices so that wont make 
                    // moves that results in computer loss the next round
                    choice_arr[i] = optimal(p_best_move, "Player");
                }
                // reset sim for next round
                sim[math_floor((i - 1) / size)][(i - 1) % size] = stringify(i);
            } else {}
        }
        com_prev = optimal(choice_arr, "Com");
        thinking = false;

        // play "best" move
        game[math_floor((com_prev - 1) / size)][(com_prev - 1) % size] = "O";
    }

    // Running code
    round = round + 1;

    if (turn === "Computer") {
        com_move();
    } else {
        your_move();
    }

    if (is_win_condition(game)) {
        const fresh = prompt(display_state() + "\n" + turn + " WINS" +
            "\n" + "Type 'N' to start new game");
        if (fresh === "n" || fresh === "N") {
            start();
        } else {
            if (turn === "Computer") {
                display("You LOSE");
            } else {
                display("You WIN");
            }
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
            if (turn === "Computer") {
                turn = "Player";
                next();
            } else {
                turn = "Computer";
                next();
            }
        }
    }

}
