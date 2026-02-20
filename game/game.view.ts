namespace $.$$ {
	export class $giper_balls_game extends $.$giper_balls_game {

		@ $mol_mem
		lives( next?: number ): number {
			return this.$.$mol_state_local.value( '$giper_balls:lives', next ) ?? 5
		}

		@ $mol_action
		spend_life() {
			const current = this.lives()
			if( current <= 0 ) return false
			this.lives( current - 1 )
			return true
		}
		
		@ $mol_mem
		rows() {
			return Array.from( { length: this.size() }, (_, row )=> this.Row( row ) )
		}
		
		@ $mol_mem_key
		cells( row: number ) {
			return Array.from( { length: this.size() }, (_, col )=> this.Cell([ row, col ]) )
		}
		
		@ $mol_mem_key
		cell_active( id: [ number, number ], next?: boolean ) {
			if( next === undefined ) return $mol_compare_deep( this.active_cell(), id )
			if( next ) this.active_cell( id )
			else this.active_cell( [] )
			return next
		}
		
		@ $mol_mem
		Score_pick() {
			return this.Score( this.score() )
		}
		
		select( event: Event ) {
			event.preventDefault()
		}
		
	}
}
