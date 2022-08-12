export const createMajorsTable = function (pool: any) {

    const majorsTableDuplicationQuery = `SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = "coym"
        AND table_name = "majors"
    `

    const createMajorsQuery = `CREATE TABLE IF NOT EXISTS 
        majors (
            id INT AUTO_INCREMENT, 
            name VARCHAR(255), 
            PRIMARY KEY (id)
        ) 
    `

    const insertMajorsQuery = `INSERT INTO 
            majors (
                name
            ) VALUES ("Accounting"),
            ("Accounting Technician"),
            ("Actuarial Science"),
            ("Adult Development and Aging Gerontology"),
            ("Advertising"),
            ("Aeronautical Aerospace Engineering Technologies"),
            ("Aerospace Aeronautical Engineering"),
            ("African American Studies"),
            ("Agribusiness Operations"),
            ("Agricultural Business and Management"),
            ("Agricultural Economics"),
            ("Agricultural Education"),
            ("Agricultural Mechanization"),
            ("Agricultural Production"),
            ("Agricultural Bioengineering"),
            ("Agriculture"),
            ("Agronomy and Crop Science"),
            ("Aircraft Mechanics Technology"),
            ("Aircraft Piloting and Navigation"),
            ("Alcohol Drug Abuse Counseling"),
            ("American Indian Native American Studies"),
            ("American English Literature"),
            ("Animal Sciences"),
            ("Anthropology"),
            ("Applied Mathematics"),
            ("Architectural Drafting CAD Technology"),
            ("Architectural Engineering"),
            ("Architectural Engineering Technology"),
            ("Architectural Environmental Design"),
            ("Architecture"),
            ("Area Studies"),
            ("Art Education"),
            ("Art History, Criticism and Conservation"),
            ("Art"),
            ("Asian Area Studies"),
            ("Asian Languages and Literatures"),
            ("Astronomy"),
            ("Athletic Training"),
            ("Atmospheric Sciences and Meteorology"),
            ("Autobody Repair Technology"),
            ("Automotive Engineering Technology"),
            ("Automotive Mechanics Technology"),
            ("Aviation and Airway Science"),
            ("Aviation Management and Operations"),
            ("Avionics Technology"),
            ("Banking and Financial Support Services"),
            ("Bible Biblical Studies"),
            ("Biochemistry and Biophysics"),
            ("Biology"),
            ("Biomedical Engineering"),
            ("Business Administration and Management"),
            ("Business Education"),
            ("Business Management Quantitative Methods"),
            ("Business Managerial Economics"),
            ("Career and Technical Education"),
            ("Cell Cellular Biology"),
            ("Chemical Engineering"),
            ("Chemistry"),
            ("Child Care Services Management"),
            ("Child Development"),
            ("Chiropractic"),
            ("Cinema Film"),
            ("Cinematography Film Vide Production"),
            ("City Urban Regional Planning"),
            ("Civil Engineering"),
            ("Civil Engineering Technology"),
            ("Classical Ancient Languages and Literatures"),
            ("Communication Disorder Services"),
            ("Communications Technology"),
            ("Communications"),
            ("Community Organization and Advocacy"),
            ("Comparative Literature"),
            ("Computer and Information Sciences"),
            ("Computer Engineering"),
            ("Computer Engineering Technology"),
            ("Computer Networking Telecommunications"),
            ("Computer Science"),
            ("Computer Software and Media Applications"),
            ("Computer System Administration"),
            ("Construction Engineering Management"),
            ("Construction Trades"),
            ("Construction Building Technology"),
            ("Consumer and Family Economics"),
            ("Corrections"),
            ("Cosmetology Hairstyling*"),
            ("Counseling and Student Services"),
            ("Court Reporting*"),
            ("Creative Writing"),
            ("Criminal Justice"),
            ("Criminology"),
            ("Culinary Arts Chef Training"),
            ("Curriculum and Instruction"),
            ("Dance"),
            ("Data Management Technology"),
            ("Dental Assisting"),
            ("Dental Hygiene"),
            ("Dentistry"),
            ("Design and Visual Communications"),
            ("Diesel Mechanics Technology"),
            ("Digital Communications Media"),
            ("Divinity Ministry"),
            ("Drafting CAD Technology"),
            ("Early Childhood Education"),
            ("Ecology"),
            ("Economics"),
            ("Educational Administration"),
            ("Electrical, Electronics and Communications Engineering"),
            ("Electrical, Electronics Engineering Technologies"),
            ("Electrical Electronics Equip Installation and Repair"),
            ("Electromechanical Biomedical Engineering Technologies"),
            ("Elementary Education"),
            ("Emergency Medical Technology"),
            ("Engineering"),
            ("Engineering Technology"),
            ("English Language and Literature"),
            ("English-as-a-Second-Language Education"),
            ("English Language Arts Education"),
            ("Environmental Control Technologies"),
            ("Environmental Health Engineering"),
            ("Environmental Science"),
            ("Ethnic and Minority Studies"),
            ("European Area Studies"),
            ("Exercise Science Physiology Kinesiology"),
            ("Family and Consumer Sciences"),
            ("Fashion Merchandising"),
            ("Fashion Apparel Design"),
            ("Finance"),
            ("Financial Planning and Services"),
            ("Fine Studio Arts"),
            ("Fire Protection and Safety Technology"),
            ("Food and Nutrition"),
            ("Food Sciences and Technology"),
            ("Foreign Languages Education"),
            ("Foreign Languages Literatures"),
            ("Forestry"),
            ("French Language and Literature"),
            ("Funeral Services and Mortuary Science"),
            ("Genetics"),
            ("Geography"),
            ("Geological and Earth Sciences"),
            ("German Language and Literature"),
            ("Graphic and Printing Equipment Operation*"),
            ("Graphic Design"),
            ("Health and Physical Education Fitness"),
            ("Health Education"),
            ("Health Services Administration,General"),
            ("Health-Related Professions and Services*"),
            ("Health Medical Technology"),
            ("Heating Air Cond Refrig Install Repair"),
            ("History"),
            ("Horticulture Operations and Management"),
            ("Horticulture Science"),
            ("Hospital Facilities Administration"),
            ("Hotel Motel Management"),
            ("Human Resources Development Training"),
            ("Human Resources Management"),
            ("Industrial Design"),
            ("Industrial Engineering"),
            ("Industrial Production Technologies"),
            ("Information Science"),
            ("Information Technology"),
            ("Insurance and Risk Management"),
            ("Interior Architecture"),
            ("Interior Design"),
            ("International Business Management"),
            ("International Relations and Affairs"),
            ("Investments and Securities"),
            ("Journalism, Broadcast"),
            ("Journalism, Print"),
            ("Junior High Middle School Education"),
            ("Labor Industrial Relations"),
            ("Landscape Architecture"),
            ("Latin American Area Studies"),
            ("Latino Chicano Studies"),
            ("Law"),
            ("Law Enforcement"),
            ("Legal Administrative Assisting Secretarial*"),
            ("Legal Studies*"),
            ("Liberal Arts and General Studies*"),
            ("Library Science"),
            ("Linguistics"),
            ("Logistics and Materials Management"),
            ("Machine Tool Technology"),
            ("Management Information Systems"),
            ("Marine Aquatic Biology"),
            ("Marketing Management and Research"),
            ("Mass Communications"),
            ("Massage Therapy"),
            ("Mathematics Education"),
            ("Mathematics"),
            ("Mechanical Drafting CAD Technology"),
            ("Mechanical Engineering"),
            ("Mechanical Engineering Technology"),
            ("Mechanics and Repairers"),
            ("Medical Assisting"),
            ("Medical Laboratory Technology"),
            ("Medical Office Secretarial"),
            ("Medical Radiologic Technology"),
            ("Medical Records"),
            ("Medical Clinical Assisting"),
            ("Medicine"),
            ("Mental Health Counseling"),
            ("Microbiology and Immunology"),
            ("Middle Eastern Languages and Literatures"),
            ("Military Technologies*"),
            ("Multi Interdisciplinary Studies*"),
            ("Multimedia Animation Special Effects"),
            ("Music Education"),
            ("Music"),
            ("Music, Performance"),
            ("Music, Theory and Composition"),
            ("Natural Resources Conservation"),
            ("Natural Resources Management"),
            ("North American Area Studies"),
            ("Nuclear Engineering"),
            ("Nuclear Medicine Technology"),
            ("Nursing, Practical Vocational"),
            ("Nursing, Registered"),
            ("Occupational Therapy"),
            ("Occupational Therapy Assisting"),
            ("Office Supervision and Management"),
            ("Operations Management and Supervision"),
            ("Optometry"),
            ("Organizational Behavior"),
            ("Osteopathic Medicine"),
            ("Paralegal Legal Assistant"),
            ("Parks, Recreation, and Leisure"),
            ("Parks Rec Leisure Facilities Management"),
            ("Personal Services*"),
            ("Pharmacy"),
            ("Philosophy"),
            ("Photography"),
            ("Physical Education and Coaching"),
            ("Physical Sciences"),
            ("Physical Therapy "),
            ("Physical Therapy Assisting"),
            ("Physician Assisting"),
            ("Physics"),
            ("Political Science and Government"),
            ("Postsecondary Education"),
            ("Precision Production Trades"),
            ("Protective Services"),
            ("Psychiatric Mental Health Technician"),
            ("Psychology, Clinical and Counseling"),
            ("Psychology"),
            ("Public Administration"),
            ("Public Administration and Services"),
            ("Public Affairs and Public Policy Analysis"),
            ("Public Health"),
            ("Public Relations and Organizational Communication"),
            ("Public Speaking"),
            ("Purchasing Procurement Contracts Management"),
            ("Quality Control and Safety Technologies"),
            ("Radio and Television Broadcasting"),
            ("Radio and Television Broadcasting Technology*"),
            ("Real Estate"),
            ("Rehabilitation Therapy"),
            ("Religion"),
            ("Religious Education"),
            ("Respiratory Therapy Technology"),
            ("Restaurant Food Services Management"),
            ("Sales, Merchandising, and Marketing"),
            ("Science Education"),
            ("Secondary Education"),
            ("Secretarial Studies and Office Administration"),
            ("Small Business Management Operations"),
            ("Social Sciences"),
            ("Social Studies Sciences Education"),
            ("Social Work"),
            ("Sociology"),
            ("Spanish Language and Literature"),
            ("Special Education"),
            ("Sport and Fitness Administration Management"),
            ("Statistics"),
            ("Surgical Technology"),
            ("Surveying Technology"),
            ("Teacher Assisting Aide Education"),
            ("Teacher Education"),
            ("Teacher Education, Subject-Specific*"),
            ("Textile and Apparel"),
            ("Theatre Arts Drama"),
            ("Theology"),
            ("Therapy and Rehabilitation"),
            ("Tourism and Travel Marketing"),
            ("Transportation and Materials Moving"),
            ("Travel Tourism Management"),
            ("Urban Studies Urban Affairs"),
            ("Veterinarian Assisting Technology"),
            ("Veterinary Medicine"),
            ("Vocational Rehabilitation Counseling"),
            ("Webpage Design"),
            ("Welding Technology"),
            ("Wildlife and Wildlands Management"),
            ("Women Studies"),
            ("Zoology")

        `
    

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(majorsTableDuplicationQuery, function (err: any, result: any) {
            if (err) {
                connection.release()
                throw err
            }
            if (!result.length) {
                connection.query(createMajorsQuery, function (err: any, result: any) {
                    if (err) {
                        connection.release()
                        throw err
                    }
                })
                connection.query(insertMajorsQuery, function (err: any, result: any) {
                    if (err) {
                        connection.release()
                        throw err
                    }
                })
            }
        })
        connection.release()
    })
    
}

export const getMajorList = function (pool: any, res: any, req: any) {

    const selectMajorsQuery = `SELECT * FROM majors`

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectMajorsQuery, function (err: any, result: any, fields: any) {
            if (err) {
                connection.release()
                throw err
            }
            res.send({ 
                status: true, 
                message: result 
            })
        })
        connection.release()
    })

}