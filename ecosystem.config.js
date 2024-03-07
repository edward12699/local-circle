module.exports = {
  apps: [
    {
      name: 'local-circle-app',
      script: 'npm',
      args: 'run start -- typegoose',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
      error_file: 'logs/error.log',
      out_file: 'logs/out.log',
    },
  ],
};
