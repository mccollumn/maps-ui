import { render, screen, fireEvent } from '@testing-library/react';
import { DataTable } from './DataTable';

describe('<DataTable/>', () => {
  it('should render table with no properties', () => {
    const { container } = render(<DataTable />);
    expect(
      container.getElementsByClassName('header-row')[0].textContent
    ).toEqual('');
  });

  it('should render table with empty array', () => {
    const { container } = render(<DataTable data={[]} />);
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
      <DataTable data={mockData} />);
    const linkElement = screen.getByText(/col1/i);
    expect(linkElement).toBeInTheDocument();
    const linkElement2 = screen.getByText(/test row 2 col 2/i);
    expect(linkElement2).toBeInTheDocument();
  });

  it('should show custom data', () => {
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
    const custom = {
      col2: { name: "COLUMN2" }
    }
    render(
      <DataTable data={mockData} custom={custom} />);
    const linkElement = screen.getByText("COLUMN2");
    expect(linkElement).toBeInTheDocument();
  });

  it('should show custom data', () => {
    const mockRowClick = jest.fn();
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
    const custom = {
      rowClick: mockRowClick
    }
    const { getByText } = render(
      <DataTable data={mockData} custom={custom} />
    );
    const node = getByText('test row 2 col 2');
    fireEvent.click(node);
    expect(mockRowClick).toBeCalledWith({
      col1: 'test row 2 col 1',
      col2: 'test row 2 col 2',
    });
  });
})

