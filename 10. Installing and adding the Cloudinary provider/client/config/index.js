const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:1337' : process.env.STRAPI_URL;