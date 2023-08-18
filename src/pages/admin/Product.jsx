import { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import api from "@api";
import "./auth.scss";
import "./product.scss";
import { convertToUSD } from "@mieuteacher/meomeojs";
import { message } from "antd";
import ProductUpdatePop from "./product-components/Update";
message.config({
  top: 150,
  duration: 1,
  maxCount: 1,
  rtl: true,
  prefixCls: "my-message",
});
import { RootContext } from "@/App";
export default function ProductManage() {
  const { productStore, productActions, dispatch } = useContext(RootContext);

  const urlPreviewRef = useRef();

  const [categories, setCategories] = useState([]);
  try {
    useEffect(() => {
      axios.get("http://localhost:4000/apis/v1/categories").then((res) => {
        setCategories(res.data.data);
      });
    }, []);
  } catch (err) {}

  useEffect(() => {
    api.products
      .findMany()
      .then((res) => {
        if (res.status == 200) {
          dispatch(productActions.addProducts(res.data.data));
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert("Loiii");
      });
  }, []);

  const [updateData, setUpdateData] = useState(null);
  return (
    <div>
      <div>
        <h1 style={{ marginLeft: "600px" }}>Product Manage</h1>
      </div>
      <div className="form_container">
        <h1>Add Product</h1>
        <form
          className="form_add"
          onSubmit={async (eventForm) => {
            eventForm.preventDefault();
              if(eventForm.target.des.value.length>=20){
              alert("truong mo ta san pham qua dai");
              return
              }
            let newProductInfor = {
              category_id: Number(eventForm.target.category_id.value),
              name: eventForm.target.name.value,
              des: eventForm.target.des.value,
              price: Number(eventForm.target.price.value),
            };

            let newProductAvatar = {
              avatar: eventForm.target.avatar.files[0],
            };

            let formData = new FormData();
            formData.append("imgs", newProductAvatar.avatar);
            formData.append("product_infor", JSON.stringify(newProductInfor));
            await api.products
              .create(formData)
              .then((res) => {
                if (res.status == 200) {
                  message.success("Add Product Successfully!");
                  dispatch(productActions.addProduct(res.data.data));
                } else {
                  alert(res.data.message);
                }
              })
              .catch((err) => {
                console.log("err", err);
              });
          }}
        >
          <div className="form_add_avatar">
            <img
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
              }}
              ref={urlPreviewRef}
              src="../images/noAvatar.jpg"
            />
            <br />

            <input
              name="avatar"
              onChange={(event) => {
                if (event.target.files.length == 0) {
                  console.log("Chưa chọn hình!");
                } else {
                  let blodUrl = URL.createObjectURL(event.target.files[0]);
                  urlPreviewRef.current.src = blodUrl;
                }
              }}
              type="file"
            />
            <br />
          </div>
          <div className="form_add_product">
            <select
              name="category_id"
              style={{
                border: "1px solid black",
                borderRadius: "5px",
              }}
            >
              {categories?.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
            <br />
            <input type="text" placeholder="Name Product" name="name"></input>
            <br />
            <input type="text" placeholder="Des" name="des"></input>
            <br />
            <input type="text" placeholder="Price" name="price"></input>
            <br />
            <button class="btn btn-info" type="submit">
              Add
            </button>
          </div>
        </form>
        <div className="form_listProduct">
          <h1>List Product</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Avatar</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">UpDate</th>
                {/* <th scope="col">Stock</th> */}
              </tr>
            </thead>
            <tbody>
              {productStore.data?.map((product, index) => (
                <tr key={Date.now() * Math.random()}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <img
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                      }}
                      src={product.avatar}
                      alt=""
                    />
                  </td>

                  <td>{product.name}</td>
                  <td>{product.des}</td>
                  <td>{convertToUSD(product.price)}</td>
                  <td>
                    <span style={{ margin: "0px 30px" }}>
                      {product.quantity}
                    </span>
                     <button
                      onClick={() => {
                        setUpdateData(product);
                      }}
                      type="button"
                      class="btn btn-info"
                    >
                      UpDate
                    </button>
                  </td>
                  
                   
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {updateData ? (
        <ProductUpdatePop
          productActions={productActions}
          dispatch={dispatch}
          updateData={updateData}
          setUpdateData={setUpdateData}
          categories={categories}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
