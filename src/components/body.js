import { Box } from "@mui/material";
import React from "react";
import { Fragment } from "react";
import Table from "./table";

const Body = () => {
  return (
    <Fragment>
      <Box style={{display:'flex', justifyContent:'center', height:'70%'}}>
        <Box style={{ width: "80%", height: "500px", padding: "20px", marginTop:'30vh' }}>
          <Table />
        </Box>
      </Box>
    </Fragment>
  );
};
export default Body;
