import React from "react";

import TableData from "../components/TableData/TableData";
import NavigationBar from "../components/NavigationBar";

export default async function page() {
  const data = await fetch("https://jsonplaceholder.typicode.com/comments");
  const comments = await data.json();

  return (
    <>
      <NavigationBar />
      
      <TableData comments={comments} />
    </>
  );
}
