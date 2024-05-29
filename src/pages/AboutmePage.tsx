import { Suspense, lazy } from "react";
import Spinner from "../components/ui/Spinner";

const AboutMeContent = lazy(() => import("../components/about-me/AboutMe"));

const AboutmePage = () => {
  return (
    <div className="flex-grow bg-color-bg-primary px-6 font-Kodchasan text-white">
      <Suspense fallback={<Spinner />}>
        <AboutMeContent />
      </Suspense>
    </div>
  );
};

export default AboutmePage;
