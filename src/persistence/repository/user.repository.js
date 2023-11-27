import { userDao } from "../daos/factory.js";
import UserResDTO from "../dto/user/user.res.dto.js";

export default class UserRepository {
    constructor(){
        this.dao = userDao;
    }

    async getByIdDTO(id){
        try {
            const response = await this.dao.getById(id);
            return new UserResDTO(response);
        } catch (error) {
            console.log(error);
        }
    }

    async getAllDto(){
        try {
            const usersResponseDto = [];
            const response = await this.dao.getAll();
            response.forEach(userData => {
                let user = {
                    nombre : userData.first_name,
                    apellido : userData.last_name,
                    edad : userData.age,
                    email : userData.email,
                    rol : userData.role
                }
                usersResponseDto.push(user);
            });
            return usersResponseDto;
        } catch (error) {
            console.log(error);
        }
    }
}