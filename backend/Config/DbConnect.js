const mongoose = require('mongoose');


// Connect to MongoDB


const dbConnect = async () => {

    try {
        await mongoose.connect('mongodb://localhost:27017/DB_instagram', {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true
        });
        console.log('Connected to MongoDB');
        
    } catch (error) {
        console.log('Error connecting to MongoDB');
        console.error(error);
        
    }


}

module.exports = dbConnect;