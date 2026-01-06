import DashboardHeader from "./components_v1/dashboard-header";
import DashboardSection from "./components_v1/dashboard";

export default function DashboardModule() {
  console.log("Dashboard Module");

  return (
    <>
      <main className="dashboard-page">
        <DashboardHeader />
        <DashboardSection />
      </main>
    </>
  );
}
