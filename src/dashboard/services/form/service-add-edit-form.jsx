import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../../../components/loading-button";
import { useFetchCategoryQuery } from "../../../hooks/useCategory";
import {
  useAddServiceMutation,
  useUpdateServiceMutation,
} from "../../../hooks/useService";

export default function AddEditService({ formMode, defaultValue }) {
  const [productDetail, setProductDetail] = useState({
    productName: "",
    productDescription: "",
    categoryId: 0,
    productPrice: "",
  });
  const [productImage, setProductImage] = useState("");
  const [preview, setPreview] = useState("");

  const { data: categories } = useFetchCategoryQuery();

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = useCallback(() => {
    enqueueSnackbar("Service add successful", { variant: "success" });
    navigate("/dashboard/services");
  }, [enqueueSnackbar, navigate]);

  const onError = useCallback(
    (error) => {
      enqueueSnackbar(
        Array.isArray(error?.response?.data?.message)
          ? error?.response?.data?.message[0]
          : error?.response?.data?.message,
        { variant: "error" }
      );
    },
    [enqueueSnackbar]
  );

  const { mutate: addProductMutation, isLoading } = useAddServiceMutation(
    onSuccess,
    onError
  );

  const { mutate: updateProductMutation, isLoading: updating } =
    useUpdateServiceMutation(onSuccess, onError);

  useEffect(() => {
    if (formMode === "Add") return;
    setProductDetail(defaultValue);
    setPreview(defaultValue.productImageUrl);
  }, [formMode, defaultValue]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setProductDetail((preVal) => ({
      ...preVal,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("productName", productDetail.productName);
      formData.append("productDescription", productDetail.productDescription);
      formData.append("productPrice", productDetail.productPrice);
      formData.append("productImage", productImage);
      formData.append("categoryId", productDetail.categoryId);

      if (formMode === "Add") {
        addProductMutation(formData);
      } else {
        updateProductMutation({ id: defaultValue.id, formData });
      }
    },
    [
      productImage,
      productDetail,
      addProductMutation,
      defaultValue,
      updateProductMutation,
      formMode,
    ]
  );

  return (
    <div className="shadow rounded mt-4 p-4">
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="">Add Services</h3>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="bg-white">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Product Name
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={productDetail.productName}
              name="productName"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Product Price
            </label>
            <input
              type="number"
              onChange={handleChange}
              value={productDetail.productPrice}
              name="productPrice"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="exampleFormControlTextarea1">
              Product Description
            </label>
            <textarea
              name="productDescription"
              value={productDetail.productDescription}
              onChange={handleChange}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputnumber1" className="form-label">
              Services
            </label>
            <select
              defaultValue={defaultValue?.category?.categoryName}
              defaultChecked
              onChange={handleChange}
              name="categoryId"
              className="form-select"
              aria-label="Default select example"
            >
              <option>
                {defaultValue?.category?.categoryName ?? "Select One"}
              </option>
              {categories?.data?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Product Image
            </label>
            <input
              onChange={(e) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setPreview(reader.result);
                };
                reader.readAsDataURL(e.target.files[0]);

                setProductImage(e.target.files[0]);
              }}
              className="form-control"
              type="file"
              id="formFile"
            />
            {preview && (
              <img
                src={preview}
                style={{
                  height: "500px",
                  width: "500px",
                  flexGrow: "1",
                  objectFit: "contain",
                }}
              />
            )}
          </div>

          <LoadingButton
            isLoading={isLoading | updating}
            type="submit"
            style="btn btn-primary w-100 mt-3"
          >
            {formMode === "Add" ? "Add Product" : "Update Product"}
          </LoadingButton>
        </form>
      </div>
    </div>
  );
}
