import 'dotenv/config';

const configs = {
    server: {
        port: process.env.PORT || 5001,
    },
    database: {
        url: process.env.DATABASE_URL || 'DATABASE_URL',
    },
};

export default configs;
