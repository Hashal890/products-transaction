import React, { useContext } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { VictoryPie } from "victory";
import MonthSelect from "./MonthSelect";
import { AppContext } from "../context/AppContext";

const PieChartMonthStats = () => {
  const { selectMonthState } = useContext(AppContext);

  return (
    <Flex
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      mt={8}
    >
      <Flex justifyContent={"center"} alignItems={"center"} gap={6}>
        <Text fontSize={["14px", "14px", "20px"]} fontWeight={"bold"}>
          Pie Chart Stats
        </Text>
        <MonthSelect />
      </Flex>
      <Box>
        <VictoryPie w={600} h={500} data={selectMonthState.pieChartData} />
      </Box>
    </Flex>
  );
};

export default PieChartMonthStats;
