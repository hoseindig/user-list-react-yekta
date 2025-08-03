import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosInstance from "../api/AxiosInstance";
import { User } from "../types";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    AxiosInstance.get(`/users/${id}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("خطا در دریافت داده‌ها:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Typography>کاربر یافت نشد</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        جزئیات کاربر
      </Typography>
      <Typography>نام: {user.name}</Typography>
      <Typography>نام کاربری: {user.username}</Typography>
      <Typography>ایمیل: {user.email}</Typography>
      <Typography>تلفن: {user.phone}</Typography>
      <Typography>شهر: {user.address.city}</Typography>
      <Button variant="contained" onClick={() => navigate("/")} sx={{ mt: 2 }}>
        بازگشت
      </Button>
    </Box>
  );
}
