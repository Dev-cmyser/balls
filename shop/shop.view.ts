namespace $.$$ {

	declare class YooMoneyCheckoutWidget {
		constructor( config: {
			confirmation_token: string
			return_url?: string
			error_callback: ( error: any ) => void
			customization?: { modal?: boolean }
		} )
		render( containerId: string ): { on: ( event: string, callback: () => void ) => void }
		destroy(): void
	}

	const WORKER_URL = 'https://giper-balls-payments.cmyser-fast-i.workers.dev'

	export class $giper_balls_shop extends $.$giper_balls_shop {

		@ $mol_mem
		active_payment( next?: { payment_id: string; lives: number } | null ) {
			return next ?? null
		}

		widget_overlay_content() {
			if( !this.active_payment() ) return []
			return [ this.Widget_container() ]
		}

		@ $mol_mem
		Widget_container() {
			const el = this.$.$mol_dom_context.document.createElement( 'div' )
			el.id = 'yookassa-widget-container'
			const view = new this.$.$mol_view()
			view.dom_node = ()=> el
			return view
		}

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

			this.active_payment({
				payment_id: response.payment_id,
				lives: response.lives,
			})

			setTimeout( ()=> this.render_widget( response.confirmation_token ), 100 )
		}

		render_widget( token: string ) {

			const widget = new YooMoneyCheckoutWidget({
				confirmation_token: token,
				error_callback: ( error ) => {
					console.error( 'YooKassa widget error', error )
					this.active_payment( null )
				},
			})

			const checkout = widget.render( 'yookassa-widget-container' )

			checkout.on( 'complete', () => {
				widget.destroy()
				this.verify_payment()
			})
		}

		@ $mol_action
		verify_payment() {

			const payment = this.active_payment()
			if( !payment ) return

			const result = this.$.$mol_fetch.json(
				`${ WORKER_URL }/check-payment?id=${ payment.payment_id }`,
			) as { status: string; paid: boolean; lives: number }

			if( result.status === 'succeeded' && result.paid ) {
				const current = ( this.$.$mol_state_local.value( '$giper_balls:lives' ) as number | null ) ?? 5
				this.$.$mol_state_local.value( '$giper_balls:lives', current + result.lives )
			}

			this.active_payment( null )
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
