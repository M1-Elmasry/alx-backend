import redis from 'redis';

const client = redis.createClient({
  host: '127.0.0.1',
  port: '6379',
});

client.on('error', (error) => {
  console.log(`Redis client not connected to the server: ${error.message}`);
});

function main() {
  const hashSet = {
    Portland: '50',
    Seattle: '80',
    'New York': '20',
    Bogota: '20',
    Cali: '40',
    Paris: '2',
  };

  for (const [field, value] of Object.entries(hashSet)) {
    client.hset('HolbertonSchools', field, value, redis.print);
  }

  client.hgetall('HolbertonSchools', (_err, reply) => {
    console.log(reply);
  });
}

client.on('connect', () => {
  console.log('Redis client connected to the server');
  main();
});
