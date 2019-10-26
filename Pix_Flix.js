// Question 1

function identity_filter(src, dest) {
    const WIDTH = get_video_width();
    const HEIGHT = get_video_height();
    for (let i = 0; i < WIDTH; i = i + 1) {
        for (let j = 0; j < HEIGHT; j = j + 1) {
            copy_pixel(src[i][j], dest[i][j]);
        }
    }
}

apply_filter(identity_filter);


// Question 2

function negative_filter(src, dest) {
    const WIDTH = get_video_width();
    const HEIGHT = get_video_height();

    for (let i = 0; i < WIDTH; i = i + 1) {
        for (let j = 0; j < HEIGHT; j = j + 1) {
            const source = src[i][j];
            const red = 255 - red_of(source);
            const green = 255 - green_of(source);
            const blue = 255 - blue_of(source);
            set_rgb(dest[i][j], red, green, blue);
        }
    }
}

apply_filter(negative_filter);


