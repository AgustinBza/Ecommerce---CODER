export default class UserResDTO {
    constructor(user) {
        this.nombre = user.first_name,
        this.apellido = user.last_name,
        this.edad = user.age,
        this.email = user.email,
        this.rol = user.role
    }
};