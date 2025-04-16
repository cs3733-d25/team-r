import express from 'express';
import {Pool} from 'pg';

const router = express.Router();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// get parking lots
router.get('/parking-lots', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT * FROM "Node"
            WHERE "nodeType" = 'parking'
            AND building in ('PATRIOT_PLACE_20', 'PATRIOT_PLACE_22');
            `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// get departments
router.get('/departments', async (req, res) => {
    try {
        const result = await pool.query(`
        SELECT * FROM "Node"
        WHERE "nodeType" = 'department';
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

export default router;