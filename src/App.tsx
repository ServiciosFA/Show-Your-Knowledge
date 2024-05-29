import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { SignUpPage } from "./pages/SignUpPage";
import ProjectItem from "./pages/ProjectitemPage";
import { ExperiencePage } from "./pages/ExperiencePage";
import { EducationPage } from "./pages/EducationPage";
import { ExpFormPage } from "./pages/ExpFormPage";
import { EduFormPage } from "./pages/EduFormPage";
import ProjectsPage from "./pages/ProjectsPage";
import LoginPage from "./pages/LoginPage";
import { ContactMe } from "./components/contact-me/ContactMe";
import HomePage from "./pages/HomePage";
import ProjectForm from "./pages/ProjectItemformPage";
import { ReactNode } from "react";
import { currentUser, useStore } from "./store";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AboutmePage from "./pages/AboutmePage";

function App() {
  const { name, id } = currentUser();
  const { name: nameLog } = useStore();

  const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    if (name === "") return <Navigate to={`/person/${id}/about-me`} />;
    else return <>{children}</>;
  };
  const ProtectedLogRoute = ({ children }: { children: ReactNode }) => {
    if (nameLog === "") return <Navigate to={`/login`} />;
    else return <>{children}</>;
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      ></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route element={<HomePage />} path="/">
            <Route element={<LoginPage />} path="/login" />
            <Route element={<AboutmePage />} path="/person/:pId/about-me" />
            <Route
              element={
                <ProtectedRoute>
                  <ProjectsPage />
                </ProtectedRoute>
              }
              path="/person/:pId/projects"
            />
            <Route
              element={
                <ProtectedRoute>
                  <EducationPage />
                </ProtectedRoute>
              }
              path="/person/:pId/education"
            />
            <Route
              element={
                <ProtectedRoute>
                  <ExperiencePage />
                </ProtectedRoute>
              }
              path="/person/:pId/experience"
            />
            <Route
              element={
                <ProtectedRoute>
                  <ContactMe />
                </ProtectedRoute>
              }
              path="/person/:pId/contact-me"
            />
            <Route element={<SignUpPage />} path="/sign-up" />
            <Route element={<ExpFormPage />} path="/experience/form" />
            <Route element={<EduFormPage />} path="/education/form-education" />
            <Route element={<ProjectItem />} path="/project/:pId" />
            <Route element={<ProjectForm />} path="/project/:pId/form"></Route>
            <Route
              element={
                <ProtectedLogRoute>
                  <ProjectForm />
                </ProtectedLogRoute>
              }
              path="/project/new"
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
