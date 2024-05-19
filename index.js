import inquirer from "inquirer";
// Student class to manage individual student details and actions
class Student {
    static counter = 45231;
    name;
    studentID;
    courses;
    balance;
    constructor(name, studentID, courses, balance) {
        this.name = name;
        this.studentID = studentID;
        this.courses = courses;
        this.balance = balance;
    }
    // Method to enroll in the courses
    enroll(course) {
        this.courses.push(course);
    }
    // Method to view balance
    viewBalance() {
        console.log(`Your name is ${this.name} and your balance is ${this.balance}`);
    }
    // Method to pay tuition fees
    payTuitionFees(amount) {
        this.balance -= amount;
        console.log(`You paid ${amount} and your remaining balance is ${this.balance}. Your name is ${this.name} and your ID is ${this.studentID}`);
    }
    // Method to show status
    showStatus() {
        console.log(`Your name is ${this.name}`);
        console.log(`Your ID is ${this.studentID}`);
        console.log(`Your balance is ${this.balance}`);
        console.log(`Your courses are ${this.courses.join(', ')}`);
    }
}
// StudentManagementSystem class to manage the list of students and their actions
class StudentManagementSystem {
    students;
    constructor() {
        this.students = [];
    }
    // Method to add a new student
    addNewStudent(name) {
        const student = new Student(name, Student.counter++, [], 120);
        this.students.push(student);
        console.log(`Student ${name} is added successfully and your student ID is ${student.studentID}`);
    }
    // Method to enroll a student in a course
    enrollStudent(studentID, course) {
        const student = this.findStudentByID(studentID);
        if (student) {
            student.enroll(course);
            console.log(`Student with ID ${studentID} is enrolled in the course ${course}`);
        }
        else {
            console.log(`Student with ID ${studentID} not found`);
        }
    }
    // Method to view balance
    viewBalance(studentID) {
        const student = this.findStudentByID(studentID);
        if (student) {
            student.viewBalance();
        }
        else {
            console.log(`Student with ID ${studentID} not found`);
        }
    }
    // Method to pay tuition fees
    payTuitionFees(studentID, amount) {
        const student = this.findStudentByID(studentID);
        if (student) {
            student.payTuitionFees(amount);
        }
        else {
            console.log(`Student with ID ${studentID} not found`);
        }
    }
    // Method to show student status
    showStatus(studentID) {
        const student = this.findStudentByID(studentID);
        if (student) {
            student.showStatus();
        }
        else {
            console.log(`Student with ID ${studentID} not found`);
        }
    }
    // Method to find a student by ID
    findStudentByID(studentID) {
        return this.students.find(student => student.studentID === studentID);
    }
}
// Main function to run the program
async function main() {
    console.log("Welcome to the Student Management System or ACADEME");
    console.log("-".repeat(70));
    const studentManager = new StudentManagementSystem();
    // Loop to run the program continuously
    while (true) {
        // Asking user to select an option
        const answer = await inquirer.prompt([{
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add new student",
                    "Enroll student in the course",
                    "View balance",
                    "Pay tuition fees",
                    "Show status",
                    "Exit"
                ]
            }]);
        // Using switch case to handle the selected option
        switch (answer.choice) {
            case "Add new student":
                const studentName = await inquirer.prompt([{
                        name: "name",
                        type: "input",
                        message: "Enter the student name"
                    }]);
                studentManager.addNewStudent(studentName.name);
                break;
            case "Enroll student in the course":
                const enroll = await inquirer.prompt([{
                        name: "studentID",
                        type: "input",
                        message: "Enter the student ID"
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter the course"
                    }]);
                studentManager.enrollStudent(Number(enroll.studentID), enroll.course);
                break;
            case "View balance":
                const view = await inquirer.prompt([{
                        name: "studentID",
                        type: "input",
                        message: "Enter the student ID"
                    }]);
                studentManager.viewBalance(Number(view.studentID));
                break;
            case "Pay tuition fees":
                const pay = await inquirer.prompt([{
                        name: "studentID",
                        type: "input",
                        message: "Enter the student ID"
                    },
                    {
                        name: "amount",
                        type: "input",
                        message: "Enter the amount"
                    }]);
                studentManager.payTuitionFees(Number(pay.studentID), Number(pay.amount));
                break;
            case "Show status":
                const status = await inquirer.prompt([{
                        name: "studentID",
                        type: "input",
                        message: "Enter the student ID"
                    }]);
                studentManager.showStatus(Number(status.studentID));
                break;
            case "Exit":
                console.log("Thank you for using our system");
                process.exit();
        }
    }
}
// Calling the main function to start the program
main();
