// JS File
// -------
// Functon to add Education Field
function addEducationField() {
  const educationFields = document.getElementById("educationFields");
  const newEducationField = document.createElement("div");
  newEducationField.className = "educationField";
  newEducationField.innerHTML = `<input type="text" class="degree" placeholder="Degree" required>
    <input type="text" class="university" placeholder="University" required>
    <input type="number" class="year" placeholder="Year" required>`;
  educationFields.appendChild(newEducationField);
}

// Function to add a work field
function addWorkField() {
  const workFields = document.getElementById("workFields");
  const newWorkField = document.createElement("div");
  newWorkField.className = "workField";
  newWorkField.innerHTML = `<input type="text" class="company" placeholder="Company" required>
    <input type="text" class="position" placeholder="Position" required>
    <input type="number" class="duration" placeholder="Duration (in years)" required>`;
  workFields.appendChild(newWorkField);
}

// Function to add a certification field
function addCertificationField() {
  const certificationFields = document.getElementById("certificationFields");
  const newCertificationField = document.createElement("div");
  newCertificationField.className = "certificationField";
  newCertificationField.innerHTML = `<input type="text" class="certificate" placeholder="Certificate" required>
    <input type="text" class="authority" placeholder="Authority" required>
    <input type="number" class="certYear" placeholder="Year" required>`;
  certificationFields.appendChild(newCertificationField);
}

// Function to add a skill field
function addSkillField() {
  const skillFields = document.getElementById("skillFields");
  const newSkillField = document.createElement("div");
  newSkillField.className = "skillField";
  newSkillField.innerHTML = `<input type="text" class="skill" placeholder="Skill" required>`;
  skillFields.appendChild(newSkillField);
}

// Function to save the resume data in local storage
function saveResume() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const linkedin = document.getElementById("linkedin").value;

  // Field Validations
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(name)) {
    alert("Please enter a valid name with only alphabetic characters.");
    return;
  }

  const phoneRegex = /^\d{1,10}$/;
  if (!phoneRegex.test(phone)) {
    alert("Please enter a valid phone number with a maximum of 10 digits.");
    return;
  }

  const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Null Field Validations
  if (!name || !phone || !email || !linkedin) {
    alert("Please fill in all the required fields.");
    return;
  }

  const educationFields = document.getElementsByClassName("educationField");
  const educations = [];
  for (let field of educationFields) {
    const degree = field.getElementsByClassName("degree")[0].value;
     const university = field.getElementsByClassName("university")[0].value;
     const year = field.getElementsByClassName("year")[0].value;
    if (!degree || !university || !year) {
      alert("Please fill in all the required fields in the education section.");
      return;
    }
    educations.push({ degree, university, year });
  }

  const workFields = document.getElementsByClassName("workField");
  const workExperiences = [];
  for (let field of workFields) {
    const company = field.getElementsByClassName("company")[0].value;
    const position = field.getElementsByClassName("position")[0].value;
    const duration = field.getElementsByClassName("duration")[0].value;
    workExperiences.push({ company, position, duration });
  }

  const certificationFields = document.getElementsByClassName("certificationField");
  const certifications = [];
  for (let field of certificationFields) {
    const certificate = field.getElementsByClassName("certificate")[0].value;
    const authority = field.getElementsByClassName("authority")[0].value;
    const certYear = field.getElementsByClassName("certYear")[0].value;
    if (!certificate || !authority || !certYear) {
      alert("Please fill in all the required fields in the certification section.");
      return;
    }
    certifications.push({ certificate, authority, certYear });
  }

  const skillFields = document.getElementsByClassName("skillField");
  const skills = [];
  for (let field of skillFields) {
    const skill = field.getElementsByClassName("skill")[0].value;
    if (!skill) {
      alert("Please fill in all the required fields in the skill section.");
      return;
    }
    skills.push(skill);
  }

  const resumeData = {
    name,
    phone,
    email,
    linkedin,
    educations,
    workExperiences,
    certifications,
    skills
  };

  // Store the resume data in local storage
  localStorage.setItem("resumeData", JSON.stringify(resumeData));
  alert("Your Resume Data is Saved");
}

// Function to print the resume data
function printResume() {
  const resumeData = JSON.parse(localStorage.getItem("resumeData"));
  if (resumeData) {
    const printWindow = window.open("", "_blank");
    const { name, phone, email, linkedin, educations, workExperiences, certifications, skills } = resumeData;

printWindow.document.write(`
  <html>
      <head>
        <title>Print Resume</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background:linear-gradient(green,yellow);
             
          }
          .container {
            width: 160mm;
            height: 250mm;
            margin: 0 auto;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            padding: 20px;
             background-color: #ffffff;

          }
          h1
          {
            color: aqua;
            text-align : center;

          }
          h2 {
            color: #000000;
            font-weight : bold;
            margin-left : 20px;
          }
           h3 {
            color: gray;
          }
          .section {
            margin-bottom: 30px;
          }
          .section h2 {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .section-item {
            margin-bottom: 10px;
            margin-left: 30px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>${name}</h1>
          <div class="section">
            <h2>Contact</h2>
            <div class="section-item">Phone: ${phone}</div>
            <div class="section-item">Email: ${email}</div>
            <div class="section-item">LinkedIn: ${linkedin}</div>
          </div>
          <div class="section">
            <h2>Educational Qualifications</h2>
            ${educations.map(
              (education) => `<div class="section-item">
                <h3>${education.degree}</h3>
                <div>${education.university}</div>
                <div>${education.year}</div>
              </div>`
            ).join('')}
          </div>
          <div class="section">
            <h2>Work Experience</h2>
            ${workExperiences.map(
              (work) => `<div class="section-item">
                <h3>${work.position}</h3>
                <div>${work.company}</div>
                <div>${work.duration} years</div>
              </div>`
            ).join('')}
          </div>
          <div class="section">
            <h2>Certifications</h2>
            ${certifications.map(
              (certification) => `<div class="section-item">
                <h3>${certification.certificate}</h3>
                <div>${certification.authority}</div>
                <div>${certification.certYear}</div>
              </div>`
            ).join('')}
          </div>
          <div class="section">
            <h2>Skill Set</h2>
            ${skills.map((skill) => `<div class="section-item">${skill}</div>`).join('')}
          </div>
        </div>
      </body>
      </html>`);
    printWindow.document.close();
    printWindow.print();
  } else {
    alert("No resume data found. Please save your resume first.");
  }
}