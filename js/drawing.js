$(function() {
	DB.redraw();

	$("#toolbox").accordion({
		collapsible: true,
		active: false,
		heightStyle: "content"
	});

	$("#add_table_btn").click(function() {
		// Adding the name and id attribute to the table
		var name = $('#table_name').val();
		var tb = DB.createTable(name);

		$("#edit_form").empty();
		$("#table_name").val("");
		$("#toolbox").accordion({active: false});

	});	

	$(".genscript").click(function() {
		content = DB.toSQL($(this).attr('id'));
		$("#modal-content textarea").html(content);
		$("#myModalLabel").text($(this).attr('id').toUpperCase());
		$('#myModal').modal();
	});

});