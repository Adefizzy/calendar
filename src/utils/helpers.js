import * as yup from "yup";

export const inputProps = [
  { name: "title", label: "Title", type: "text" },
  { name: "dateAndTime", label: "Date and Time", type: "datetime-local" },
  { name: "city", label: "City", type: "asyncSelect" },
];

export const formValidations = yup.object().shape({
  title: yup
    .string()
    .max(30, "Title must not be more than 30")
    .required("Title is required"),
  dateAndTime: yup.string().required("Date is required"),
});

export const initialEvent = {
  dateAndTime: new Date().toISOString().split(":").slice(0, 2).join(":"),
  city: { label: "", value: "" },
  title: "",
  isEdit: false,
};
