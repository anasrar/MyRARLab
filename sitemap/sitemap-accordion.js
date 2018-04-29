function sitemap_accordion(a) {
	(function(w, d) {
		var b = {
		url: window.location.protocol + "//" + window.location.hostname,
		containerId: 'sitemap-accordion',
		showNew: 1,
		newText: ' - <span>Baru!</span>',
		onePanel: true,
		sortAlphabetically: {
			thePanel: true,
			theList: true
		},
		maxResults: 9999,
		jsonCallback: '_toc',
		delayLoading: 0
		};

		var cont = d.getElementById(b.containerId),
		head = d.getElementsByTagName('head')[0],
		category = [];

		w['gabungin'] = function(out) {
			out = out || {};
			for (var i = 1; i < arguments.length; i++) {
				if (!arguments[i]) continue;
				for (var key in arguments[i]) {
					if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
				}
			}
			return out;
		};

		b = gabungin({}, b, a);

		w[b.jsonCallback] = function(json) {
			var entry = json.feed.entry,
			cat = json.feed.category,
			title, link, label, skeleton = "";
			for (var h = 0, hen = cat.length; h < hen; ++h) {
				category.push(cat[h].term);
			}

			for (var f = 0, fen = entry.length; f < fen; ++f) {
				if (b.showNew || b.showNew > 0) {
					if (f < b.showNew + 1) {
						entry[f].title.$t += ' %new%';
					}
				}
			}

			entry = (b.sortAlphabetically.theList) ? entry.sort(function(a, b) {
				return (a.title.$t.localeCompare(b.title.$t));
			}) : entry;
			if (b.sortAlphabetically.thePanel) category.sort();
			for (var g = 0, gen = category.length; g < gen; ++g) {
				if(g == 0) {
					skeleton += '<div class="stmpit"><input type="'+ (b.onePanel ? 'radio' : 'checkbox') +'" id="acc-' + g + '" name="radioit" checked/>';
				} else {
					skeleton += '<div class="stmpit"><input type="'+ (b.onePanel ? 'radio' : 'checkbox') +'" id="acc-' + g + '" name="radioit" />';
				}
				skeleton += '<label '+ (g == 0 ? 'class="lbl-top"' : '') + ((gen - 1) == g ? 'class="lbl-bttm"' : '') +' for="acc-' + g + '">' + category[g] + '</label>';
				skeleton += '<div class="konten"><ul>';
				for (var i = 0, ien = entry.length; i < ien; ++i) {
					title = entry[i].title.$t;
					for (var j = 0, jen = entry[i].link.length; j < jen; ++j) {
						if (entry[i].link[j].rel == "alternate") {
							link = entry[i].link[j].href;
							break;
						}
					}
					for (var k = 0, ken = entry[i].category.length; k < ken; ++k) {
						if (category[g] == entry[i].category[k].term) {
							skeleton += '<li><a href="' + link + '">' + title.replace(/ \%new\%$/, "") + '</a>' + (title.match(/\%new\%/) ? ' ' + b.newText : '') + '</li>';
						}
					}
				}
				skeleton += '</ul></div></div>';
			}
			skeleton += '<a href="//anasrar.blogspot.com" style="display: none">Sitemap By Anas RAR</a>';
			cont.innerHTML = skeleton;
		};

		var s = d.createElement('script');
		s.src = b.url.replace(/\/$/, "") + '/feeds/posts/summary?alt=json-in-script&max-results=' + b.maxResults + '&callback=' + b.jsonCallback;

		if (b.delayLoading == "onload") {
			w.onload = function() {
				head.appendChild(s);
			};
		} else {
			w.setTimeout(function() {
				head.appendChild(s);
			}, b.delayLoading);
		}

	}(window, document));

};
