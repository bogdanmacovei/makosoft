function createID() {
	var d = new Date();

	var year = d.getFullYear() % 100;

	var mon = d.getMonth() + 1;
	if(mon < 10)
		mon = '0' + mon;

	var day = d.getDate();
	if(day < 10)
		day = '0' + day;

	var hr = d.getHours();
	if(hr < 10)
		hr = '0' + hr;

	var min = d.getMinutes();
	if(min < 10)
		min = '0' + min;

	var sec = d.getSeconds();
	if(sec < 10)
		sec = '0' + sec;

	var id = year + mon + day + hr + min + sec;

	return id;
}

function getCurrentDate () {
	var d = new Date ();
	var year = d.getFullYear();

	var mon = d.getMonth() + 1;
	if(mon < 10)
		mon = '0' + mon;

	var day = d.getDate();
	if(day < 10)
		day = '0' + day;

	var currentDate = day + '.' + mon + '.' + year;

	return currentDate;
}

$.get ('/selectCursuri')
	.then (data => {
		for (var i = 0; i < data.length; ++i) {
			$('#curs').append ('<option>' + data[i].nume + '</option>');
		}
	});

$('#send').click (function () {
	var elementCurs = document.getElementById('curs');
	var curs = elementCurs.options[elementCurs.selectedIndex].text;

	var elementTip = document.getElementById('tip');
	var tip = elementTip.options[elementTip.selectedIndex].text;

	var elementNota = document.getElementById('nota');
	var nota = elementNota.options[elementNota.selectedIndex].text;

	var objToMongo = {
		_id: createID(),
		curs: curs,
		tip: tip,
		nota: nota,
		data: getCurrentDate()
	};

	$.post ('/insertNota', objToMongo, function (data) {}, 'json');

	alert ('Nota a fost introdusa cu succes!');
	window.location = '/note.html';
});

$.get ('/selectNote')
	.then (data => {
		for (var i = 0; i < data.length; ++i) {
			$('#rez')
				.append ('<tr style = "font-size: 18px;">\
							<td style = "text-align:center;">' + data[i].data + '</td>\
							<td style = "text-align:center;">' + data[i].curs + '</td>\
							<td style = "text-align:center;">' + data[i].tip + '</td>\
							<td style = "text-align:center;">' + data[i].nota + '</td>\
							<td style = "text-align:center;"><button class = "del" id = "' + data[i]._id + '">Sterge</button></td>\
						</tr>');
		}

		$('.del').click (function () {
			$.get ('/stergeNota/' + $(this).attr('id'))
				.then (data => {});
			
			alert ('Nota a fost stearsa cu succes!');
			window.location = '/note.html';
		});
	});