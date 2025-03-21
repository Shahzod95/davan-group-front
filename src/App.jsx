import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./pages/Home/Home"
import AddCar from "./pages/AddCar/AddCar";
import { Cars } from "./pages/Cars/Cars";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Category } from "./pages/Category/Category";
import { CartProvider } from "./context/CarProvider";
import { News } from "./pages/News/News";

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-car" element={<AddCar />} />
            <Route element={<Dashboard />}>
              <Route index path="/dashboard" element={<Cars />} />
              <Route index path="/category" element={<Category />} />
              <Route index path="/news" element={<News />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </QueryClientProvider>
  )
}

export default App
