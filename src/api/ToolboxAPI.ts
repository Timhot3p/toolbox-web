import { SubRoutineDefinition } from "../components/solvers/SubRoutineDefinition";
import { ProblemSolver } from "../components/solvers/ProblemSolver";
import { Solution } from "../components/solvers/Solution";
import { SolutionStatus } from "../components/solvers/SolutionStatus";
import { SolveRequest } from "../components/solvers/SolveRequest";

export async function postProblem<T>(problemUrlFragment: string, solveRequest: SolveRequest<T>): Promise<Solution> {
    return fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/solve/${problemUrlFragment}`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(solveRequest)
        })
        .then(response => response.json())
        .then(json => json as Solution)
        .catch(reason => {
            return {
                id: -1,
                status: SolutionStatus.INVALID,
                solverName: "",
                executionMilliseconds: 0,
                solutionData: "",
                debugData: "",
                metaData: "",
                error: `${reason}`,
            }
        });
}

export async function fetchSolvers(problemUrlFragment: string): Promise<ProblemSolver[]> {
    return fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/solvers/${problemUrlFragment}`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(json => json as ProblemSolver[])
        .catch(reason => {
            console.error(reason)
            alert(`Could not retrieve solvers of type ${problemUrlFragment}.`)
            return []
        });
}

export async function fetchSubRoutines(problemUrlFragment: string, solverId: string): Promise<SubRoutineDefinition[]> {
    return fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/sub-routines/${problemUrlFragment}?${new URLSearchParams({ id: solverId })}`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .catch(reason => {
            console.error(reason)
            alert(`Could not retrieve subroutines of solver ${solverId}.`)
            return []
        });
}
