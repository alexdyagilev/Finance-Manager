var seeder = require('mongoose-seed');
 
// Connect to MongoDB via Mongoose 
seeder.connect('mongodb://localhost/financemanager', function() {
 
    // Load Mongoose models 
    seeder.loadModels([
        '../../../models/Account.js',
        '../../../models/Transaction.js'
    ]);
 
    // Clear specified collections 
    seeder.clearModels(['Account', 'Transaction'], function() {
 
        // Callback to populate DB once collections have been cleared 
        seeder.populateModels(data, function() {
            //seeder.disconnect(); 
        });
 
    });
});
 
// Data array containing seed data - documents organized by Model 
var data = [
    {
        'model': 'Account',
        'documents': [
            {
                'username': 'Alex'
                'password': 111
                'bankAmount': 1000
                'cashAmount': 50
            },
            {
                'username': 'Admin'
                'password': 123
                'bankAmount': 10
                'cashAmount': 5
            }
        ]
    }
];