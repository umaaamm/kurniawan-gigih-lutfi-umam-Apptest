import Services from "./Services";

const getContact = () => {
  return Services.get("/contact");
};

const postContact = (data) => {
  return Services.post("/contact", data);
};

const editContact = (id, data) => {
  return Services.put(`/contact/${id}`, data);
};

const deleteContact = id => {
  return Services.delete(`/contact/${id}`);
};

const endPointServices = {
  getContact,
  postContact,
  editContact,
  deleteContact
};

export default endPointServices;