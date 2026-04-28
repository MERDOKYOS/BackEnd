// function Person(name, age) {
//   this.name = name;
//   this.age = age;

//   this.getName = function () {
//     console.log(`my name is ${this.name} and am ${this.age} years old`);
//   };
// }

// function Student(name, age, school) {
//   Person.call(this, name, age);
//   this.school = school;

//   this.getInfo = function () {
//     console.log(
//       `${this.name} is student at ${this.school} and ${this.age} years old`,
//     );
//   };
// }

// let merde = new Student("merde", 21, "Bahir Dar");
// let su = new Person("su", 21);

// console.log(merde);
// console.log(su);

// su.getName();
// merde.getInfo();

// Person.prototype.nationality = "ethiopian";

// Student.prototype = Object.create(Person.prototype);
// Student.prototype.Constructor = Student;

// merde.getName();
// merde.getInfo();

class Person {
  constructor(name, school, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.school = school;
  }

  getName() {
    return `${this.name} is student at ${this.school}`;
  }
}

class Student extends Person {
  constructor(name, school, dept, cgpa) {
    super(name, school);
    this.dept = dept;
    this.cgpa = cgpa;
  }

  getCgpa() {
    return `${this.cgpa} is his result`;
  }
}

// let per = new Person("Merdokyos", 21, "M", "Bahir Dar");
// console.log(per);
// console.log(per.getName());

let per1 = new Student("Merdokyos", "chagni high school", "S.E", 4);
console.log(per1);
console.log(per1.getName());
console.log(per1.getCgpa());
