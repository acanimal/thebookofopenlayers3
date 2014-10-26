(function(){
	'use strict';

	var SAMPLES_FILE = 'samples.json';

	// Loads chapter summary data and create elements
	var loadChaptersSummary = function(data) {
		var chapter, sample, ci, si, el, elems='', imgsrc;

		for(ci=0; ci<data.length; ci++) {
			chapter = data[ci];

			elems += '<div class="row">';
			elems += '<h2>' + chapter.title + '</h2><hr/>';

			for(si=0; si<chapter.samples.length; si++) {
				sample = chapter.samples[si];
				imgsrc = sample.thumbnail ? 'images/'+sample.thumbnail : 'images/nopreview.svg';

				el = '<div class="col-sm-6 col-md-4 col-lg-3 sample">' +
                    '	<h5>'+ sample.title+'</h5>'+
                    '	<a href="'+ sample.url +'">'+
                    '	<img src="'+ imgsrc +'" width="240" height="180">'+
                    '	</a>'+
                    '	<div class="container">'+
                    '   <div class="row">'+
                    '	<div class="small" style="width: 240px;">'+ sample.description +'</div>'+
                    '	<div class="small" style="width: 240px;"><strong><em>Chapter: '+ chapter.title +'</em></strong></div>'+
                    '	</div>'+
                    '	</div>'+
					'</div>';

				elems += el;
			}

			elems += '</div>';
		}

		var samplesContainer = $('#samples-container');
		samplesContainer.append(elems);
	};

	// Load specified file and invoke callback if success
	var loadFile = function(url, callback) {
		$.get(url)
		.done(function(data) {
			// Hide message
			var message = $('#message');
			message.removeClass('alert-info').addClass('alert-success');
			message.hide('slow');
			$('#messageContainer').remove();

			// Process data
			callback.call(null, data);
		})
		.fail(function() {
			// Show error message
			var message = $('#message');
			message.removeClass('alert-info').addClass('alert-danger');
			message.html('Sorry there was an error loading the <code>'+url+'</code> file !!!');
		});
	};
	
	loadFile(SAMPLES_FILE, loadChaptersSummary);
	
})();
