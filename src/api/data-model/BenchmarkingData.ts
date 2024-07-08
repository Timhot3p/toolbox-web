import { BenchmarkTableProps } from "../../components/solvers/BenchmarkTable";

export interface solverData {
    name: string;
    type: 'Qu' | 'Cl',
    complexity: string;
    expectedRuntime: (size: number[]) => number;
    bitsUsed: (size: number[]) => number;
}

export interface solverInstance {    
        solver: string,
        type: 'Qu' | 'Cl',
        complexity: string,
        expectedRuntime: string,
        bitsUsed: number,
        bitsAvailable: number,
}

export function solverToInstance(problemSize: number[], solver: solverData, bitsAvailable: number): solverInstance {
    return {
        solver: solver.name,
        type: solver.type,
        complexity: solver.complexity,
        expectedRuntime: `${solver.expectedRuntime(problemSize)}s`,
        bitsUsed: solver.bitsUsed(problemSize),
        bitsAvailable: bitsAvailable,
    };
}

export function solversToBenchmarkTableProps(problemSize: number[], solvers: solverData[], bitsAvailable: number): BenchmarkTableProps {
    return {
       dataRows: solvers.map(solver => solverToInstance(problemSize, solver, bitsAvailable)),
       problemSize: problemSize.join("; "),
    };
}

export const grover : solverData = {
    name: "Grovers Algorithm",
    type: "Qu",
    complexity: "O(√n)",
    expectedRuntime: ([size]) => Math.sqrt(size),
    bitsUsed: ([n, k]) => n + k + 1,
};

export const backtracking : solverData = {
    name: "Quantum Solver 1",
    type: "Qu",
    complexity: "O(n)",
    expectedRuntime: ([size]) => 10,
    bitsUsed: ([size]) => 10,
};

export const cdcl : solverData = {
    name: "Quantum Solver 1",
    type: "Qu",
    complexity: "O(n)",
    expectedRuntime: ([size]) => 10,
    bitsUsed: ([size]) => 10,
};
