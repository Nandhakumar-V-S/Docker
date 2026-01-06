import { useContext, useEffect, useState } from "react";
import HomeHeader from "@/modules/HomePageModulev2/components/HomeHeader";
import HomeJourney from "@/modules/HomePageModulev2/components/HomeJourney";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "@/redux/Home/JourneyHome/actions";
import { homescreenDataInfo } from "@/redux/Home/JourneyHome/selector";

export default function HomePageModuleV2() {
  const dispatch = useDispatch();
  // const dashboardData = {
  //   panel_sequence: 2,
  //   panel_type: "Journey",
  //   sections: [
  //     {
  //       section_id: "fda2fba3-ccbb-498b-8797-3b27ea27e7ef",
  //       section_sequence: 1,
  //       section_displayname: "Prospect",
  //       section_type: "Prospect",
  //       section_checked: false,
  //       fields: [
  //         {
  //           field_Id: "0c136fbb-d506-4ee7-82f8-bf3b8fbc10b3",
  //           field_Label: "Website",
  //           field_Img: "WebsiteIcon",
  //           field_Journey: true,
  //           field_path: "lead",
  //           field_isactive: true,
  //           field_datasetid: "2e1c2877-d70c-43d4-99fe-055e051c5734",
  //           field_sequence: 0,
  //           count: 13,
  //         },
  //         {
  //           field_Id: "76391a6f-accd-4268-975e-5800657c4052",
  //           field_Label: "Email",
  //           field_Img: "EmailIcon",
  //           field_Journey: true,
  //           field_path: "lead",
  //           field_isactive: true,
  //           field_datasetid: {},
  //           field_sequence: 0,
  //           count: 0,
  //         },
  //         {
  //           field_Id: "56865806-733d-408a-b82e-ca722e53ec06",
  //           field_Label: "LinkeIn",
  //           field_Img: "LinkedinIcon",
  //           field_Journey: true,
  //           field_path: "lead",
  //           field_isactive: true,
  //           field_datasetid: "c24b606b-a744-4dbb-9ee5-b3640dc8f6cf",
  //           field_sequence: 0,
  //           count: 3,
  //         },
  //       ],
  //     },
  //     {
  //       section_id: "a975626e-ffb5-4369-b602-3c1cf64f291b",
  //       section_sequence: 2,
  //       section_displayname: "Qualifying Journey",
  //       section_type: "Qualifying Journey",
  //       section_checked: true,
  //       fields: [
  //         {
  //           field_Id: "bb2d0b51-2f15-47ad-ad1c-9aa4e530376d",
  //           field_Label: "Untouched",
  //           field_Img: "WebsiteIcon",
  //           field_Journey: true,
  //           field_path: {},
  //           field_isactive: true,
  //           field_datasetid: {},
  //           field_sequence: 0,
  //           count: 0,
  //         },
  //         {
  //           field_Id: "96458257-edf5-4607-9e29-6d6061c2320c",
  //           field_Label: "Qualifying",
  //           field_Img: "EmailIcon",
  //           field_Journey: true,
  //           field_path: {},
  //           field_isactive: true,
  //           field_datasetid: {},
  //           field_sequence: 0,
  //           count: 0,
  //         },
  //       ],
  //     },
  //     {
  //       section_id: "cdce3b96-6686-4389-91f6-555ec2f7866d",
  //       section_sequence: 3,
  //       section_displayname: "Sales Journey",
  //       section_type: "Sales Journey",
  //       section_checked: true,
  //       fields: [
  //         {
  //           field_Id: "9969f20a-9219-459a-b775-60f51a444c25",
  //           field_Label: "Qualified",
  //           field_Img: "QualifiedIcon",
  //           field_Journey: true,
  //           field_path: "contact",
  //           field_isactive: true,
  //           field_datasetid: "b5504cf4-cecf-4831-93d5-541f6adce67b",
  //           field_sequence: 0,
  //           count: 6,
  //         },
  //         {
  //           field_Id: "e63e6976-c474-4c21-b1af-2585b79bbd15",
  //           field_Label: "Demo",
  //           field_Img: "DemoIcon",
  //           field_Journey: true,
  //           field_path: "opportunity",
  //           field_isactive: true,
  //           field_datasetid: "04ed3400-ac0c-40de-abe5-878fa45ee78d",
  //           field_sequence: 0,
  //           count: 4,
  //         },
  //         {
  //           field_Id: "79519a19-a805-4048-8b57-1508de092b0e",
  //           field_Label: "Quote",
  //           field_Img: "ContractSignIcon",
  //           field_Journey: true,
  //           field_path: "opportunity",
  //           field_isactive: true,
  //           field_datasetid: "0e3e04ba-f504-4932-8973-eb0cfea6caf7",
  //           field_sequence: 3,
  //           count: 2,
  //         },
  //         {
  //           field_Id: "5054fa65-eb60-42d1-9c0d-e60dce35b1df",
  //           field_Label: "Contract",
  //           field_Img: "ContractSignIcon",
  //           field_Journey: true,
  //           field_path: "opportunity",
  //           field_isactive: true,
  //           field_datasetid: "e0ef2879-1be0-4737-93bb-9b057c6649eb",
  //           field_sequence: 4,
  //           count: 1,
  //         },
  //         {
  //           field_Id: "e21c570c-1f62-48ea-9523-242a19923c94",
  //           field_Label: "Onboarding",
  //           field_Img: "OnboardingIcon",
  //           field_Journey: true,
  //           field_path: "account",
  //           field_isactive: true,
  //           field_datasetid: "e302ee51-2518-4aae-8b23-897d9467c2eb",
  //           field_sequence: 5,
  //           count: 12,
  //         },
  //       ],
  //     },
  //     {
  //       section_id: "25d49296-844e-4aa1-ab0b-118d012acc85",
  //       section_sequence: 4,
  //       section_displayname: "Cold Calling",
  //       section_type: "Cold Calling",
  //       section_checked: false,
  //       fields: [
  //         {
  //           field_Id: "2e6a18d6-bb1d-4755-9a5e-f5950f00e470",
  //           field_Label: "Most Engaged",
  //           field_Img: "MostEngagedIcon",
  //           field_Journey: true,
  //           field_path: {},
  //           field_isactive: true,
  //           field_datasetid: {},
  //           field_sequence: 1,
  //           count: 0,
  //         },
  //         {
  //           field_Id: "b1cfb701-fc93-4c81-9f1d-7c7c1868a402",
  //           field_Label: "High Value",
  //           field_Img: "HighValueIcon",
  //           field_Journey: true,
  //           field_path: {},
  //           field_isactive: true,
  //           field_datasetid: {},
  //           field_sequence: 2,
  //           count: 0,
  //         },
  //         {
  //           field_Id: "a27a12ec-c7b1-4f6b-a9ae-1b19ec8b1292",
  //           field_Label: "High Probability",
  //           field_Img: "HighProbabilityIcon",
  //           field_Journey: true,
  //           field_path: {},
  //           field_isactive: true,
  //           field_datasetid: {},
  //           field_sequence: 0,
  //           count: 0,
  //         },
  //         {
  //           field_Id: "6a7f7fa7-8003-4473-909a-fcdbf7b7053c",
  //           field_Label: "Very Low Response",
  //           field_Img: "ResponseIcon",
  //           field_Journey: true,
  //           field_path: {},
  //           field_isactive: true,
  //           field_datasetid: {},
  //           field_sequence: 0,
  //           count: 0,
  //         },
  //       ],
  //     },
  //   ],
  // };

  const dashboardData = useSelector(homescreenDataInfo);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchDashboardData())
        .then(() => setLoading(false))
        .catch((error) => {
          console.error("Error fetching dashboard data:", error);
          setLoading(false);
        });
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <main className="home-page-main">
        <HomeHeader />
        <HomeJourney loading={loading} dashboardData={dashboardData} />
      </main>
    </>
  );
}
