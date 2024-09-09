import {
  Table,
  TableRow,
  TableColumn,
  TableHeader,
  TableBody,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import { File } from "@/context/types";

interface tableProps {
  rows: File[] | number[] | any;
}

export default function FilesTable(props: tableProps) {
  let rows: File[] = props.rows;
  const columns = [
    { key: "name", label: "Name" },
    { key: "size", label: "Size (bytes)" },
  ];

  return (
    <Table isStriped aria-label="Example table with dynamic content">
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={index}>
            {(columnKey) => (
              <TableCell>{getKeyValue(row, columnKey)}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
