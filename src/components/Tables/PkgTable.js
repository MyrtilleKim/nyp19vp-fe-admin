import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// bootstrap
import { Button, Container } from "react-bootstrap";

// assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPlus,
  faSuitcase,
  faStopwatch,
  faUsers,
  faCoins,
  faWaveSquare,
  faTrashArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

// data
import {
  getAllPackages,
  createPackage,
  updatePackage,
} from "store/requests/package";

// project import
import Modals from "components/Modal";
import SampleTable from "./Datatable/SampleTable";
import ModalForm from "components/Forms/ModalForm";
import Alerts from "components/Alerts";
import { removePackage, restorePackage } from "store/requests/package";

// third party
import * as Yup from "yup";
import { HttpStatusCode } from "axios";

const PackageTable = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state?.auth.login);
  const { packages } = useSelector((state) => state.packages);
  const [showModal, setShowModal] = useState(false);
  const [addAction, setAddAction] = useState(false);
  const [showModalForm, setShowModalForm] = useState(false);
  const [action, setAction] = useState();
  const [selected, setSelected] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [classes, setClasses] = useState({
    alertVariant: "danger",
    alertClass: "fixed-top mx-auto",
  });
  const [initValues, setInitValues] = useState({
    name: "",
    duration: 1,
    noOfMember: 2,
    editableDuration: false,
    editableNoOfMember: false,
    price: 1000,
    description: null,
    coefficient: 1000,
    submit: null,
  });
  useEffect(() => {
    getAllPackages(dispatch);
  }, [dispatch]);
  const handleAction = (row, action) => {
    if (typeof action === "object") {
      const valuesArray = Object.values(action);
      action = valuesArray.join("").trim();
    }
    setAction(action);
    setSelected(row);
    if (action === "remove") {
      setContent(`Bạn có chắc chắn muốn xóa gói ${row.name}?`);
    } else if (action === "restore") {
      setContent(`Bạn có chắc chắn muốn khôi phục gói ${row.name}?`);
    }
    setShowModal(true);
  };
  const handleConfirm = async () => {
    setShowModal(false);
    let res;
    let error = false;
    if (action === "remove") {
      console.log("row", selected._id);
      res = await removePackage(selected._id, dispatch);
      if (res.statusCode === HttpStatusCode.Ok) {
        handleAlert("Thành công", "Xóa gói thành công", "success");
      } else error = true;
    } else if (action === "restore") {
      res = await restorePackage(selected._id, dispatch);
      if (res.statusCode === HttpStatusCode.Ok) {
        handleAlert("Thành công", "Khôi phục gói thành công", "success");
      } else error = true;
    }
    if (error) {
      handleAlert("Thất bại", res.message, "danger");
      error = false;
    }
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };
  const handleClose = () => {
    setShowModal(false);
    setShowModalForm(false);
    setShowAlert(false);
  };
  const handleAlert = (title, content, variant) => {
    setTitle(title);
    setContent(content);
    setClasses({
      alertVariant: variant,
      alertClass: "fixed-top mx-auto",
    });
  };
  const handleShowAlert = (title, content, variant) => {
    handleAlert(title, content, variant);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };
  const handleAddAction = () => {
    setAddAction(true);
    setInitValues({
      name: "",
      duration: 1,
      noOfMember: 2,
      editableDuration: false,
      editableNoOfMember: false,
      price: 1000,
      description: null,
      coefficient: 1000,
      submit: null,
    });
    setSelected(null);
    setShowModalForm(true);
  };
  const handleSubmitModalForm = async (values) => {
    let formData = {
      name: values.name,
      duration: values.duration,
      price: Number(values.price),
      noOfMember: values.noOfMember,
      editableDuration: values.editableDuration,
      editableNoOfMember: values.editableNoOfMember,
      description: values.description.join("\n"),
      coefficient: Number(values.coefficient),
    };
    let res;
    if (addAction) {
      formData.createdBy = currentUser?.data.userInfo?._id;
      res = await createPackage(formData, dispatch);
      if (res.statusCode === HttpStatusCode.Created) {
        handleClose();
        handleAlert("Thành công", "Tạo gói thành công", "success");
      } else {
        handleAlert("Thất bại", res.message, "danger");
      }
    } else {
      formData.updatedBy = currentUser?.data.userInfo?._id;
      res = await updatePackage(formData, dispatch, selected._id);
      if (res.statusCode === HttpStatusCode.Ok) {
        handleClose();
        handleAlert("Thành công", "Cập nhật gói thành công", "success");
      } else {
        handleAlert("Thất bại", res.message, "danger");
      }
    }
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };

  function onRowClick(data) {
    setSelected(data);
    setAddAction(false);
    setInitValues({
      name: data.name,
      duration: data.duration,
      noOfMember: data.noOfMember,
      editableDuration: data.editableDuration,
      editableNoOfMember: data.editableNoOfMember,
      price: data.price,
      description: data.description,
      coefficient: data.coefficient,
      submit: null,
    });
    setShowModalForm(true);
  }

  const schema = Yup.object().shape({
    name: Yup.string().max(255).required("Bắt buộc"),
    duration: Yup.number()
      .min(1, "Thời hạn ít nhất là 1 tháng")
      .max(36, "Thời hạn không nhiều hơn 36 tháng")
      .required("Bắt buộc"),
    noOfMember: Yup.number()
      .min(2, "Ít nhất phải có 2 thành viên")
      .max(30, "Thành viên tối đa không được vượt 30 người")
      .required("Bắt buộc"),
    price: Yup.number()
      .typeError("Đơn giá phải là một con số")
      .min(1000, "Đơn giá ít nhất là 1000 đ")
      .required("Bặt buộc"),
    coefficient: Yup.number()
      .typeError("Đơn giá phải là một con số")
      .min(1000, "Đơn giá ít nhất là 1000 đ")
      .required("Bặt buộc"),
  });

  // icons
  const icons = {
    faSuitcase,
    faStopwatch,
    faUsers,
    faCoins,
    faWaveSquare,
  };

  const addForm = [
    {
      title: "Tên Gói",
      icon: icons.faSuitcase,
      name: "name",
      type: "text",
      placeholder: "Nhập tên gói",
      classes: { formGroup: "mb-4", formControl: "input-out-button-group" },
      required: true,
      disabled: selected && selected.deleted,
      _Type: "simple",
    },
    {
      title: "Thời hạn (tháng)",
      icon: icons.faStopwatch,
      name: "duration",
      nameCheckbox: "editableDuration",
      labelCheckbox: "Tùy chỉnh",
      type: "number",
      placeholder: "Nhập thời hạn",
      classes: { formGroup: "mb-4", formControl: "input-button-group" },
      required: true,
      disabled: selected && selected.deleted,
      _Type: "checkbox",
    },
    {
      title: "Thành viên",
      icon: icons.faUsers,
      name: "noOfMember",
      nameCheckbox: "editableNoOfMember",
      labelCheckbox: "Tùy chỉnh",
      type: "number",
      placeholder: "Nhập số thành viên tối đa",
      required: true,
      disabled: selected && selected.deleted,
      classes: { formGroup: "mb-4", formControl: "input-button-group" },
      _Type: "checkbox",
    },
    {
      title: "Đơn giá",
      icon: icons.faCoins,
      name: "price",
      placeholder: "Nhập đơn giá",
      required: true,
      disabled: selected && selected.deleted,
      classes: { formGroup: "mb-4", formControl: "input-out-button-group" },
      _Type: "currency",
    },
    {
      title: "Hệ số",
      icon: icons.faWaveSquare,
      name: "coefficient",
      placeholder: "Nhập hệ số giá",
      required: true,
      disabled: selected && selected.deleted,
      classes: { formGroup: "mb-4", formControl: "input-out-button-group" },
      _Type: "currency",
    },
    {
      title: "Mô tả",
      name: "description",
      classes: { formGroup: "mb-0" },
      disabled: selected && selected.deleted,
      _Type: "text-area",
    },
  ];

  const HEADER = [
    {
      alignment: {
        horizontal: "center",
      },
      checkbox: {
        className: "table-checkbox",
        idProp: "_id",
      },
      prop: "checkbox",
    },
    {
      isFilterable: true,
      prop: "_id",
    },
    {
      isFilterable: true,
      isSortable: true,
      prop: "name",
      title: "Gói dịch vụ",
    },
    {
      isSortable: true,
      prop: "duration",
      title: "Thời hạn",
      cell: (row) => <span>{row.duration} tháng</span>,
    },
    {
      isSortable: true,
      prop: "noOfMember",
      title: "Thành viên",
    },
    {
      isSortable: true,
      prop: "price_vnd",
      title: "Đơn giá",
    },
    {
      isSortable: true,
      prop: "updatedAt",
      title: "Cập nhật",
      cell: (row) => (
        <span>
          <FontAwesomeIcon icon={faClock} /> {row.updatedAt}
        </span>
      ),
    },
    {
      prop: "deleted",
      cellProps: { style: { width: "10px" } },
      cell: (row) => (
        <Button
          className="btn-table-options"
          onClick={(e) =>
            handleAction(row, {
              ...(row.deleted ? "restore" : " remove"),
            })
          }
        >
          <FontAwesomeIcon icon={row.deleted ? faTrashArrowUp : faTrash} />
        </Button>
      ),
    },
  ];
  return (
    <Container>
      <Modals
        title="Xác nhận"
        show={showModal}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      >
        {selected && <h6>{content}</h6>}
      </Modals>
      <Alerts
        show={showAlert}
        handleClose={handleClose}
        title={title}
        classes={classes}
      >
        {content}
      </Alerts>
      <ModalForm
        title="Gói dịch vụ"
        show={showModalForm}
        handleClose={handleClose}
        schema={schema}
        initValues={initValues}
        forms={addForm}
        handleSubmit={handleSubmitModalForm}
        handleAlert={handleShowAlert}
      ></ModalForm>
      <SampleTable
        title="Gói dịch vụ"
        header={HEADER}
        body={packages}
        classes="package-management"
        onRowClick={onRowClick}
      >
        <Button
          variant="primary"
          className="fw-bolder ms-3"
          onClick={handleAddAction}
        >
          <FontAwesomeIcon icon={faPlus} /> Thêm nhóm
        </Button>
      </SampleTable>
    </Container>
  );
};
export default PackageTable;
// Then, use it in a component.
