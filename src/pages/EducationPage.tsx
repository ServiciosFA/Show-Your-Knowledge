import { Suspense, lazy } from "react";
import Spinner from "../components/ui/Spinner";

const LazyEducation = lazy(() => import("../components/education/Education"));

export const EducationPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <LazyEducation></LazyEducation>
    </Suspense>
  );
};
