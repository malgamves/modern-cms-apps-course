module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '8ad0e322ec008531444acc333c50c8f7'),
  },
});
