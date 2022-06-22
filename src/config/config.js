const path = require( 'path' );

module.exports.getConfig = () => {
    const config = {
        'PORT': process.env.PORT || 5000,
        'MONGO_URL': process.env.MONGO_URL || 'mongodb+srv://Animesh:mongodb@cluster0.tc9y3.mongodb.net/Broadifi?retryWrites=true&w=majority',
        'UPLOAD_PATH': path.resolve( `${__dirname }/../uploads` ),
        'JWT_SECRET': process.env.JWT_SECRET || 'R4ND0M5TR1NG'
    };

    return config;
};

