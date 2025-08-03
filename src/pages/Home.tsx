import { Typography } from "@mui/material";
import UserList from "../components/UserList";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h4" gutterBottom>
        داشبورد کاربران
      </Typography>
      <UserList onViewDetails={(id) => navigate(`/users/${id}`)} />
    </>
  );
}
