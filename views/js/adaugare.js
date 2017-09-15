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

$('#send').click (function () {
	var objToMongo = {
		_id: createID(),
		nume: $('#nume').val(),
		perioada: {
			an: $('#an').val(),
			semestru: $('#semestru').val()
		},
		rezultat: {
			nr_credite: $('#credite').val(),
			media: 0
		},
		profesor: {
			curs: $('#curs').val(),
			seminar: $('#seminar').val(),
			laborator: $('#laborator').val()
		},
		pondere: {
			curs: $('#ponderecurs').val(),
			seminar: $('#pondereseminar').val(),
			laborator: $('#ponderelaborator').val()
		}
	};

	$.post ('/insertCurs', objToMongo, function (data) {}, 'json');

	alert ('Cursul a fost inserat cu succes');
	window.location = '/adaugare.html';
});

$.get ('/ultimeleCursuri')
	.then (data => {
		for (var i = 0; i < data.length; ++i) {
			$('.result')
				.append ((i+1) + '. <a href = "/curs.html?id=' + data[i]._id + '">' + data[i].nume + '</a>')
				.append ('<br>');
		}
	});