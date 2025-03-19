import { Client, Databases, ID, Query } from "react-native-appwrite";

const databaseID = process.env.EXPO_PUBLIC_APRRWRITE_DATABASE_ID!;
const collectionID = process.env.EXPO_PUBLIC_APRRWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APRRWRITE_ID!);

const Database = new Databases(client);
export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await Database.listDocuments(databaseID, collectionID, [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await Database.updateDocument(
        databaseID,
        collectionID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await Database.createDocument(databaseID, collectionID, ID.unique(), {
        searchTerm: query,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        movie_id: movie.id,
        title: movie.title,
        vote_average: Math.floor(movie.vote_average),
      });
    }
    console.log(result);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTrendingMovie = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await Database.listDocuments(databaseID, collectionID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
