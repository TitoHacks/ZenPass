const bcrypt = require("bcryptjs")
module.exports = {

    hashPassword: function (password){

        return bcrypt.hashSync(password,10);

    },

    matchesPassword: async function (password, hashedPassword){
        return await bcrypt.compare(password,hashedPassword);
        
    }

}