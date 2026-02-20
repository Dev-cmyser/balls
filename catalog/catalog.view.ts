namespace $.$$ {

	const MAX_LIVES = 5
	const REGEN_MS = 30 * 60 * 1000

	export class $giper_balls_catalog extends $.$giper_balls_catalog {

		@ $mol_mem
		lives( next?: number ): number {
			if( next !== undefined ) {
				this.$.$mol_state_local.value( '$giper_balls:lives_lost_at', Date.now() )
			}
			return this.$.$mol_state_local.value( '$giper_balls:lives', next ) ?? MAX_LIVES
		}

		@ $mol_mem
		lives_regen() {
			const current = this.lives()
			if( current >= MAX_LIVES ) return

			const lost_at = ( this.$.$mol_state_local.value( '$giper_balls:lives_lost_at' ) as number | null ) ?? Date.now()
			const elapsed = Date.now() - lost_at
			const gained = Math.floor( elapsed / REGEN_MS )

			if( gained > 0 ) {
				const new_lives = Math.min( current + gained, MAX_LIVES )
				this.lives( new_lives )
			}

			this.$.$mol_state_time.now( REGEN_MS )
		}

		lives_text() {
			return String( this.lives() )
		}

	}

}
