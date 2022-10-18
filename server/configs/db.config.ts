// // import nextConnect from "next-connect";
// // import { NextRequest, NextResponse, NextMiddleware } from "next/server";
// // import { MongoClient } from "mongodb";

// // const client = new MongoClient(process.env.MONGODB_URI);

// // async function database(req, res, next) {
// // 	if (!client.isConnected()) await client.connect();
// // 	req.dbClient = client;
// // 	req.db = client.db("MCT");
// // 	return next();
// // }

import mongoose from "mongoose";

const mongo_uri = process.env.MONGODB_URI as string;
const db_name = process.env.DB_NAME as string;

console.log(mongo_uri);

mongoose
	.connect(mongo_uri)
	.then(() => {
		console.log("Connection Successful!");
	})
	.catch((err) => {
		console.log(`Err in connecting to database: ${err}`);
	});

// export async function connect() {
// 	try {
// 		const conn = await mongoose.connect(mongo_uri);
// 		console.log("connection succesful!");
// 		return conn;
// 	} catch (error) {
// 		console.log(`Error in connection to database: ${error}`);
// 	}
// }

// import { Db, MongoClient } from "mongodb";

// // const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;
// const MONGODB_URI =
// 	"mongodb+srv://prtk:Domin%40r400@flashcards.n6fym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const MONGODB_DB = "myFirstDatabase";

// let cachedClient: MongoClient;
// let cachedDb: Db;

// export async function connectToDatabase() {
// 	// check the cached.
// 	if (cachedClient && cachedDb) {
// 		// load from cache
// 		return {
// 			client: cachedClient,
// 			db: cachedDb,
// 		};
// 	}

// 	// set the connection options
// 	const opts = {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	};

// 	// check the MongoDB URI
// 	if (!MONGODB_URI) {
// 		throw new Error("Define the MONGODB_URI environmental variable");
// 	}
// 	// check the MongoDB DB
// 	if (!MONGODB_DB) {
// 		throw new Error("Define the MONGODB_DB environmental variable");
// 	}

// 	// Connect to cluster
// 	let client = new MongoClient(MONGODB_URI);
// 	await client.connect();
// 	let db = client.db(MONGODB_DB);

// 	// set cache
// 	cachedClient = client;
// 	cachedDb = db;

// 	return {
// 		client: cachedClient,
// 		db: cachedDb,
// 	};
// }
