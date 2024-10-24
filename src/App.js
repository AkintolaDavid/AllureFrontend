import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import LikedProducts from "./LikedProduct";
import ShopCategory from "./ShopCategory";
import Product from "./Product";
import Layout from "./Layout";
import Contact from "./Contact";
import About from "./About";
import Cart from "./Cart";
import CustomizeJewerly from "./CustomizeJewerly";

import ring from "./assets/banner/ring.png";
import men from "./assets/banner/men.png";
import women from "./assets/banner/women.png";
import brac from "./assets/banner/bracelet.png";
import necklace from "./assets/banner/neck.png";
import watch from "./assets/banner/watch.webp";
import ear from "./assets/banner/earr.png";
import ScrollToTop from "./ScrollToTop";
import Sizeguide from "./Sizeguide";
import Policy from "./Policy";
import SignUp from "./(auth)/Signup";
import Signin from "./(auth)/Signin";
import ForgotPassword from "./(auth)/ForgotPassword";
import ResetPassword from "./(auth)/ResetPassword";
import AdminPage from "./(auth)/AdminPage";
import Adminrequestotp from "./(auth)/Adminrequestotp";
import Adminverifyotp from "./(auth)/Adminverifyotp";
import { ChakraProvider } from "@chakra-ui/react";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import { Provider } from "react-redux"; // Import Redux hooks
import store from "./store/store"; // Import Redux store
import UploadProduct from "./(auth)/UploadProduct";
import Cartorders from "./(auth)/Cartorders";

// App component
function App() {
  // Removed useState, we will rely on Redux

  return (
    <Provider store={store}>
      {/* Wrap the entire app with Redux provider */}
      <BrowserRouter>
        <ChakraProvider>
          <ScrollToTop />
          <Layout>
            {" "}
            {/* The Layout component should wrap the entire app */}
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/likedproducts" element={<LikedProducts />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/sizeguide" element={<Sizeguide />} />
              <Route path="/privacypolicy" element={<Policy />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />

              <Route
                path="category/men"
                element={<ShopCategory category="men" banner={men} />}
              ></Route>
              <Route
                path="category/women"
                element={<ShopCategory banner={women} category="women" />}
              ></Route>
              <Route
                path="category/rings"
                element={<ShopCategory banner={ring} category="rings" />}
              ></Route>
              <Route
                path="category/necklace"
                element={<ShopCategory banner={necklace} category="necklace" />}
              ></Route>
              <Route
                path="category/watch"
                element={<ShopCategory banner={watch} category="watch" />}
              ></Route>
              <Route
                path="category/earrings"
                element={<ShopCategory banner={ear} category="earrings" />}
              ></Route>
              <Route
                path="category/bracelet"
                element={<ShopCategory banner={brac} category="bracelet" />}
              ></Route>

              <Route path="/product/:productId" element={<Product />} />

              <Route
                path="category/customize_jewelry"
                element={<CustomizeJewerly />}
              />

              {/* Admin Routes */}
              <Route path="/adminrequestotp" element={<Adminrequestotp />} />
              <Route path="/adminverifyotp" element={<Adminverifyotp />} />

              {/* Protected Admin Route */}
              <Route
                path="/uploadproduct"
                element={
                  <ProtectedAdminRoute>
                    <UploadProduct />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/cartorders"
                element={
                  <ProtectedAdminRoute>
                    <Cartorders />
                  </ProtectedAdminRoute>
                }
              />

              <Route
                path="/adminpage"
                element={
                  <ProtectedAdminRoute>
                    <AdminPage />
                  </ProtectedAdminRoute>
                }
              />
            </Routes>
          </Layout>
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
