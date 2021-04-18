/*jshint esversion: 6 */
//Gets a query
function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
		return "";
	}
}
//Formats the dates
function formatTime(timestamp) {
	var date = new Date(timestamp);
	return date.toLocaleString();
}
//HTML Entities
function htmlEntities(str) {
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
var username = htmlEntities(decodeURIComponent(getQueryVariable('username'))); //Username query
var error_message = "No minecraft account currently has that username!"; //The Error Message
var API_URL = "https://www.faav.tk/v1/namemc/namehistory?username="; //The API URL
var input = document.getElementById('username'); //The input
input.value = decodeURIComponent(getQueryVariable('username')); //Sets the input value to the username
fetch(API_URL + username).then(response => response.json()).then((data) => {
	if (username !== '') { //Checks if the username isn't blank
		if (data.error == "This user doesn't exist") { //Checks if the username is on a account
			document.getElementById('myTable').innerHTML = '<td>' + error_message + '</td>'; //Makes the error message
		} else {
			buildTable(data); //Makes the Name History
		}
	}
	//Name History Section
	function buildTable(data) {
		var table = document.getElementById('myTable');
		if (formatTime(data[0].timestamp) == "12/31/1969, 7:00:00 PM" || formatTime(data[0].timestamp) == "1/1/1970, 1:00:00 AM") {
			var row = `<tr class="bold">
	  <td>` + data.length + `. <a href="?username=` + data[0].username + `">` + data[0].username + `</a><\/td>`;
			table.innerHTML += row;
		} else {
			var row = `<tr class="bold">
	  <td>` + data.length + `. <a href="?username=` + data[0].username + `">` + data[0].username + `</a><\/td><td class="right">` + formatTime(data[0].timestamp) + `<\/td>
	                     <\/tr>`;
			table.innerHTML += row;
			for (var i = 1; i < data.length - 1; i++) {
				var row1 = `<tr>
	  <td>` + data[i].order + `. <a href="?username=` + data[i].username + `">` + data[i].username + `<\/a><\/td><td class="right">` + formatTime(data[i].timestamp) + `<\/td>
	                     <\/tr>`;
				table.innerHTML += row1;
			}
			var row2 = `<tr>
	  <td>` + data[i].order + `. <a href="">` + data[i].username + `</a><\/td>
	                     <\/tr>`;
			table.innerHTML += row2;
		}
	}
});
