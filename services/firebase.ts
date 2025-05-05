// track the searches made by users
import {
  db,
  Collection,
  GetDocs,
  Query,
  Where,
  OnSnapshot,
  GetDoc,
  SetDoc,
  AddDoc,
  UpdateDoc,
  Doc,
  Limit,
  OrderBy,
} from "../FirebaseConfig";

interface MetricData {
  movie_id: number; // Adjust the type as necessary
  count: number;
  poster_url: string;
  searchTerm: string;
  title: string;
}

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    // Query for the searchterm document
    const metricsRef = Collection(db, "metrics");
    const q = Query(metricsRef, Where("searchTerm", "==", query));

    const metricsSnapshot = await GetDocs(q);

    let result: Partial<MetricData> = {}; // Initialize result as null
    let metricId: string | undefined;

    metricsSnapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data() as MetricData; // Type is unknown by default
      result = {
        movie_id: data.movie_id,
        count: data.count,
        poster_url: data.poster_url,
        searchTerm: data.searchTerm,
        title: data.title,
      };
      metricId = docSnapshot.id;
    });

    console.log("metricId", metricId);
    console.log("result", result);

    if (Object.keys(result).length > 0 && metricId) {
      // Document exists, so update the count
      const metricsNewRef = Doc(db, "metrics", metricId);

      await UpdateDoc(metricsNewRef, {
        ...result,
        count: (result.count || 0) + 1,
      });
    } else {
      // Document doesn't exist, so create a new one
      const newMetric: MetricData = {
        movie_id: movie.id,
        count: 1,
        poster_url: movie.poster_path,
        searchTerm: query,
        title: movie.title,
      };

      await AddDoc(metricsRef, newMetric);
    }
  } catch (err: any) {
    console.log(err.message);
    throw err;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const metricsRef = Collection(db, "metrics");
    const q = Query(metricsRef, OrderBy("count", "desc"), Limit(5));
    const metricSnapshot = await GetDocs(q);
    let result: TrendingMovie[] = [];
    metricSnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      result.push(doc.data() as TrendingMovie);
    });

    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
