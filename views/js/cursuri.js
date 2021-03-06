function information (x) {
	if (x === 10)
		return '10(zece)';
	if (x === 9)
		return '9(noua)';
	if (x === 8)
		return '8(opt)';
	if (x === 7)
		return '7(sapte)';
	if (x === 6)
		return '6(sase)';
	if (x === 5)
		return '5(cinci)';
	if (x <= 4)
		return 'Restanta';
	if (!x)
		return 'necalculata';
}

$.get ('/selectCursuri')
	.then (data => {
		for (var i = 0; i < data.length; ++i) {
			if (data[i].perioada.an === 1) {
				$('#firstcol1')
					.append ('<fieldset>\
							 	<a href = "curs.html?id=' 
								+ data[i]._id + '"><b style = "font-size: 18px;">' 
								+ data[i].nume + '</b></a>'
								+ ' <br>Semestrul: <b>' 
								+ data[i].perioada.semestru
								+ '</b>, nota finala: <b>'
								+ information(data[i].rezultat.media) 
								+ '</b><br>Profesor curs: <b>' 
								+ data[i].profesor.curs + '</b>'
								+ '<br><button class = "del" id = "' + data[i]._id +'">Sterge</button>'
							    + '</fieldset><br>');
			}
			else if (data[i].perioada.an === 2) {
				$('#firstcol2')
					.append ('<fieldset>\
							 	<a href = "curs.html?id=' 
								+ data[i]._id + '"><b style = "font-size: 18px;">' 
								+ data[i].nume + '</b></a>'
								+ ' <br>Semestrul: <b>' 
								+ data[i].perioada.semestru
								+ '</b><br>Profesor curs: <b>' 
								+ data[i].profesor.curs + '</b>'
								+ '<br><button class = "del" id = "' + data[i]._id +'">Sterge</button>'
							    + '</fieldset><br>');
			}

			else if (data[i].perioada.an === 3) {
				$('#second')
					.append ('<fieldset>\
							 	<a href = "curs.html?id=' 
								+ data[i]._id + '"><b style = "font-size: 18px;">' 
								+ data[i].nume + '</b></a>'
								+ ' <br>Semestrul: <b>' 
								+ data[i].perioada.semestru
								+ '</b><br>Profesor curs: <b>' 
								+ data[i].profesor.curs + '</b>'
								+ '<br><button class = "del" id = "' + data[i]._id +'">Sterge</button>'
							    + '</fieldset><br>');
			}

			$('.del').click (function () {
				$.get ('/stergeCurs/' + $(this).attr('id'))
					.then (data1 => {});
				
				alert ('Cursul a fost sters cu succes!');
				window.location = '/cursuri.html';
			});
		}
	});