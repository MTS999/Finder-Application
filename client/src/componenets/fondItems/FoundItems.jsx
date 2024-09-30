import React from "react";
import { Container, Box, Typography } from "@mui/material";
import useGetFindItems from "../../hooks/useGetFindItems";
import FoundItem from "./FoundItem";

const FoundItems = () => {
  const { loading, findItems } = useGetFindItems();

  // console.log("Find-items", findItems);

  return (
    <>
       <Typography variant="h4" color="initial" textAlign={"center"}>
          Find Items
        </Typography>
      <Box
        display={"flex"}
        width={"100%"}
        flexWrap={"wrap"}
        justifyContent={"space-evenly"}
        // flexDirection={"column"}
      >
     
        {findItems?.map((findItem, index) => (
          <FoundItem key={index} findItem={findItem} />
        ))}
      </Box>
    </>
  );
};

export default FoundItems;
