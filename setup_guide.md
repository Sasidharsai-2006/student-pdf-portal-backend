# 🛠️ Setup Guide: Database & Storage

To make your Student PDF Portal work, you need to connect it to the cloud. Follow these steps:

## 1️⃣ MongoDB Setup (Database)
1. Go to **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)** and sign up (free).
2. Create a new **Cluster** (select the free tier option).
3. Go to **Database Access** -> Create a new Database User (username/password). **Remember this password!**
4. Go to **Network Access** -> click "Add IP Address" -> select **"Allow Access from Anywhere"** (0.0.0.0/0).
5. Go to **Database** -> Click **Connect** -> Choose **"Drivers"**.
6. Copy the **Connection String**. It looks like:
   `mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`
7. Replace `<password>` with the password you created in step 3.

## 2️⃣ AWS S3 Setup (File Storage)
1. Go to **[AWS Console](https://aws.amazon.com/console/)** and sign up.
2. Search for **S3** and create a new **Bucket** (e.g., `student-pdf-portal`).
3. Uncheck "Block all public access" (for now, to make downloads easy) and acknowledge the warning.
4. Create the bucket.
5. Search for **IAM** -> Users -> Create User.
6. Attach policies directly -> Search for `AmazonS3FullAccess` -> Select it -> Create User.
7. Click on the new User -> Security credentials -> **Create access key**.
8. Copy the **Access Key ID** and **Secret Access Key**.

## 3️⃣ Connect to Your App
1. Open the file `backend/.env` in VS Code.
2. Paste your values like this:

```env
MONGO_URI=mongodb+srv://youruser:yourpass@cluster0...
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=secret...
AWS_BUCKET_NAME=student-pdf-portal
AWS_REGION=us-east-1  <-- or your selected region
```

## 4️⃣ Run the App!
Once you save the `.env` file:
1. Open a terminal in `backend/` and run `npm run start`.
2. Open a terminal in `frontend/` and run `npm run dev`.
