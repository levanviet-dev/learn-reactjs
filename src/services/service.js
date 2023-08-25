import http from '../api/axios';

class DataService {
  getAll() {
    return http.get("/users");
  }

  get(id) {
    return http.get(`/users/${id}`);
  }

  create(data) {
    return http.post("/users", data);
  }

  update(id, data) {
    return http.post(`/users/${id}`, data);
  }

  delete(id) {
    return http.post(`/users/delete`,id);
  }
}

export default new DataService()