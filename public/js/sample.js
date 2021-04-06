function getSample() {
	DB.database = {
		"name": 'sample',
		"tables": [{
				'name': 'students',
				'top': '100px',
				'left': '100px',
				'id': 1,
				'refs': [2], // For FK's
				'attributes': [{
					'name':'id',
					'type':'Numeric',
					'size':11,
					'constraints':['PRIMARY KEY']
				}, {
					'name':'first_name',
					'type':'Varchar',
					'size':20,
					'constraints':[]
				}, {
					'name':'last_name',
					'type':'Varchar',
					'size':20,
					'constraints':[]
				}, {
					'name':'date_of_birth',
					'type':'Date',
					'size':'',
					'constraints':[]
				}, {
					'name':'teacher_id',
					'type':'Numeric',
					'size':'11',
					'constraints':['FOREIGN KEY']
				}]
			},
			{
				'name': 'teachers',
				'top': '100px',
				'left': '500px',
				'id': 2,
				'refs': [],
				'attributes': [{
					'name':'id',
					'type':'Numeric',
					'size':11,
					'constraints':['PRIMARY KEY']
				}, {
					'name':'name',
					'type':'Varchar',
					'size':20,
					'constraints':[]
				}]
			},
			{
				'name': 'student_courses',
				'top': '400px',
				'left': '100px',
				'id': 3,
				'refs': [1,4],
				'attributes': [{
					'name':'student_id',
					'type':'Numeric',
					'size':11,
					'constraints':['FOREIGN KEY']
				}, {
					'name':'course_id',
					'type':'Numeric',
					'size':11,
					'constraints':['FOREIGN KEY']
				}]
			},
			{
				'name': 'courses',
				'top': '400px',
				'left': '500px',
				'id': 4,
				'refs': [],
				'attributes': [{
					'name':'id',
					'type':'Numeric',
					'size':11,
					'constraints':['PRIMARY KEY']
				}, {
					'name':'description',
					'type':'LongVarchar',
					'size':'',
					'constraints':[]
				}]
			}
		]
	};
	DB.redraw();
	DB.redrawLines();
}