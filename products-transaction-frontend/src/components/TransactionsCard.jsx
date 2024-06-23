import React from "react";
import { Image, Td, Text, Tr } from "@chakra-ui/react";

const TransactionsCard = ({
  _id,
  id,
  title,
  description,
  price,
  category,
  sold,
  image,
}) => {
  return (
    <Tr>
      <Td>{id}</Td>
      <Td>
        <Text>{title}</Text>
      </Td>
      <Td>
        <Text>{description}</Text>
      </Td>
      <Td>
        <Text>{price}</Text>
      </Td>
      <Td>
        <Text textTransform={"capitalize"}>{category}</Text>
      </Td>
      <Td>
        <Text>{sold ? "Yes" : "No"}</Text>
      </Td>
      <Td>
        <Image src={image} alt={_id} w={"100%"} />
      </Td>
    </Tr>
  );
};

export default TransactionsCard;
