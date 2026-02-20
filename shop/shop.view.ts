namespace $.$$ {

	const WORKER_URL = 'https://giper-balls-payments.cmyser-fast-i.workers.dev'

	const PRODUCTS = {
		lives_1: { label: '1 жизнь', price: '200 ₽' },
		lives_3: { label: '3 жизни', price: '400 ₽' },
		lives_5: { label: '5 жизней', price: '500 ₽' },
	} as Record<string, { label: string; price: string }>

	export class $giper_balls_shop extends $.$giper_balls_shop {

		@ $mol_mem
		selected_product( next?: string | null ) {
			return next ?? null
		}

		checkout_info_content() {
			const id = this.selected_product()
			if( !id ) return []
			const product = PRODUCTS[ id ]
			if( !product ) return []
			return [ `${ product.label } — ${ product.price }` ]
		}

		@ $mol_action
		buy_product( product_id: string ) {

			this.selected_product( product_id )

			const response = this.$.$mol_fetch.json(
				`${ WORKER_URL }/create-payment`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ product_id }),
				},
			) as { payment_id: string; confirmation_token: string; lives: number }

			this.$.$mol_state_local.value( '$giper_balls:pending_payment', {
				payment_id: response.payment_id,
				lives: response.lives,
			})

			setTimeout( () => {
				const checkout = new (this.$.$mol_dom_context as any).YooMoneyCheckoutWidget({
					confirmation_token: response.confirmation_token,
					error_callback: ( error: any ) => {
						console.error( 'YooKassa error', error )
					},
				})
				checkout.render( 'yookassa-checkout' )
			}, 100 )
		}

		@ $mol_action
		buy_1() {
			this.buy_product( 'lives_1' )
		}

		@ $mol_action
		buy_3() {
			this.buy_product( 'lives_3' )
		}

		@ $mol_action
		buy_5() {
			this.buy_product( 'lives_5' )
		}

	}

}
