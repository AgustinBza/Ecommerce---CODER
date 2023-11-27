import Controllers from "./class.controller.js";
import TicketService from "../services/ticket.service.js";
import { createResponse } from "../utils.js";
const ticketService = new TicketService();

export default class TicketController extends Controllers {
    constructor(){
        super(ticketService);
    }

    async generateTicket(req, res, next){
        try {
            const { id } = req.params;
            const ticket = await ticketService.generateTicket(id);
            if(!ticket) createResponse(res, 404, 'Error generating ticket');
            createResponse(res, 200, ticket);
        } catch (error) {
            next(error.message);
        }
    }
}