const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValido = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    // se define las validaciones
    nombre: {
        type: String,
        required: [true, 'el nombre es necesario']
    },
    email: {
        type: String,
        // unique para validar que el correo no sea repetido
        unique: true,
        required: [true, 'el correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'la contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    // Validar que la persona un rol correcto (esperado)
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValido
    },
    estado: {
        type: Boolean,
        default: true
    }, // Booelan
    google: {
        type: Boolean,
        default: false
    }
});

// schema metodos al esquema cuando nosotros hacemos cambios a los prototipos
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

// para utilizar el plugin del unique debido a que el email debe ser unico
usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
});

module.exports = mongoose.model('Usuario', usuarioSchema);