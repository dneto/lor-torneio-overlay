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

    return response.data;
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

    if (response.status !== 200) {
      if (response.status === 404) {
        throw new Error("O ID passado não corresponde a um registro válido.");
      }
      throw new Error("Ocorreu um erro");
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
      url: `${backend}/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });

    if (response.status !== 200) {
      if (response.status === 404) {
        throw new Error("O ID passado não corresponde a um registro válido.");
      }
      throw new Error("Ocorreu um erro");
    }
    return response.data;
  } else {
    throw emptyBackendError;
  }
};

export { create, findOne, update };
