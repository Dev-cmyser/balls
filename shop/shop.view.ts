namespace $.$$ {

	const WORKER_URL = 'https://giper-balls-payments.cmyser-fast-i.workers.dev'

	export class $giper_balls_shop extends $.$giper_balls_shop {

		@ $mol_action
		buy_product( product_id: string ) {

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

			const checkout = new (this.$.$mol_dom_context as any).YooMoneyCheckoutWidget({
				confirmation_token: response.confirmation_token,
				error_callback: ( error: any ) => {
					console.error( 'YooKassa error', error )
				},
			})

			checkout.render( 'yookassa-checkout' )
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
