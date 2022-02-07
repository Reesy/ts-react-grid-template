import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders grid', () => {
  render(<App />);
  const gridComponent = screen.getByText(/a/i);
  expect(gridComponent).toBeInTheDocument();
});


// I want a test to see if the grid component is present in the app component.