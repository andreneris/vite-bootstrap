import { createColumnHelper } from '@tanstack/react-table';

type JSONSchema = {
  title: string;
  type: string;
  properties: Record<string, unknown>;
};

const columnHelper = createColumnHelper<any>();

export function convertJSONSchemaToColumns(jsonSchema: JSONSchema):any[]{
  const columns = [];

  // Loop through each property in the JSON schema and create a column for it
  for (const propertyName in jsonSchema.properties) {
    if (Object.prototype.hasOwnProperty.call(jsonSchema.properties, propertyName)) {
      const property = jsonSchema.properties[propertyName];

      // Extract relevant schema properties
      const accessor = propertyName;
      const Header = property.title ?? propertyName;

      const Cell = (cell: any) => {
        if (property.format === 'date-time') {
          return new Date(cell.getValue()).toLocaleString();
        }
        return cell.getValue();
      };


      const column = columnHelper.accessor(propertyName, {
        cell: Cell,//info => info.getValue(),
        header: () => <span>{Header}</span>,
        //footer: info => info.column.id,
      });

      columns.push(column);
    }

  }
  return columns;
}

/*
export function convertJSONSchemaToColumns1(jsonSchema: JSONSchema): Column[] {
  const columns: Column[] = [];

  // Loop through each property in the JSON schema and create a column for it
  for (const propertyName in jsonSchema.properties) {
    if (Object.prototype.hasOwnProperty.call(jsonSchema.properties, propertyName)) {
      const property = jsonSchema.properties[propertyName];
      const column: Column = {
        Header: propertyName,
        accessor: propertyName,
        // Add any other relevant column options here, such as Cell or width
      };
      columns.push(column);
    }
  }

  return columns;
}
*/