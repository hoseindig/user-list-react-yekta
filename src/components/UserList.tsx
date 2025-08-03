import { useEffect, useState } from "react";
import AxiosInstance from "../api/AxiosInstance";
import { User } from "../types";
import UserCard from "./UserCard";
import SearchBar from "./SearchBar";
import UserDetailsModal from "./UserDetailsModal";
import { CircularProgress, Box, Typography } from "@mui/material";

interface UserListProps {
  onViewDetails: (id: number) => void;
}

export default function UserList({ onViewDetails }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
    <Box>
      <SearchBar onSearch={handleSearch} />
      {filteredUsers.length === 0 ? (
        <Typography>کاربری یافت نشد</Typography>
      ) : (
        filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onViewDetails={() => {
              onViewDetails(user.id);
              handleViewDetails(user.id);
            }}
          />
        ))
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
