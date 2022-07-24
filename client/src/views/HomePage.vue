<template>
    <div id='container'>
        <img
            src='https://img.freepik.com/free-vector/group-different-occupations-standing-white-background_218660-287.jpg?w=2000'>
        <div class="Input">
            <input class="Input-text" id="input" placeholder="Major, e.g. Computer Science" type="search"
                @input="searchChangeFunc($event)" />
            <table id="options">
                <tr v-for="(major, i) in filteredMajorsList" :key="i">
                    <td scope="row">
                        <a v-bind:href="'/comment?major=' + major" @click="viewPage(major)">{{ major }}</a>
                        <hr>
                    </td>
                </tr>
            </table>
        </div>

        <div class='descriptionContainer'>
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
            <b>Getting reviews on the majors has never been this easy before</b>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'HomePage',
    data() {
        return {
            magic_flag: false,
            majorsList: [
                "Accounting",
                "Accounting Technician",
                "Actuarial Science",
                "Adult Development and Aging/Gerontology",
                "Advertising",
                "Aeronautical/Aerospace Engineering Technologies",
                "Aerospace/Aeronautical Engineering",
                "African American Studies",
                "Agribusiness Operations",
                "Agricultural Business and Management",
                "Agricultural Economics",
                "Agricultural Education",
                "Agricultural Mechanization",
                "Agricultural Production",
                "Agricultural/Bioengineering",
                "Agriculture, General",
                "Agronomy and Crop Science",
                "Aircraft Mechanics/Technology",
                "Aircraft Piloting and Navigation",
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
                "Art History, Criticism and Conservation",
                "Art, General",
                "Asian Area Studies",
                "Asian Languages and Literatures",
                "Astronomy",
                "Athletic Training",
                "Atmospheric Sciences and Meteorology",
                "Autobody Repair/Technology",
                "Automotive Engineering Technology",
                "Automotive Mechanics/Technology",
                "Aviation and Airway Science, General",
                "Aviation Management and Operations",
                "Avionics Technology",
                "Banking and Financial Support Services",
                "Bible/Biblical Studies",
                "Biochemistry and Biophysics",
                "Biology, General",
                "Biomedical Engineering",
                "Business Administration and Management, General",
                "Business Education",
                "Business/Management Quantitative Methods, General",
                "Business/Managerial Economics",
                "Career and Technical Education",
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
                "Classical/Ancient Languages and Literatures",
                "Communication Disorder Services (e.g., Speech Pathology)",
                "Communications Technology, General",
                "Communications, General",
                "Community Organization and Advocacy",
                "Comparative Literature",
                "Computer and Information Sciences, General",
                "Computer Engineering",
                "Computer Engineering Technology",
                "Computer Networking/Telecommunications",
                "Computer Science and Programming",
                "Computer Software and Media Applications",
                "Computer System Administration",
                "Construction Engineering/Management",
                "Construction Trades (e.g., carpentry, plumbing, electrical)",
                "Construction/Building Technology",
                "Consumer and Family Economics",
                "Corrections",
                "Cosmetology/Hairstyling*",
                "Counseling and Student Services",
                "Court Reporting*",
                "Creative Writing",
                "Criminal Justice",
                "Criminology",
                "Culinary Arts/Chef Training",
                "Curriculum and Instruction",
                "Dance",
                "Data Management Technology",
                "Dental Assisting",
                "Dental Hygiene",
                "Dentistry (Pre-Dentistry)",
                "Design and Visual Communications, General",
                "Diesel Mechanics/Technology",
                "Digital Communications/Media",
                "Divinity/Ministry",
                "Drafting/CAD Technology, General",
                "Early Childhood Education",
                "Ecology",
                "Economics",
                "Educational Administration",
                "Electrical, Electronics and Communications Engineering",
                "Electrical, Electronics Engineering Technologies",
                "Electrical/Electronics Equip Installation and Repair",
                "Electromechanical/Biomedical Engineering Technologies",
                "Elementary Education",
                "Emergency Medical Technology",
                "Engineering (Pre-Engineering), General",
                "Engineering Technology, General",
                "English Language and Literature, General",
                "English-as-a-Second-Language Education",
                "English/Language Arts Education",
                "Environmental Control Technologies",
                "Environmental Health Engineering",
                "Environmental Science",
                "Ethnic and Minority Studies, General",
                "European Area Studies",
                "Exercise Science/Physiology/Kinesiology",
                "Family and Consumer Sciences, General",
                "Fashion Merchandising",
                "Fashion/Apparel Design",
                "Finance, General",
                "Financial Planning and Services",
                "Fine/Studio Arts",
                "Fire Protection and Safety Technology",
                "Food and Nutrition",
                "Food Sciences and Technology",
                "Foreign Languages Education",
                "Foreign Languages/Literatures, General",
                "Forestry",
                "French Language and Literature",
                "Funeral Services and Mortuary Science",
                "Genetics",
                "Geography",
                "Geological and Earth Sciences",
                "German Language and Literature",
                "Graphic and Printing Equipment Operation*",
                "Graphic Design",
                "Health and Physical Education/Fitness",
                "Health Education",
                "Health Services Administration,General",
                "Health-Related Professions and Services, General*",
                "Health/Medical Technology, General",
                "Heating/Air Cond/Refrig Install/Repair",
                "History",
                "Horticulture Operations and Management",
                "Horticulture Science",
                "Hospital/Facilities Administration",
                "Hotel/Motel Management",
                "Human Resources Development/Training",
                "Human Resources Management",
                "Industrial Design",
                "Industrial Engineering",
                "Industrial Production Technologies",
                "Information Science",
                "Insurance and Risk Management",
                "Interior Architecture",
                "Interior Design",
                "International Business Management",
                "International Relations and Affairs",
                "Investments and Securities",
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
                "Liberal Arts and General Studies*",
                "Library Science",
                "Linguistics",
                "Logistics and Materials Management",
                "Machine Tool Technology",
                "Management Information Systems",
                "Marine/Aquatic Biology",
                "Marketing Management and Research",
                "Mass Communications",
                "Massage Therapy",
                "Mathematics Education",
                "Mathematics, General",
                "Mechanical Drafting/CAD Technology",
                "Mechanical Engineering",
                "Mechanical Engineering Technology",
                "Mechanics and Repairers, General",
                "Medical Assisting",
                "Medical Laboratory Technology",
                "Medical Office/Secretarial",
                "Medical Radiologic Technology",
                "Medical Records",
                "Medical/Clinical Assisting, General",
                "Medicine (Pre-Medicine)",
                "Mental Health Counseling",
                "Microbiology and Immunology",
                "Middle Eastern Languages and Literatures",
                "Military Technologies*",
                "Multi/Interdisciplinary Studies*",
                "Multimedia/Animation/Special Effects",
                "Music Education",
                "Music, General",
                "Music, Performance",
                "Music, Theory and Composition",
                "Natural Resources Conservation, General",
                "Natural Resources Management",
                "North American Area Studies",
                "Nuclear Engineering",
                "Nuclear Medicine Technology",
                "Nursing, Practical/Vocational (LPN)",
                "Nursing, Registered (BS/RN)",
                "Occupational Therapy",
                "Occupational Therapy Assisting",
                "Office Supervision and Management",
                "Operations Management and Supervision",
                "Optometry (Pre-Optometry)",
                "Organizational Behavior",
                "Osteopathic Medicine",
                "Paralegal/Legal Assistant",
                "Parks, Recreation, and Leisure, General",
                "Parks/Rec/Leisure Facilities Management",
                "Personal Services, General*",
                "Pharmacy (Pre-Pharmacy)",
                "Philosophy",
                "Photography",
                "Physical Education and Coaching",
                "Physical Sciences, General",
                "Physical Therapy (Pre-Physical Therapy)",
                "Physical Therapy Assisting",
                "Physician Assisting",
                "Physics",
                "Political Science and Government",
                "Postsecondary Education",
                "Precision Production Trades, General",
                "Protective Services, General",
                "Psychiatric/Mental Health Technician",
                "Psychology, Clinical and Counseling",
                "Psychology, General",
                "Public Administration",
                "Public Administration and Services, General",
                "Public Affairs and Public Policy Analysis",
                "Public Health",
                "Public Relations and Organizational Communication",
                "Public Speaking",
                "Purchasing/Procurement/Contracts Management",
                "Quality Control and Safety Technologies",
                "Radio and Television Broadcasting",
                "Radio and Television Broadcasting Technology*",
                "Real Estate",
                "Rehabilitation Therapy",
                "Religion",
                "Religious Education",
                "Respiratory Therapy Technology",
                "Restaurant/Food Services Management",
                "Sales, Merchandising, and Marketing, General",
                "Science Education",
                "Secondary Education",
                "Secretarial Studies and Office Administration",
                "Small Business Management/Operations",
                "Social Sciences, General",
                "Social Studies/Sciences Education",
                "Social Work",
                "Sociology",
                "Spanish Language and Literature",
                "Special Education",
                "Sport and Fitness Administration/Management",
                "Statistics",
                "Surgical Technology",
                "Surveying Technology",
                "Teacher Assisting/Aide Education",
                "Teacher Education, General",
                "Teacher Education, Subject-Specific*",
                "Textile and Apparel",
                "Theatre Arts/Drama",
                "Theology, General",
                "Therapy and Rehabilitation, General",
                "Tourism and Travel Marketing",
                "Transportation and Materials Moving (e.g., air, ground, and marine)",
                "Travel/Tourism Management",
                "Urban Studies/Urban Affairs",
                "Veterinarian Assisting/Technology",
                "Veterinary Medicine (Pre-Veterinarian)",
                "Vocational Rehabilitation Counseling",
                "Webpage Design",
                "Welding Technology",
                "Wildlife and Wildlands Management",
                "Women’s Studies",
                "Zoology"
            ],
            filteredMajorsList: []
        }
    },
    methods: {
        viewPage(page) {
            axios({
                method: "POST",
                url: "http://localhost:3000/postCount",
                headers: { 'Content-Type': 'application/json' },
                data: { page: page, type: 'view' }
            })
        },
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
@import '../assets/styles/home.css';
</style>