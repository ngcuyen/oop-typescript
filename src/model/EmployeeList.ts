import { EmployeeType } from "../constant/user.type";

export class EmployeeList {
    employeeList: Array<EmployeeType> = [];
    addEmployee(nv: EmployeeType): void {
        let cloneList = [...this.employeeList];
        cloneList.push(nv);
        this.employeeList = cloneList;
    }
    render(): string {
        return this.employeeList.map((employee, index) => {
            let { _id, age, email, gender, hour, role, salary, image, name } = employee;
            return `
            <tr>
            <td>${_id}</td>
            <td>${age}</td>
            <td>${email}</td>
            <td>${gender}</td>
            <td>${hour}</td>
            <td>${salary}</td>
            <td>${role}</td>
            <td>${image}</td>
            <td>${name}</td>
            </tr>
            `
        }).join('');
    }
}