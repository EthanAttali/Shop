import { Box, FormControl, Input, InputAdornment, InputLabel } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import style from './style.module.scss';

const SearchBar = () => {
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
                />
            </FormControl>
      </Box>
    )
}

export default SearchBar;