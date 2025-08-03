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
        mb: 2,
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, // در موبایل عمودی، در دسکتاپ افقی
        alignItems: { xs: "center", sm: "flex-start" },
        bgcolor: "background.paper",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.02)", // افکت هاور
          boxShadow: 6,
        },
      }}
    >
      <Avatar
        sx={{
          width: { xs: 60, sm: 80 },
          height: { xs: 60, sm: 80 },
          mr: { sm: 2 },
          mb: { xs: 2, sm: 0 },
          bgcolor: "primary.main",
        }}
      >
        {user.name.charAt(0).toUpperCase()}
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {user.name}
          </Typography>
          <Box display="flex" alignItems="center" mb={1}>
            <Email sx={{ mr: 1, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              ایمیل: {user.email}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <Phone sx={{ mr: 1, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              تلفن: {user.phone}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <LocationCity sx={{ mr: 1, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
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
            sx={{ mx: "auto", mt: { xs: 2, sm: 0 } }}
          >
            مشاهده جزئیات
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
