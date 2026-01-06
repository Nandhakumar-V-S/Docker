import DashboardHeader from "./components/dashboard-header";
import DashboardSection from "./components/dashboard";

export default function DashboardModuleV2() {
  console.log("Dashboard Module V2");

  return (
    <>
      <main className="dashboard-page-v1">
        <DashboardHeader />
        <DashboardSection />
      </main>
    </>
  );
}
