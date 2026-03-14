
import { render, screen } from '@testing-library/react';
import App from './App';

// Updated test to match the current app functionality
test('renders movie search UI', () => {
  render(<App />);
  // Assuming the app has a search input field
  const searchInput = screen.getByRole('searchbox');
  expect(searchInput).toBeInTheDocument();
});
