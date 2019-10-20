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

function max_flies_to_eat(tile_flies) {
    const depth = array_length(tile_flies);
    const breadth = array_length(tile_flies[0]);
    
    function helper(i, j, result) {
        if (i >= depth) {
            return result;
        } else {
            result = result + tile_flies[i][j];
            let left = 0;
            let right = 0;
            if(j === 0) {
            } else {
                left = helper(i+1, j-1, result);
            }
            const center = helper(i+1, j, result);
            if(j === breadth-1) {
            } else {
                right = helper(i+1, j+1, result);
            }
            
            const x = math_max(left, center, right);
            return x;
        }
    }
    let max = 0;
    for (let k = 0; k < breadth; k = k + 1) {
        max = math_max(max, helper(0, k, 0));
    }
    return max;
}

const tile_flies = [[3, 1, 7, 4, 2],
                    [2, 1, 3, 1, 1],
                    [1, 2, 2, 1, 8],
                    [2, 2, 1, 5, 3],
                    [2, 1, 4, 4, 4],
                    [5, 7, 2, 5, 1]];
display(tile_flies);
max_flies_to_eat(tile_flies);