let groupmates = [{
        "name": "Александр",
        "surname": "Иванов",
        "group": "БВТ1702",
        "marks": [4, 3, 5]
    },
    {
        "name": "Иван",
        "surname": "Петров",
        "group": "БСТ1702",
        "marks": [4, 4, 4]
    },
    {
        "name": "Кирилл",
        "surname": "Смирнов",
        "group": "БАП1801",
        "marks": [5, 5, 5]
    }
];


let rpad = function(str, length) {
    str = str.toString(); 
    while (str.length < length)
        str = str + ' '; 
    return str; 
};

let log_students = function(students) {
    console.log(
        rpad("Имя", 15),
        rpad("Фамилия", 15),
        rpad("Группа", 8),
        rpad("Оценки", 20)
    );
    
    for (let i = 0; i < students.length; i++) {
        
        console.log(
            rpad(students[i]['name'], 15),
            rpad(students[i]['surname'], 15),
            rpad(students[i]['group'], 8),
            rpad(students[i]['marks'], 20)
        );
    }
    console.log('\n'); 
};


let filter_by_group = function(students, group) {
	stud=[]; 
	for (let i = 0; i < students.length; i++) { 
		if (students[i]['group']==group) { 
			stud.push(students[i]) 
		}
	}
	return stud; 
};

let filter_by_min_avg_grade = function(students, avg) {
	stud=[]; 
	for (let i = 0; i < students.length; i++) { 
		let marks=students[i]['marks']; 
		let mark_=0; 
		for (let k = 0; k < marks.length; k++) { 
			mark_+=marks[k]; 
		}
		if (mark_/marks.length>avg) { 
			stud.push(students[i]) 
		}
	}
	return stud; 
};

console.log(groupmates);

let group = prompt("Enter group name");
log_students(filter_by_group(groupmates, group))

let num = prompt("Enter minimum average mark");
log_students(filter_by_min_avg_grade(groupmates, num))
