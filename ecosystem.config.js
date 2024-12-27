module.exports = {
    apps: [
      {
        name: "booking-backend",
        script: "npm",
        args: "run start",
        env: {
          NODE_ENV: "development",
        },
      },
    ],
  };