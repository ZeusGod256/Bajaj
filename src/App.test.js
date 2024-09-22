import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the input and submit button', () => {
  // Render the App component
  render(<App />);

  // Check for the presence of the textarea
  const textareaElement = screen.getByPlaceholderText(/Enter JSON input here/i);
  expect(textareaElement).toBeInTheDocument();

  // Check for the presence of the submit button
  const buttonElement = screen.getByText(/Submit/i);
  expect(buttonElement).toBeInTheDocument();
});