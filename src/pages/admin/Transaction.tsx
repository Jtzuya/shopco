import Sidebar from "../../components/admin/Sidebar";

export default function Transaction() {
  return (
    <div className="admin">
      <div className="admin__wrapper">
        <Sidebar currentPage="transaction" />
        Transaction Page
      </div>
    </div>
  )
}