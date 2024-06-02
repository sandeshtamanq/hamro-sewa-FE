import ProductList from "../../home/product-list";
import { useFetchCategoryQuery } from "../../../hooks/useCategory";

export default function ServiceView() {
  const { data: categories } = useFetchCategoryQuery();

  return (
    <>
      <div className="mt-4 fw-bold fs-1 text-center">Services</div>
      {categories?.data.map((category, index) => (
        <ProductList
          id={category.id}
          key={index}
          serviceName={category?.categoryName}
          data={category?.products}
        />
      ))}
    </>
  );
}
