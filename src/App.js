import "./App.css";
import { useSelector } from "react-redux";
import { HashRouter, Routes, Route } from "react-router-dom";
import {
  Shop,
  ProductDetail,
  Login,
  SingUp,
  Purchases,
  Account,
} from "./pages/index";
import {
  NavBar,
  LoadingScreen,
  ProtectedRoutes,
  Footer,
} from "./components/index";

function App() {
  const isLoading = useSelector((state) => state.isLoading);
  return (
    <HashRouter>
      <NavBar />
      {isLoading && <LoadingScreen />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SingUp />} />
        <Route path="/" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/account" element={<Account />} />
          <Route path="/purchases" element={<Purchases />} />
        </Route>
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
