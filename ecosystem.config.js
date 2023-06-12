module.exports = {
  apps : [
    {
      name: 'serverReads',
      script: 'serverReads.js',
      watch: false,
      //watch: '.'
      autorestart: true,
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
      },
    },
/*
  {
    script: './service-worker/',
    watch: ['./service-worker']
  }
*/
],
};
