let mongoose = require('mongoose')
let Schema = mongoose.Schema
let bcrypt = require('bcrypt')

let userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 5 },
    age: Number,

    phone: { type: String, required: true, minlength: 13 },
},
{ timestamps: true }
);


userSchema.pre('save', function (next) {
    if (this.password && this.isModified('password')) {
        console.log(this, 'before hashing');
        bcrypt.hash(this.password, 10, (err, hashed) => {
            if (err) return next(err);
            this.password = hashed;
            console.log(this, 'after hashing');
            next()

        })
    } else {
      next()
    }
});



userSchema.methods.varifyPassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, result) => {
        return cb(err, result);
    })
}

module.exports = mongoose.model('User', userSchema) 