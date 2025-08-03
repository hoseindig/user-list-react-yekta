import { Box, Typography, Container } from "@mui/material";
import UserList from "@/components/UserList.js";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        mt: 4,
        // px: 2,
        border: "1px solid blue",
        borderRadius: 1,
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        داشبورد کاربران
      </Typography>
      <UserList onViewDetails={(id) => navigate(`/users/${id}`)} />
    </Box>
  );
}
