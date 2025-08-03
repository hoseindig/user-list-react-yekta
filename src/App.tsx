import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Home from "@/pages/Home";
import UserDetails from "@/pages/UserDetails";

function App() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh", // برای پر کردن کل ارتفاع صفحه
        px: 2,
        border: "1px solid green",
        borderRadius: 1,
        boxSizing: "border-box",
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </Box>
  );
}

export default App;
