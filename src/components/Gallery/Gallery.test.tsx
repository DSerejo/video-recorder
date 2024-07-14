import React from 'react';
import { render } from '@testing-library/react';
import Gallery from './Gallery';

test('renders Gallery component with dummy message', () => {
  const { getByText } = render(<Gallery />);
  expect(getByText(/Gallery Component - Coming Soon!/i)).toBeInTheDocument();
});