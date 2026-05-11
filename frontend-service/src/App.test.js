import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Top Education brand', () => {
  render(<App />);
  const brandElements = screen.getAllByText(/top education/i);
  expect(brandElements.length).toBeGreaterThan(0);
});