import Nav from "../../components/admin/Nav";
import Sidebar from "../../components/admin/Sidebar";

export default function Product() {
  return (
    <div className="admin">
      <Sidebar currentPage="product" />
      <main>
        <Nav name='Product' />
      </main>
    </div>
  )
}