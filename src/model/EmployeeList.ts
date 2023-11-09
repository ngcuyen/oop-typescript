import { EmployeeType } from "../constant/user.type";
//import { Employee } from "./Employee";

export class EmployeeList {
    employeeList: Array<EmployeeType> = this.getData();
    addEmployee(nv: EmployeeType): void {
        let cloneList = [...this.employeeList];
        cloneList.push(nv);
        this.employeeList = cloneList;
    }

    deleteEmployee(index: number): void {
        this.employeeList.splice(index, 1);
    }

    updateEmployee(index: number, replaceEmployee: EmployeeType): void {
        this.employeeList.splice(index, 1, replaceEmployee);
    }

    searchEmployee(content: string): void {
        let cloneList = [...this.employeeList];
        let array: EmployeeType[] = cloneList.filter((item) =>
            item.role.includes(content)
        );
        this.employeeList = array;
    }

    // sortEmployee = () => {
    //     let cloneList = [...this.employeeList];

    // }

    saveData(employees: Array<EmployeeType>) {
        let jsonString = JSON.stringify(employees);
        localStorage.setItem('employees', jsonString);
    }
    getData(): Array<EmployeeType> {
        let savedData = localStorage.getItem('employees');
        return savedData ? JSON.parse(savedData) as EmployeeType[] : [];
    }


    render(): string {

        return this.employeeList.map((employee, index) => {
            let { _id, age, email, gender, hour, role, salary, image, name } = employee;
            return `
            <tr key=${index}>
            <td>${_id}</td>
            <td>${name}</td>
            <td>${email}</td>
            <td>${age}</td>
            <td>${hour}</td>
            <td>${role}</td>
            <td>${gender ? 'Male' : 'Female'}</td>
            <td>${salary}</td>
            <td><img src = "${image}" alt="Avatar" class="d-block" style=" width: 45px; height: 45px; borderRadius: 100%;"/></td>
            <td></td>
            <td> 
                <i class="fas fa-trash-alt iconDelete" index="${index}" ></i>
                <i class="fas fa-pencil-alt iconUpdate" index="${index}"></i>
            </td>
            </tr>
            `
        }).join('');
    }

    renderArray(arrEmployee: EmployeeType[]): string {

        return arrEmployee.map((employee, index) => {
            let { _id, age, email, gender, hour, role, salary, image, name } = employee;
            return `
            <tr key=${index}>
            <td>${_id}</td>
            <td>${name}</td>
            <td>${email}</td>
            <td>${age}</td>
            <td>${hour}</td>
            <td>${role}</td>
            <td>${gender ? 'Male' : 'Female'}</td>
            <td>${salary}</td>
            <td><img src = "${image}" alt="Avatar" class="d-block" style=" width: 45px; height: 45px; borderRadius: 100%;"/></td>
            <td></td>
            <td> 
                <i class="fas fa-trash-alt iconDelete" index="${index}" ></i>
                <i class="fas fa-pencil-alt iconUpdate" index="${index}"></i>
            </td>
            </tr>
            `
        }).join('');
    }
}


