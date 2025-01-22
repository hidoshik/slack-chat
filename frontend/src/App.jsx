import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./Components/LoginForm.jsx";
import NotFound from "./Components/NotFound.jsx";
import MainLayout from "./Components/MainLayout.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<div>No page is selected.</div>} />
          <Route path="login" element={<LoginForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
