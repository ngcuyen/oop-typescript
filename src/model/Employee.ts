type EmployeeType = {
    email: string;
    password: string;
    name: string;
    hour: number;
    age: number;
    image: string;
    role: string;
    salary: string;
    gender: boolean;
}

class Employee {
    email: string;
    password: string;
    name: string;
    hour: number;
    age: number;
    image: string;
    role: string;
    salary: string;
    gender: boolean;
    constructor(employee: EmployeeType) {
        this.email = employee.email;
        this.password = employee.password;
        this.name = employee.name;
        this.hour = employee.hour;
        this.age = employee.age;
        this.image = employee.image;
        this.role = employee.role;
        this.salary = employee.salary;
        this.gender = employee.gender;
    }
    // addEmp(): void {
    //     let trow = "";
    //     var body = document.getElementById("dataNV") as HTMLElement;
    //     // for (let emp of empList) {
    //     //     trow += `<tr>
    //     //     <th scope="row">1</th>
    //     //     <td>${emp.name}</td>
    //     //     <td>${emp.email}</td>
    //     //     <td>${emp.hour}</td>
    //     //     <td>${emp.role}</td>
    //     //     <td>${emp.gender}</td>
    //     //     <td>${emp.salary}</td>
    //     //     <td><img src="${emp.image}" class="d-block" style="width: 45px; height: 45px; border-radius: 100%;" alt="..."></td>
    //     //     <td>${emp.age}</td>
    //     //     </tr>`
    //     // }

    //     //sử dụng map
    //     body.innerHTML = trow;
    // }
    //  updateEmp(): void;
    //  deleteEmp(): void;
}