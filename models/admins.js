const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//admins schema
const adminSchema = mongoose.Schema({
    local : {    
        email       :   String,
        firstName   :   String,
        password    :   String
    }
});

adminSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

adminSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('Admin', adminSchema);