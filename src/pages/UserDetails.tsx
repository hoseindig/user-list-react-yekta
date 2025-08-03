import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AxiosInstance from "../api/AxiosInstance";
import { User } from "../types";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Card,
  CardContent,
  Avatar,
  Divider,
  Stack,
  Paper,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

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
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Typography textAlign="center" color="error" mt={6}>
        کاربر یافت نشد
      </Typography>
    );
  }

  return (
    <Box maxWidth="sm" mx="auto" mt={6}>
      <Card
        elevation={3}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "#fefefe",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "primary.main",
            color: "white",
            py: 4,
          }}
        >
          <Avatar
            sx={{
              bgcolor: "white",
              color: "primary.main",
              width: 80,
              height: 80,
            }}
          >
            <PersonIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h6" mt={2}>
            {user.name}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            @{user.username}
          </Typography>
        </Box>

        <CardContent>
          <Stack spacing={2}>
            <InfoRow label="ایمیل" value={user.email} />
            <Divider />
            <InfoRow label="تلفن" value={user.phone} />
            <Divider />
            <InfoRow label="شهر" value={user.address.city} />
          </Stack>
        </CardContent>

        <Box textAlign="center" py={2}>
          <Button variant="contained" onClick={() => navigate("/")}>
            بازگشت به داشبورد
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

// ✅ کامپوننت کمکی برای نمایش ردیف اطلاعات
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography color="text.secondary">{label}</Typography>
      <Typography fontWeight="medium" textAlign="left" dir="ltr">
        {value}
      </Typography>
    </Stack>
  );
}
