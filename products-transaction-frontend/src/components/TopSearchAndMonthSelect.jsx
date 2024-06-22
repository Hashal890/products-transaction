import React, { useContext } from "react";
import { Flex, Input } from "@chakra-ui/react";
import { AppContext } from "../context/AppContext";
import MonthSelect from "./MonthSelect";

const TopSearchAndMonthSelect = () => {
  const { getTransactions } = useContext(AppContext);

  const onChangeSearchText = (e) => {
    const { value } = e.target;
    getTransactions({
      search: value,
      page: 1,
      perPage: 10,
    });
  };

  return (
    <Flex justifyContent={"space-between"} mt={4}>
      <Input
        placeholder="Search transactions"
        onChange={onChangeSearchText}
        w={"170px"}
      />
      <MonthSelect />
    </Flex>
  );
};

export default TopSearchAndMonthSelect;
