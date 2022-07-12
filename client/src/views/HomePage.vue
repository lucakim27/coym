<template>
    <div id='container'>
        <img src='https://img.freepik.com/free-vector/group-different-occupations-standing-white-background_218660-287.jpg?w=2000'>
        <div class="Input">
            <input class="Input-text" id="input" placeholder="Major, e.g. Computer Science" type="search"
                @input="searchChangeFunc($event)" />
            <table id="options">
                <tr v-for="(major, i) in filteredMajorsList" :key="i">
                    <td scope="row">
                        <a v-bind:href="'/comment?major=' + major">{{ major }}</a>
                    </td>
                </tr>
            </table>
        </div>

        <div id='descriptionContainer'>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-house"
                    viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                    <path fill-rule="evenodd"
                        d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor"
                    class="bi bi-people" viewBox="0 0 16 16">
                    <path
                        d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor"
                    class="bi bi-chat-text" viewBox="0 0 16 16">
                    <path
                        d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                    <path
                        d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor"
                    class="bi bi-bar-chart-line" viewBox="0 0 16 16">
                    <path
                        d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor"
                    class="bi bi-text-paragraph" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor"
                    class="bi bi-mailbox" viewBox="0 0 16 16">
                    <path
                        d="M4 4a3 3 0 0 0-3 3v6h6V7a3 3 0 0 0-3-3zm0-1h8a4 4 0 0 1 4 4v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a4 4 0 0 1 4-4zm2.646 1A3.99 3.99 0 0 1 8 7v6h7V7a3 3 0 0 0-3-3H6.646z" />
                    <path
                        d="M11.793 8.5H9v-1h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.354-.146l-.853-.854zM5 7c0 .552-.448 0-1 0s-1 .552-1 0a1 1 0 0 1 2 0z" />
                </svg>
            </div>
            <b>Getting reviews on the majors has never been this easy before!</b>
        </div>
    </div>
</template>
<script>
export default {
    name: 'HomePage',
    data() {
        return {
            magic_flag: false,
            majorsList: [
                "Accounting",
                "Accounting Technician",
                "Actuarial Science*",
                "Adult Development & Aging/Gerontology",
                "Advertising",
                "Aeronautical/Aerospace Engineering Technologies",
                "Aerospace/Aeronautical Engineering",
                "African American Studies",
                "Agribusiness Operations",
                "Agricultural Business & Management",
                "Agricultural Economics",
                "Agricultural Education",
                "Agricultural Mechanization",
                "Agricultural Production",
                "Agricultural/Bioengineering",
                "Agriculture, General",
                "Agronomy & Crop Science",
                "Aircraft Mechanics/Technology",
                "Aircraft Piloting & Navigation",
                "Alcohol/Drug Abuse Counseling",
                "American Indian/Native American Studies",
                "American/English Literature",
                "Animal Sciences",
                "Anthropology",
                "Applied Mathematics",
                "Architectural Drafting/CAD Technology",
                "Architectural Engineering",
                "Architectural Engineering Technology",
                "Architectural Environmental Design",
                "Architecture, General",
                "Area Studies, General (e.g., African, Middle Eastern)",
                "Art Education",
                "Art History, Criticism & Conservation",
                "Art, General",
                "Asian Area Studies",
                "Asian Languages & Literatures",
                "Astronomy",
                "Athletic Training",
                "Atmospheric Sciences & Meteorology",
                "Autobody Repair/Technology",
                "Automotive Engineering Technology",
                "Automotive Mechanics/Technology",
                "Aviation & Airway Science, General",
                "Aviation Management & Operations",
                "Avionics Technology",
                "Banking & Financial Support Services",
                "Bible/Biblical Studies",
                "Biochemistry & Biophysics",
                "Biology, General",
                "Biomedical Engineering",
                "Business Administration & Management, General",
                "Business Education",
                "Business/Management Quantitative Methods, General",
                "Business/Managerial Economics",
                "Career & Technical Education",
                "Cell/Cellular Biology",
                "Chemical Engineering",
                "Chemistry",
                "Child Care Services Management",
                "Child Development",
                "Chiropractic (Pre-Chiropractic)",
                "Cinema/Film",
                "Cinematography/Film/Vide Production",
                "City/Urban/Regional Planning",
                "Civil Engineering",
                "Civil Engineering Technology",
                "Classical/Ancient Languages & Literatures",
                "Communication Disorder Services (e.g., Speech Pathology)",
                "Communications Technology, General",
                "Communications, General",
                "Community Organization & Advocacy",
                "Comparative Literature",
                "Computer & Information Sciences, General",
                "Computer Engineering",
                "Computer Engineering Technology",
                "Computer Networking/Telecommunications",
                "Computer Science & Programming",
                "Computer Software & Media Applications",
                "Computer System Administration",
                "Construction Engineering/Management",
                "Construction Trades (e.g., carpentry, plumbing, electrical)",
                "Construction/Building Technology",
                "Consumer & Family Economics",
                "Corrections",
                "Cosmetology/Hairstyling*",
                "Counseling & Student Services",
                "Court Reporting*",
                "Creative Writing",
                "Criminal Justice",
                "Criminology",
                "Culinary Arts/Chef Training",
                "Curriculum & Instruction",
                "Dance",
                "Data Management Technology",
                "Dental Assisting",
                "Dental Hygiene",
                "Dentistry (Pre-Dentistry)",
                "Design & Visual Communications, General",
                "Diesel Mechanics/Technology",
                "Digital Communications/Media",
                "Divinity/Ministry",
                "Drafting/CAD Technology, General",
                "Early Childhood Education",
                "Ecology",
                "Economics",
                "Educational Administration",
                "Electrical, Electronics & Communications Engineering",
                "Electrical, Electronics Engineering Technologies",
                "Electrical/Electronics Equip Installation & Repair",
                "Electromechanical/Biomedical Engineering Technologies",
                "Elementary Education",
                "Emergency Medical Technology",
                "Engineering (Pre-Engineering), General",
                "Engineering Technology, General",
                "English Language & Literature, General",
                "English-as-a-Second-Language Education",
                "English/Language Arts Education",
                "Environmental Control Technologies",
                "Environmental Health Engineering",
                "Environmental Science",
                "Ethnic & Minority Studies, General",
                "European Area Studies",
                "Exercise Science/Physiology/Kinesiology",
                "Family & Consumer Sciences, General",
                "Fashion Merchandising",
                "Fashion/Apparel Design",
                "Finance, General",
                "Financial Planning & Services",
                "Fine/Studio Arts",
                "Fire Protection & Safety Technology",
                "Food & Nutrition",
                "Food Sciences & Technology",
                "Foreign Languages Education",
                "Foreign Languages/Literatures, General",
                "Forestry",
                "French Language & Literature",
                "Funeral Services & Mortuary Science",
                "Genetics",
                "Geography",
                "Geological & Earth Sciences",
                "German Language & Literature",
                "Graphic & Printing Equipment Operation*",
                "Graphic Design",
                "Health & Physical Education/Fitness",
                "Health Education",
                "Health Services Administration,General",
                "Health-Related Professions & Services, General*",
                "Health/Medical Technology, General",
                "Heating/Air Cond/Refrig Install/Repair",
                "History",
                "Horticulture Operations & Management",
                "Horticulture Science",
                "Hospital/Facilities Administration",
                "Hotel/Motel Management",
                "Human Resources Development/Training",
                "Human Resources Management",
                "Industrial Design",
                "Industrial Engineering",
                "Industrial Production Technologies",
                "Information Science",
                "Insurance & Risk Management",
                "Interior Architecture",
                "Interior Design",
                "International Business Management",
                "International Relations & Affairs",
                "Investments & Securities",
                "Journalism, Broadcast",
                "Journalism, Print",
                "Junior High/Middle School Education",
                "Labor/Industrial Relations",
                "Landscape Architecture",
                "Latin American Area Studies",
                "Latino/Chicano Studies",
                "Law (Pre-Law)",
                "Law Enforcement",
                "Legal Administrative Assisting/Secretarial*",
                "Legal Studies, General*",
                "Liberal Arts & General Studies*",
                "Library Science",
                "Linguistics",
                "Logistics & Materials Management",
                "Machine Tool Technology",
                "Management Information Systems",
                "Marine/Aquatic Biology",
                "Marketing Management & Research",
                "Mass Communications",
                "Massage Therapy",
                "Mathematics Education",
                "Mathematics, General",
                "Mechanical Drafting/CAD Technology",
                "Mechanical Engineering",
                "Mechanical Engineering Technology",
                "Mechanics & Repairers, General",
                "Medical Assisting",
                "Medical Laboratory Technology",
                "Medical Office/Secretarial",
                "Medical Radiologic Technology",
                "Medical Records",
                "Medical/Clinical Assisting, General",
                "Medicine (Pre-Medicine)",
                "Mental Health Counseling",
                "Microbiology & Immunology",
                "Middle Eastern Languages & Literatures",
                "Military Technologies*",
                "Multi/Interdisciplinary Studies*",
                "Multimedia/Animation/Special Effects",
                "Music Education",
                "Music, General",
                "Music, Performance",
                "Music, Theory & Composition",
                "Natural Resources Conservation, General",
                "Natural Resources Management",
                "North American Area Studies",
                "Nuclear Engineering",
                "Nuclear Medicine Technology",
                "Nursing, Practical/Vocational (LPN)",
                "Nursing, Registered (BS/RN)",
                "Occupational Therapy",
                "Occupational Therapy Assisting",
                "Office Supervision & Management",
                "Operations Management & Supervision",
                "Optometry (Pre-Optometry)",
                "Organizational Behavior",
                "Osteopathic Medicine",
                "Paralegal/Legal Assistant",
                "Parks, Recreation, & Leisure, General",
                "Parks/Rec/Leisure Facilities Management",
                "Personal Services, General*",
                "Pharmacy (Pre-Pharmacy)",
                "Philosophy",
                "Photography",
                "Physical Education & Coaching",
                "Physical Sciences, General",
                "Physical Therapy (Pre-Physical Therapy)",
                "Physical Therapy Assisting",
                "Physician Assisting",
                "Physics",
                "Political Science & Government",
                "Postsecondary Education",
                "Precision Production Trades, General",
                "Protective Services, General",
                "Psychiatric/Mental Health Technician",
                "Psychology, Clinical & Counseling",
                "Psychology, General",
                "Public Administration",
                "Public Administration & Services, General",
                "Public Affairs & Public Policy Analysis",
                "Public Health",
                "Public Relations & Organizational Communication",
                "Public Speaking",
                "Purchasing/Procurement/Contracts Management",
                "Quality Control & Safety Technologies",
                "Radio & Television Broadcasting",
                "Radio & Television Broadcasting Technology*",
                "Real Estate",
                "Rehabilitation Therapy",
                "Religion",
                "Religious Education",
                "Respiratory Therapy Technology",
                "Restaurant/Food Services Management",
                "Sales, Merchandising, & Marketing, General",
                "Science Education",
                "Secondary Education",
                "Secretarial Studies & Office Administration",
                "Small Business Management/Operations",
                "Social Sciences, General",
                "Social Studies/Sciences Education",
                "Social Work",
                "Sociology",
                "Spanish Language & Literature",
                "Special Education",
                "Sport & Fitness Administration/Management",
                "Statistics",
                "Surgical Technology",
                "Surveying Technology",
                "Teacher Assisting/Aide Education",
                "Teacher Education, General",
                "Teacher Education, Subject-Specific*",
                "Textile & Apparel",
                "Theatre Arts/Drama",
                "Theology, General",
                "Therapy & Rehabilitation, General",
                "Tourism & Travel Marketing",
                "Transportation & Materials Moving (e.g., air, ground, & marine)",
                "Travel/Tourism Management",
                "Urban Studies/Urban Affairs",
                "Veterinarian Assisting/Technology",
                "Veterinary Medicine (Pre-Veterinarian)",
                "Vocational Rehabilitation Counseling",
                "Webpage Design",
                "Welding Technology",
                "Wildlife & Wildlands Management",
                "Women’s Studies",
                "Zoology"
            ],
            filteredMajorsList: []
        }
    },
    methods: {
        searchChangeFunc(event) {
            this.filteredMajorsList = []
            if (event.target.value.length > 0) {
                for (let i = 0; i < this.majorsList.length; i++) {
                    if (this.majorsList[i].toLowerCase().includes(event.target.value.toLowerCase())) {
                        this.filteredMajorsList.push(this.majorsList[i])
                    }
                }
                document.getElementById('options').style.display = 'block'
            } else {
                document.getElementById('options').style.display = 'none'
            }
        }
    }
}
</script>
<style scoped>
*,
*::before,
*::after {
    box-sizing: border-box;
}

.Input {
    position: absolute;
    top: 85%;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
}

.Input input {
    width: 50%;
    border-radius: 5px;
}

#options {
    position: absolute;
    top: 90%;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 999999999999;
    width: 50%;
    display: none;
    height: 200px;
    overflow-y: scroll;
    border-radius: 5px;
    border: 2px solid;
    background-color: white;
}

#options tr td {
    width: 50%;
}

#descriptionContainer {
    position: absolute;
    top: 90%;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    margin-bottom: 35px;
    padding: 50px;
}

svg {
    margin: 20px;
}

img {
    width: 100%;
    height: 70%;
    filter: brightness(70%);
    z-index: -10000;
    margin-top: 100px;
    position: absolute;
    top: 0%;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
}

#container {
    text-align: center;
    overflow-y: scroll;
}
</style>