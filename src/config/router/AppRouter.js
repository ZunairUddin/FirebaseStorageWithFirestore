import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { pagesList } from "../../utils/PagesList";

function AppRouter() {
  return (
    <Router>
      <Routes>
        {pagesList.map((e, i) => (
          <Route key={i} path={e.path} element={e.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default AppRouter;
