import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import { User } from "../types";
import { Email, Phone, LocationCity } from "@mui/icons-material";

interface UserCardProps {
  user: User;
  onViewDetails: (id: number) => void;
}

export default function UserCard({ user, onViewDetails }: UserCardProps) {
  return (
    <Card
      sx={{
        mb: 1.5, // کاهش فاصله پایین کارت
        p: 1.5, // کاهش پدینگ داخلی
        borderRadius: 1.5, // گوشه‌های نرم‌تر
        boxShadow: 2, // سایه سبک‌تر
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "center", sm: "flex-start" },
        bgcolor: "background.paper",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.01)", // افکت هاور ملایم‌تر
          boxShadow: 4,
        },
        maxWidth: 320, // محدود کردن عرض کارت
      }}
    >
      <Avatar
        sx={{
          width: { xs: 48, sm: 56 }, // کاهش اندازه آواتار
          height: { xs: 48, sm: 56 },
          mr: { sm: 1.5 },
          mb: { xs: 1.5, sm: 0 },
          bgcolor: "primary.main",
          fontSize: "1.2rem", // کاهش اندازه فونت آواتار
        }}
      >
        {user.name.charAt(0).toUpperCase()}
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <CardContent sx={{ p: 1 }}>
          {" "}
          {/* کاهش پدینگ محتوا */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {user.name}
          </Typography>
          <Box display="flex" alignItems="center" mb={0.5}>
            <Email sx={{ mr: 0.5, color: "text.secondary", fontSize: 16 }} />
            <Typography variant="caption" color="text.secondary">
              ایمیل: {user.email}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={0.5}>
            <Phone sx={{ mr: 0.5, color: "text.secondary", fontSize: 16 }} />
            <Typography variant="caption" color="text.secondary">
              تلفن: {user.phone}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <LocationCity
              sx={{ mr: 0.5, color: "text.secondary", fontSize: 16 }}
            />
            <Typography variant="caption" color="text.secondary">
              شهر: {user.address.city}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => onViewDetails(user.id)}
            sx={{
              mx: "auto",
              mt: { xs: 1, sm: 0 },
              fontSize: "0.75rem",
              px: 2,
            }}
          >
            مشاهده جزئیات
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
