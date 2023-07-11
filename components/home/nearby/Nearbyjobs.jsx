import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

import styles from "./nearbyjobs.style";
import { COLORS } from "../../../constants";

// COMPONENTS
import NearbyjobsCard from "../../common/cards/nearby/NearbyJobCard";

// API CALL
import useFetch from "../../../../job-search-app/hook/useFetch";
const Nearbyjobs = () => {
  const router = useRouter();

  const { data, isLoading, error } = useFetch("search", {
    query: "React developer",
    num_pages: 1,
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>

        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          // <FlatList
          //   data={data}
          //   keyExtractor={(item) => item?.job_id}
          //   renderItem={({ item }) => <PopularJobCard item={item} />}
          //   contentContainerStyle={{ columnGap: SIZES.medium }}
          //   horizontal
          // />
          data?.map((job) => (
            <NearbyjobsCard job={job} key={`nearby-job-${job?.job_id}`} />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
