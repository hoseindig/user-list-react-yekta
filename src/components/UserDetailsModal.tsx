import { Modal, Box, Typography, Button } from "@mui/material";
import { User } from "../types";

interface UserDetailsModalProps {
  user: User;
  open: boolean;
  onClose: () => void;
}

export default function UserDetailsModal({
  user,
  open,
  onClose,
}: UserDetailsModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          minWidth: 300,
          maxWidth: 500,
        }}
      >
        <Typography variant="h5" gutterBottom>
          جزئیات کاربر
        </Typography>
        <Typography>نام: {user.name}</Typography>
        <Typography>نام کاربری: {user.username}</Typography>
        <Typography>ایمیل: {user.email}</Typography>
        <Typography>تلفن: {user.phone}</Typography>
        <Typography>شهر: {user.address.city}</Typography>
        <Button variant="contained" onClick={onClose} sx={{ mt: 2 }}>
          بستن
        </Button>
      </Box>
    </Modal>
  );
}
