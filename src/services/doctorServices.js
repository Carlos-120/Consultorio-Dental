// /src/services/doctorServices.js
import API from "./api";

/* Normalizador para que siempre devuelva { data, page, pages, total } */
const normalize = (payload) => {
  if (Array.isArray(payload))
    return { data: payload, page: 1, pages: 1, total: payload.length };
  if (Array.isArray(payload?.data)) {
    return {
      data: payload.data,
      page: payload.page ?? 1,
      pages: payload.pages ?? 1,
      total: payload.total ?? payload.data.length,
    };
  }
  return { data: [], page: 1, pages: 1, total: 0 };
};

/* GET /api/doctors (fallback a /api/doctores) */
export const fetchDoctores = async (params = {}) => {
  const { q = "", especialidad = "", page = 1, size = 12 } = params;
  try {
    const res = await API.get("/doctors", {
      params: { q, especialidad, page, size },
    });
    return normalize(res.data);
  } catch (e) {
    if (e?.response?.status === 404) {
      const res2 = await API.get("/doctores", {
        params: { q, especialidad, page, size },
      });
      return normalize(res2.data);
    }
    throw e;
  }
};

/* POST /api/doctors/register (fallback a /api/doctores/register) */
export const registerDoctor = async (payload) => {
  try {
    const { data } = await API.post("/doctors/register", payload);
    return data;
  } catch (e) {
    if (e?.response?.status === 404) {
      const { data } = await API.post("/doctores/register", payload);
      return data;
    }
    throw e;
  }
};
