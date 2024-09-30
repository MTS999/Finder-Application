import React from "react";
import { Container, Box ,Typography} from "@mui/material";
import useGetLostItems from "../../hooks/useGetLostItems";
import LostItem from "./LostItem";

const LostItems = () => {
  const { loading, lostItems } = useGetLostItems();

  // console.log("lost-items",lostItems);
  
  return (
    <>
      <Box display={"flex"} flexDirection={"column"}>
      <Typography variant="h4" color="initial">Lost Items</Typography>

      {lostItems?.map((lostItem, index) => (
          <LostItem key={index} lostItem={lostItem} />
        ))}

      </Box>
    </>
  );
};

export default LostItems;
