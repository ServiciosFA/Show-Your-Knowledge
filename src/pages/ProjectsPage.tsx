import { Suspense, lazy } from "react";
import Spinner from "../components/ui/Spinner";

const LazyProyects = lazy(() => import("../components/projects/Projects"));
const ProjectsPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <LazyProyects />
    </Suspense>
  );
};
export default ProjectsPage;
