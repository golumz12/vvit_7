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
	res=[]; 
	for (let i = 0; i < students.length; i++) { 
		if (students[i]['group'] == group) { 
			res.push(students[i]) 
		}
	}
	return res; 
};

let filter_by_min_avg_grade = function(students, avg_target) {
	res = []; 
	for (let i = 0; i < students.length; i++) { 
		let marks = students[i]['marks']; 
		let avg_mark = 0; 
		for (let j = 0; j < marks.length; j++) { 
			avg_mark += marks[j]; 
		}
                avg_mark = avg_mark / marks.length
		if (avg_mark > avg_target) { 
			res.push(students[i]) 
		}
	}
	return res; 
};

console.log(groupmates);

let group = prompt("Enter group name");
log_students(filter_by_group(groupmates, group))

let num = prompt("Enter minimum average mark");
log_students(filter_by_min_avg_grade(groupmates, num))
