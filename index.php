<!DOCTYPE html>
<html>
	<head>
		<title>ERD Designer</title>
		<link rel="stylesheet" type="text/css" href="css/style.css">
		<link rel="shortcut icon" href="img/favicon.ico">
		<link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
		<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
		<script type="text/javascript" src="//code.jquery.com/jquery-1.10.2.min.js"></script>
		<script type="text/javascript" src="//code.jquery.com/ui/1.10.4/jquery-ui.min.js"></script>
		<script type="text/javascript" src="js/config.js"></script>
		<script type="text/javascript" src="js/types_mapping.js"></script>
		<script type="text/javascript" src="js/db.js"></script>
		<script type="text/javascript" src="js/sample.js"></script>
		<script type="text/javascript" src="js/drawing.js"></script>
		<script type="text/javascript" src="js/jquery.svg.min.js"></script>
		<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
	</head>
	<body>
		<!-- Modal -->
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
		        <h4 class="modal-title" id="myModalLabel"></h4>
		      </div>
		      <div class="modal-body" id="modal-content">
		      	<textarea style="width:100%;height:300px;"></textarea>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		      </div>
		    </div>
		  </div>
		</div>
		<div id="content">
			<div id="panel">
				<div class="panel panel-info">
					<div class="panel-heading">
						<div class="panel-title"><h1><img src="img/logo.png" id="logo"/>ERD Designer</h1></div>
					</div>
					<div class="panel-body">
						<div id="toolbox">
						 	<h3>Add table</h3>
							<div>
							    <form id="add_table">
							    	<label>Table name:</label><input type="text" id="table_name" />
							    	<input type="button" value="Add table" id="add_table_btn" />
							    </form>
							</div>
					 	</div>
					 	<!-- Single button -->
						<div class="btn-group">
						  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
						    Generate SQL DDL Script<span class="caret"></span>
						  </button>
						  <ul class="dropdown-menu" role="menu">
						    <li><a href="javascript:void(0);" class="genscript" id="mysql">MySQL</a></li>
						    <li><a href="javascript:void(0);" class="genscript" id="postgresql">PostgreSQL</a></li>
						    <li><a href="javascript:void(0);" class="genscript" id="oracle">Oracle</a></li>
						  </ul>
						</div>
						<br>
					 	<input style="margin-left:0" class="btn btn-default" type="button" value="View sample" onclick="getSample();">
					 	<form id="edit_form">
					 		<h5></h5>
					 	</form>	
					</div>
				</div>
			 	
			</div>
			<div id="svgarea">
		  	<div id="workarea">
				</div>
			</div>
		</div>
		<script type="text/javascript">
			$(document).ready(function() {
				$('#svgarea').svg();
			});
		</script>
	</body>
</html>