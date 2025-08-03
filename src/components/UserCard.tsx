import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Avatar,
  Divider,
  Stack,
  alpha,
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
        maxWidth: 320,
        borderRadius: 3,
        boxShadow: 3,
        overflow: "hidden",
        bgcolor: "background.paper",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 6,
          cursor: "pointer", // اضافه شد
        },
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* هدر رنگی */}
      <Box
        sx={{
          bgcolor: "primary.light",
          color: "white",
          py: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Avatar
          sx={{
            bgcolor: "white",
            color: "primary.main",
            width: 72,
            height: 72,
            fontSize: "2rem",
          }}
        >
          {user.name.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h6" fontWeight="bold">
          {user.name}
        </Typography>
      </Box>

      <CardContent>
        <Stack spacing={1.5}>
          <InfoRow icon={<Email />} label="ایمیل" value={user.email} />
          <Divider />
          <InfoRow icon={<Phone />} label="تلفن" value={user.phone} />
          <Divider />
          <InfoRow
            icon={<LocationCity />}
            label="شهر"
            value={user.address.city}
          />
        </Stack>
      </CardContent>

      <CardActions
        sx={{
          justifyContent: "center",
          pb: 2,
        }}
      >
        <Button
          variant="contained"
          size="small"
          onClick={() => onViewDetails(user.id)}
          sx={{ px: 3, fontSize: "0.875rem" }}
        >
          مشاهده جزئیات
        </Button>
      </CardActions>
    </Card>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      {icon}
      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 50 }}>
        {label}:
      </Typography>
      <Typography variant="body1" fontWeight="medium" dir="ltr" flex={1}>
        {value}
      </Typography>
    </Box>
  );
}
