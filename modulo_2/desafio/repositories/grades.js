import { promises } from 'fs';

const readFile = promises.readFile;
const writeFile = promises.writeFile;

const fileName = 'data/grades.json';

async function readData() {
    return JSON.parse(await readFile(fileName));
}

async function writeData(data) {
    writeFile(fileName, JSON.stringify(data));
}

async function findAllGrades() {
    let data = await readData();
    return data.grades;
}

async function findGradeById(id) {
    let allGrades = await findAllGrades();
    let grade = allGrades.find(g => g.id == id);
    if (!grade)
        throw new Error('Grade not found');
    return grade;
}

async function findGrades(grade) {
    let allGrades = await findAllGrades();
    let grades = allGrades.filter(g => {
        return (!grade.id || g.id == grade.id)
            && (!grade.student || g.student == grade.student)
            && (!grade.subject || g.subject == grade.subject)
            && (!grade.type || g.type == grade.type)
            && (!grade.value || g.type == grade.value)
    });
    return grades;
}

async function updateGrade(grade) {
    let data = await readData();
    let index = data.grades.findIndex(g => g.id == grade.id);
    if (index < 0)
        throw new Error('Grade not found');
    let foundGrade = data.grades[index];
    if (grade.student) foundGrade.student = grade.student;
    if (grade.subject) foundGrade.subject = grade.subject;
    if (grade.type) foundGrade.type = grade.type;
    if (grade.value) foundGrade.value = grade.value;
    foundGrade.timestamp = new Date();
    data.grades[index] = foundGrade;
    writeData(data);
    return foundGrade;
}

async function deleteGrade(id) {
    let data = await readData();
    let index = data.grades.findIndex(g => g.id == id);
    if (index < 0)
        throw new Error('Grade not found');
    let grade = data.grades[index];
    data.grades.splice(index, 1);
    writeData(data);
    return grade;
}

async function insertGrade(grade) {
    let data = await readData();
    grade.id = data.nextId++;
    grade.timestamp = new Date();
    data.grades.push(grade);
    writeData(data);
    return grade;
}

const repository = {
    findAllGrades,
    findGradeById,
    findGrades,
    updateGrade,
    deleteGrade,
    insertGrade
};

export default repository;