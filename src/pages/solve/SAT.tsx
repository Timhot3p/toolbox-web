import { Divider, Heading, Spacer, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { baseUrl } from "../../api/ToolboxAPI";
import { Layout } from "../../components/layout/Layout";
import { EditorControls } from "../../components/solvers/EditorControls";
import { ProgressHandler } from "../../components/solvers/ProgressHandler";
import { TextArea } from "../../components/solvers/SAT/TextArea";
import { LogicalExpressionValidator } from "../../converter/dimacs/LogicalExpressionValidator";

const SAT: NextPage = () => {
  const logicalExpressionValidator = new LogicalExpressionValidator();

  const [logicalExpressionString, setLogicalExpressionString] = useState("");
  const [errorString, setErrorString] = useState("");

  return (
    <Layout>
      <Head>
        <title>ProvideQ</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        {/* TODO: replace favicon */}
      </Head>

      <Heading as="h1">SAT Solver</Heading>
      <Text color="text" align="justify">
        For a given Boolean formula, this algorithm checks if there is an
        interpretation that satisfies it. You can enter any boolean formula with
        any number of variables and combine them with boolean operators (i.e.,
        &quot;and&quot;, &quot;or&quot; and &quot;not&quot;).
      </Text>

      <Spacer />

      <EditorControls
        idleText={'Try "a and (not a or not b)" 👇'}
        errorText={errorString}
        onUpload={setLogicalExpressionString}
        editorContent={logicalExpressionString}
        documentationLink={`${baseUrl()}/webjars/swagger-ui/index.html#/sat`}
      />
      <TextArea
        problemString={logicalExpressionString}
        setProblemString={(value) => {
          setLogicalExpressionString(value);

          let errors = logicalExpressionValidator.validateLogicalExpression(
            value.toString()
          );

          if (errors) {
            setErrorString(errors.toString());
          } else {
            setErrorString("");
          }
        }}
      />
      <Divider />
      <ProgressHandler
        problemTypes={["sat"]}
        problemInput={logicalExpressionString}
      />
    </Layout>
  );
};

export default SAT;
