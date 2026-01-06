import { createSelector } from "reselect";

const selectList = (state) => state.home;

export const entityidInfo = createSelector(
  [selectList],
  (home) => home.entityid
);
export const masterDataInfo = createSelector(
  [selectList],
  (home) => home.masterData
);
