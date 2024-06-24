import { Button, Flex, Tooltip } from "@chakra-ui/react";
import { MouseEventHandler } from "react";

interface BenchmarkButtonProps {
  clicked: MouseEventHandler<HTMLButtonElement>;
}

export const BenchmarkButton = (props: BenchmarkButtonProps) => (
  <Flex alignSelf="flex-start">
    <Tooltip label="Compare different available solvers" color="white">
      <Button colorScheme="teal" size="md" onClick={props.clicked}>
        Benchmark solvers
      </Button>
    </Tooltip>
  </Flex>
);
