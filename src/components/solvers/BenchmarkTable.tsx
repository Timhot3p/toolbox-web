import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from "@chakra-ui/react";

export type dataRow = {
    solver: string;
    type: string;
    complexity: string;
    expectedRuntime: string;
    bitsUsed?: number;
    bitsAvailable?: number;
}

export interface BenchmarkTableProps {
    dataRows: dataRow[];
    problemSize: number;
}
  
  function BenchmarkTable({ dataRows, problemSize }: BenchmarkTableProps) {
    if (dataRows.length === 0) {
      return null;
    }
    return (
      <TableContainer>
        <Table variant="simple">
          
          <TableCaption>Each solvers expected performance for problem size n = {problemSize}</TableCaption>
          <Thead>
            <Tr>
              <Th>Solver</Th>
              <Th>Type</Th>
              <Th>Complexity</Th>              
              <Th>Expected Runtime</Th>
              <Th>Bits Used (Max)</Th>
            </Tr>
          </Thead>
          <Tbody>
          {dataRows.length === 0 ? (
              <Tr>
                <Td colSpan={3} textAlign="center"></Td>
              </Tr>
            ) : (
                dataRows.map((row, index) => (
                <Tr key={index}>
                  <Td>{row.solver}</Td>
                  <Td>{row.type}</Td>
                  <Td>{row.complexity}</Td>
                  <Td>{row.expectedRuntime}</Td>
                  <Td>{row.bitsUsed} ({row.bitsAvailable})</Td>
                </Tr>
              ))
            )}            
          </Tbody>
        </Table>
      </TableContainer>
    );
  }
  
  export default BenchmarkTable;
  