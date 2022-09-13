import axios from "axios";

const backend = process.env.REACT_APP_BACKEND_URI;
const emptyBackendError = new Error("no backend");

const create = async (data) => {
  if (backend && backend.length > 0) {
    const response = await axios({
      method: "post",
      url: backend,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });
    if (response.status != 200) {
      throw new Error("Could not create session", id);
    }
  } else {
    throw emptyBackendError;
  }
};

const findOne = async (id) => {
  if (backend && backend.length > 0) {
    const response = await axios({
      method: "get",
      url: `${backend}/${id}`,
    });

    if (response.status != 200) {
      throw new Error("Could not retrieve id", id);
    }

    return response.data;
  } else {
    throw emptyBackendError;
  }
};

const update = async (id, data) => {
  if (backend && backend.length > 0) {
    const response = await axios({
      method: "put",
      url: `${backend}/${idServidor}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });

    if (response.status != 200) {
      throw new Error("Could not retrieve id", id);
    }
  } else {
    throw emptyBackendError;
  }
};

export { create, findOne, update };
