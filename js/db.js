// Global object for keeping information from the ERD
var DB = {};

DB.database = {
	"name": 'sample',
	"tables": []
};

DB.createTable = function(name) {
	var table = {};
	table.id = DB.database.tables.length === 0 ? 1 : DB.database.tables[DB.database.tables.length - 1].id + 1
	table.name = name;
	// css positions
	table.top = "auto";
	table.left = "auto";
	table.refs = [];
	table.attributes = [{ 
		"name": "id", 
		"type":"INT", 
		"size": 11, 
		"constraints": ["PRIMARY KEY"],
	}];

	DB.database.tables.push(table);
	DB.redraw();
};

DB.addAttribute = function(id, attribute, ref) {
	for(var i=0; i<DB.database.tables.length; i++) {
		if(DB.database.tables[i].id == id) {
			DB.database.tables[i].attributes.push(attribute);
			if(ref) {
				DB.database.tables[i].refs.push(ref);
			}
		}
	}
	DB.redraw();
	DB.redrawLines();
	$("#edit_form").empty();
}

DB.changePosition = function(id, position) {
	for(var i=0; i<DB.database.tables.length; i++) {
		if(DB.database.tables[i].id == id) {
			DB.database.tables[i].top = position.top;
			DB.database.tables[i].left = position.left;
			break;
		}
	}	
	DB.redrawLines()
} 

DB.redraw = function() {
	$("#workarea").empty();
	for(var i=0; i<DB.database.tables.length; i++) {

		var table = "<div id='table_" + DB.database.tables[i].id +"' class='draggable panel panel-info' style='left:" + DB.database.tables[i].left + ";top:" + DB.database.tables[i].top + "'>";
		table += "<div class='panel-heading'><h3 class='panel-title'>" + DB.database.tables[i].name + "</h3></div>";
		// table id
		table += "<input type='hidden' value='" + DB.database.tables[i].id + "' class='table_id' />"
		table += "<table class='table'>";

		var attr = DB.database.tables[i].attributes
		for(var j=0; j<attr.length; j++) {
			var constraints;
			if(attr[j].constraints.length > 0) 
				constraints = attr[j].constraints.join(",");
			else 
				constraints = "";
			table += "<tr><td>" + constraints + "</td><td><b>" + attr[j].name + "</b></td><td>" + attr[j].type + '(' + attr[j].size +")</td></tr>";
		}
		table += "</table></div>";		

		$("#workarea").prepend(table);
	}
	$(".draggable").draggable();
	// Select table
	$(document).on("click", '.draggable', function() {
		$.each($('.draggable'), function(i, val) {
			this.className = 'draggable panel panel-info';
		});
		this.className = this.className.replace("info", "primary active_table");
		$("#edit_form").empty();
		$("#edit_form h5").text($(this).find("h3").text());
		$("#edit_form").append("<div id='table_attributes'><div id='edit_attribute_list'></div><input type='button' value='Add attribute' id='add_attribute_btn' /></div>");
		var table_id = $('.active_table').find('.table_id').val();
		$("#add_attribute_btn").on("click", function() {
			var attr = {};
			attr.name = $('#attr_name').val();
			attr.type = $('.type option:selected').text();
			attr.size = $('.size').val();
			var constr = [];
			var ref = null;
			$('.attribute_constraints input:checked').each(function () {
				if($(this).val() == 'FOREIGN KEY')
					ref = $('.fk_ref option:selected').val();
				constr.push($(this).val());
			});
			attr.constraints = constr;			
			DB.addAttribute(table_id, attr, ref);
		});
		$("#edit_attribute_list").append(getAttributeForm(DB, table_id));
	});

	// Reposition table
	$(document).on("mousemove", '.draggable', function() {
		var table_id = $(this).find('.table_id').val();
		DB.changePosition(table_id, 
											{'top':$(this).css('top'),
											 'left':$(this).css('left')
											});
	});
}


DB.redrawLines = function() {
	var svg = $("#svgarea").svg('get');
	svg.clear();
	var max_left = 0;

	for(var i=0; i<DB.database.tables.length; i++) {
		if(parseInt(DB.database.tables[i].left.slice(0, -2)) > max_left) {
			max_left = parseInt(DB.database.tables[i].left.slice(0, -2))
		}
		if(DB.database.tables[i].refs.length > 0) {
			var y1 = parseInt(DB.database.tables[i].top.slice(0, -2));
			var x1 = parseInt(DB.database.tables[i].left.slice(0, -2));
			var width1 = parseInt($('#table_' + DB.database.tables[i].id).css('width').slice(0, -2))/2;
			var height1 = parseInt($('#table_' + DB.database.tables[i].id).css('height').slice(0, -2))/2;

			for(var j=0; j<DB.database.tables.length; j++) {
				for(var k=0; k<DB.database.tables[i].refs.length; k++) {
					if(DB.database.tables[i].refs[k] == DB.database.tables[j].id) {
						var y2 = parseInt(DB.database.tables[j].top.slice(0, -2));
						var x2 = parseInt(DB.database.tables[j].left.slice(0, -2));
						var width2 = parseInt($('#table_' + DB.database.tables[j].id).css('width').slice(0, -2))/2;
						var height2 = parseInt($('#table_' + DB.database.tables[j].id).css('height').slice(0, -2))/2;

						svg.line(x1+width1, y1+height1, x2+width2, y2+height2, {stroke: 'black', strokeWidth: 2, class_: 'myline'});
					}
				}
			}
		}
	}
	$("#svgarea").css("width", max_left + 'px');
}

DB.toMySQL = function () {
	var script = '';
	fk_constraints = '';
	for(var i=0; i<DB.database.tables.length; i++) {
		script += 'CREATE TABLE IF NOT EXISTS `' + DB.database.tables[i].name + '` (\n';
		var constraints = '';
		var fk_num = 0;
		for(var j=0; j<DB.database.tables[i].attributes.length; j++) {
			script += '\t`' + DB.database.tables[i].attributes[j].name + '` ' + DB.database.tables[i].attributes[j].type;
			if(DB.database.tables[i].attributes[j].size !== '') {
				script += '(' + DB.database.tables[i].attributes[j].size + ')';
			}  
			script += ' NOT NULL';
			if(DB.database.tables[i].attributes[j].name == 'id') {
				 script += ' AUTO_INCREMENT';
			}
			for(var k=0; k<DB.database.tables[i].attributes[j].constraints.length; k++) {
				if(DB.database.tables[i].attributes[j].constraints[k] == 'PRIMARY KEY') {
					constraints += '\t' + DB.database.tables[i].attributes[j].constraints[k] + ' (`' + DB.database.tables[i].attributes[j].name + '`),\n';
				}
				else if (DB.database.tables[i].attributes[j].constraints[k] == 'FOREIGN KEY') {
					fk_constraints += 'ALTER TABLE `' + DB.database.tables[i].name + '` ADD FOREIGN KEY (' + DB.database.tables[i].attributes[j].name + ') REFERENCES `' + DB.database.tables[DB.database.tables[i].refs[fk_num] - 1].name +  '` (`id`);\n';
					fk_num++;
				}
			}
			script += ',\n';
		}
		script += constraints;
		// trim last comma
		script = script.slice(0, -2); 
		script += '\n) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;';

		script += '\n\n';
	}
	script += fk_constraints;
	return script;
}









