const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            process.env.MONGO_URI.replace(
                "<password>",
                process.env.MONGO_PASSWORD
            )
        );

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;
