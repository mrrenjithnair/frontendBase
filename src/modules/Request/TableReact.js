import React from 'react'
import ReactDOM from "react-dom";
import { useTable, usePagination, useSortBy } from 'react-table'

const originalData = [
  { firstName: "aaaaa", status: "Pending", visits: 155 },
  { firstName: "aabFaa", status: "Pending", visits: 155 },
  { firstName: "adaAAaaa", status: "Approved", visits: 1785 },
  { firstName: "aAaaaa", status: "Approved", visits: 175 },
  { firstName: "adaSaaa", status: "Cancelled", visits: 165 },
  { firstName: "aasaaa", status: "Cancelled", visits: 157 },
  { firstName: "aweaaaaaewea", status: "Approved", visits: 153 },
  { firstName: "aaaaaa", status: "Submitted", visits: 155 },
  { firstName: "aaaeweaa", status: "Pending", visits: 1555 },
  { firstName: "aabFaa", status: "Submitted", visits: 155 },
  { firstName: "adaAAadsdweaa", status: "Approved", visits: 17585 },
  { firstName: "aAaaaa", status: "Approved", visits: 175 }
];


// const Styles = styled.div`
//   padding: 1rem;

//   table {
//     border-spacing: 0;
//     border: 1px solid black;

//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }

//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;

//       :last-child {
//         border-right: 0;
//       }
//     }
//   }

//   .pagination {
//     padding: 0.5rem;
//   }
// `

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  )

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span></th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <div style={{'display':'flex',padding:'0px 10px'}}>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </div>
       
      </div>
    </>
  )
}
{/* <div style={{'display':'flex'}}>
<div style={{'display':'flex'}}>
    | Go to page:{' '}
    <input
      type="number"
      defaultValue={pageIndex + 1}
      onChange={e => {
        const page = e.target.value ? Number(e.target.value) - 1 : 0
        gotoPage(page)
      }}
      style={{ width: '100px' }}
    />
  </div>
  <select
    value={pageSize}
    onChange={e => {
      setPageSize(Number(e.target.value))
    }}
  >
    {[10, 20, 30, 40, 50].map(pageSize => (
      <option key={pageSize} value={pageSize}>
        Show {pageSize}
      </option>
    ))}
  </select>
</div> */}
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orginalData: this.props.data,
      data: this.props.data,
      columns: this.props.columns ? this.props.columns : [],
      searchInput: ""
    };
  }
  componentDidMount() {

  }

  handleChange = event => {
    this.setState({ searchInput: event.target.value }, () => {
      this.globalSearch();
    });
  };

  globalSearch = () => {
    let { searchInput } = this.state;
    let filteredData = this.state.orginalData.filter(value => {
      console.log('value',value)
      return (
        
        (value.playerName && value.playerName.toLowerCase().includes(searchInput.toLowerCase())) ||
        (value.playerMobile && value.playerMobile.toLowerCase().includes(searchInput.toLowerCase())) ||
        (value.playerEmail && value.playerEmail.toLowerCase().includes(searchInput.toLowerCase()) )
      );
    });
    this.setState({ data: filteredData });
  };

  render() {
    let { data, columns, searchInput } = this.state;
    return (
      <div>
        <br />
        <input
          size="large"
          name="searchInput"
          placeholder="Search..." 
          value={searchInput || ""}
          className='input'
          onChange={this.handleChange}
          label="Search"
        />
        <br />
        <br />
        <Table
          data={this.state.data}
          columns={this.state.columns}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// function App(props) {
//   return (
//     <Table columns={props.columns} data={props.data} />
//   )
// }

// export default App
