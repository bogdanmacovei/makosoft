var url = new URL(window.location.href);
var id = url.searchParams.get('id');

$.get ('/selectCurs/' + id)
	.then (data => {
		$('#title').append (data[0].nume);
		$('#fs')
			.append ('Anul <b>' + data[0].perioada.an + '</b>, ')
			.append ('semestrul <b> ' + data[0].perioada.semestru + '</b>')
			.append ('<br>Numarul de credite alocate: <b>' + data[0].rezultat.nr_credite + '</b>')
			.append ('<br><br>Profesor curs: <b>' + data[0].profesor.curs + '</b>');
		if (data[0].profesor.seminar)
			$('#fs').append ('<br>Profesor seminar: <b>' + data[0].profesor.seminar + '</b>');

		if (data[0].profesor.laborator)
			$('#fs').append ('<br>Profesor laborator: <b>' + data[0].profesor.laborator + '</b>');

		$('#fs').append ('<br><br>Pondere examen scris: <b>' + data[0].pondere.curs + '%</b>');

		if (data[0].pondere.seminar)
			$('#fs').append ('<br>Pondere seminar: <b>' + data[0].pondere.seminar + '%</b>');

		if (data[0].pondere.laborator)
			$('#fs').append ('<br>Pondere laborator: <b>' + data[0].pondere.laborator + '%</b>');

		if (data[0].rezultat.media)
			$('#fs').append ('<br><br>Media obtinuta: <b>' + data[0].rezultat.media + '</b>');
		else 
			$('#fs').append ('<br><br>Media nu a fost calculata inca');


		// gaseste notele de la acest curs

		$.get ('/selectNotele/' + data[0].nume)
			.then (data1 => {
				for (var i = 0; i < data1.length; ++i)
					$('.result')
						.append (data1[i].tip)
						.append (': ')
						.append ('<b>' + data1[i].nota + '</b>')
						.append (' (')
						.append (data1[i].data)
						.append (')<br>');
			});
	});

$('#calcul').click (function () {
	$.get ('/selectCurs/' + id)
		.then (data => {
			var pondereCurs = data[0].pondere.curs;
			var pondereSeminar = 0;
			var pondereLaborator = 0;
			
			if (data[0].pondere.seminar)
				pondereSeminar = data[0].pondere.seminar;
			if (data[0].pondere.laborator)
				pondereLaborator = data[0].pondere.laborator;

			var notaCurs = 0;
			var notaSeminar = 0;
			var notaLaborator = 0;

			$.get ('/selectNotele/' + data[0].nume)
				.then (data1 => {
					for (var i = 0; i < data1.length; ++i) {
						if (data1[i].tip === 'Curs')
							notaCurs = data1[i].nota;
						else if (data1[i].tip === 'Seminar')
							notaSeminar = data1[i].nota;
							else if (data1[i].tip === 'Laborator')
								notaLaborator = data1[i].nota;
					}

					var partial = pondereCurs * notaCurs + pondereSeminar * notaSeminar + pondereLaborator * notaLaborator;
					partial /= 100;

					var final = Math.round(partial);

					if (final >= 10)
						final = 10;

					var objToMongo = {
						find: {
							_id: data[0]._id
						},
						replace: {
							rezultat : {
								media: final,
								nr_credite: data[0].rezultat.nr_credite
							}
						}
					};

					$.post ('/updateMedia', objToMongo, function (date) {}, 'json');

					alert ('Media a fost calculata!');
					window.location = '/curs.html?id=' + data[0]._id;
				});
		});
});