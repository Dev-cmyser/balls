namespace $.$$ {
	const { url, linear_gradient } = $mol_style_func

	$mol_style_define($giper_balls_catalog, {
		background: {
			size: ['cover'],
			position: 'center',
			image: [[linear_gradient($mol_theme.spirit)], [url('giper/balls/logo/back.jpg')]],
		},

		Menu_title: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			gap: $mol_gap.block,
			justifyContent: 'space-between',
		},

		Lives_counter: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			gap: '0.25rem',
			padding: {
				top: '4px',
				bottom: '4px',
				left: '12px',
				right: '12px',
			},
			background: {
				color: $mol_theme.card,
			},
			border: {
				radius: '16px',
			},
		},

		Lives_icon: {
			fontSize: '1.2rem',
			color: $mol_theme.special,
		},

		Lives_count: {
			fontSize: '1.1rem',
			fontWeight: 'bold',
			margin: 0,
		},
	})
}
