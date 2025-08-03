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
      sx={{ mb: 3 }}
    />
  );
}
