function DoPost(username,dat,attr,progress){
	//console.log("here")
	var http = new XMLHttpRequest();
	var url = "/load";
	console.log(username)
	var params = "user="+username+"&dat="+dat+"&attr="+attr+"&page="+progress;
	http.open("POST", url, false);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	//http.setRequestHeader("Content-length", params.length);
	//http.setRequestHeader("Connection", "close");

	//http.onreadystatechange = function() {//Call a function when the state changes.
	//    if(http.readyState == 4 && http.status == 200) {
	//        //alert(http.responseText);
	//    }
	//}
	http.send(params);
	return http.responseText;
/*	$.ajax({
		url: "/load",
		type: "POST",
		data: {username : username, data: dat, attr:attr, page:progress},

		cache: false,
		timeout: 5000,
		complete: function() {
		//called when complete
		console.log('process complete');
		window.location.replace('/load')
		},

		success: function(data) {
		console.log(data);
		console.log('process sucess');
		},

		error: function() {
		console.log('process error');
		},
	});*/
}