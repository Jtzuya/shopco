import { useParams, Link } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
// import { useEffect } from "react";

export default function Product() {
  const params = useParams();
  const param = 'id' in params ? params : null
  console.log(param)

  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (event.ctrlKey && event.key === 'r') {
  //       event.preventDefault(); // Prevent the default refresh action
  //       // Use prompt to display a confirmation message
  //       const userResponse = window.confirm('Data will be removed. Are you sure?');
        
  //       if (userResponse) {
  //         // User clicked "OK"
  //         console.log('User confirmed');
  //         window.location.reload()
  //       } else {
  //         // User clicked "Cancel"
  //         console.log('User canceled');
  //       }
  //     }
  //   };

  //   // Add the event listener for keydown
  //   window.addEventListener('keydown', handleKeyDown);

  //   // Cleanup the event listener when the component is unmounted
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, []);

  // debugger
  // TODO: if param is null. It is to create a new product
  // TODO: if param has value. get grab id and it only updates the data of that product

  return (
    <div className="admin">
      <Sidebar currentPage="product" />
      <main className="product">
        <Link className="product__backlink" to={`${window.origin}/admin/product-list`}>
          <span className="product__backlink-icon">
            <svg width="33" height="16" viewBox="0 0 33 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM33 7L1 7V9L33 9V7Z" fill="currentColor"/>
            </svg>
          </span>
          <span>Go back</span>
        </Link>

        <form action="#" className="form">
          <div className="form__field">
            <span>Name</span>
            <label>
              <input type="text" name="name" id="name" placeholder="Lorem ipsum dolor sit amet"/>
            </label>
          </div>

          <div className="form__field">
            <span>Details</span>
            <label>
              <textarea name="description" id="description" placeholder="Lorem ipsum dolor sit amet."></textarea>
            </label>
          </div>

          <div className="form__field">
            <span>Summary</span>
            <label>
              <input type="text" name="summary" id="summary" placeholder="Lorem ipsum dolor sit amet."></input>
            </label>
          </div>

          <div className="form__field">
            <span>Media</span>
            <label>
              <input type="file" name="image" id="image" multiple accept="image/png, image/jpeg, image/webp, image/avif"></input>
            </label>
          </div>

          <div className="form__group">
            <div className="form__field">
              <span>Stock</span>
              <label>
                <input type="text" name="stock" id="stock" placeholder="10"></input>
              </label>
            </div>

            <div className="form__field">
              <span>Current Price</span>
              <label>
                <input type="text" name="current_price" id="current_price" placeholder="$2.99"></input>
              </label>
            </div>

            <div className="form__field">
              <span>Old Price</span>
              <label>
                <input type="text" name="old_price" id="old_price" placeholder="$2.99"></input>
              </label>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}