var log = (function() {
    
})();

var ATM = (function(){
    "use strict";

    var _atm = {
        money: 0,
        company: 'Bankia',
        type:'Cajero exterior',
        materials: 'Acero',
        weight: '1000 Kg',
        currency: 'euro'
    }
    
    var _users = [],
        _admin = [];
    
    // TODO: PASAR A UI
    var _showDetails = function() {
        console.log('Detalles del cajero:');
        for (var i in this) {
            if (typeof this[i] !== 'function') {
                console.log("%c %s: %s", 'font-size: 14px; color: #4078c0', i.toUpperCase(), this[i]);
            }
        }
    }
    
    function _addMoney = function() {
        
    }
    
    function _extractMoney = function() {
        
    }
    
    function _addClient = function() {
        
    }
    
    function _removeClient = function() {
        
    }
    
})();

var Cajero = {
    admin: {
        isValid: false,
        validAdmins: [{ username: 'admin', password: 123456 }],
        /**
         * Add money to the bank account
         * @param {number} money Money to add
         */
        add: function(money) {
            if (!money) return;

            if (!this.isValid && !this.login()) {
                return;
            }

            if (isNaN(money)) {
                Cajero.log.add(204);
            } else {
                Cajero.quantity += money;
                Cajero.log.add(105, money);
            }
        },
        /**
         * Extract money from the bank account
         * @param {number} money Money to extract
         */
        extract: function(money) {
            if (!money) return;

            if (!this.isValid) {
                this.login();
                return;
            }

            if (isNaN(money)) {
                Cajero.log.add(204);
            } else {
                Cajero.quantity = (money > Cajero.quantity) ? 0 : Cajero.quantity - money;
                Cajero.log.add(106);
            }
        },
        /**
         * Add a client to the list
         */
        addClient: function() {
            var username = prompt('User name: '),
                pass = prompt('User Password:');

            // Check if the username exists
            var any = Cajero.client.validUsers.some(function(user){
               return user.name === username;
            });

            if (any) {
                Cajero.log.add(203);
            } else {
                Cajero.client.validUsers.push({ username: username, password: pass, quantity: 0, log: [] });
                Cajero.log.add(103, username);
            }
        },
        /**
         * Remove a client from the list
         */
        removeClient: function() {
            var username = prompt('User name to remove');

            var user = this.getUserByName(username),
                index = Cajero.client.validUsers.indexOf(user);

            if (user !== undefined && index !== -1) {
                Cajero.client.validUsers.splice(index, 1);
                Cajero.log.add(104, username);
                console.log('User deleted');
            }
        },
        /**
         * Get the client information by their name
         * @param {string} username Username of the client
         */
        getUserByName: function(username) {
            return Cajero.client.validUsers.some(function(user){
               return user.name === username;
            });
        },
        /**
         * Login the admin
         * @return {boolean} True if it's a valid user
         */
        login: function() {
            var username = prompt('Enter your administrator username'),
                pass = prompt('Password');

            this.isValid = this.validAdmins.some(function(item){
                return item.username === username && item.password.toString() === pass;
            });

            this.isValid ? Cajero.log.add(100) : Cajero.log.add(200);

            return this.isValid;
        }
    },
    client: {
        isValid: false,
        activeUser: null,
        validUsers: [
            { username: 'victor', password: 123456, quantity: 0, log: [] }
        ],
        /**
         * The client add money from their bank account
         * @param {number} money Money to extract
         */
        add: function(money) {
            if (!this.isValid && !this.login()) {
                return;
            }

            if (isNaN(money)) {
                Cajero.log.add(204);
            } else {
                this.activeUser.quantity += money;
                Cajero.quantity += money;
                Cajero.log.add(107, money, this.activeUser.username);
            }

            Cajero.log.print(this.activeUser);
        },
        /**
         * The client extract money from their bank account
         * @param {number} money Money to extract
         */
        extract: function(money) {
            if (!this.isValid && !this.login()) {
                return;
            }

            if (isNaN(money)) {
                Cajero.log.add(204);
            } else {
                if (Cajero.quantity < money || this.activeUser.quantity < money) {
                    console.log('Sorry there is no such quantity in the bank now');
                    return;
                } else {
                    this.activeUser.quantity = (money > this.activeUser.quantity) ? 0 : this.activeUser.quantity - money;
                    Cajero.log.add(108, money, this.activeUser.username);
                }
            }

            Cajero.log.print(this.activeUser);
        },
        /**
         * Show the actual money of the user
         */
        showMoney: function() {
            if (!this.isValid && !this.login()) {
                return;
            }

            return this.activeUser.quantity;
        },
        /**
         * The user login to the system
         */
        login: function() {
            var username = prompt('Enter your client username'),
                pass = prompt('Password');

            this.activeUser = this.validUsers.filter(function(item){
                return item.username === username && item.password.toString() === pass;
            });

            this.isValid = this.activeUser.length;
            this.activeUser = this.activeUser[0];

            this.isValid ? Cajero.log.add(100) : Cajero.log.add(200);

            Cajero.log.print(this.activeUser);

            return this.isValid;
        },
        /**
         * Users logout
         */
        logout: function() {
            this.isValid = false;
            this.activeUser = null;
        }
    },
    log: {
        ops: {
            success: [],
            error: []
        },
        codes: [
            { code: 100, type: 'User', message: 'Usuario administrador logueado'},
            { code: 101, type: 'User', message: 'Usuario %s logueado' },
            { code: 103, type: 'User', message: 'New user added %s' },
            { code: 104, type: 'User', message: 'User %s remove with success' },
            { code: 105, type: 'User', message: 'The admin added %d to the bank account' },
            { code: 106, type: 'User', message: 'The admin extract %d from the bank account' },
            { code: 107, type: 'User', message: 'The user %s added %d to their bank account' },
            { code: 108, type: 'User', message: 'The user %s extracted %d from their bank account' },
            { code: 200, type: 'User', message: 'Bad user admin login' },
            { code: 202, type: 'User', message: 'Bad user login' },
            { code: 203, type: 'User', message: 'Username already exists'},
            { code: 204, type: 'User', message: 'Money quantity not valid'}
        ],
        /**
         * Add a log line to the log and show it in the console
         * @param {number} code Code number
         */
        add: function(code) {
            var log = this.codes.filter(function(item){
               return item.code === code;
            });

            if (log.length === 0) return;
            log = log[0];

            if (arguments.length > 1) {
                var newLog = Object.create(log);
              for (var i = 1; i < arguments.length; i++){
                if (typeof arguments[i] === 'string') {
                  newLog.message = newLog.message.replace('%s', arguments[i]);
                } else if (typeof arguments[i] === 'number') {
                  newLog.message = newLog.message.replace('%d', arguments[i]);
                }
              }
              log = newLog;
            }

            if (log.code.toString().startsWith("1")) {
                this.ops.success.push(log);
                console.info(log.message);
            } else if (log.code.toString().startsWith("2")) {
                this.ops.error.push(log);
                console.error(log.message);
            }
        },
        /**
         * Shows the log
         */
        show: function() {
            console.clear();

            console.group('Success');
            this.ops.success.forEach(function(item){
                console.info("%d - %s - %s", item.code, item.type, item.message);
            });
            console.groupEnd();

            console.group('Error');
            this.ops.error.forEach(function(item) {
                console.error("%d - %s - %s", item.code, item.type, item.message);
            });
            console.groupEnd();
        },
        /**
        * Print the output on the console
        */
        print: function(user){
            console.clear();
            console.log('################################################################################');
            console.log('                                  CONSOLE BANK                                  ');
            console.log('  Active money available: %d $', Cajero.quantity);
            console.log('  Welcome, %s', user.username);
            console.log('    Your actual quantity: %d', user.quantity)
            console.log('');
            console.log('');
        },
        /**
         * Clear the log
         */
        clear: function() {
            this.ops.success = [];
            this.ops.error = [];
        }
    }
}