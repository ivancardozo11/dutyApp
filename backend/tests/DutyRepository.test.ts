import { DutyRepository } from '../src/repositories/DutyRepository';
import pool from '../src/config/database';
import { QueryResult } from 'pg';

jest.mock('../src/config/database');

const dutyRepo = new DutyRepository();

describe('DutyRepository CRUD operations', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should retrieve all duties', async () => {
        const mockDuties = [{ id: 1, name: 'Test Duty', completed: false }];
        (pool.query as jest.Mock).mockResolvedValueOnce({ rows: mockDuties } as QueryResult);

        const result = await dutyRepo.findAll();
        expect(result).toEqual(mockDuties);
        expect(pool.query).toHaveBeenCalledWith('SELECT * FROM duties');
    });

    it('should find a duty by ID', async () => {
        const mockDuty = { id: 1, name: 'Existing Duty', completed: true };
        (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockDuty] } as QueryResult);

        const result = await dutyRepo.findById(1);
        expect(result).toEqual(mockDuty);
        expect(pool.query).toHaveBeenCalledWith('SELECT * FROM duties WHERE id = $1', [1]);
    });

    it('should create a duty', async () => {
        const mockDuty = { id: 1, name: 'New Duty', completed: true };
        (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockDuty] } as QueryResult);

        const result = await dutyRepo.create('New Duty', true);
        expect(result).toEqual(mockDuty);
        expect(pool.query).toHaveBeenCalledWith(
            'INSERT INTO duties (name, completed) VALUES ($1, $2) RETURNING *',
            ['New Duty', true]
        );
    });

    it('should update a duty', async () => {
        const mockDuty = { id: 1, name: 'Updated Duty', completed: false };
        (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockDuty] } as QueryResult);

        const result = await dutyRepo.update(1, 'Updated Duty', false);
        expect(result).toEqual(mockDuty);
        expect(pool.query).toHaveBeenCalledWith(
            'UPDATE duties SET name = $1, completed = $2 WHERE id = $3 RETURNING *',
            ['Updated Duty', false, 1]
        );
    });

    it('should delete a duty', async () => {
        (pool.query as jest.Mock).mockResolvedValueOnce({ rowCount: 1 });

        const result = await dutyRepo.delete(1);
        expect(result).toBe(1);
        expect(pool.query).toHaveBeenCalledWith('DELETE FROM duties WHERE id = $1', [1]);
    });
});
