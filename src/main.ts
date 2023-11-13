import { Employee } from "./model/Employee";
import { v4 as uuidv4 } from 'uuid';
import { EmployeeList } from "./model/EmployeeList";
import { EmployeeType } from "./constant/user.type";
import moment from 'moment';

const btnSubmit = <HTMLElement>document.getElementById("btnSubmit");
const txtEmail = <HTMLInputElement>document.getElementById("txtEmail");
const txtPassword = <HTMLInputElement>document.getElementById("txtPassword");
const txtName = <HTMLInputElement>document.getElementById("txtName");
const txtWorkHour = <HTMLInputElement>document.getElementById("txtWorkHour");
const rangeAge = <HTMLInputElement>document.getElementById("rangeAge");
const txtSalary = <HTMLInputElement>document.getElementById("txtSalary");
const optMale = <HTMLInputElement>document.getElementById("optMale");
const optFemale = <HTMLInputElement>document.getElementById("optFemale");
const cmbRole = <HTMLInputElement>document.getElementById("cmbRole");
const tbody = <HTMLElement>document.getElementById("tblEmployee");
const fileImage = <HTMLInputElement>document.getElementById("image");
const btnReset = <HTMLElement>document.getElementById('btnReset');
const btnSearch = <HTMLElement>document.getElementById('btnSearch');
const txtSearch = <HTMLInputElement>document.getElementById('txtSearch');
const cmbSort = <HTMLInputElement>document.getElementById('cmbSort');

const convertId = () => {
  const uuid = uuidv4();
  const bigIntValue = BigInt(
    "0x" + uuid.replace(/-/g, "")
  );
  return bigIntValue.toString().slice(0, 10);
}
let employees = new EmployeeList();

function clickAddEmployee() {
  //lấy dữ liệu từ form...
  const email = txtEmail.value;
  const password = txtPassword.value;
  const name = txtName.value;
  const hour = parseFloat(txtWorkHour.value);
  const age = Number(rangeAge.value);
  const salary = +txtSalary.value;
  const role = cmbRole.value;
  const gender = optMale.checked ? true : false;
  let image = '';

  if (validateEmail(email) && validateName(name) && validatePassword(password) && checkEmail(txtEmail.value)) {
    //...gán vào new Employee
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
        gender: gender,
      });
      employees.addEmployee(nv);
      employees.saveData(employees.employeeList);
      let result = employees.render();
      tbody.innerHTML = result;
      resetForm();
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

  }

}
btnSubmit.addEventListener('click', clickAddEmployee)

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

// ERROR:
//không thể update avatar, (có thể do dùng filereader)

function clickUpdateEmployee(employee: EmployeeType) {
  if (validateEmail(txtEmail.value) && validateName(txtName.value) && validatePassword(txtPassword.value) && checkEmail(txtEmail.value, employee._id)) {
    employee.email = txtEmail.value;
    employee.name = txtName.value;
    employee.password = txtPassword.value;
    employee.salary = +txtSalary.value;
    optMale.checked == true ? employee.gender = true : employee.gender = false;
    employee.age = +rangeAge.value;
    employee.hour = +txtWorkHour.value;
    employee.updated_at = moment(new Date()).format('MM-DD-YYYY\tHH:mm:ssSSS');
    employee.role = cmbRole.value;

    if (fileImage.files && fileImage.files.length > 0) {
      let reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2)
          employee.image = reader.result as string;
      }
      reader.readAsDataURL(fileImage.files[0]);
    }
    else employee.image = '';

    employees.updateEmployee(employee._id, employee);
    employees.saveData(employees.employeeList);
    let result = employees.render();
    tbody.innerHTML = result;

  }
  resetForm()
  console.log('uyen');

}

tbody.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains('iconUpdate')) {
    const id = target.getAttribute('id') as string;
    //tìm nhân viên list có id = id của nhân viên được chọn, rồi đổ dữ liệu vào form
    let nhanVien = employees.employeeList.find(emp => emp._id === id) as EmployeeType;
    if (nhanVien) {
      txtEmail.value = nhanVien.email;
      txtName.value = nhanVien.name;
      txtPassword.value = nhanVien.password;
      txtSalary.value = nhanVien.salary.toString();
      nhanVien.gender == true ? (optMale.checked = true) : (optFemale.checked = true);
      rangeAge.value = nhanVien.age.toString();
      txtWorkHour.value = nhanVien.hour.toString();
      fileImage.value = '';
      cmbRole.value = nhanVien.role;

      btnSubmit.removeEventListener('click', clickAddEmployee)
      btnSubmit.addEventListener('click', () => clickUpdateEmployee(nhanVien));
    }
    btnSubmit.removeEventListener('click', () => clickUpdateEmployee(nhanVien));
  }
});

btnSearch.addEventListener('click', () => {
  let searchList: EmployeeType[] = employees.searchEmployee(txtSearch.value);
  //nếu txtSearch trống thì render dữ liệu lấy từ local
  if (txtSearch.value == "") {
    let dataGet: EmployeeType[] = employees.getData();
    let content = employees.renderArray(dataGet);
    console.log(tbody);
    tbody.innerHTML = content;
  }
  else {
    let result = employees.renderArray(searchList);
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


// hiển thị lỗi trong span
function showError(input: HTMLInputElement, error: string): void {
  const formField = <HTMLInputElement>input.parentElement;
  const message = formField.querySelector('.form-message') as HTMLElement;
  input.classList.add('is-invalid');
  message.textContent = error;
}

//ẩn lỗi 
function hideError(input: HTMLInputElement): void {
  const formField = <HTMLInputElement>input.parentElement;
  const message = formField.querySelector('.form-message') as HTMLElement;
  input.classList.remove('is-invalid');
  message.textContent = '';
}
//check email trùng
function checkEmail(email: string, id: string = ''): boolean {
  let employee = <EmployeeType>employees.employeeList.find(emp => emp.email === email && emp._id !== id)
  if (employee) {
    showError(txtEmail, 'Existed email');
    return false;
  }
  else return true;
}

//đúng định dạng email
function validateEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
}
txtEmail.onblur = () => {

  if (!validateEmail(txtEmail.value)) {
    showError(txtEmail, 'Invalid email format');
  }
};

//tên chỉ chứa chữ, từ 10-30 ký tự
function validateName(name: string): boolean {
  //(không nhập có dấu)
  const regex = /^[a-zA-Z\s]{10,30}$/;
  return regex.test(name);
}
txtName.onblur = () => {
  if (!validateName(txtName.value)) {
    showError(txtName, 'Name must be 10-30 characters and has no special characters');
  }
};

//mật khẩu ít nhất 8 kí tự, ít nhất 1 chữ hoa, 1 chữ thường, 1 ký tự đặc biệt
function validatePassword(password: string): boolean {
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return regex.test(password);
}
txtPassword.onblur = () => {
  if (!validatePassword(txtPassword.value)) {
    showError(txtPassword, 'Password must be at least 8 characters, at least one number and both lower and uppercase letters and special characters');
  }
};

// giờ làm, lương
const fields = [txtWorkHour, txtSalary];
fields.forEach(field => {
  field.onblur = () => {
    if (field.value.trim() === '') {
      showError(field, 'Field is required');
    }
  };
});

// Ẩn thông báo lỗi khi người dùng nhập lại tất cả các input
const allFields = [...fields, txtEmail, txtName, txtPassword]
allFields.forEach(field => {
  field.onfocus = () => {
    hideError(field);
  };
});
