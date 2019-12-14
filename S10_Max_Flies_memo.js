function make_tiles(r,c, flies) {
    let tiles = [];
    for (let i = 0; i < r; i = i + 1) {
        tiles[i] = [];
        for (let j = 0; j < c; j = j + 1) {
            tiles[i][j] = math_floor(math_random()*flies + 1);
        }
    }
    return tiles;
}

function memo_max_flies_to_eat(tile_flies) {
    let mem = [];
    
    function read(i, j) {
        return mem[i] === undefined
            ? undefined
            : mem[i][j];
    }
    
    function write(i, j, val) {
        if (mem[i] === undefined) {
            mem[i] = [];
        } else {}
        mem[i][j] = val;
    }
    
    const depth = array_length(tile_flies);
    const breadth = array_length(tile_flies[0]);
    
    function helper(i, j) {
        if (i >= depth || j < 0 || j >= breadth) {
            return 0;
        } else {
            if (read(i, j) !== undefined) {
                return mem[i][j];
            } else {
                const current = tile_flies[i][j];
                const left = helper(i+1, j-1);
                const center = helper(i+1, j);
                const right = helper(i+1, j+1);
                const x = current + math_max(left, center, right);
                write(i, j, x);
                return x;
            }
        }
    }
    
    let max = 0;
    for (let k = 0; k < breadth; k = k + 1) {
        max = math_max(max, helper(0, k));
    }
    return max;
}

const tile_flies = [[3, 1, 7, 4, 2],
                    [2, 1, 3, 1, 1],
                    [1, 2, 2, 1, 8],
                    [2, 2, 1, 5, 3],
                    [2, 1, 4, 4, 4],
                    [5, 7, 2, 5, 1]];
// const tile_flies = make_tiles(5, 6, 10);
display(tile_flies);
memo_max_flies_to_eat(tile_flies);