# Functional Issues

1. **`forEach` overwrites state on each iteration** (`App.js:23`) — `setState({ Rivew: Response.data })` replaces the entire array with a single movie object each loop iteration, so only the last result is ever stored.

2. **`forEach` doesn't return anything** (`movieReview.js:6`) — `Array.forEach` always returns `undefined`. The code assigns it to `Rivew` expecting JSX, but nothing renders. It should use `.map()` instead.

3. **`Rivew` state is an object, but component treats it as an array** — After issue #1, `state.Rivew` holds a single movie object (not an array), yet `movieReview.js:6` calls `.forEach()` on it, which will crash with `TypeError: props.Rivew.forEach is not a function`.

4. **No error handling for empty/failed searches** (`App.js:18`) — If the search returns no results, `response.data.Search` is `undefined`, causing `Cannot read property 'forEach' of undefined` crash.

5. **Renders `{Image}` instead of actual data** (`movieReview.js:13`) — The component references an undefined variable `Image` instead of rendering the `Rivew` variable or any actual movie data. Nothing meaningful is ever displayed.
