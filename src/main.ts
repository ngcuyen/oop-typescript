import { Employee } from "./model/Employee";
import { v4 as uuidv4 } from 'uuid';
import { EmployeeList } from "./model/EmployeeList";
import { EmployeeType } from "./constant/user.type";

const btnAdd = document.getElementById("btnAdd") as HTMLElement;
const txtEmail = document.getElementById("txtEmail") as HTMLInputElement;
const txtPassword = document.getElementById("txtPassword") as HTMLInputElement;
const txtName = document.getElementById("txtName") as HTMLInputElement;
const txtWorkHour = document.getElementById("txtWorkHour") as HTMLInputElement;
const rangeAge = document.getElementById("rangeAge") as HTMLInputElement;
const txtSalary = document.getElementById("txtSalary") as HTMLInputElement;
const optMale = document.getElementById("optMale") as HTMLInputElement;
const optFemale = document.getElementById("optFemale") as HTMLInputElement;
const cmbRole = document.getElementById("cmbRole") as HTMLInputElement;
const tbody = document.getElementById("tblEmployee") as HTMLElement;
const fileImage = document.getElementById("image") as HTMLInputElement;
const btnReset = document.getElementById('btnReset') as HTMLElement;
const btnSearch = document.getElementById('btnSearch') as HTMLElement;
const txtSearch = document.getElementById('txtSearch') as HTMLInputElement;
const cmbSort = document.getElementById('cmbSort') as HTMLInputElement;

const convertId = () => {
  const uuid = uuidv4();
  const bigIntValue = BigInt(
    "0x" + uuid.replace(/-/g, "")
  );
  return bigIntValue.toString().slice(0, 10);
}
let employees = new EmployeeList();

function clickAddEmployee() {
  const email = txtEmail.value;
  const password = txtPassword.value;
  const name = txtName.value;
  const hour = parseFloat(txtWorkHour.value);
  const age = Number(rangeAge.value);
  const salary = +txtSalary.value;
  const role = cmbRole.value;
  const gender = optMale.checked ? true : false;
  let image = '';
  if (validationData()) {
    let createEmployee = () => {
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
    }
    if (fileImage.files && fileImage.files.length > 0) {
      let reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          image = reader.result as string;
          createEmployee();
        }
      }
      reader.readAsDataURL(fileImage.files[0]);
    }
    else {
      createEmployee();
    }
    employees.saveData(employees.employeeList);
  }

}

btnAdd.addEventListener('click', clickAddEmployee)
//fileReader bất đồng bộ, khi lưu vào local storage phải chờ

tbody.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains('iconDelete')) {
    const id = target.getAttribute('id') as string;
    if (confirm("Delete this row?")) {
      employees.deleteEmployee(id);
      let result = employees.render();
      tbody.innerHTML = result;
      employees.saveData(employees.employeeList);
    }
  }
});

tbody.addEventListener('click', (e) => {

  const target = e.target as HTMLElement;
  if (target.classList.contains('iconUpdate')) {
    const id = target.getAttribute('id') as string;

    let nhanVien = employees.employeeList.find(emp => emp._id === id) as EmployeeType;
    if (nhanVien) {
      txtEmail.value = nhanVien.email;
      txtName.value = nhanVien.name;
      txtPassword.value = nhanVien.password;
      txtSalary.value = nhanVien.salary.toString();
      nhanVien.gender == true ? (optMale.checked = true) : (optFemale.checked = true);
      rangeAge.value = nhanVien.age.toString();
      txtWorkHour.value = nhanVien.hour.toString();
      fileImage.value = nhanVien.image;
      cmbRole.value = nhanVien.role;

      btnAdd.removeEventListener('click', clickAddEmployee);
      btnAdd.addEventListener('click', () => {
        if (validationData(nhanVien._id, nhanVien.email)) {
          nhanVien.email = txtEmail.value;
          nhanVien.name = txtName.value;
          nhanVien.password = txtPassword.value;
          nhanVien.salary = +txtSalary.value;
          optMale.checked == true ? nhanVien.gender = true : nhanVien.gender = false;
          nhanVien.age = +rangeAge.value;
          nhanVien.hour = +txtWorkHour.value;
          if (fileImage.files && fileImage.files.length > 0) {
            let reader = new FileReader();
            reader.onload = () => {
              if (reader.readyState === 2) {
                nhanVien.image = reader.result as string;
              }
            }
            reader.readAsDataURL(fileImage.files[0]);
          }
          else nhanVien.image = '';
          nhanVien.role = cmbRole.value;
          employees.updateEmployee(nhanVien._id, nhanVien);
          employees.saveData(employees.employeeList);
          let result = employees.render();
          tbody.innerHTML = result;

        }
      })
    }
  }
});

btnSearch.addEventListener('click', () => {
  employees.searchEmployee(txtSearch.value);
  if (txtSearch.value == "") {
    let dataGet: EmployeeType[] = employees.getData();
    let content = employees.renderArray(dataGet);
    console.log(tbody);
    tbody.innerHTML = content;
  }
  else {
    let result = employees.render();
    tbody.innerHTML = result;
  }
})

function resetForm(): void {
  txtEmail.value = '';
  txtPassword.value = '';
  txtName.value = '';
  txtSalary.value = '';
  optMale.checked = true;
  rangeAge.value = '20';
  txtWorkHour.value = '';
  fileImage.value = '';
  cmbRole.value = 'Employee';
}


btnReset.addEventListener("click", () => {
  resetForm();
})

cmbSort.addEventListener('change', (e) => {

  const sortSelect = (e.target as HTMLSelectElement).value;
  let sortedList: EmployeeType[];
  switch (sortSelect) {
    case 'nameAsc':
      sortedList = employees.sortByNameAsc();
      break;
    case 'nameDesc':
      sortedList = employees.sortByNameDesc();
      break;
    case 'idAsc':
      sortedList = employees.sortByIdAsc();
      break;
    case 'idDesc':
      sortedList = employees.sortByIdDesc();
      break;
    default:
      return;
  }
  let result = employees.renderArray(sortedList);
  tbody.innerHTML = result;
})


document.addEventListener('DOMContentLoaded', function () {
  const savedData = employees.getData();
  if (savedData) {
    employees.employeeList = savedData;
    tbody.innerHTML = employees.render();
  }
});

function validationData(employeeId: string = '', employeeEmail: string = ''): boolean {
  const email = txtEmail.value;
  const name = txtName.value;
  const password = txtPassword.value;
  const salary = txtSalary.value;
  const workHour = txtWorkHour.value;

  if (email === '' || name === '' || password === '' || salary === '' || workHour === '') {
    alert("Please fill in all fields");
    return false;
  }

  //khi cập nhật cần tránh trường hợp tự so sánh trùng email với chính nó, (nhưng chưa được)
  if (email !== employeeEmail) {
    const existEmployee = employees.employeeList.find((employee) => employee.email === email && employee._id !== employeeId);
    if (existEmployee) {
      alert("Email already exist");
      return false;
    }
  }
  return true;
}
