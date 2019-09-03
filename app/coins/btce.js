var Decimal = require("decimal.js");
Decimal8 = Decimal.clone({ precision:8, rounding:8 });

var currencyUnits = [
	{
		type:"native",
		name:"BTCE",
		multiplier:1,
		default:true,
		values:["", "btcee", "BTCEE"],
		decimalPlaces:8
	},
	{
		type:"native",
		name:"mBTCE",
		multiplier:1000,
		values:["mbtce"],
		decimalPlaces:5
	},
	{
		type:"native",
		name:"bitce",
		multiplier:1000000,
		values:["bitce"],
		decimalPlaces:2
	},
	{
		type:"native",
		name:"btceshi",
		multiplier:100000000,
		values:["btceshi", "bshi"],
		decimalPlaces:0
	},
	{
		type:"exchanged",
		name:"USD",
		multiplier:"usd",
		values:["usd"],
		decimalPlaces:2,
		symbol:"$"
	},
	{
		type:"exchanged",
		name:"EUR",
		multiplier:"eur",
		values:["eur"],
		decimalPlaces:2,
		symbol:"€"
	},
];

module.exports = {
	name:"BitcoinECC",
	ticker:"BTCE",
	logoUrl:"/img/logo/btce.svg",
	siteTitle:"BitcoinECC Explorer",
	nodeTitle:"BitcoinECC Full Node",
	demoSiteUrl: "https://btc.chaintools.io",

	maxBlockWeight: 4000000,
	targetBlockTimeSeconds: 600,
	currencyUnits:currencyUnits,
	currencyUnitsByName:{"BTCE":currencyUnits[0], "mBTCE":currencyUnits[1], "bitce":currencyUnits[2], "btceshi":currencyUnits[3]},
	baseCurrencyUnit:currencyUnits[3],
	defaultCurrencyUnit:currencyUnits[0],
	feeSatoshiPerByteBucketMaxima: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50, 75, 100, 150],

	//all the same GenesisBlockHash
	//amount : 50 btce, 499900000 satoshi, 1DCBDE60
	//amount(hex) : 60DECB1D00000000
	//https://bitcoin.stackexchange.com/questions/57942/in-manual-raw-tx-creation-how-do-you-specify-the-amount-of-the-bitcoin-to-be-se
	/*

	01000000 - version
	01 - #of inputs
	0000000000000000000000000000000000000000000000000000000000000000 - previous hash
	ffffffff - previous tx index
	04ffff001d0104475468652054696d65732032342f4d61702f323031392054686572657361204d6179206162616e646f6e7320706c616e20666f7220766f7465206f6e204272657869742062696c6c scriptsig
	4294967295 - sequence
	01 - #of output
	60DECB1D00000000 - output amount
	4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac p2pkh scriptpubkey
	00000000 - locktime

	*/

	genesisBlockHash: "b77abb03a0a8a4f23a7380bf655af8312c4769c64fcbf335a08d598b13368f22",
	genesisCoinbaseTransactionId: "15d2f927fe3eafe88ce0b4ccf267727ed306295051339a16e0b95067e65bead8",
	genesisCoinbaseTransaction: {
		"hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff04ffff001d0104475468652054696d65732032342f4d61702f323031392054686572657361204d6179206162616e646f6e7320706c616e20666f7220766f7465206f6e204272657869742062696c6c42949672950160DECB1D000000004104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000",
		"txid": "15d2f927fe3eafe88ce0b4ccf267727ed306295051339a16e0b95067e65bead8",
		"hash": "15d2f927fe3eafe88ce0b4ccf267727ed306295051339a16e0b95067e65bead8",
		"size": 287,
		"vsize": 287,
		"version": 1,
		"confirmations":1,
		"vin": [
			{
				"coinbase": "04ffff001d0104475468652054696d65732032342f4d61702f323031392054686572657361204d6179206162616e646f6e7320706c616e20666f7220766f7465206f6e204272657869742062696c6c",
				"sequence": 4294967295
			}
		],
		"vout": [
			{
				"value": 50,
				"n": 0,
				"scriptPubKey": {
					"asm": "04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f OP_CHECKSIG",
					"hex": "4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac",
					"reqSigs": 1,
					"type": "pubkey",
					"addresses": [
						"2MvwXYY9uTNRc5YEVV94iLCW2ZwrMntVfqE"
					]
				}
			}
		],
		"blockhash": "b77abb03a0a8a4f23a7380bf655af8312c4769c64fcbf335a08d598b13368f22",
		"time": 1560518777,
		"blocktime": 1560518777
	},
	genesisCoinbaseOutputAddressScripthash:"8b01df4e368ea28f8dc0423bcf7a4923e3a12d307c875e47a0cfbf90b5c39161",
	exchangeRateData:{
		jsonUrl:"https://api.coindesk.com/v1/bpi/currentprice.json",
		responseBodySelectorFunction:function(responseBody) {
			//console.log("Exchange Rate Response: " + JSON.stringify(responseBody));

			var exchangedCurrencies = ["USD", "GBP", "EUR"];

			if (responseBody.bpi) {
				var exchangeRates = {};

				for (var i = 0; i < exchangedCurrencies.length; i++) {
					if (responseBody.bpi[exchangedCurrencies[i]]) {
						exchangeRates[exchangedCurrencies[i].toLowerCase()] = responseBody.bpi[exchangedCurrencies[i]].rate_float;
					}
				}

				return exchangeRates;
			}

			return null;
		}
	},
	blockRewardFunction:function(blockHeight) {
		var eras = [ new Decimal8(50) ];
		for (var i = 1; i < 34; i++) {
			var previous = eras[i - 1];
			eras.push(new Decimal8(previous).dividedBy(2));
		}

		var index = Math.floor(blockHeight / 210000);

		return eras[index];
	}
};
