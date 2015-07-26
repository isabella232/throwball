/**
 * InvoiceController
 *
 * @description :: Server-side logic for managing invoices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var request = require('request')
var Coinbase = require('coinbase').Client;
var coinbaseParams = {
    'apiKey': process.env.COINBASE_API_KEY,
    'apiSecret': process.env.COINBASE_API_SECRET,
    'baseApiUri' : process.env.COINBASE_API_URL
}
var coinbase = new Coinbase(coinbaseParams);
   
Account = require('coinbase').model.Account,
  btcAccount = new Account(coinbase, {
    'id': process.env.COINBASE_API_WALLET
  }),


module.exports = {
    new : function (req, res) {
        var amount;
        
        if (!req.body.price && !req.body.title) {
            res.json({
                success: false,
                error: "Price and title required"
            });
        }
        
        request('https://www.bitstamp.net/api/ticker/', function (error, response, body) {
            //if all's good
 
          if (!error && response.statusCode == 200) {
              
            var ticker = JSON.parse(body);
            console.log(ticker);
            
            console.log(req.body.price)
            
            amount = parseInt(req.body.price) / (ticker.bid * 101.81);
            
            btcAccount.createAddress({
                "callback_url": '',
                "label": "first blood"
              }, function(err, newbtcaddress) {
                if (err) console.log(err);
                
                // the response
                res.json({
                'amount' : amount,
                'address': newbtcaddress.address,
                })
                
              });
              
            }
        }
        );
    }
};