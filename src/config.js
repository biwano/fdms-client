export default {
  api: {
    baseURL: "http://localhost:5000/",
    timeout: 30000,
    headers: { "X-Custom-Header": "foobar" },
    tenant_master: "__root",
    tenant_all_id: "*",
    withCredentials: true,
    TTL: 10000,
    use_cache: false,
    on401() {
      this.globalError("Please authenticate");
      this.$router.push("/login");
    }
  }
};