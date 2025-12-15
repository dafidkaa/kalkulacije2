export interface GradeItem {
    id: string;
    grade: number;
    name: string;
}

export const calculateGPA = (grades: GradeItem[]): number => {
    const validGrades = grades.filter(g => g.grade > 0 && g.grade <= 5);

    if (validGrades.length === 0) {
        return 0;
    }

    const sum = validGrades.reduce((acc, curr) => acc + curr.grade, 0);
    return Number((sum / validGrades.length).toFixed(2));
};

export const getGPARating = (gpa: number): string => {
    if (gpa >= 4.5) return 'Odličan (5)';
    if (gpa >= 3.5) return 'Vrlo dobar (4)';
    if (gpa >= 2.5) return 'Dobar (3)';
    if (gpa >= 1.5) return 'Dovoljan (2)';
    return 'Nedovoljan (1)';
};
