//  该文件暂时没用上，script和args的配合也不如所预料的，
module.exports = {
  apps: [
    {
      name: 'local-circle-app',
      script: 'npm run start',
      cwd: './',
      args: '-- typegoose',
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
