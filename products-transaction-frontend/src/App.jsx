import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import axios from "axios";

function App() {
  useEffect(() => {
    axios
      .get(
        "/transactions"
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return <Box>Products Transaction</Box>;
}

export default App;
