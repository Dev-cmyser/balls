interface Env {
	YOOKASSA_SHOP_ID: string
	YOOKASSA_SECRET_KEY: string
	ALLOWED_ORIGIN: string
}

const PRODUCTS: Record<string, { amount: string; currency: string; description: string; lives: number }> = {
	lives_1: { amount: '200.00', currency: 'RUB', description: '1 жизнь — Giper Balls', lives: 1 },
	lives_3: { amount: '400.00', currency: 'RUB', description: '3 жизни — Giper Balls', lives: 3 },
	lives_5: { amount: '500.00', currency: 'RUB', description: '5 жизней — Giper Balls', lives: 5 },
}

const ALLOWED_ORIGINS = [
	'https://dev-cmyser.github.io',
	'http://localhost:9080',
]

function corsHeaders( request: Request ): HeadersInit {
	const origin = request.headers.get( 'Origin' ) ?? ''
	const allowed = ALLOWED_ORIGINS.includes( origin ) ? origin : ALLOWED_ORIGINS[0]
	return {
		'Access-Control-Allow-Origin': allowed,
		'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
	}
}

function jsonResponse( data: unknown, request: Request, status = 200 ) {
	return new Response( JSON.stringify( data ), {
		status,
		headers: { ...corsHeaders( request ), 'Content-Type': 'application/json' },
	})
}

async function handleCreatePayment( request: Request, env: Env ) {

	const { product_id } = await request.json<{ product_id: string }>()
	const product = PRODUCTS[ product_id ]

	if( !product ) {
		return jsonResponse( { error: 'Unknown product' }, request, 400 )
	}

	const auth = btoa( `${ env.YOOKASSA_SHOP_ID }:${ env.YOOKASSA_SECRET_KEY }` )

	const yooResponse = await fetch( 'https://api.yookassa.ru/v3/payments', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Basic ${ auth }`,
			'Idempotence-Key': crypto.randomUUID(),
		},
		body: JSON.stringify({
			amount: { value: product.amount, currency: product.currency },
			confirmation: { type: 'embedded' },
			capture: true,
			description: product.description,
			metadata: { product_id },
		}),
	})

	const data = await yooResponse.json<any>()

	if( !yooResponse.ok ) {
		return jsonResponse( { error: 'Payment creation failed', details: data }, request, 500 )
	}

	return jsonResponse({
		payment_id: data.id,
		confirmation_token: data.confirmation.confirmation_token,
		lives: product.lives,
	}, request )
}

async function handleCheckPayment( request: Request, env: Env ) {

	const url = new URL( request.url )
	const paymentId = url.searchParams.get( 'id' )

	if( !paymentId ) {
		return jsonResponse( { error: 'Missing payment id' }, request, 400 )
	}

	const auth = btoa( `${ env.YOOKASSA_SHOP_ID }:${ env.YOOKASSA_SECRET_KEY }` )

	const yooResponse = await fetch( `https://api.yookassa.ru/v3/payments/${ paymentId }`, {
		headers: { 'Authorization': `Basic ${ auth }` },
	})

	const data = await yooResponse.json<any>()
	const product = PRODUCTS[ data.metadata?.product_id ]

	return jsonResponse({
		status: data.status,
		paid: data.paid,
		lives: product?.lives ?? 0,
	}, request )
}

export default {
	async fetch( request: Request, env: Env ): Promise<Response> {

		if( request.method === 'OPTIONS' ) {
			return new Response( null, { status: 204, headers: corsHeaders( request ) } )
		}

		const url = new URL( request.url )

		if( url.pathname === '/create-payment' && request.method === 'POST' ) {
			return handleCreatePayment( request, env )
		}

		if( url.pathname === '/check-payment' && request.method === 'GET' ) {
			return handleCheckPayment( request, env )
		}

		return new Response( 'Not Found', { status: 404, headers: corsHeaders( request ) } )
	},
}
