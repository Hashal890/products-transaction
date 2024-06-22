import React from "react";
import { Box, Text } from "@chakra-ui/react";
import TopSearchAndMonthSelect from "./components/TopSearchAndMonthSelect";
import TransactionsTable from "./components/TransactionsTable";
import StatisticsCard from "./components/StatisticsCard";
import BarChartMonthStats from "./components/BarChartMonthStats";

function App() {
  return (
    <Box p={[0, 0, 4]}>
      <Text
        textAlign={"center"}
        fontSize={["20px", "20px", "30px"]}
        fontWeight={"bold"}
      >
        Transaction Dashboard
      </Text>
      <TopSearchAndMonthSelect />
      <TransactionsTable />
      <StatisticsCard />
      <BarChartMonthStats />
    </Box>
  );
}

export default App;
