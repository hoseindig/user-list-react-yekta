import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Home from "@/pages/Home"; // مسیر کوتاه با استفاده از alias
import UserDetails from "@/pages/UserDetails";

function App() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </Container>
  );
}

export default App;
