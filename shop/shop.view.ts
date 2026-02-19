namespace $.$$ {
	
	export class $giper_balls_shop extends $.$giper_balls_shop {
		
		@ $mol_action
		buy_1() {
			// TODO: Интеграция с ЮKassa для покупки 1 жизни за 200₽
			this.$.$mol_log3_rise({
				place: this,
				message: 'Покупка 1 жизни',
			})
		}
		
		@ $mol_action
		buy_3() {
			// TODO: Интеграция с ЮKassa для покупки 3 жизней за 400₽
			this.$.$mol_log3_rise({
				place: this,
				message: 'Покупка 3 жизней',
			})
		}
		
		@ $mol_action
		buy_5() {
			// TODO: Интеграция с ЮKassa для покупки 5 жизней за 500₽
			this.$.$mol_log3_rise({
				place: this,
				message: 'Покупка 5 жизней',
			})
		}
		
	}
	
}
