import Nav from "../../components/admin/Nav";
import Sidebar from "../../components/admin/Sidebar";

export default function Overview() {
  return (
    <div className="admin">
      <Sidebar currentPage="admin" />
      <main>
        <Nav name='Dashboard Overview' />
      </main>
    </div>
  )
}