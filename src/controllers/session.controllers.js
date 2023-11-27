import UserService from "../services/user.services.js";
const userService = new UserService();

export const currentResponse = async (req,res) =>{
    const user = await userService.getByIdDTO(req.user);
    if(!user){
        console.log('Error al recuperar user');
    }
    const nombre = user.nombre;
    const apellido = user.apellido;
    const edad = user.edad;
    const email = user.email;
    res.render('current',{nombre,apellido,edad,email});
} 