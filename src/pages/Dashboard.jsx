import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Container,
  Button,
  TextField,
  Box,
  Typography,
  Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch {
      localStorage.clear();
      navigate("/");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
    fetchProducts();
  }, []);

  const addProduct = async () => {
    if (!name || !price) {
      toast.error("Name & price required");
      return;
    }

    try {
      await api.post("/products", {
        name,
        price,
        description,
      });
      toast.success("Product added");
      setName("");
      setPrice("");
      setDescription("");
      fetchProducts();
    } catch {
      toast.error("Failed to add product");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted");
      fetchProducts();
    } catch {
      toast.error("Delete failed");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5">Dashboard</Typography>
        <Button color="error" onClick={logout}>
          Logout
        </Button>
      </Box>

      {/* ADD PRODUCT */}
      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="h6">Add Product</Typography>

        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Price"
          type="number"
          fullWidth
          margin="normal"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button variant="contained" onClick={addProduct}>
          Add
        </Button>
      </Paper>

      {/* PRODUCT LIST */}
      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="h6">Products</Typography>

        {products.map((p) => (
          <Box
            key={p.id}
            display="flex"
            justifyContent="space-between"
            mt={1}
          >
            <span>
              {p.name} – ₹{p.price}
            </span>
            <Button
              color="error"
              size="small"
              onClick={() => deleteProduct(p.id)}
            >
              Delete
            </Button>
          </Box>
        ))}
      </Paper>
    </Container>
  );
};

export default Dashboard;
