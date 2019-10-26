//Game of Life
function make_game(rows, cols) {
    const game = [];

    function helper(x, y) {
        if (y === 0) {
            if (x > 0) {
                game[x - 1] = [];
                helper(x - 1, cols);
            } else {}
        } else {
            game[x][y - 1] = 0;
            helper(x, y - 1);
        }
    }

    helper(rows, 0);
    return game;
}

function num_of_live_neighbours(game, n, r, c) {

    const r_chk = [((r - 1 + n) % n), r, ((r + 1) % n)];
    const c_chk = [((c - 1 + n) % n), c, ((c + 1) % n)];

    let result = -1 * game[r][c];

    for (let i = 0; i < 3; i = i + 1) {
        for (let j = 0; j < 3; j = j + 1) {
            result = result + game[r_chk[i]][c_chk[j]];
        }
    }
    return result;
}

function next_gen(game, n) {
    const next = make_game(n, n);

    for (let i = 0; i < n; i = i + 1) {
        for (let j = 0; j < n; j = j + 1) {
            const x = num_of_live_neighbours(game, n, i, j);
            const status = game[i][j];
            if (status === 0) {
                if (x === 3) {
                    next[i][j] = 1;
                } else {
                    next[i][j] = 0;
                }
            } else {
                if ((x === 2) && (x === 3)) {
                    next[i][j] = 1;
                } else {
                    next[i][j] = 0;
                }
            }
        }
    }

    return next;
}

function random(n, number_alive) {
    if (number_alive > n * n) {
        return "Error: Board is too small";
    } else {
        const game = make_game(n, n);
        let i = number_alive;
        while (i > 0) {
            const x = math_floor(math_random() * n);
            const y = math_floor(math_random() * n);

            if (game[x][y] === 1) {
                continue;
            } else {
                game[x][y] = 1;
                i = i - 1;
            }
        }
        return game;
    }
}

function is_game_over(game) {
    const len = array_length(game);
    if (len >= 3) {
        let result = true;
        for (let i = 0; i < len; i = i + 1) {
            for (let j = 0; j < len; j = j + 1) {
                if (game[i][j] === 1) {
                    result = false;
                    break;
                } else {
                    continue;
                }
            }
        }
        return result;
    } else {

    }
}

let game = [];
let gen_count = 0;
const start = (n, number_alive) => {
    game = random(n, number_alive);
    gen_count = 0;
    display("GENERATION: " + stringify(gen_count));
    return game;
};
const next = () => {
    gen_count = gen_count + 1;
    display("GENERATION: " + stringify(gen_count));
    game = next_gen(game, array_length(game));
    if (is_game_over(game)) {
        display(game);
        game = [];
        return "GAME OVER in GEN " + stringify(gen_count);
    } else {
        return game;
    }
};