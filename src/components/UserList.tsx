import { useEffect, useState } from "react";
import AxiosInstance from "../api/AxiosInstance";
import { User } from "../types";
import UserCard from "./UserCard";
import SearchBar from "./SearchBar";
import UserDetailsModal from "./UserDetailsModal";
import {
  CircularProgress,
  Box,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Paper,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

interface UserListProps {
  onViewDetails: (id: number) => void;
}

export default function UserList({ onViewDetails }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState<"card" | "table">("card"); // حالت نمایش
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
    navigate(`/users/${id}`);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "card" ? "table" : "card");
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        width: "100%",
        py: 4,
        px: 2,
        // border: "1px solid green",
        // borderRadius: 1,
        boxSizing: "border-box",
      }}
    >
      {/* SearchBar */}
      <Box
        sx={{
          // width: "100%",
          // px: { xs: 1, sm: 2 },
          py: 2,
          // border: "1px solid red",
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <SearchBar onSearch={handleSearch} />
          </Box>

          <Button
            variant="outlined"
            onClick={toggleViewMode}
            sx={{
              minWidth: 50,
              width: 50,
              height: 56,
              px: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {viewMode === "card" ? <ViewListIcon /> : <ViewModuleIcon />}
          </Button>
        </Box>

        {filteredUsers.length === 0 ? (
          <Typography textAlign="center" variant="h6" mt={4}>
            کاربری یافت نشد
          </Typography>
        ) : viewMode === "card" ? (
          <Grid container spacing={2} sx={{ justifyContent: "center" }}>
            {filteredUsers.map((user) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={user.id}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Box sx={{ width: "100%", maxWidth: 320 }}>
                  <UserCard
                    user={user}
                    onViewDetails={() => handleViewDetails(user.id)}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper sx={{ width: "100%", overflowX: "auto" }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>نام</TableCell>
                  <TableCell>نام کاربری</TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    ایمیل
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    تلفن
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
                    شهر
                  </TableCell>
                  <TableCell>عملیات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell
                      sx={{ display: { xs: "none", sm: "table-cell" } }}
                    >
                      {user.email}
                    </TableCell>
                    <TableCell
                      sx={{ display: { xs: "none", md: "table-cell" } }}
                    >
                      {user.phone}
                    </TableCell>
                    <TableCell
                      sx={{ display: { xs: "none", lg: "table-cell" } }}
                    >
                      {user.address.city}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleViewDetails(user.id)}
                      >
                        جزئیات
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
        {selectedUser && (
          <UserDetailsModal
            user={selectedUser}
            open={!!selectedUser}
            onClose={handleCloseModal}
          />
        )}
      </Box>
    </Container>
  );
}
