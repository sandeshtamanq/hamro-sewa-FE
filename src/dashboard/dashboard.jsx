import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import AppGuard from "../guard/app.guard";

export default function Dashboard() {
  return (
    <AppGuard>
      <div className="">
        <div className="row d-flex">
          <Sidebar />
          <div className="col-10">
            <Outlet />
          </div>
        </div>
      </div>
    </AppGuard>
  );
}
