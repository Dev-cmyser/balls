namespace $.$$ {
	$mol_style_define($giper_balls_shop, {
		Info: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			gap: $mol_gap.text,
			padding: $mol_gap.block,
		},

		Info_icon: {
			fontSize: '2rem',
			color: $mol_theme.special,
		},

		Info_text: {
			fontSize: '1.5rem',
			fontWeight: 'bold',
			margin: 0,
		},

		Description: {
			textAlign: 'center',
			padding: {
				left: $mol_gap.block,
				right: $mol_gap.block,
				bottom: $mol_gap.block,
			},
			color: $mol_theme.shade,
		},

		Products: {
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
			gap: $mol_gap.block,
			padding: $mol_gap.block,
		},

		Product_1: {
			display: 'flex',
			flexDirection: 'column',
			gap: $mol_gap.text,
			padding: $mol_gap.block,
			border: {
				radius: '12px',
				width: '2px',
				style: 'solid',
				color: $mol_theme.line,
			},
			background: {
				color: $mol_theme.back,
			},
		},

		Product_1_title: {
			fontSize: '1.2rem',
			fontWeight: 'bold',
			textAlign: 'center',
			margin: 0,
		},

		Product_1_price: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'baseline',
			justifyContent: 'center',
			gap: '0.25rem',
		},

		Price_1_value: {
			fontSize: '2.5rem',
			fontWeight: 'bold',
			margin: 0,
		},

		Price_1_currency: {
			fontSize: '1.5rem',
			margin: 0,
		},

		Product_1_note: {
			textAlign: 'center',
			fontSize: '0.9rem',
			color: $mol_theme.shade,
			margin: 0,
		},

		Product_3: {
			display: 'flex',
			flexDirection: 'column',
			gap: $mol_gap.text,
			padding: $mol_gap.block,
			border: {
				radius: '12px',
				width: '2px',
				style: 'solid',
				color: $mol_theme.current,
			},
			background: {
				color: $mol_theme.back,
			},
			position: 'relative',
		},

		Product_3_badge: {
			position: 'absolute',
			top: '-10px',
			right: '10px',
			padding: {
				top: '4px',
				bottom: '4px',
				left: '12px',
				right: '12px',
			},
			background: {
				color: $mol_theme.current,
			},
			color: $mol_theme.text,
			fontSize: '0.8rem',
			fontWeight: 'bold',
			border: {
				radius: '12px',
			},
			margin: 0,
		},

		Product_3_title: {
			fontSize: '1.2rem',
			fontWeight: 'bold',
			textAlign: 'center',
			margin: 0,
		},

		Product_3_price: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'baseline',
			justifyContent: 'center',
			gap: '0.25rem',
		},

		Price_3_value: {
			fontSize: '2.5rem',
			fontWeight: 'bold',
			margin: 0,
		},

		Price_3_currency: {
			fontSize: '1.5rem',
			margin: 0,
		},

		Product_3_note: {
			textAlign: 'center',
			fontSize: '0.9rem',
			color: $mol_theme.shade,
			margin: 0,
		},

		Product_5: {
			display: 'flex',
			flexDirection: 'column',
			gap: $mol_gap.text,
			padding: $mol_gap.block,
			border: {
				radius: '12px',
				width: '3px',
				style: 'solid',
				color: $mol_theme.special,
			},
			background: {
				color: $mol_theme.back,
			},
			position: 'relative',
			boxShadow: `0 4px 12px ${$mol_theme.shade}`,
		},

		Product_5_badge: {
			position: 'absolute',
			top: '-10px',
			left: '50%',
			transform: 'translateX(-50%)',
			padding: {
				top: '4px',
				bottom: '4px',
				left: '16px',
				right: '16px',
			},
			background: {
				color: $mol_theme.special,
			},
			color: $mol_theme.text,
			fontSize: '0.85rem',
			fontWeight: 'bold',
			border: {
				radius: '12px',
			},
			margin: 0,
		},

		Product_5_title: {
			fontSize: '1.3rem',
			fontWeight: 'bold',
			textAlign: 'center',
			margin: 0,
		},

		Product_5_subtitle: {
			textAlign: 'center',
			fontSize: '0.9rem',
			color: $mol_theme.shade,
			margin: 0,
		},

		Product_5_price: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'baseline',
			justifyContent: 'center',
			gap: '0.25rem',
		},

		Price_5_value: {
			fontSize: '3rem',
			fontWeight: 'bold',
			margin: 0,
			color: $mol_theme.special,
		},

		Price_5_currency: {
			fontSize: '1.8rem',
			margin: 0,
			color: $mol_theme.special,
		},

		Product_5_note: {
			textAlign: 'center',
			fontSize: '0.9rem',
			color: $mol_theme.shade,
			margin: 0,
		},

		Footer: {
			textAlign: 'center',
			fontSize: '0.85rem',
			padding: $mol_gap.block,
			color: $mol_theme.shade,
		},
	})
}
