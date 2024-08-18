import Sidebar from "../../components/admin/Sidebar";
import Error from "../../components/Error";

export default function TransactionList() {
  return (
    <div className="admin">
      <div className="admin__wrapper">
        <Sidebar currentPage="transaction-list" />
        <Error />
      </div>
    </div>
  )
}