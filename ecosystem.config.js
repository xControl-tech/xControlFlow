module.exports = {
  apps: [
    {
      name: "xcontrolflow-api",
      script: "backend/src/server.js",
      env: {
        NODE_ENV: "production",
        PORT: 4000
      }
    },
    {
      name: "xcontrolflow-web",
      cwd: "frontend",
      script: "npm",
      args: "run preview",
      env: {
        NODE_ENV: "production",
        PORT: 5173
      }
    }
  ]
};
