const amqp = require("amqplib/callback_api");

amqp.connect("amqps://zwmedbus:loP22y6ShXePb3QfMmpN3Awg31dP7vu2@baboon.rmq.cloudamqp.com/zwmedbus", function(error, connection) {
    if (error) {
        throw error;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        let queue = "my_queue";
        let msg = "proceed";

        channel.assertQueue(queue, {
            durable: true,
        });
        channel.sendToQueue(queue, Buffer.from(msg), {
            persistent: true,
        });
        console.log("Sent '%s'", msg);
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 7000);
});