function getAttributeForm(DB, active_table) {
	// Copied from phpmyadmin
	var attributeList = '<select style="width:194px;" class="type"> \
												<option>Numeric</option> \
												<option>Boolean</option> \
												<option>Character</option> \
												<option>Varchar</option> \
												<option>LongVarchar</option> \
												<option>Date</option> \
												<option>DateTime</option> \
												<option>Blob</option> \
											</select><br><br>';
											
	var attribute_form = "<div class='attribute_form'><br><label>Attribute name:</label><input type='text' class='attribute' id='attr_name'/><br> ";
	attribute_form += "<label>Type:</label><br>";

	// from config.js
	attribute_form += attributeList;

	attribute_form += "<label>Size:</label><br><input type='text' class='size' /><br>";
	attribute_form += "<label>Constraints:</label><div class='attribute_constraints'>";
	attribute_form += "<input type='checkbox' value='NOT NULL' />NOT NULL<br>";
	attribute_form += "<input type='checkbox' value='UNIQUE'/>UNIQUE<br>";
	attribute_form += "<input type='checkbox' value='PRIMARY KEY'/>PRIMARY KEY<br>";
	attribute_form += "<input type='checkbox' value='FOREIGN KEY'/>FOREIGN KEY";
	attribute_form += "<select class='fk_ref'>"

	for(var i=0; i<DB.database.tables.length; i++) {
		if(DB.database.tables[i].id == active_table) continue;
		attribute_form += '<option value="' + DB.database.tables[i].id + '">' + DB.database.tables[i].name + '</option>'
	}

	attribute_form += "</select><br>";
	attribute_form += "<input type='checkbox' value='CHECK'/>CHECK<br>";
	attribute_form += "<input type='checkbox' value='DEFAULT'/>DEFAULT<br>";
	attribute_form += "</div></div><br><br>"
	return attribute_form;
}