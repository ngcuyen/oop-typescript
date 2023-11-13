import { EmployeeType } from '../constant/user.type';

export class EmployeeList {
	employeeList: Array<EmployeeType> = this.getData();

	addEmployee(nv: EmployeeType): void {
		let cloneList = [...this.employeeList];
		cloneList.push(nv);
		this.employeeList = cloneList;
	}

	// deleteEmployee(index: number): void {
	//     this.employeeList.splice(index, 1);
	// }
	deleteEmployee(id: string): void {
		this.employeeList = this.employeeList.filter((employee) => employee._id !== id);
	}

	// updateEmployee(index: number, replaceEmployee: EmployeeType): void {
	//     this.employeeList.splice(index, 1, replaceEmployee);
	// }
	updateEmployee(id: string, updatedEmployee: EmployeeType): void {
		const index = this.employeeList.findIndex((employee) => employee._id === id);
		if (index !== -1) {
			this.employeeList[index] = updatedEmployee;
		}
	}

	//tìm kiếm theo chức vụ
	searchEmployee(content: string) {
		content = content.toLowerCase();
		let cloneList = [...this.employeeList];
		return cloneList.filter(
			(item) =>
				item.role.toLowerCase().includes(content) || // Tìm kiếm trong role
				item.name.toLowerCase().includes(content) || // Tìm kiếm trong name
				item._id.toLowerCase().includes(content) // Tìm kiếm trong id
		);
	}

	// Sắp xếp tăng dần theo tên
	sortByNameAsc() {
		let cloneList = [...this.employeeList];
		return cloneList.sort((a, b) => a.name.localeCompare(b.name));
	}
	// Sắp xếp giảm dần theo tên
	sortByNameDesc() {
		let cloneList = [...this.employeeList];
		return cloneList.sort((a, b) => b.name.localeCompare(a.name));
	}
	// Sắp xếp tăng dần theo ID
	sortByIdAsc() {
		let cloneList = [...this.employeeList];
		return cloneList.sort((a, b) => parseInt(a._id) - parseInt(b._id));
	}

	// Sắp xếp giảm dần theo ID
	sortByIdDesc() {
		let cloneList = [...this.employeeList];
		return cloneList.sort((a, b) => parseInt(b._id) - parseInt(a._id));
	}

	saveData() {
		let jsonString = JSON.stringify(this.employeeList);
		localStorage.setItem('employees', jsonString);
	}
	getData(): Array<EmployeeType> {
		let savedData = localStorage.getItem('employees');
		return savedData ? (JSON.parse(savedData) as EmployeeType[]) : [];
	}

	calculateTotal(employee: { salary: number; role: string }): number {
		if (employee.role === 'Manager') {
			return employee.salary * 1.5;
		} else if (employee.role === 'Executive') {
			return employee.salary * 3;
		} else {
			return employee.salary;
		}
	}

	render(): string {
		return this.employeeList
			.map((employee, index) => {
				let { _id, age, email, gender, hour, role, salary, image, name } = employee;
				let total = this.calculateTotal({ salary: salary, role: role });
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
            <td><img id="${_id}" src = "${image}" alt="Avatar" class="d-block" style=" width: 45px; height: 45px; border-radius: 50%;"/></td>
            <td>${total}</td>
            <td> 
                <i class="fas fa-trash-alt iconDelete" id="${_id}" ></i>
                <i class="fas fa-pencil-alt iconUpdate" id="${_id}"></i>
            </td>
            </tr>
            `;
			})
			.join('');
	}

	renderArray(arrEmployee: EmployeeType[]): string {
		return arrEmployee
			.map((employee, index) => {
				let { _id, age, email, gender, hour, role, salary, image, name } = employee;
				let total = this.calculateTotal({ salary, role });
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
            <td><img src = "${image}" alt="Avatar" class="d-block" style=" width: 45px; height: 45px; border-radius: 50%;"/></td>
            <td>${total}</td>
            <td> 
                <i class="fas fa-trash-alt iconDelete" index="${index}" ></i>
                <i class="fas fa-pencil-alt iconUpdate" index="${index}"></i>
            </td>
            </tr>
            `;
			})
			.join('');
	}
}
