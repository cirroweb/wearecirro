;(function( window ) {

	window.cirro = window.cirro || {};

	window.cirro.siteData = {
		title: 'Fuel Cafe',
		templates: [
			{
				name: 'menus',
				context: {
					test: "Testing",
					menus: [
						{
							name: 'Breakfast',
							dishes:[
								{
									name: 'Scrambled Eggs',
									description: 'These eggs be scrambled',
									//price: 3.95
								},
								{
									name: 'Toast',
									description: 'Yeah it comes with jelly',
									//price: 1.70
								},
								{
									name: 'Pancakes',
									description: 'Yup, flapjack shortstack',
									price: 4.95
								}
							]
						},
						{
							name: 'Lunch',
							dishes: [
								{
									name: 'Chicken Salad',
									description: 'The most chicken of all the salads',
									price: 5.50
								},
								{
									name: 'Reuben',
									description: 'Mmmm thousand island dressing',
									price: 6.00
								},
								{
									name: 'Asian Stuff',
									description: 'Well, you know, some of that Asian stuff',
									price: 14.99
								}
							],
						},
						{
							name: 'Dinner',
							dishes: [
								{
									name: 'Steak',
									description: 'As in "I\'ll have the steak"',
									price: 42.00
								},
								{
									name: 'Tofu',
									description: 'Deep fried tofu with asian sauce',
									price: 24.20
								},
								{
									name: 'Dinner Salad',
									description: 'Yes this is an entire dish',
									price: 4.20
								}
							]
						}
					]
				}
			}
		],
	};

}( window ));