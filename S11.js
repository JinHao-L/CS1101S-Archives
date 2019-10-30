function add_streams(s1, s2) {
    return is_null(s1) ?
        s2 :
        is_null(s2) ?
        s1 :
        pair(head(s1) + head(s2),
            () => add_streams(stream_tail(s1), stream_tail(s2)));
}

function scale_stream(c, stream) {
    return stream_map(x => c * x, stream);
}
const add_series = add_streams;
const scale_series = scale_stream;

function negate_series(s) {
    return scale_series(-1, s);
}

function subtract_series(s1, s2) {
    return add_series(s1, negate_series(s2));
}

function coeffs_to_series(list_of_coeffs) {
    const zeros = pair(0, () => zeros);

    function iter(list) {
        return is_null(list) ?
            zeros :
            pair(head(list),
                () => iter(tail(list)));
    }
    return iter(list_of_coeffs);
}
const non_neg_integers = integers_from(0);

function fun_to_series(fun) {
    return stream_map(fun, non_neg_integers);
}

// alt_ones: the stream 1,−1,1,−1,...
// const alt_ones = pair(1, ()=> pair(-1, ()=> alt_ones));
const alt_ones = pair(1, () => negate_series(alt_ones));
// const alt_ones = pair(1, ()=> subtract_series(
//                                     subtract_series(alt_ones, alt_ones), 
//                                     alt_ones));
// const alt_ones = pair(1, ()=> add_series(
//                                     add_series(alt_ones, negate_series(alt_ones)),
//                                     negate_series(alt_ones)));

// zeros: the inﬁnite stream of 0’s. 
const zeros = subtract_series(alt_ones, alt_ones);
// const zeros = add_series(alt_ones, negate_series(alt_ones));
// const zeros = scale_series(0, alt_ones);

// Series: 1 + x + x^2 + x^3 + ...
const s1 = pair(1, () => s1);

// Series: 1 + 2x + 3x^2 + 4x^3 + ...
const s2 = integers_from(1);

const get_coefficient = stream_ref;
const powers_of_tenth = fun_to_series(x => math_pow(1 / 10, x));

function term(series, x) {
    return is_null(series) ?
        coeffs_to_series(series) :
        pair(head(series) * head(x),
            () => term(stream_tail(series), stream_tail(x)));
}

function series_approx(term) {
    return pair(head(term), () => add_streams(series_approx(term), stream_tail(term)));
}
// eval_stream(series_approx(term(s2, powers_of_tenth)), 10);

function mul_series(s1, s2) {
    return pair(head(s1) * head(s2),
        () => add_series(
            scale_series(head(s2), stream_tail(s1)),
            mul_series(s1, stream_tail(s2))));
}

// eval_stream(mul_series(s1,s1), 10);
const one = coeffs_to_series(list(1,1,1,1,1));
const two = coeffs_to_series(list(1,2,3,2,1));
eval_stream(mul_series(one, two), 10);