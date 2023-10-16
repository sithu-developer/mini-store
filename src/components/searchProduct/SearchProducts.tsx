import { useAppSelector } from "@/store/hooks";
import { Box, TextField } from "@mui/material"
import { Product } from "@prisma/client";
import { ChangeEvent } from "react";

interface Props {
    products : Product[]
    setFilteredProducts : (value : Product[]) => void
}

const SearchProducts = ({products,setFilteredProducts} : Props) => {
    const filteringProducts = (event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const userInput = event.target.value.toLowerCase();
        const serchResult =  products.filter((element) => element.title.toLowerCase().includes(userInput));
        setFilteredProducts(serchResult)
      }


    return (
      <Box sx={{ margin : "0 auto"}}>
        <TextField placeholder='search product ...' sx={{ width : "500px"}} onChange={filteringProducts}/>
      </Box>
    )
}

export default SearchProducts;