import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('Autocomplete', () => {
  it('render Autocomplete component', () => {
    const { getByRole } = render(<App />);
    expect(getByRole('textbox')).toBeInTheDocument();
  });
});
