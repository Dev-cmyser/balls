namespace $.$$ {

	export class $giper_balls_catalog extends $.$giper_balls_catalog {

		@ $mol_mem
		lives( next?: number ): number {
			return this.$.$mol_state_local.value( '$giper_balls:lives', next ) ?? 5
		}

		lives_text() {
			return String( this.lives() )
		}

	}

}
