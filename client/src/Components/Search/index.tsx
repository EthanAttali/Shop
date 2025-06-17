import { Box, FormControl, Input, InputAdornment, InputLabel } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import style from './style.module.scss';
import { useShopContext } from "../../context/useShopContext";
import { ChangeEvent } from "react";

const SearchBar = () => {

    const context  = useShopContext();

    const updateFilterInput = (e: ChangeEvent<HTMLInputElement>) => {
        context.handleInputSearch(e.target.value)
    }

    return(
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <FormControl variant="standard" className={style.formControl}>
                <InputLabel htmlFor="input-with-icon-adornment">
                    Search
                </InputLabel>
                <Input
                    id="input-with-icon-adornment"
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon sx={{color: 'white'}}/>
                        </InputAdornment>
                    }
                    className={style.inputSearch}
                    onChange={updateFilterInput}
                />
            </FormControl>
      </Box>
    )
}

export default SearchBar;