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
}

export interface BenchmarkTableProps {
    data: dataRow[];
}
  
  function BenchmarkTable({ data }: BenchmarkTableProps) {
    
    return (
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Each solvers expected performance</TableCaption>
          <Thead>
            <Tr>
              <Th>Solver</Th>
              <Th>Type</Th>
              <Th>Complexity</Th>              
              <Th>Expected Runtime</Th>
            </Tr>
          </Thead>
          <Tbody>
          {data.length === 0 ? (
              <Tr>
                <Td colSpan={3} textAlign="center"></Td>
              </Tr>
            ) : (
              data.map((row, index) => (
                <Tr key={index}>
                  <Td>{row.solver}</Td>
                  <Td>{row.type}</Td>
                  <Td>{row.complexity}</Td>
                  <Td>{row.expectedRuntime}</Td>
                </Tr>
              ))
            )}            
          </Tbody>
        </Table>
      </TableContainer>
    );
  }
  
  export default BenchmarkTable;
  