import { Card, CardContent, Typography, Button } from "@mui/material";
import { User } from "types";

interface UserCardProps {
  user: User;
  onViewDetails: (id: number) => void;
}

export default function UserCard({ user, onViewDetails }: UserCardProps) {
  return (
    <Card sx={{ mb: 2, p: 2 }}>
      <CardContent>
        <Typography variant="h6">{user.name}</Typography>
        <Typography color="text.secondary">
          نام کاربری: {user.username}
        </Typography>
        <Typography color="text.secondary">ایمیل: {user.email}</Typography>
        <Typography color="text.secondary">تلفن: {user.phone}</Typography>
        <Typography color="text.secondary">شهر: {user.address.city}</Typography>
        <Button
          variant="contained"
          onClick={() => onViewDetails(user.id)}
          sx={{ mt: 2 }}
        >
          مشاهده جزئیات
        </Button>
      </CardContent>
    </Card>
  );
}
