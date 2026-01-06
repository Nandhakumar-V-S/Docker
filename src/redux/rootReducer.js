import { combineReducers } from "redux";

import { reducer as authReducer } from "./auth";
import getlookupdetailsStateReducer from "./getlookupdetails/getlookupdetails";
import getupdatelookupdetailsStateReducer from "./getlookupdetails/getUpdateLookupDetails";
import { reducer as translateReducer } from "./translate";
import addTaskReducer from "./AddTask/AddTaskFormFields";
import addTaskStateReducer from "./AddTask/addTaskData";
import arcGetLeadReducer from "./360Details/LeadInfoSlice";
import entityReducer from "./360Details/Get360EntityInfo"; // Import the new reducer
import attributeReducer from "./Entity360/GetEntity360Info"; // Import the new reducer
import listpageReducer from "./listpage/reducers";
import PlanReducer from "./Plan/reducers";
import FollowupReducer from "./Followup/reducers";
import ReportReducer from "./Report/reducers";
import TaskReducer from "./Task/reducers";
import NotesReducer from "./Notes/reducers";
import journeyReducer from "./Journey/reducers";
import ProjectReducer from "./Project/reducers";
import HomeReducer from "./Home/reducers";
import ImportHistoryReducer from "./ImportHistory/reducers";
import arcAttrubuteFormReducer from "./AddAttribute/AttributeFormInfo";
import arcAddAttrubuteReducer from "./AddAttribute/AddAttribute";
import entityArcAddAttrubuteReducer from "./Entity360/AddAttribute360/AddAttributeData";
import ExecutionReducer from "./Execution/reducers";
import EntityGridReducer from "./360Details/Get360EntityGrid";
import unpaidBillsReducer from "./Home/unpaidBills";
import unsubmittedBillsReducer from "./Home/unsubmittedbills";
import AddFollowupReducer from "./Execution/AddFollowup/AddFollowupFormFields";
import ExtendTaskReducer from "./Execution/extendTask/ExtendTaskFormFields";
import UpdateFollowupReducer from "./Execution/AddFollowup/UpdateFollowupFormFields";
import UpdateStatusStateReducer from "./Execution/UpdateStatus/UpdateStatus";
import UpdateSessionStateReducer from "./Execution/UpdateStatus/UpdateSession";
import GetDefaultValuesStateReducer from "./Execution/UpdateStatus/GetDefaultValues";
import addSubTaskReducer from "./360Details/AddSubTask-360/AddSubTaskFormFields";
import addAttributeReducer from "./Entity360/AddAttribute360/AddAttributeFormFields";
import addSubTaskStateReducer from "./360Details/AddSubTask-360/addSubTaskData";
import UpdateStatus360StateReducer from "./360Details/UpdateStautus360";
import AddFollowupStateReducer from "./Execution/AddFollowup/UpdateFollowupData";
import AddExtendPlanStateReducer from "./Execution/extendTask/AddExtendPlan";
import AddSubTaskPlanStateReducer from "./Execution/addSubTask/AddSubTaskData";
import UpdateFollowupStateReducer from "./Followup/UpdateStatus/UpdateFollowupFormFields";
import GetDefaultValuesFollowupReducer from "./Followup/UpdateStatus/GetDefaultValues";
import UpdateStatusfollowStateReducer from "./Followup/UpdateStatus/UpdateStatus";
import addMasterTaskReducer from "./Task/AddTask/addMasterTask";
import arcProjectFieldsReducer from "./AddProject/AddProjectFormInfo";
import arcAddProjectReducer from "./AddProject/AddProject";

import GetSubTaskStateReducer from "./Execution/addSubTask/GetSubTask";
import GetDefaultTaskInputStateReducer from "./Task/AddTask/GetDefaultTaskInputs";
import GetDefaultEntityInputStateReducer from "./AdminSetting/AddEntity/GetDefaultEntityInputs";
import UpdateMasterTaskStateReducer from "./Task/AddTask/UpdateMasterTask";
import UpdateSubTaskStateReducer from "./Execution/addSubTask/UpdateSubTask";
import GetTimelineStateReducer from "./360Details/GetTimeline";
import PlanSummeryStateReducer from "./Home/PlanSummery/PlanSummery";
import PlanSummeryKPIStateReducer from "./Home/PlanSummery/PlanSummeryKPI";
import WorkDayProgressStateReducer from "./Home/PlanProgress/GetPlanProgress";
import WorkWeekProgressStateReducer from "./Home/PlanProgress/GetPlanProgressWeek";
import ImportDataStagingReducer from "./DataImport/importdatastaging";
import GetImportDataByIdStateReducer from "./DataImport/getimportdata";
import GetResourcePlanStateReducer from "./Home/PlanProgress/GetResourcePlan";
import GetTaskReportReducer from "./ProjectVsStatusReport/TaskReport/GetTaskReport";
import addTaskValidationStateReducer from "./AddTask/addTaskValidation";
import updatetaskvalidationSliceReducer from "./AddTask/updatetaskvalidation";
import PostImportDataSliceReducer from "./DataImport/PostImportData";
import PostAdditionalDataReducer from "./DataImport/Importstagging";
import ValidatedimportdataReducer from "./DataImport/importdatavalidate";
import ImportdatatotblReducer from "./DataImport/Importdatatotbl";
import PostCorrectedRowsStateReducer from "./DataImport/uploadCorrectedRows";
import TagReducer from "./Tag/reducers";
import getDefaultTagValuesReducer from "./Tag/AddTag/getDefaultTagValues";
import getAddEntityFieldsReducer from "./Tag/AddTag/getAddEntityFields";
import getEditTagValuesReducer from "./Tag/AddTag/getEditTagValues";
import AddTagtoGroupEntityReducer from "./Tag/AddTag/AddEntity";
import AddTagReducer from "./Tag/AddTag/AddTag";
import EditTagGroupNameReducer from "./Tag/AddTag/EditTagGroupName";
import CreateTagGroupReducer from "./Tag/NewTagGroup/InsertNewTagGroup";
import ExportHistoryReducer from "./Exporthistory/reducers";
import GlobalSearchReducer from "./GlobalSearch/GlobalSearch";
import addLookupDetailStateReducer from "./getlookupdetails/AddLookupDetails";
import updateLookupDetailReducer from "./getlookupdetails/UpdateLookupDetails";
import filterAutoCompleteReducer from "./getlookupdetails/FilterAutoComplete";

import AddNotesDataStateReducer from "../modules/NotesModule/components/Addtask/AddNotes";
import UpdateNotesReducers from "../modules/NotesModule/components/Addtask/EditNotes";

import GetEditNotesdetailsstateReducers from "../modules/NotesModule/components/Addtask/GetEditNotesDetails";

import BulkUpdatenoteProjectStatussStateReducers from "../modules/NotesModule/components/Addtask/Bulknotesprojectstatusupdate";
import BulkUpdatenoteStatusdataReducers from "../modules/NotesModule/components/Addtask/BulkUpdatenoteStatusdata";
import GetTaskListForNotesStateReducers from "../modules/NotesModule/components/Addtask/GetTaskListForNotes";

// import TagGroup
// import AddTagtoGroupEntity

//import PostImportDataSliceReducer from "./DataImport/PostImportData";

//import planSummeryReducer from './Home/PlanSummery/PlanSummerySlice';//added by gomathi
import AdminSettingReducer from "./AdminSetting/reducers";
import addEntitySlice from "./AdminSetting/AddEntity/addEntity";
import addEntityData from "./AdminSetting/AddEntity/addEntityData";

import GetDefaultValuesattributesReducer from "@/redux/Entity360/UpdateAttribute360/GetDefaultValues";
import UpdateEntityAttributesStatusReducer from "@/redux/Entity360/UpdateAttribute360/UpdateEntityAttributesStatus";
import UpdateAttributesReducer from "@/redux/Entity360/UpdateAttribute360/UpdateEntityAttributesFields";
import UpdateEntityReducer from "@/redux/AdminSetting/AddEntity/updateEntityData";
import createNewExportReducer from "./Exporthistory/Createnewexport/createNewExport";
import DownloadexportedataReducer from "./Exporthistory/Downloadexportedata/Downloadexportedata";
import gettagfilterlookupReducer from "@/redux/getlookupdetails/getTagFilterLookup";
// Combine all reducers.

import ProjectVsStatusReportReducer from "./ProjectVsStatusReport/reducers";
import ResourceVsMonthWeekReportReducer from "./ResourceVsMonthWeekReport/reducers";
import GetSearch360EntityInfoReducer from "./GlobalSearch/GetSearch360EntityInfo";
import projectTaskStateReducer from "./360Details/project360/projectTask360";
import GetsubtaskDtsByTransIdReducer from "@/redux/Execution/UpdateSubtask/GetsubtaskDtsByTransId";
import UpdatesubtaskAPIReducer from "@/redux/Execution/UpdateSubtask/UpdatesubtaskAPI";
import FormFieldsReducer from "./GetFormFields/GetFormFields";
import FeaturesReducer from "./Features/reducers";
import DefaultInsertUpdateReducer from "@/redux/DefaultInsertUpdate/DefaultInsertUpdate";
import GetDefaultFormValuesReducer from "./GetFormFields/GetDefaultFormValues";
import JourneyHomeReducer from "./Home/JourneyHome/reducers";
import GetProjectTaskListReducer from "./Project/getTaskList/GetTaskList";
import TaskInfoReducer from "./TaskInfo/reducers";
import AddFollowuplistdetailsStateReducers from "../modules/FollowupModule/components/AddFollowUps/AddFollowuplistdetails";
import AuditlogDetailsStateReducers from "@/redux/AuditLog/Auditlogdetails";
import GetIPDetailsStateReducers from "@/redux/AuditLog/ipaddress";
import ActivitylogReducer from "./Activitylog/reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  getlookupdetailsState: getlookupdetailsStateReducer,
  getupdatelookupdetailsState: getupdatelookupdetailsStateReducer,
  translate: translateReducer,
  addTask: addTaskReducer,
  addTaskState: addTaskStateReducer,
  addTaskValidationState: addTaskValidationStateReducer,
  updateTaskValidationState: updatetaskvalidationSliceReducer,
  arcGetLead: arcGetLeadReducer,
  entity: entityReducer,
  listpage: listpageReducer,
  plan: PlanReducer,
  followup: FollowupReducer,
  report: ReportReducer,
  task: TaskReducer,
  journey: journeyReducer,
  tag: TagReducer,
  project: ProjectReducer,
  home: HomeReducer,
  ImportHistory: ImportHistoryReducer,
  arcAttributeFields: arcAttrubuteFormReducer,
  arcAddAttribute: arcAddAttrubuteReducer,
  entityArcAddAttribute: entityArcAddAttrubuteReducer,
  execution: ExecutionReducer,
  entityGridData: EntityGridReducer,
  unpaidBills: unpaidBillsReducer,
  UnsubmittedBills: unsubmittedBillsReducer,
  AddFollowup: AddFollowupReducer,
  UpdateFollowup: UpdateFollowupReducer,
  UpdateStatusState: UpdateStatusStateReducer,
  UpdateSessionState: UpdateSessionStateReducer,
  GetDefaultValuesState: GetDefaultValuesStateReducer,
  addSubTask: addSubTaskReducer,
  addAttribute: addAttributeReducer,
  addSubTaskState: addSubTaskStateReducer,
  UpdateStatus360State: UpdateStatus360StateReducer,
  AddFollowupState: AddFollowupStateReducer,
  AddExtendPlanState: AddExtendPlanStateReducer,
  AddSubTaskPlanState: AddSubTaskPlanStateReducer,
  UpdateFollowupState: UpdateFollowupStateReducer,
  GetDefaultValuesFollowup: GetDefaultValuesFollowupReducer,
  UpdateStatusfollowState: UpdateStatusfollowStateReducer,
  addMasterTask: addMasterTaskReducer,
  GetSubTaskState: GetSubTaskStateReducer,
  GetDefaultTaskInputState: GetDefaultTaskInputStateReducer,
  GetDefaultEntityInputState: GetDefaultEntityInputStateReducer,
  UpdateMasterTaskState: UpdateMasterTaskStateReducer,
  UpdateSubTaskState: UpdateSubTaskStateReducer,
  GetTimelineState: GetTimelineStateReducer,
  PlanSummeryState: PlanSummeryStateReducer,
  PlanSummeryKPIState: PlanSummeryKPIStateReducer,
  WorkDayProgressState: WorkDayProgressStateReducer,
  WorkWeekProgressState: WorkWeekProgressStateReducer,
  ImportDataStaging: ImportDataStagingReducer,
  GetImportDataByIdState: GetImportDataByIdStateReducer,
  GetResourcePlanState: GetResourcePlanStateReducer,
  GetTaskReportState: GetTaskReportReducer,
  //PostImportDataState: PostImportDataSliceReducer,
  // planSummery: planSummeryReducer,//added by Gomathi
  admin: AdminSettingReducer,
  addEntityTask: addEntitySlice,
  attribute: attributeReducer,
  UpdateEntityAttributesStatus: UpdateEntityAttributesStatusReducer,
  GetDefaultValuesattributes: GetDefaultValuesattributesReducer,
  UpdateAttributeState: UpdateAttributesReducer,
  arcProjectFields: arcProjectFieldsReducer,
  arcAddProject: arcAddProjectReducer,
  addEntityState: addEntityData,
  UpdateEntityState: UpdateEntityReducer,
  PostImportDataState: PostImportDataSliceReducer,
  PostAdditionalDataState: PostAdditionalDataReducer,
  ValidatedimportdataState: ValidatedimportdataReducer,
  ImportdatatotblState: ImportdatatotblReducer,
  PostCorrectedRowsState: PostCorrectedRowsStateReducer,

  //tag
  GetDefaultTagValues: getDefaultTagValuesReducer,
  GetAddEntityFields: getAddEntityFieldsReducer,
  GetEditTagValue: getEditTagValuesReducer,
  AddTag: AddTagReducer,
  AddTagtoGroupEntity: AddTagtoGroupEntityReducer,
  EditTagGroupName: EditTagGroupNameReducer,
  addGroup: CreateTagGroupReducer,
  exporthistory: ExportHistoryReducer,
  CreateNewExport: createNewExportReducer,

  //global Search
  GlobalSearch: GlobalSearchReducer,
  Downloadexportedata: DownloadexportedataReducer,
  gettagfilterlookupState: gettagfilterlookupReducer,

  //report
  projectVsStatusReport: ProjectVsStatusReportReducer,
  resourceVsMonthWeekReport: ResourceVsMonthWeekReportReducer,

  //
  searchEntity: GetSearch360EntityInfoReducer,
  projectTaskState: projectTaskStateReducer,
  // ~  Lookup Details
  addLookupDetailState: addLookupDetailStateReducer,
  updateLookupDetailState: updateLookupDetailReducer,
  filterAutoCompleteState: filterAutoCompleteReducer,
  GetsubtaskDtsByTransIdstate: GetsubtaskDtsByTransIdReducer,
  UpdatesubtaskAPIstate: UpdatesubtaskAPIReducer,
  features: FeaturesReducer,
  defaultInsertUpdate: DefaultInsertUpdateReducer,

  //form
  FormFields: FormFieldsReducer,
  DefaultFormValues: GetDefaultFormValuesReducer,

  //home
  journeyHome: JourneyHomeReducer,
  GetProjectTaskListState: GetProjectTaskListReducer,

  //notes
  notes: NotesReducer,
  AddNotesDataState: AddNotesDataStateReducer,
  UpdateNotesdata: UpdateNotesReducers,
  GetEditNotesdetailsstate: GetEditNotesdetailsstateReducers,
  BulkUpdatenoteStatusdata: BulkUpdatenoteStatusdataReducers,
  BulkUpdatenoteProjectStatussState: BulkUpdatenoteProjectStatussStateReducers,
  GetTaskListForNotesState: GetTaskListForNotesStateReducers,
  //taskinfo
  taskinfo: TaskInfoReducer,

  //addfollowup in followup page
  AddFollowuplistdetailsState: AddFollowuplistdetailsStateReducers,

  //Audit log
  AuditlogDetailsState: AuditlogDetailsStateReducers,
  GetIPDetailsState: GetIPDetailsStateReducers,

  //activitylog
  activitylog: ActivitylogReducer
});

export default rootReducer;
