import { useContext, useEffect } from "react";
import Router from "next/router";

import { AuthContext } from "@/contexts/AuthContext";
import { withSSRAuth } from "@/utils/withSSRAuth";

export default function Dashboard() {
  const { user, signOut, isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <h1>Dashboard: {user}</h1>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
