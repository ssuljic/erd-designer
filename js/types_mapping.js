function match_type(type, dbms) {
	var types = {
		'mysql': {
			'Numeric': 'INT',
			'Boolean': 'BOOL',
			'Character': 'CHAR',
			'Varchar': 'VARCHAR',
			'LongVarchar': 'TEXT',
			'Date': 'DATE',
			'DateTime': 'DATETIME',
			'Blob': 'LONGBLOB'
		},
		'oracle': {
			'Numeric': 'NUMBER',
			'Boolean': 'NUMERIC',
			'Character': 'CHAR',
			'Varchar': 'VARCHAR2',
			'LongVarchar': 'CLOB',
			'Date': 'DATE',
			'DateTime': 'DATE',
			'Blob': 'BLOB'
		},
		'sql server': {
			'Numeric': 'DECIMAL',
			'Boolean': 'BIT',
			'Character': 'CHAR',
			'Varchar': 'VARCHAR',
			'LongVarchar': 'VARCHAR',
			'Date': 'DATETIME',
			'DateTime': 'DATETIME',
			'Blob': 'VARBINARY'
		},
		'postgresql': {
			'Numeric': 'INTEGER',
			'Boolean': 'BOOLEAN',
			'Character': 'CHAR',
			'Varchar': 'VARCHAR',
			'LongVarchar': 'TEXT',
			'Date': 'DATE',
			'DateTime': 'TIMESTAMP',
			'Blob': 'BYTE'
		}
	}

	return types[dbms][type];
}