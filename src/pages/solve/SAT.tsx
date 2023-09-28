import Head from "next/head";
import React, { useState } from "react";
import type { NextPage } from "next";
import { TextArea } from "../../components/solvers/SAT/TextArea";
import { ProgressHandler } from "../../components/solvers/ProgressHandler";
import { Text, Divider, Heading, Spacer } from "@chakra-ui/react";
import { DimacsParser } from "../../converter/dimacs/DimacsParser";
import { LogicalExpressionParser } from "../../converter/dimacs/LogicalExpressionParser";
import { Layout } from "../../components/layout/Layout";
import { EditorControls } from "../../components/solvers/EditorControls";
import { baseUrl } from "../../api/ToolboxAPI";

const SAT: NextPage = () => {
  const logicalExpressionParser = new LogicalExpressionParser();

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
        any number of variables and combine them with boolean operators.
      </Text>

      <Spacer />

      <EditorControls
        idleText={'Try "a and not (not a or not b)" 👇'}
        errorText={errorString}
        onUpload={setLogicalExpressionString}
        editorContent={logicalExpressionString}
        documentationLink={`${baseUrl()}/webjars/swagger-ui/index.html#/sat`}
      />
      <TextArea
        problemString={logicalExpressionString}
        setProblemString={(value) => {
          setLogicalExpressionString(value);

          try {
            logicalExpressionParser.parseDimacs(value.toString());
            setErrorString("");
          } catch (e: any) {
            setErrorString(e.message);
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
