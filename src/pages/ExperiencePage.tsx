import { Suspense, lazy } from "react";
import Spinner from "../components/ui/Spinner";

const LazyExperience = lazy(
  () => import("../components/experience/Experience")
);

export const ExperiencePage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <LazyExperience></LazyExperience>
    </Suspense>
  );
};
