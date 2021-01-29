import { render, screen } from '@testing-library/react';
import { DataTable } from './DataTable';

describe('<DataTable/>', () => {
  it('should render table with no properties', () => {
    const {container} = render(<DataTable />);
    //const linkElement = screen.getByText(/Table/);
    expect(
      container.getElementsByClassName('header-row')[0].textContent
    ).toEqual('');
  });

  it('should render table with data', () => {
    const mockData = [
      {
        col1: 'test row 1 col 1',
        col2: 'test row 1 col 2',
      },
      {
        col1: 'test row 2 col 1',
        col2: 'test row 2 col 2',
      }
    ];
    render(
    <DataTable data={mockData}/>);
    const linkElement = screen.getByText(/col1/i);
    expect(linkElement).toBeInTheDocument();
    const linkElement2 = screen.getByText(/test row 2 col 2/i);
    expect(linkElement2).toBeInTheDocument();
  });
})

