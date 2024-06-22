import React from "react";
import { Box, Text } from "@chakra-ui/react";
import TopSearchAndMonthSelect from "./components/TopSearchAndMonthSelect";
import TransactionsTable from "./components/TransactionsTable";
import StatisticsCard from "./components/StatisticsCard";
import BarChartMonthStats from "./components/BarChartMonthStats";
import PieChartMonthStats from "./components/PieChartMonthStats";

function App() {
  return (
    <Box p={[2, 2, 4]}>
      <Text
        textAlign={"center"}
        fontSize={["16px", "16px", "22px", "30px"]}
        fontWeight={"bold"}
        mt={4}
      >
        Transaction Dashboard
      </Text>
      <TopSearchAndMonthSelect />
      <TransactionsTable />
      <StatisticsCard />
      <BarChartMonthStats />
      <PieChartMonthStats />
    </Box>
  );
}

export default App;
