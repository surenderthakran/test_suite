var node_port = process.env.NODE_PORT || 80; 

module.exports = {
    server: {
        debug: {
            request: ['error']
        }
    },
    connections: [{
        port: node_port
    }],
    plugins: {
        "good": {
            "reporters": [
                {
                    "reporter": "good-console",
                    "events": {
//                        "response": "*",
                        "log": "*",
                        "error": "*"
                    }
                }
            ]
        }
//        './routes': {}
    }
};

