import PropTypes from "prop-types";

// bootstrap
import { Modal, Button, Form } from "react-bootstrap";

// third-party
import { Formik } from "formik";

// project import
import { PasswordGroupForm, SampleGroupForm, DateGroupForm } from "./GroupForm";

const ModalForm = ({
  title,
  children,
  show,
  handleClose,
  classes,
  schema,
  initValues,
  forms,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Formik
        validationSchema={schema}
        initialValues={initValues}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <Form noValidate className="mb-3" onSubmit={handleSubmit}>
            <Modal.Body>
              {forms.map((form) => ({
                ...(form.type && (
                  <SampleGroupForm
                    key={`form-control-${form.id}`}
                    {...form}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    touched={touched}
                    errors={errors}
                    values={values}
                  />
                )),
                ...(form.checkStrength && (
                  <PasswordGroupForm
                    key={`form-control-${form.id}`}
                    {...form}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    touched={touched}
                    errors={errors}
                    values={values}
                  />
                )),
                ...(!form.checkStrength && !form.type && (
                  <DateGroupForm
                    key={`form-control-${form.id}`}
                    {...form}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    touched={touched}
                    errors={errors}
                    values={values}
                  />
                )),
              }))}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Đóng
              </Button>
              <Button variant="primary" disabled={isSubmitting} type="submit">
                Xác nhận
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
ModalForm.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  show: PropTypes.bool,
  children: PropTypes.node,
  handleClose: PropTypes.func,
  classes: PropTypes.object,
  schema: PropTypes.any,
  initValues: PropTypes.object,
  forms: PropTypes.array,
};

export default ModalForm;
