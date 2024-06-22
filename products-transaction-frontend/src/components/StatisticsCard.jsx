import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import MonthSelect from "./MonthSelect";

const StatisticsCard = () => {
  const { selectMonthState } = useContext(AppContext);

  return (
    <VStack mt={12} justifyContent={"center"} alignItems={"center"}>
      <Flex justifyContent={"center"} alignItems={"center"} gap={6}>
        <Text fontSize={"20px"} fontWeight={"bold"}>
          Statistics
        </Text>
        <MonthSelect />
      </Flex>
      <TableContainer mt={2}>
        <Table variant="simple" bg="rgb(255, 177, 94)" borderRadius={10} w={""}>
          <Tbody>
            <Tr>
              <Td>Total Sale</Td>
              <Td>{selectMonthState.statistics.totalAmountOfSale}</Td>
            </Tr>
            <Tr>
              <Td>Total sold items</Td>
              <Td>{selectMonthState.statistics.totalSoldItems}</Td>
            </Tr>
            <Tr>
              <Td>Total not sold items</Td>
              <Td>{selectMonthState.statistics.totalNotSoldItems}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};

export default StatisticsCard;
