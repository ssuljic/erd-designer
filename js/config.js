function getAttributeForm(DB, active_table) {
	// Copied from phpmyadmin
	var attributeList = '<select id="type-dropdown" class="form-control type"> \
												<option>Numeric</option> \
												<option>Boolean</option> \
												<option>Character</option> \
												<option>Varchar</option> \
												<option>LongVarchar</option> \
												<option>Date</option> \
												<option>DateTime</option> \
												<option>Blob</option> \
											</select>';
											
	// var attribute_form = "<form class='attribute_form'><br><label>Attribute name:</label><input type='text' class='attribute' id='attr_name'/><br> ";

	var attribute_form = '<form class="attribute_form"> \
												<div class="form-group"> \
											    <label for="attr_name">Attribute name:</label> \
											    <input type="text" class="form-control attribute" id="attr_name"> \
											  </div>';
	attribute_form += "<div class='form-group'><label for='type-dropdown'>Type:</label><br>";

	// from config.js
	attribute_form += attributeList;
	attribute_form += '</div>';

	attribute_form += "<label for='size-input'>Size:</label><br><input type='text' id='size-input' class='form-control size' />";
	attribute_form += "<label>Constraints:</label><div class='attribute_constraints'>";
	attribute_form += "<input type='checkbox' value='NOT NULL' />NOT NULL<br>";
	attribute_form += "<input type='checkbox' value='UNIQUE'/>UNIQUE<br>";
	attribute_form += "<input type='checkbox' value='PRIMARY KEY'/>PRIMARY KEY<br>";
	attribute_form += "<input type='checkbox' value='FOREIGN KEY'/>FOREIGN KEY";
	attribute_form += "<select class='form-control fk_ref' style='width:50%;display:inline;margin-left:20px;'>"

	for(var i=0; i<DB.database.tables.length; i++) {
		if(DB.database.tables[i].id == active_table) continue;
		attribute_form += '<option value="' + DB.database.tables[i].id + '">' + DB.database.tables[i].name + '</option>'
	}

	attribute_form += "</select><br>";
	attribute_form += "<input type='checkbox' value='CHECK'/>CHECK<br>";
	attribute_form += "<input type='checkbox' value='DEFAULT'/>DEFAULT<br>";
	attribute_form += "</div></form><br><br>"
	return attribute_form;
}