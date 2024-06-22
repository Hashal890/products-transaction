import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

const initSearchListState = {
  message: "",
  productsTransactions: [],
  page: 1,
  perPage: 10,
  total: 0,
  totalPages: 0,
};

const initSelectMonthState = {
  message: "",
  statistics: {},
  barChartData: [],
  pieChartData: [],
  month: 3,
};

export const AppContextProvider = ({ children }) => {
  const [searchListState, setSearchListState] = useState(initSearchListState);
  const [selectMonthState, setSelectMonthState] =
    useState(initSelectMonthState);

  const getTransactions = async (queries) => {
    try {
      const { data } = await axios.get(
        `https://products-transaction-statistics-backend.onrender.com/transactions?search=${queries.search}&page=${queries.page}&perPage=${queries.perPage}`
      );
      setSearchListState(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllThreeApiResponses = async (month) => {
    try {
      const { data } = await axios.get(
        `https://products-transaction-statistics-backend.onrender.com/get-all-three-api?month=${month}`
      );
      setSelectMonthState({ ...data, month });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "light");
    getTransactions({
      search: "",
      page: 1,
      perPage: 10,
    });
    getAllThreeApiResponses(selectMonthState.month);
  }, []);

  return (
    <AppContext.Provider
      value={{
        searchListState,
        selectMonthState,
        getTransactions,
        getAllThreeApiResponses,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
