import { useParams } from "react-router-dom";
import CategoryTable from "../CategoryTable";
import "./CategoryView.css";
export default function CategoryView() {
  const { id } = useParams(); // get ":id" from URL

  return (
    <div className="category-view-container">
      <h2>Category Details</h2>
      <p>Category ID: {id}</p>
      {/* fetch data by ID here */}
      <CategoryTable />
    </div>
  );
}
