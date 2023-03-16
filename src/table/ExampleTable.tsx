import { RJSFSchema } from '@rjsf/utils';
import * as React from 'react'
import {
  getSortedRowModel,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Table as BTable } from 'react-bootstrap'
import {convertJSONSchemaToColumns} from '../utils/JsonSchemaToColumns';




// The jsonSchemaToColumns function from my previous answer
/*
function jsonSchemaToColumns(schema: RJSFSchema): any[] {
  // ... function code here ...
}*/

const schema: RJSFSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer',title:'#' },
    name: { type: 'string', title: 'Full Name' },
    email: { type: 'string', format: 'email' },
    dateOfBirth: { type: 'string', format: 'date-time' },
  },
};

//const columns: ColumnDescription[] = jsonSchemaToColumns(schema);
const defaultData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', dateOfBirth: '1980-01-01T00:00:00Z' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', dateOfBirth: '1990-01-01T00:00:00Z' },
];

export function ExampleTable() {
  
  return (
    <div>
<MyTable defaultData={defaultData} schema={schema}/>
    </div>
    
    );
}

function MyTable({ defaultData , schema }: { defaultData: any[]; schema: RJSFSchema }) {
  const columns = convertJSONSchemaToColumns(schema);
  const [sorting, setSorting] = React.useState<SortingState>([])

  const [data, setData] = React.useState(() => [...defaultData])
  const rerender = React.useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  })
  return (
    <div className="p-2">
      <BTable striped bordered hover>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                  <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </BTable>
      {/*}
      <div className="h-4">
        <button onClick={() => rerender()} className="border p-2">
          Rerender
        </button>
      </div>*/}
    </div>
  )
 
 
  /*
  (
    <table {...getTableProps()} className="table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );*/
}
