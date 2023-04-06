// import "./App.css";
// import { lazy, Suspense } from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Shop from "./Pages/Shop/Shop";
// import Order from "./Pages/Order/Order";
// import Inventory from "./Pages/Inventory/Inventory";

// const Header = lazy(() => import("./Pages/Header/Header"));

// function App() {
//   return (
//     <div>
//       <BrowserRouter>
//         <Suspense fallback={<h1>Loading...</h1>}>
//           <Header />
//           <Routes>
//             <Route path="/" element={<Shop />} />
//             <Route path="/shop" element={<Shop />} />
//             <Route path="/order" element={<Order />} />
//             <Route path="/inventory" element={<Inventory />} />
//             {/* <Route path="/login" element={<Header />} /> */}
//           </Routes>
//         </Suspense>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
