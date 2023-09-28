import type { NextPage } from "next";
import Head from "next/head";
import { Text, Heading, Link } from "@chakra-ui/react";
import { ProblemChooser } from "../components/landing-page/ProblemChooser";
import { Layout } from "../components/layout/Layout";
import { baseUrl } from "../api/ToolboxAPI";

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>ProvideQ</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        {/* TODO: replace favicon */}
      </Head>
      <Text color="text" align="justify" as="b">
        Welcome to the ProvideQ Toolbox!
      </Text>
      <Text color="text" align="justify">
        ProvideQ aims to enable the Enablers by providing Quantum Readiness for
        Optimization Providers. We collect quantum and classical algorithms for
        well-known optimization problems and implement solution strategies to
        decide which algorithms can provide the best solutions for a specific
        problem instance. This website represents the current prototype of our
        toolbox. It is currently in active development.
      </Text>
      <Text color="text" align="justify">
        Feel free to try it out!
      </Text>
      <Text color="text" align="justify">
        Our GitHub:{" "}
        <Link href="https://github.com/ProvideQ" color="blue.400">
          @ProvideQ
        </Link>
        <br />
        API documentation:{" "}
        <Link
          href={baseUrl() + "/webjars/swagger-ui/index.html"}
          color="blue.400"
        >
          OpenAPI definition
        </Link>
        <br />
        Contact:{" "}
        <Link href="mailto:provideq@lists.kit.edu" color="blue.400">
          provideq@lists.kit.edu
        </Link>
      </Text>

      <Heading as="h2" size="xl" pt="10">
        Solve a problem
      </Heading>

      <ProblemChooser />
    </Layout>
  );
};

export default Home;
