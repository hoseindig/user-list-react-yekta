import { useEffect, useState } from "react";
import AxiosInstance from "../api/AxiosInstance.js";
import { User } from "../types.js";
import UserCard from "./UserCard.js";
import SearchBar from "./SearchBar.js";
import UserDetailsModal from "./UserDetailsModal.js";
import { CircularProgress, Box, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface UserListProps {
  onViewDetails: (id: number) => void;
}

export default function UserList({ onViewDetails }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    AxiosInstance.get("/users")
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("خطا در دریافت داده‌ها:", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(lowerQuery) ||
          user.email.toLowerCase().includes(lowerQuery)
      )
    );
  };

  const handleViewDetails = (id: number) => {
    const user = users.find((u) => u.id === id);
    setSelectedUser(user || null);
    onViewDetails(id);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", px: { xs: 1, sm: 2 }, py: 2 }}>
      <SearchBar onSearch={handleSearch} />
      {filteredUsers.length === 0 ? (
        <Typography textAlign="center" variant="h6" mt={4}>
          کاربری یافت نشد
        </Typography>
      ) : (
        <Grid container spacing={1.5} sx={{ justifyContent: "center" }}>
          {filteredUsers.map((user) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3} // اضافه کردن ستون بیشتر برای نمایش در دسکتاپ
              key={user.id}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ width: "100%", maxWidth: 320 }}>
                {" "}
                {/* محدود کردن عرض کارت */}
                <UserCard
                  user={user}
                  onViewDetails={() => {
                    handleViewDetails(user.id);
                    navigate(`/users/${user.id}`);
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          open={!!selectedUser}
          onClose={handleCloseModal}
        />
      )}
    </Box>
  );
}
