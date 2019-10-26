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
    if (is_win_condition() || round === size * size || round === 0) {
        size = n;
        new_game();
        display("-------------");
        return "Tic-tac-toe " + stringify(n) + "x" + stringify(n) + " board";
    } else {
        return "Finish current game or reset game";
    }
}

// Use to start a new game
function new_game() {
    function who_first() {
        const u_first = prompt("Go First? Y/N");
        if (u_first === "Y" || u_first === "y") {
            turn = "Player";
            return turn + " next (X)";
        } else if (u_first === "N" || u_first === "n") {
            turn = "Computer";
            return turn + " next (O)";
        } else {
            who_first();
        }
    }
    game = [];
    round = 0;
    com_prev = null;
    your_prev = null;

    // show Board
    display("Round " + stringify(round));
    display("-------------");
    for (let i = 0; i < size; i = i + 1) {
        game[i] = [];
        for (let j = 0; j < size; j = j + 1) {
            game[i][j] = stringify(size * i + j + 1);
        }
        display(game[i]);
    }

    return who_first();
}

// Use to continue game and recieve prompt for next move
function next() {
    //Functions Declaration
    function display_state() {
        display("Round " + stringify(round));
        if (turn === "Computer") {
            display("Player's Last move - X to " + stringify(your_prev));
            display("Computer's Last move - O to " + stringify(com_prev));
        } else {
            display("Computer's Last move - O to " + stringify(com_prev));
            display("Player's Last move - X to " + stringify(your_prev));
        }
        display("-------------");
        for (let i = 0; i < size; i = i + 1) {
            display(game[i]);
        }
    }

    function is_valid_move(val, game) {
        return (stringify(val) ===
            game[math_floor((val - 1) / size)][(val - 1) % size]);
    }

    function your_move() {
        your_prev = prompt("Player's move (X)");
        your_prev = parse_int(your_prev, 10);

        // Re-prompt player for a valid move
        while (!is_valid_move(your_prev, game) || your_prev < 1 || your_prev > size * size) {
            your_prev = prompt("Invalid Move - Player's Move (X)");
            your_prev = parse_int(your_prev, 10);
        }

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
    if (is_win_condition(game)) {
        return turn + " WINS \n Start New?";
    } else {
        if (round === size * size) {
            // Did not win and no more available moves
            return "Tie Game \n Start New?";
        } else {
            round = round + 1;

            if (turn === "Computer") {
                com_move();
            } else {
                your_move();
            }

            display_state();

            if (is_win_condition(game)) {
                return turn + " WINS";
            } else {
                if (round === size * size) {
                    return "Tie Game";
                } else {
                    if (turn === "Computer") {
                        turn = "Player";
                        return turn + " next (X)";
                    } else {
                        turn = "Computer";
                        return turn + " next (O)";
                    }
                }
            }
        }
    }
}