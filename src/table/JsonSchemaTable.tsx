import { RJSFSchema } from '@rjsf/utils';
import * as React from 'react';
import {
  getSortedRowModel,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Table as BTable } from 'react-bootstrap';
import { convertJSONSchemaToColumns } from '../utils/JsonSchemaToColumns';



/*

export function JsonSchemaTable() {
  
  return (
    <div>
<MyTable defaultData={defaultData} schema={schema}/>
    </div>
    
    );
} */

export function JTable({
  defaultData,
  schema,
  onActionClick,
}: {
  defaultData: any[],
  schema: RJSFSchema,
  onActionClick: any
}) {
  const columns = convertJSONSchemaToColumns(schema,onActionClick);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  //const [data, setData] = React.useState(() => [...defaultData]);
  const data= defaultData;
  //console.log(defaultData)
  const rerender = React.useReducer(() => ({}), {})[1];

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
  });
  return (
    <div className="p-2">
      <BTable striped bordered hover>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
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
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
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
  );
}
