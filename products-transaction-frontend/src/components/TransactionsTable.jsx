import React, { useContext } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { AppContext } from "../context/AppContext";
import TransactionsCard from "./TransactionsCard";

const TransactionsTable = () => {
  const { searchListState, getTransactions } = useContext(AppContext);

  const getItemsOfPreviousPage = () => {
    getTransactions({
      search: "",
      page: searchListState.page - 1,
      perPage: 10,
    });
  };

  const getItemsOfNextPage = () => {
    getTransactions({
      search: "",
      page: searchListState.page + 1,
      perPage: 10,
    });
  };

  return (
    <Box mt={12}>
      <TableContainer>
        <Table size={"sm"} variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Price</Th>
              <Th>Category</Th>
              <Th>Sold</Th>
              <Th>Image</Th>
            </Tr>
          </Thead>
          <Tbody>
            {searchListState.productsTransactions.map((transaction) => (
              <TransactionsCard key={transaction._id} {...transaction} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
        flexWrap={"wrap"}
        mt={4}
      >
        <ButtonGroup
          size="sm"
          isAttached
          variant="outline"
          colorScheme="whatsapp"
        >
          <Button
            onClick={getItemsOfPreviousPage}
            isDisabled={searchListState.page === 1}
          >
            Prev
          </Button>
          <Button>{searchListState.page}</Button>
          <Button
            onClick={getItemsOfNextPage}
            isDisabled={searchListState.page === searchListState.totalPages}
          >
            Next
          </Button>
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default TransactionsTable;
