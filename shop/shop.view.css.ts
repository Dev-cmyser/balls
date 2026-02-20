namespace $.$$ {
	const { calc } = $mol_style_func

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
			maxWidth: '900px',
			margin: {
				left: 'auto',
				right: 'auto',
			},
		},

		Product_1: {
			display: 'flex',
			flexDirection: 'column',
			padding: $mol_gap.block,
			border: {
				radius: '8px',
				width: '1px',
				style: 'solid',
				color: $mol_theme.line,
			},
			background: {
				color: $mol_theme.back,
			},
		},

		Product_1_content: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			gap: $mol_gap.text,
			margin: { bottom: $mol_gap.block },
		},

		Product_1_title: {
			fontSize: '1rem',
			fontWeight: 'normal',
			textAlign: 'center',
			margin: 0,
			color: $mol_theme.shade,
		},

		Product_1_price: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'baseline',
			gap: '4px',
		},

		Price_1_value: {
			fontSize: '3rem',
			fontWeight: 'bold',
			margin: 0,
			lineHeight: '1',
		},

		Price_1_currency: {
			fontSize: '1.5rem',
			margin: 0,
		},

		Product_1_note: {
			textAlign: 'center',
			fontSize: '0.85rem',
			color: $mol_theme.shade,
			margin: 0,
		},

		Buy_1: {
			width: '100%',
		},

		Product_3: {
			display: 'flex',
			flexDirection: 'column',
			padding: $mol_gap.block,
			border: {
				radius: '8px',
				width: '2px',
				style: 'solid',
				color: $mol_theme.current,
			},
			background: {
				color: $mol_theme.back,
			},
		},

		Product_3_content: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			gap: $mol_gap.text,
			margin: {
				bottom: $mol_gap.block,
			},
		},

		Product_3_badge: {
			padding: {
				top: '2px',
				bottom: '2px',
				left: '8px',
				right: '8px',
			},
			background: {
				color: $mol_theme.current,
			},
			color: $mol_theme.back,
			fontSize: '0.7rem',
			fontWeight: 'bold',
			border: {
				radius: '3px',
			},
			margin: 0,
		},

		Product_3_title: {
			fontSize: '1rem',
			fontWeight: 'normal',
			textAlign: 'center',
			margin: 0,
			color: $mol_theme.shade,
		},

		Product_3_price: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'baseline',
			gap: '4px',
		},

		Price_3_value: {
			fontSize: '3rem',
			fontWeight: 'bold',
			margin: 0,
			lineHeight: '1',
		},

		Price_3_currency: {
			fontSize: '1.5rem',
			margin: 0,
		},

		Product_3_note: {
			textAlign: 'center',
			fontSize: '0.85rem',
			color: $mol_theme.shade,
			margin: 0,
		},

		Buy_3: {
			width: '100%',
		},

		Product_5: {
			display: 'flex',
			flexDirection: 'column',
			padding: $mol_gap.block,
			border: {
				radius: '8px',
				width: '2px',
				style: 'solid',
				color: $mol_theme.special,
			},
			background: {
				color: $mol_theme.back,
			},
		},

		Product_5_content: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			gap: $mol_gap.text,
			margin: { bottom: $mol_gap.block },
		},

		Product_5_badge: {
			padding: {
				top: '3px',
				bottom: '3px',
				left: '10px',
				right: '10px',
			},
			background: {
				color: $mol_theme.special,
			},
			color: $mol_theme.back,
			fontSize: '0.75rem',
			fontWeight: 'bold',
			border: {
				radius: '3px',
			},
			margin: 0,
		},

		Product_5_title: {
			fontSize: '1.1rem',
			fontWeight: 'bold',
			textAlign: 'center',
			margin: 0,
		},

		Product_5_subtitle: {
			textAlign: 'center',
			fontSize: '0.85rem',
			color: $mol_theme.shade,
			margin: 0,
		},

		Product_5_price: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'baseline',
			gap: '4px',
		},

		Price_5_value: {
			fontSize: '3.5rem',
			fontWeight: 'bold',
			margin: 0,
			lineHeight: '1',
			color: $mol_theme.special,
		},

		Price_5_currency: {
			fontSize: '1.8rem',
			margin: 0,
			color: $mol_theme.special,
		},

		Product_5_note: {
			textAlign: 'center',
			fontSize: '0.85rem',
			color: $mol_theme.shade,
			margin: 0,
		},

		Buy_5: {
			width: '100%',
		},

		Widget_overlay: {
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			zIndex: 1000,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			background: {
				color: 'rgba(0,0,0,0.6)',
			},
			padding: $mol_gap.block,
		},

		Footer: {
			textAlign: 'center',
			fontSize: '0.85rem',
			padding: $mol_gap.block,
			color: $mol_theme.shade,
		},
	})
}
