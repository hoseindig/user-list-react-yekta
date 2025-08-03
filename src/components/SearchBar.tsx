import { TextField } from "@mui/material";
import { ChangeEvent } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <TextField
      fullWidth
      label="جستجو بر اساس نام یا ایمیل"
      variant="outlined"
      onChange={handleChange}
      sx={{ px: 0, mx: 0 }}
      InputLabelProps={{
        sx: {
          right: 30,
          left: "auto",
          direction: "rtl",
        },
      }}
      inputProps={{
        style: {
          textAlign: "right",
          direction: "rtl",
        },
      }}
    />
  );
}
