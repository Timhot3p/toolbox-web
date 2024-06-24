import { Box, Center, Divider, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { Solution } from "../../api/data-model/Solution";
import { SolveRequest } from "../../api/data-model/SolveRequest";
import { postProblem } from "../../api/ToolboxAPI";
import { Container } from "../Container";
import { GoButton } from "./buttons/GoButton";
import { SolutionView } from "./SolutionView";
import { SolverPicker } from "./SolverPicker";
import { BenchmarkButton } from "./buttons/BenchmarkButton";
import BenchmarkTable, { dataRow } from "./BenchmarkTable";

export interface ProgressHandlerProps<T> {
  /**
   * List of problem types that should be solved with the given input.
   */
  problemTypes: string[];
  problemInput: T;
}

export const ProgressHandler = <T extends {}>(
  props: ProgressHandlerProps<T>
) => {
  const [wasClicked, setClicked] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [solutions, setSolutions] = useState<Solution[]>();
  const [solveRequest, setSolveRequest] = useState<SolveRequest<T>>({
    requestContent: props.problemInput,
    requestedSubSolveRequests: {},
  });

  async function startSolving() {
    setClicked(true);
    setFinished(false);

    let newSolveRequest: SolveRequest<T> = {
      ...solveRequest,
      requestContent: props.problemInput,
    };

    setSolveRequest(newSolveRequest);
    Promise.all(
      props.problemTypes.map((problemType) =>
        postProblem(problemType, newSolveRequest)
      )
    ).then((solutions) => {
      setSolutions(solutions);
      setFinished(true);
    });
  }

  const exampleData: dataRow[] = 
    [
      {
        solver: "Quantum Solver 1",
        type: "Qu",
        complexity: "O(n)",
        expectedRuntime: "10s",
      },
      {
        solver: "Quantum Solver 2",
        type: "Qu",
        complexity: "O(log(n))",
        expectedRuntime: "3s",
      },
      {
        solver: "Classical Solver 1",
        type: "Cl",
        complexity: "O(n²)",
        expectedRuntime: "0,1s",
      },
    ];
  

  const [data, setData] = useState<dataRow[]>([]);
  const benchmarkButtonClick = () => {
    setData(exampleData);
  };

  return (
    <Container>
      {!wasClicked || finished ? (
        <HStack alignContent={"end"}>
          <Center>
            <BenchmarkButton clicked={benchmarkButtonClick} />
          </Center>
          {props.problemTypes.map((problemType) => (
            <SolverPicker
              key={problemType}
              problemType={problemType}
              setSolveRequest={(solverChoice) => {
                setSolveRequest({
                  ...solveRequest,
                  requestedSolverId: solverChoice.requestedSolverId,
                  requestedSubSolveRequests:
                    solveRequest.requestedSubSolveRequests,
                });
              }}
            />
          ))}
          <Center>
            <GoButton clicked={startSolving} />
          </Center>
        </HStack>
      ) : null}

      {wasClicked
        ? solutions?.map((s) => (
            <Box
              key={`${s.solverName}-${s.id}`}
              w="50pc"
              m={2}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={2}
            >
              <SolutionView key={s.id} solution={s} finished={finished} />
            </Box>
          ))
        : null}

        <Divider my={4} />  

        <BenchmarkTable data={data} />
    </Container>
  );
};
