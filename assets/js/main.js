/*
	TXT by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '361px',   '736px'  ],
			xsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

		var $mainButton = $('#mainButton');
				

		if ($mainButton.length > 0 || $nav.length > 0) {

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$mainButton.addClass('alt');
						},
						leave: function() {
							$mainButton.addClass('alt');
						},
					});

				

			// Links.
				var $mainButton_a = $mainButton.find('a');

				$mainButton_a 
					.scrolly({
						speed: 1000,
						offset: function() { return $mainButton.height() - 150 ; }
					})
					.on('click', function() {

						var $this = $(this);

						// External link? Bail.
							if ($this.attr('href').charAt(0) != '#')
								return;

						// Deactivate all links.
							$mainButton_a
								.removeClass('active')
								.removeClass('active-locked');

						// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

						// No section for this link? Bail.
							if ($section.length < 1)
								return;

						// Scrollex.
							$section.scrollex({
								mode: 'middle',
								initialize: function() {

									// Deactivate section.
										if (browser.canUse('transition'))
											$section.addClass('inactive');
								},
								enter: function() {
									// Activate section.
										$section.removeClass('inactive');
									// No locked links? Deactivate all links and activate this section's one.
										if ($mainButton_a.filter('.active-locked').length == 0) {

											$mainButton_a.removeClass('active');
											$this.addClass('active');

										} 
									// Otherwise, if this section's link is the one that's locked, unlock it.
										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');
								}
							});
					});
				}

				$('.scrolly').scrolly({
					speed: 1000
				});

})(jQuery);