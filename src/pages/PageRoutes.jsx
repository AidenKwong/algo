import React from "react";
import { Routes, Route } from "react-router-dom";

import { TreePage, GraphPage, HomePage, LinkedListPage, SortPage } from "./";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/linked-list" element={<LinkedListPage />} />
      <Route path="/graph" element={<GraphPage />} />
      <Route path="/tree" element={<TreePage />} />
      <Route path="/sort" element={<SortPage />} />
    </Routes>
  );
};

export default PageRoutes;
