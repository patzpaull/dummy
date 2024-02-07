const mongoose = require('mongoose')

const carSchema = ({

    car : {
        type: String,
        required: true,
        },
    is_completed : {
        type: Boolean,
        default: true,
        validator:{
            validate: (value) => typeof value === "boolean",
            message: "is_completed must be a boolean value ",
        },
    }, })
const CarModel = mongoose.model('car', carSchema);

module.exports = CarModel