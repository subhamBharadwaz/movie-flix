import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IMovie } from "@/types/types";
import { H3, Spinner, YStack, SizableText, Text, Image, View } from "tamagui";
import { generateImage } from "@/utils/utils";
import { FlatList, Pressable } from "react-native";
import { Link } from "expo-router";

interface RecommendationsProps {
  movieId: string | string[];
  title: string | undefined;
}

const Recommendations: FC<RecommendationsProps> = ({ movieId, title }) => {
  const { data: recommendations, isLoading } = useQuery<IMovie[]>({
    queryKey: ["recommendations", movieId],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.EXPO_PUBLIC_MOVIE_DB_API_KEY}&language=en-US&page=1`
      );

      return await res.data.results;
    },
  });

  if (isLoading) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center">
        <Spinner size="large" color="$green10" />
      </YStack>
    );
  }

  return (
    <View space>
      <H3>Recommendations</H3>
      {!recommendations?.length ? (
        <SizableText>
          We don't have enough data to suggest any movies based on {title}.
        </SizableText>
      ) : (
        <FlatList
          data={recommendations}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <YStack marginHorizontal={10} space={70}>
              <Link href={`/movies/${item?.id}`} asChild>
                <Pressable
                  style={{
                    maxWidth: 250,
                    height: 200,
                  }}
                >
                  <Image
                    source={{
                      uri: generateImage(item?.poster_path),
                    }}
                    aspectRatio={1 / 1}
                    style={{ width: "100%", borderWidth: 5, borderRadius: 30 }}
                    resizeMode="contain"
                    backgroundColor="$gray7Dark"
                  />
                </Pressable>
              </Link>

              <Text fontWeight="bold" textAlign="center" maxWidth={250}>
                {item?.title}
              </Text>
            </YStack>
          )}
        />
      )}
    </View>
  );
};

export default Recommendations;
