import axios from "axios";
import { MongoClient } from 'mongodb';
import { NekosAPI } from "nekosapi";

export default async function handler(req, res) {

  // const nekos = new NekosAPI();
  
  // nekos
  // .getRandomImages((categories = ["catgirl"]), (limit = 5))
  // .then((images) => {
  //     for (const image of images) {
  //         console.log(image.url);
  //     }
  // });


console.log("reached server");
const uri = 'mongodb+srv://2023mt03061:AsqhgboehIcTE5Ar@cluster0.tzwotuy.mongodb.net/assignment?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

try {
  await client.connect();
  const { searchQuery } = req.query;
  const SearchPatternQuery = { tags: { $regex: searchQuery, $options: 'i' } };

  const database = client.db('assignment');
  const collection = database.collection('cc');
  const data = await collection.find(SearchPatternQuery).sort({ rating: -1 }).limit(50).toArray();
  res.status(200).json(data);

} finally {

  await client.close();
}
};
