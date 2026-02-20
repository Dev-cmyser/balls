namespace $.$$ {
	
	type Snapshot = Readonly<{
		score: number
		score_max: number
		kinds: readonly number[]
	}>
	
	export class $giper_balls_lines extends $.$giper_balls_lines {
		
		@ $mol_mem
		snapshot( next?: Snapshot ): Snapshot {
			return this.$.$mol_state_local.value( '$giper_balls_lines:snapshot', next ) ?? { score: 0, score_max: 0, kinds: [] }
		}
		
		
		@ $mol_mem_key
		ball_kind( id: [ number, number ], next?: number ) {
			
			if( next !== undefined ) {
				const snapshot = $mol_mutable( this.snapshot() )
				snapshot.kinds[ id[0] * this.size() + id[1] ]( ()=> next )
				this.snapshot( snapshot() )
			}
			
			return this.snapshot().kinds[ id[0] * this.size() + id[1] ] ?? 0
			
		}
		
		@ $mol_mem_key
		ball_mood( [ row, col ]: [ number, number ] ) {
			
			const kind = this.ball_kind([ row, col ])
			if( kind === 0 ) return ''
			if( kind < 0 ) return '..'
			
			let mood = 0
			const size = this.size()
			
			const nears = [
				[ row-1, col-1 ], [ row-1, col ], [ row-1, col+1 ],
				[ row, col-1 ],                   [ row, col+1 ],
				[ row+1, col-1 ], [ row+1, col ], [ row+1, col+1 ],
			]
			
			for( const [ r, c ] of nears ) {
				
				if( r < 0 ) continue
				if( c < 0 ) continue
				if( r >= size ) continue
				if( c >= size ) continue
				
				if( Math.abs( this.ball_kind([ r, c ]) ) !== kind ) continue
				++ mood
				
			}
			
			return this.mood_smiles()[ mood ]
		}
		
		@ $mol_action
		ball_grab( id: [ number, number ], event: PointerEvent ) {
			;( event.target! as Element ).releasePointerCapture(event.pointerId)
			if( this.active_cell() ) this.ball_drop( this.active_cell() as any, event )
			if( this.ball_kind( id ) <= 0 ) return
			this.cell_active( id, ! this.cell_active( id ) )
			this.cell_start( id )
		}
		
		@ $mol_action
		ball_drop( id: [ number, number ], event: PointerEvent ) {
			
			const active = this.active_cell() as [ number, number ]
			if( !active.length ) return
			
			this.active_cell([])
			if( $mol_compare_deep( this.cell_start(), id ) ) return
			
			const win = this.check_lines( id ) || this.check_lines( active )
			if( !win ) this.add_new( null )
			
		}
		
		@ $mol_action
		ball_move( id: [ number, number ], event: PointerEvent ) {
			
			event.preventDefault()
			if( !event.buttons ) return
			
			const active = this.active_cell() as [ number, number ]
			if( !active.length ) return
			if( this.ball_kind( id ) > 0 ) return
			if( !$giper_balls_near( active, id ) ) return
			
			const kind = this.ball_kind( active )
			this.ball_kind( active, 0 )
			this.ball_kind( id, kind )
			this.active_cell( id )
			
		}
		
		@ $mol_mem
		score( next?: number ){
			
			const { score, score_max, kinds } = this.snapshot()
			if( next === undefined ) return score
			
			this.snapshot({
				score: next,
				score_max: Math.max( next, score_max ),
				kinds: kinds,
			})
			
			return next
		}
		
		score_max() {
			return this.snapshot().score_max
		}
		
		@ $mol_mem
		score_text() {
			const score = this.score()
			const max = this.score_max()
			if( score === max ) return `${score}!`
			else return `${score} / ${max}`
		}
		
		@ $mol_action
		check_lines( id: [ number, number ] ) {
			
			const size = this.size()
			const edge = ( row: number, col: number )=> row < 0 || col < 0 || row >= size || col >= size || this.ball_kind([ row, col ]) !== kind
			
			const kind = this.ball_kind( id )
			if( kind <= 0 ) return false
			
			let total = 0
			
			const walk = ( row_step: number, col_step: number )=> {
				
				let count = -1
				let [ row, col ] = id
				
				do {
					++ count
					row += row_step
					col += col_step
				} while( !edge( row, col ) )
				
				;[ row, col ] = id
				do {
					++ count
					row -= row_step
					col -= col_step
				} while( !edge( row, col ) )
				
				if( count < 5 ) return
				
				for( let  i = 0; i < count; ++ i ) {
					row += row_step
					col += col_step
					this.ball_kind( [ row, col ], 0 )
				}
				
				total += count
				
			}
			
			walk( +0, +1 )
			walk( +1, +1 )
			walk( +1, +0 )
			walk( +1, -1 )
			
			if( !total  ) return false
			
			total -= 5
			this.score( this.score() + 2 ** total )
			
			return true
		}
		
		@ $mol_mem
		add_new( next?: null ) {
			
			if( next === undefined && this.snapshot().kinds.length ) return
			
			const vars = this.colors().length - 1
			const size = this.size()
			
			const snapshot = this.snapshot().kinds
			const free = new Set<[ number, number ]>()
			const plan = [] as [ number, number ][]
			
			for( let row = 0; row < size; ++ row ) {
				for( let col = 0; col < size; ++ col ) {
					
					const kind = snapshot[ row * size + col ]
					if( kind > 0 ) continue
					
					if( kind < 0 ) plan.push([ row, col ])
					else free.add([ row, col ])
					
				}
			}
			
			while( free.size && plan.length < 3 ) {
				const id = $mol_array_lottery([ ... free ])
				free.delete( id )
				plan.push( id )
			}
			
			for( const id of plan ) {
				const kind = Math.abs( this.ball_kind( id ) ) || Math.ceil( Math.random() * vars )
				this.ball_kind( id, kind )
			}
			
			for( const id of plan ) this.check_lines( id )
			
			for( let i = 0; free.size && i < 3; ++i ) {
				
				const id = $mol_array_lottery([ ... free ])
				free.delete( id )
				
				const kind = Math.ceil( Math.random() * vars )
				this.ball_kind( id, - kind )
				
			}
			
			return
		}
		
		@ $mol_action
		restart() {

			if( !this.spend_life() ) return

			const { score_max } = this.snapshot()

			this.snapshot({
				score: 0,
				score_max,
				kinds: [],
			})

			this.active_cell([])

			this.add_new( null )

		}
		
	}
	
}
