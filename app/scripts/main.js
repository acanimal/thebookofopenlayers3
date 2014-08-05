(function(){
	'use strict';

	// Show loading message

	var processChaptersSummary = function(data) {
		var chapter, sample, ci, si, elems='', imgsrc;

		for(ci=0; ci<data.length; ci++) {
			chapter = data[ci];

			for(si=0; si<chapter.samples.length; si++) {
				sample = chapter.samples[si];
				imgsrc = sample.thumbnail ? sample.thumbnail : 'holder.js/240x180/text:No Preview';

				elems += '<div class="sample col-xs-6 col-md-4 col-lg-3">' +
                    '<h5>'+ sample.title+'</h5>'+
                    '<img data-src="'+imgsrc+'" width="180" height="100">'+
                    '<p class="small">'+sample.description+'</p>'+
                    '<p class="small"><em>'+chapter.title+'</em></p>'+
					'</div>';
			}
		}

		var samplesContainer = $('#samples-container');
		samplesContainer.append(elems);
	};

	$.get('samples.json')
	.done(function(data) {
		// Hide message
		var message = $('#message');
		message.removeClass('alert-info').addClass('alert-success');
		message.hide('slow');
		$('#messageContainer').remove();

		// Process data
		processChaptersSummary(data);
	})
	.fail(function() {
		// Show error message
		var message = $('#message');
		message.removeClass('alert-info').addClass('alert-danger');
		message.html('Sorry there was an error loading the <code>samples.json</code> file !!!');
	});
})();
