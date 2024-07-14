import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BottomTabBar from './BottomTabBar';

test('renders BottomTabBar with Video and Gallery links', () => {
  const { getByText } = render(
    <MemoryRouter>
      <BottomTabBar />
    </MemoryRouter>
  );
  expect(getByText(/Video/i)).toBeInTheDocument();
  expect(getByText(/Gallery/i)).toBeInTheDocument();
});