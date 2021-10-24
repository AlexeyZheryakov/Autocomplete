import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Autocomplete from '.';

const options = [
  { name: 'Igor', id: 1, photoUrl: '', username: '' },
  { name: 'Nikita', id: 2, photoUrl: '', username: '' },
  { name: 'Alexei', id: 3, photoUrl: '', username: '' },
];

describe('Autocomplete', () => {
  it('render Autocomplete component', () => {
    const { getByPlaceholderText } = render(
      <Autocomplete isLoading={false} onChange={jest.fn()} value={''} options={[]} />
    );
    expect(getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('preloader check', () => {
    const { getByRole } = render(<Autocomplete isLoading={true} onChange={jest.fn()} value={''} options={[]} />);
    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  it('list opening', () => {
    const { getByText, getByPlaceholderText } = render(
      <Autocomplete isLoading={false} onChange={jest.fn()} value={''} options={options} />
    );
    fireEvent.focus(getByPlaceholderText('Search'));
    expect(getByText('Igor')).toBeInTheDocument();
  });

  it('entering a value and filtering the list', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <Autocomplete isLoading={false} onChange={jest.fn()} value={''} options={options} />
    );
    fireEvent.focus(getByPlaceholderText('Search'));
    userEvent.type(getByPlaceholderText('Search'), 'Alex');
    expect(getByText('Alexei')).toBeInTheDocument();
    expect(queryByText('Igor')).toBeNull();
    expect(queryByText('Nikita')).toBeNull();
  });

  it('click on a list item', () => {
    const { getByText, getByPlaceholderText } = render(
      <Autocomplete isLoading={false} onChange={jest.fn()} value={''} options={options} />
    );
    fireEvent.focus(getByPlaceholderText('Search'));
    userEvent.click(getByText('Igor'));
    expect(getByPlaceholderText('Search')).toHaveValue('Igor');
  });
});
