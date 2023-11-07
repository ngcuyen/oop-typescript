export type EmployeeType = {
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
    delete?: boolean;
    created_at?: string;
    updated_at?: string;
}
