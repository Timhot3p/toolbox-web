import { Box, Container, Select, Text, Tooltip } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { ProblemSolver } from "../../api/data-model/ProblemSolver";
import { SolverChoice } from "../../api/data-model/SolveRequest";
import { SubRoutineDefinition } from "../../api/data-model/SubRoutineDefinition";
import { fetchSolvers, fetchSubRoutines } from "../../api/ToolboxAPI";
import { SettingsView } from "./SettingsView";

export interface SolverPickerProps {
  problemType: string;

  /**
   * Only needed internally if this should show a sub routine
   */
  subRoutineDefinition?: SubRoutineDefinition;
  setSolveRequest: (subRoutines: SolverChoice) => void;
}

export const SolverPicker = (props: SolverPickerProps) => {
  const [loadingSolvers, setLoadingSolvers] = useState<boolean>(true);
  let [solvers, setSolvers] = useState<ProblemSolver[]>([]);
  const [subRoutines, setSubRoutines] = useState<
    SubRoutineDefinition[] | undefined
  >(undefined);
  const [solveRequest, setSolveRequest] = useState<SolverChoice>({
    requestedSubSolveRequests: {},
  });

  useEffect(() => {
    setSubRoutines(undefined);
    setLoadingSolvers(true);
    fetchSolvers(props.problemType).then((solvers: ProblemSolver[]) => {
      setSolvers(solvers);
      setLoadingSolvers(false);
    });
  }, [props.problemType]);

  function onSolverChanged(e: ChangeEvent<HTMLSelectElement>) {
    if (
      e.target.selectedIndex == 0 ||
      e.target.selectedIndex > solvers.length
    ) {
      let newSolveRequest: SolverChoice = {
        ...solveRequest,
        requestedSolverId: undefined,
      };

      setSolveRequest(newSolveRequest);
      props.setSolveRequest?.(newSolveRequest);

      setSubRoutines(undefined);
    } else {
      let solver = solvers[e.target.selectedIndex - 1];
      let newSolveRequest: SolverChoice = {
        ...solveRequest,
        requestedSolverId: solver.id,
      };

      setSolveRequest(newSolveRequest);
      props.setSolveRequest?.(newSolveRequest);

      fetchSubRoutines(props.problemType, solver.id).then((subRoutines) =>
        setSubRoutines(subRoutines)
      );
    }
  }

  const SolverSelection = () => {

    solvers = [{ id: "1", name: "Quantum Solver 1" }, { id: "2", name: "Quantum Solver 2" }, { id: "3", name: "Classical Solver 1" }]
    return (
      <Container>
        {props.subRoutineDefinition == undefined ? null : (
          <Text>{props.subRoutineDefinition?.type} Subroutine:</Text>
        )}
        <Text>{props.subRoutineDefinition?.description}</Text>
        <Tooltip
          label="Use this dropdown to select the meta solver strategy"
          color="white"
        >
          <Select margin="2" onChange={onSolverChanged}>
            <option selected={solveRequest.requestedSolverId === undefined}>
              Automated Solver Selection
            </option>
            <optgroup label="Use Specific Solvers">
              {solvers.map((s: ProblemSolver) => (
                <option
                  key={s.id}
                  selected={solveRequest.requestedSolverId === s.id}
                >
                  {s.name}
                </option>
              ))}
            </optgroup>
          </Select>
        </Tooltip>
      </Container>
    );
  };

  return (
    <Container>
      {loadingSolvers ? <Text>Loading solvers...</Text> : <SolverSelection />}

      {solveRequest.requestedSolverId == undefined ? (
        <SettingsView
          problemType={props.problemType}
          settingChanged={(settings) => {
            let newSolveRequest: SolverChoice = {
              ...solveRequest,
              requestedMetaSolverSettings: settings,
            };

            setSolveRequest(newSolveRequest);
            props.setSolveRequest(newSolveRequest);
          }}
        />
      ) : null}

      {subRoutines == undefined || subRoutines.length == 0 ? null : (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={2}>
          {subRoutines.map((def) => (
            <SolverPicker
              key={def.type}
              problemType={def.type}
              subRoutineDefinition={def}
              setSolveRequest={(subSolveRequest) => {
                let newSolveRequest: SolverChoice = {
                  ...solveRequest,
                  requestedSubSolveRequests: {
                    ...solveRequest.requestedSubSolveRequests,
                    [def.type]: subSolveRequest,
                  },
                };
                setSolveRequest(newSolveRequest);
                props.setSolveRequest?.(newSolveRequest);
              }}
            />
          ))}
        </Box>
      )}
    </Container>
  );
};
