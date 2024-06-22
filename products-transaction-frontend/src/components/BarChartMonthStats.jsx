import React, { useContext } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory";
import { AppContext } from "../context/AppContext";
import MonthSelect from "./MonthSelect";

const BarChartMonthStats = () => {
  const { selectMonthState } = useContext(AppContext);

  return (
    <Flex
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      mt={8}
      // h={"600px"}
      // w={"600px"}
    >
      <Flex justifyContent={"center"} alignItems={"center"} gap={6}>
        <Text fontSize={"20px"} fontWeight={"bold"}>
          Bar Chart Stats
        </Text>
        <MonthSelect />
      </Flex>
      <Box>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={20}
          width={800}
          height={600}
        >
          <VictoryAxis tickFormat={(x) => `${x}`} />
          <VictoryAxis dependentAxis />
          <VictoryBar
            data={selectMonthState.barChartData}
            x="priceRange"
            y="numberOfItems"
          />
        </VictoryChart>
      </Box>
    </Flex>
  );
};

export default BarChartMonthStats;
