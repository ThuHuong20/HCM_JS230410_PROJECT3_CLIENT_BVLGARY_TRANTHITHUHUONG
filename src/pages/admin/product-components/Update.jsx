import React, { useRef } from "react";
import "./main.scss";
import { Modal } from "antd";
import api from "@api";
export default function Update({
  setUpdateData,
  categories,
  updateData,
  productActions,
  dispatch,
}) {
  const urlPreviewRef = useRef();
  async function updateProduct(eventForm) {
    eventForm.preventDefault();
    let updateInfor = {
      category_id: Number(eventForm.target.category_id.value),
      name: eventForm.target.name.value,
      des: eventForm.target.des.value,
      price: Number(eventForm.target.price.value),
    };
    let formData = new FormData();
    if (eventForm.target.avatar.files.length > 0) {
      formData.append("avatar", eventForm.target.avatar.files[0]);
    }
    formData.append("product_infor", JSON.stringify(updateInfor));

    api.products
      .update(updateData.id, formData)
      .then((res) => {
        if (res.status == 200) {
          Modal.success({
            content: res.data.message,
            onOk: () => {
              api.products
                .findMany()
                .then((res) => {
                  if (res.status == 200) {
                    dispatch(productActions.addProducts(res.data.data));
                    setUpdateData(false);
                  } else {
                    alert(res.data.message);
                  }
                })
                .catch((err) => {
                  alert("Loiii");
                });
            },
          });
        } else {
          Modal.error({
            content: res.data.message,
          });
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  return (
    <div className="product_update_pop">
      <div
        onClick={() => {
          Modal.confirm({
            content: "Do you want to not update?",
            onOk: () => {
              setUpdateData(null);
            },
          });
        }}
        className="over_hidden"
      ></div>

      <form
        onSubmit={(e) => {
          updateProduct(e);
        }}
        className="update_form"
      >
        <div className="form_add_avatar">
          <img
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
            }}
            ref={urlPreviewRef}
            src={`${updateData.avatar}`}
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
            defaultValue={updateData.category_id}
          >
            {categories?.map((category, index) => (
              <option key={index} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
          <br />
          <input
            type="text"
            defaultValue={updateData.name}
            placeholder="Name Product"
            name="name"
          ></input>
          <br />
          <input
            type="text"
            defaultValue={updateData.des}
            placeholder="Des"
            name="des"
          ></input>
          <br />
          <input
            defaultValue={updateData.price}
            type="text"
            placeholder="Price"
            name="price"
          ></input>
          <br />
          <button class="btn btn-info" type="submit">
            Save
          </button>
          <button
            onClick={() => {
              Modal.confirm({
                content: "Bạn có muốn đừng việt update ?",
                onOk: () => {
                  setUpdateData(null);
                },
              });
            }}
            class="btn btn-danger"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
