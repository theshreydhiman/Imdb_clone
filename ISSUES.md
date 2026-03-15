# Functional Issues

## Issue #1: Movie data not rendering — wrong OMDB API property names in movieReview.js

**Severity:** Critical

In `src/components/movieReview.js`, the component accesses movie properties using lowercase names (`rivew.title`, `rivew.poster`, `rivew.rating`), but the OMDB API returns data with PascalCase property names (`Title`, `Poster`, `imdbRating`).

**Actual Behavior:** Nothing renders because `rivew.title`, `rivew.poster`, and `rivew.rating` are all `undefined`.

**Fix:** Update property accesses to match OMDB API response: `Title`, `Poster`, `imdbRating`.

---

## Issue #2: Search results accumulate instead of replacing on new search

**Severity:** High

In `src/App.js` line 39, `setState` appends new results to existing ones:

```js
this.setState((prevState) => ({ Rivew: [...prevState.Rivew, ...filteredResults] }));
```

**Actual Behavior:** Each new search appends results to the list, causing duplicate/stale movies to pile up.

**Fix:** Replace the spread of `prevState.Rivew` so new results replace old ones:

```js
this.setState({ Rivew: filteredResults });
```

---

## Issue #3: JSX comment rendered as visible text on page

**Severity:** Medium

In `src/components/movieReview.js` line 21:

```jsx
{Rivew} // Render the Rivew variable
```

The `// Render the Rivew variable` text is not inside a JSX comment block, so it renders as visible text in the browser.

**Fix:** Remove the inline comment or convert to a proper JSX comment.

---

## Issue #4: Hardcoded debug text "movieReview" displayed to users

**Severity:** Medium

In `src/components/movieReview.js` line 19, there is hardcoded debug text `movieReview` that renders at the top of the movie results section.

**Fix:** Remove the `movieReview` text and the `<br />` tag from the component's return JSX.

---

## Issue #5: Empty search query triggers unnecessary API call

**Severity:** Medium

In `src/searchInput.js`, the form can be submitted with an empty input value. There is no validation to prevent submitting a blank search query.

**Actual Behavior:** An empty string is passed to the OMDB API, wasting an API call and returning no useful results.

**Fix:** Add input validation in `onFormSubmit` to reject empty/whitespace-only queries:

```js
onFormSubmit = (e) => {
  e.preventDefault();
  if (this.state.name.trim() === "") return;
  this.props.onSearchSubmit(this.state.name);
};
```

---

## Issue #6: Semantic UI CSS loaded over HTTP causes mixed content blocking

**Severity:** High

In `public/index.html` line 5, Semantic UI CSS is loaded over plain HTTP:

```html
<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" />
```

**Actual Behavior:** When the app is served over HTTPS, the browser blocks the HTTP resource, causing all Semantic UI styles to fail. The entire UI breaks.

**Fix:** Change `http://` to `https://`.

---

## Issue #7: Error messages are never displayed to the user

**Severity:** High

`App.js` sets an `error` state and passes it as a prop to `Moviereview`, but `movieReview.js` never reads or renders `props.error`. The error message is silently ignored.

**Actual Behavior:** When a search fails or returns no results, the user sees no feedback.

**Fix:** Render the error message in `movieReview.js`:

```jsx
{props.error && <div className="ui error message"><p>{props.error}</p></div>}
```

---

## Issue #8: No loading indicator while fetching search results

**Severity:** Medium

When a user submits a search, multiple API calls are made (one search + one per result for details). There is no loading state or spinner shown during this time.

**Actual Behavior:** The UI appears frozen/unresponsive while waiting for API responses.

**Fix:** Add a `loading` state to `App.js`, set it before/after API calls, and render a loading indicator.

---

## Issue #9: Test fails — search input role mismatch (text vs searchbox)

**Severity:** Medium

In `src/App.test.js` line 9, the test expects `getByRole('searchbox')`, but the input in `searchInput.js` has `type="text"` which has the role `textbox`, not `searchbox`.

**Actual Behavior:** The test fails because no element with the `searchbox` role exists in the DOM.

**Fix:** Change the input type to `search` in `searchInput.js`, or update the test to use `getByRole('textbox')`.

---

## Issue #10: Array index used as React key instead of unique movie ID

**Severity:** Low

In `src/components/movieReview.js` line 10, array index is used as the React key:

```jsx
<div key={index}>
```

Each OMDB result has a unique `imdbID` that should be used instead.

**Actual Behavior:** Using index as key causes incorrect component reuse and potential rendering bugs when the list changes.

**Fix:** Use `imdbID` as the key:

```jsx
<div key={rivew.imdbID}>
```
