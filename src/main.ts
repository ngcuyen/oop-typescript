import { Employee } from "./model/Employee";
import { v4 as uuidv4 } from 'uuid';
import { EmployeeList } from "./model/EmployeeList";


const btnAdd = document.getElementById("btnAdd") as HTMLElement;
const txtEmail = document.getElementById("txtEmail") as HTMLInputElement;
const txtPassword = document.getElementById("txtPassword") as HTMLInputElement;
const txtName = document.getElementById("txtName") as HTMLInputElement;
const txtWorkHour = document.getElementById("txtWorkHour") as HTMLInputElement;
const rangeAge = document.getElementById("rangeAge") as HTMLInputElement;
const txtSalary = document.getElementById("txtSalary") as HTMLInputElement;
const optMale = document.getElementById("optMale") as HTMLInputElement;
const cmbRole = document.getElementById("cmbRole") as HTMLInputElement;
const tbody = document.getElementById("tblEmployee") as HTMLElement

const convertId = () => {
  const uuid = uuidv4();
  const bigIntValue = BigInt(
    "0x" + uuid.replace(/-/g, "")
  );
  return bigIntValue.toString().slice(0, 10);
}
let employees = new EmployeeList();

btnAdd.addEventListener('click', (e) => {
  e.preventDefault();

  const email = txtEmail.value;
  const password = txtPassword.value;
  const name = txtName.value;
  const hour = parseFloat(txtWorkHour.value);
  const age = Number(rangeAge.value);
  const salary = +txtSalary.value;
  const image = "";
  const role = cmbRole.value;
  const gender = optMale.checked ? true : false;
  const nv = new Employee({
    _id: convertId(),
    email: email,
    password: password,
    name: name,
    hour: hour,
    age: age,
    salary: salary,
    image: image,
    role: role,
    gender: gender
  });
  employees.addEmployee(nv);
  let result = employees.render();
  tbody.innerHTML = result;
})

