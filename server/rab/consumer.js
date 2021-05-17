const amqp = require("amqplib/callback_api");

amqp.connect("amqps://zwmedbus:loP22y6ShXePb3QfMmpN3Awg31dP7vu2@baboon.rmq.cloudamqp.com/zwmedbus", function(err, connection) {
    if (err) {
        throw err;
    }
    connection.createChannel(function(e, channel) {
        if (e) {
            throw e;
        }
        let queue = "my_queue";

        channel.assertQueue(queue, {
            durable: true,
        });
        channel.prefetch(1);

        console.log("Waiting for messages in %s", queue);
        channel.consume(queue, function(msg) {
            console.log("Received '%s'", msg.content.toString());

            setTimeout(function() {
                channel.ack(msg);
            }, 1000);
        });
    });
});