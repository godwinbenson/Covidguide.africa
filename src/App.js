import React, { Suspense } from "react";
import TestCenterModal from "./data-display/TestCenterModal";
import SiteRoutes, { LoadingPage } from "./SiteRoutes";

export default function App() {
  return (
    <React.Fragment>
      <Suspense fallback={<LoadingPage />}>
        <SiteRoutes />
        <TestCenterModal />
      </Suspense>
    </React.Fragment>
  );
}
