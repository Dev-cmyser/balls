namespace $.$$ {
	
	type Snapshot = Readonly<{
		score: number
		score_max: number
		kinds: readonly number[]
	}>
	
	export class $giper_balls_crowd extends $.$giper_balls_crowd {
		
		@ $mol_mem
		snapshot( next?: Snapshot ): Snapshot {
			return this.$.$mol_state_local.value( '$giper_balls_crowd:snapshot', next ) ?? { score: 0, score_max: 0, kinds: [] }
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
			
			const nears = [ [ row-1, col ], [ row, col-1 ], [ row, col+1 ], [ row+1, col ] ]
			
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
			
			if( this.ball_kind( id ) <= 0 ) return
			const kind = this.ball_kind( id )
			const size = this.size()
			const all = new Set< number >()
			
			let { score, score_max, kinds: init } = this.snapshot()
			const kinds = [ ... init ]
			
			const collect = ( row: number, col: number )=> {
				
				const pos = row * size + col
				if( all.has( pos ) ) return
				
				const k = kinds[ pos ]
				if( k !== kind ) return
				
				all.add( pos )
				
				if( row > 0 ) collect( row - 1, col )
				if( col > 0 ) collect( row, col - 1 )
				if( row < size-1 ) collect( row + 1, col )
				if( col < size-1 ) collect( row, col + 1 )
				
			}
			collect( ... id )
			
			if( all.size < 2 ) return
			
			score += 2 ** all.size - 3
			if( score > score_max ) score_max = score
			
			for( const pos of all ) kinds[ pos ] = 0
			this.snapshot({ score, score_max, kinds })
			
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
			const score = this.score().toLocaleString('en').replace( /,/g, '_' )
			const max = this.score_max().toLocaleString('en').replace( /,/g, '_' )
			if( score === max ) return `${score}!`
			else return `${score} / ${max}`
		}
		
		@ $mol_mem
		life() {
			
			this.$.$mol_state_time.now( 250 )
			
			const vars = this.colors().length - 1
			const size = this.size()
			const half = Math.floor( size / 2 )
			
			const { score, score_max, kinds: init } = this.snapshot()
			const kinds = [ ... init ]
			
			const move = ( from_row: number, from_col: number, to_row: number, to_col: number )=> {
				
				const from = from_row * size + from_col
				const to = to_row * size + to_col
				
				if( kinds[ from ] <= 0 ) return
				if( kinds[ to ] > 0 ) return
				
				kinds[ to ] = kinds[ from ]
				kinds[ from ] = 0
			}
			
			for( let row = half - 2; row >= 0; --row ) {
				for( let col = 0; col < size; ++ col ) {
					move( row, col, row+1, col )
				}
			}
			
			for( let row = half + 1; row < size; ++row ) {
				for( let col = 0; col < size; ++ col ) {
					move( row, col, row-1, col )
				}
			}
			
			for( let col = half - 2; col >= 0; --col ) {
				for( let row = 0; row < size; ++ row ) {
					move( row, col, row, col+1 )
				}
			}
			
			for( let col = half + 1; col < size; ++col ) {
				for( let row = 0; row < size; ++ row ) {
					move( row, col, row, col-1 )
				}
			}
			
			const add = ( row: number, col: number )=> {
				
				const coord = row * size + col
				let kind = kinds[ coord ]
				if( kind > 0 ) return
					
				kind = Math.ceil( Math.random() * vars )
				kinds[ coord ] = kind
				
			}
			
			for( let row = 0; row < size; ++ row ) {
				add( row, 0 )
				add( row, size - 1 )
			}
			
			for( let col = 0; col < size; ++ col ) {
				add( 0, col )
				add( size - 1, col )
			}
			
			this.snapshot({ score, score_max, kinds })
			
		}
		
		@ $mol_action
		restart() {
			
			const { score_max } = this.snapshot()
			
			this.snapshot({
				score: 0,
				score_max,
				kinds: [],
			})
			
		}
		
	}
	
}
