import express from 'express';
import repository from '../repositories/grades.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let grades = await repository.findAllGrades();
        res.send(grades);
    } catch (error) {
        res.status(400).send({ "error": error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        let grade = req.body;
        grade = await repository.insertGrade(grade);
        res.send(grade);
    } catch (error) {
        res.status(400).send({ "error": error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        let grade = req.body;
        grade.id = req.params.id;
        grade = await repository.updateGrade(grade);
        res.send(grade);
    } catch (error) {
        res.status(400).send({ "error": error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let grade = await repository.deleteGrade(req.params.id);
        res.send(grade);
    } catch (error) {
        res.status(400).send({ "error": error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        let grade = await repository.findGradeById(req.params.id);
        res.send(grade);
    } catch (error) {
        res.status(400).send({ "error": error.message });
    }
});

router.get('/value/:student/:subject', async (req, res) => {
    try {
        const {student, subject} = req.params;
        let grades = await repository.findGrades({student, subject});
        let value = grades.reduce((sum, g) => {
                return sum + g.value;
            }, 0);
        res.send({ "value": value });
    } catch (error) {
        res.status(400).send({ "error": error.message });
    }
});

router.get('/avg/:subject/:type', async (req, res) => {
    try {
        const {subject, type} = req.params;
        let grades = await repository.findGrades({subject, type});
        let value = grades.reduce((sum, g) => {
            return sum + g.value;
        }, 0);
        let avg = value / grades.length;
        res.send({ "avg": avg });
    } catch (error) {
        res.status(400).send({ "error": error.message });
    }
});

router.get('/best/:subject/:type', async (req, res) => {
    try {
        const {subject, type} = req.params;
        let grades = await repository.findGrades({subject, type});
        grades = grades.sort((g1, g2) => g2.value - g1.value)
            .splice(0, 3);
        res.send(grades);
    } catch (error) {
        res.status(400).send({ "error": error.message });
    }
});

export default router;