//https://hackmd.io/@iJ0HUIY1SBGdGRQR-ydWhA/ByAwB9woH

function find_power(map, r_start, c_start, r_end, c_end) {
    const row = array_length(map);
    const col = array_length(map[0]);
    
    if (r_start < 0 && r_start >= row && c_start < 0 && c_start >= col 
        && r_end < 0 && r_end >= row && c_end < 0 && c_end >= col) {
        error("invalid input");    
    } else {
        let val = 0;
        if(r_start === r_end) {
            if (c_start === c_end) {
                return map[r_end][c_start];
            } else {
                return accumulate((x,y) => map[r_start][x] + y, 
                                    0, 
                                    enum_list(c_start, c_end));
            }
        } else if(c_start === c_end) {
            if (r_start === r_end) {
                return map[r_end][c_start];
            } else {
                return accumulate((x,y) => map[x][c_start] + y, 
                                    0, 
                                    enum_list(r_start, r_end));
            }
        } else {
            const horz = enum_list(r_start, r_end);
            const vert = enum_list(c_start+1, c_end-1);
            val = accumulate((x,y) => map[x][c_start] + y,
                                0,
                                horz);
            val = accumulate((x,y) => map[x][c_end] + y,
                                val,
                                horz);
            val = accumulate((x,y) => map[r_start][x] + y,
                                val,
                                vert);
            val = accumulate((x,y) => map[r_end][x] + y,
                                val,
                                vert);
            return val;
        }
    }
}

const map = 
[[3,  1,  1,  1,  1,  1,  1],
 [1,  1,  1,  1,  2, -3,  1],
 [1,  0, -3,  2,  1,  1,  0],
 [1,  1,  1,  1,  3,  -333331,  -33331],
 [1,  2, -1,  1, -33333,  1000,  1000000],
 [1,  1,  1,  1,  -444444,  10000,  100000]];
 
// find_power(map, 1, 1, 2, 2);
find_power(map, 4, 5, 5, 6);


function find_max_power(map) {
    const n_row = array_length(map);
    const n_col = array_length(map[0]);
    let mem = map[0][0];
    let xs = null;
    function check(r_s, c_s, r_e, c_e) {
        const val = find_power(map, r_s, c_s, r_e, c_e);
        if (val > mem) {
            mem = val;
            xs = list(r_s, c_s, r_e, c_e);
        } else {}
    }
    for(let r1 = 0; r1 < n_col; r1 = r1 + 1) {
        for(let r2 = n_row-1; r2 >= r1; r2 = r2 - 1) {
            for(let c1 = 0; c1 < n_col; c1 = c1 + 1) {
                for(let c2 = n_col-1; c2 >= c1; c2 = c2 - 1) {
                    check(r1, c1, r2, c2);
                }
            }
        }
    }
    display(xs);
    return mem;
}
find_max_power(map);