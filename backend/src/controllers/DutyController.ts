import { Request, Response } from 'express';
import { DutyRepository } from '../repositories/DutyRepository';

const dutyRepository = new DutyRepository();

export class DutyController {
    async getAllDuties(req: Request, res: Response): Promise<Response> {
        try {
            const duties = await dutyRepository.findAll();
            return res.json(duties);
        } catch (err) {
            console.error(err);
            return res.status(500).json('Server Error');
        }
    }

    async getDutyById(req: Request, res: Response): Promise<Response> {
        try {
            const duty = await dutyRepository.findById(+req.params.id);
            if (!duty) {
                return res.status(404).json('Duty not found');
            }
            return res.json(duty);
        } catch (err) {
            console.error(err);
            return res.status(500).json('Server Error');
        }
    }

    async createDuty(req: Request, res: Response): Promise<Response> {
        try {
            const { name, completed } = req.body;
            if (typeof name !== 'string' || typeof completed !== 'boolean') {
                return res.status(400).json('Invalid input: name must be a string and completed must be a boolean');
            }

            const newDuty = await dutyRepository.create(name, completed);
            return res.status(201).json(newDuty);
        } catch (err) {
            console.error(err);
            return res.status(500).json('Server Error');
        }
    }

    async updateDuty(req: Request, res: Response): Promise<Response> {
        try {
            const updatedDuty = await dutyRepository.update(+req.params.id, req.body.name, req.body.completed);
            return res.json(updatedDuty);
        } catch (err) {
            console.error(err);
            return res.status(500).json('Server Error');
        }
    }

    async deleteDuty(req: Request, res: Response): Promise<Response> {
        try {
            const result = await dutyRepository.delete(+req.params.id);
            return res.json(result);
        } catch (err) {
            console.error(err);
            return res.status(500).json('Server Error');
        }
    }
}
