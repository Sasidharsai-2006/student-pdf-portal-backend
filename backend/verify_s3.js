const { S3Client, ListBucketsCommand } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');
dotenv.config();

console.log('--- DIAGNOSTIC START ---');
console.log('Key ID:', process.env.AWS_ACCESS_KEY_ID);
console.log('Region used for Global Check: us-east-1');

const s3Global = new S3Client({
  region: 'us-east-1', // Always use us-east-1 for global checks to avoid regional signature issues
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const run = async () => {
  try {
    console.log('Attempting ListBuckets...');
    const data = await s3Global.send(new ListBucketsCommand({}));
    console.log('✅ SUCCESS: Credentials are valid!');
    console.log('Buckets found:', data.Buckets.map(b => b.Name));
  } catch (err) {
    console.error('❌ FAILURE: Credentials rejected.');
    console.error('Error Name:', err.name);
    console.error('Error Message:', err.message);
  }
};

run();
