import { createSelector } from "reselect";

const selectList = (state) => state.journeyHome;

export const entityidInfo = createSelector(
  [selectList],
  (journeyHome) => journeyHome.entityid
);
export const masterDataInfo = createSelector(
  [selectList],
  (journeyHome) => journeyHome.masterData
);

export const homescreenDataInfo = createSelector(
    [selectList],
    (journeyHome) => journeyHome.homescreenData
)
