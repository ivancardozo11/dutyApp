import pool from '../config/database';

export class DutyRepository {
    async findAll() {
        try {
            const { rows } = await pool.query('SELECT * FROM duties');
            return rows;
        } catch (err) {
            console.error('Error fetching duties:', err);
            throw new Error('Failed to fetch duties');
        }
    }

    async findById(id: number) {
        try {
            const { rows } = await pool.query('SELECT * FROM duties WHERE id = $1', [id]);
            return rows[0];
        } catch (err) {
            console.error('Error finding duty by id:', err);
            throw new Error('Failed to find duty');
        }
    }

    async create(name: string, completed: boolean) {
        try {
            const { rows } = await pool.query(
                'INSERT INTO duties (name, completed) VALUES ($1, $2) RETURNING *',
                [name, completed]
            );
            return rows[0];
        } catch (err) {
            console.error('Error creating duty:', err);
            throw new Error('Failed to create duty');
        }
    }

    async update(id: number, name: string, completed: boolean) {
        try {
            const { rows } = await pool.query(
                'UPDATE duties SET name = $1, completed = $2 WHERE id = $3 RETURNING *',
                [name, completed, id]
            );
            return rows[0];
        } catch (err) {
            console.error('Error updating duty:', err);
            throw new Error('Failed to update duty');
        }
    }

    async delete(id: number) {
        try {
            const { rowCount } = await pool.query('DELETE FROM duties WHERE id = $1', [id]);
            return rowCount;
        } catch (err) {
            console.error('Error deleting duty:', err);
            throw new Error('Failed to delete duty');
        }
    }
}
