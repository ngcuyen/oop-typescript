import moment from 'moment';
import { EmployeeType } from '../constant/user.type';

export class Employee {
    _id: string;
    email: string;
    password: string;
    name: string;
    hour: number;
    age: number;
    image: string;
    role: string;
    salary: number;
    gender: boolean;
    delete: boolean;
    created_at: string;
    updated_at: string;
    constructor(employee: EmployeeType) {
        this._id = employee._id;
        this.email = employee.email;
        this.password = employee.password;
        this.name = employee.name;
        this.hour = employee.hour;
        this.age = employee.age;
        this.image = employee.image;
        this.role = employee.role;
        this.salary = employee.salary;
        this.gender = employee.gender;
        this.delete = employee.delete || false;
        this.created_at = employee.created_at || moment(new Date()).format('MM-DD-YYYY\tHH:mm:ssSSS');
        this.updated_at = employee.updated_at || moment(new Date()).format('MM-DD-YYYY\tHH:mm:ssSSS');
    }
}

