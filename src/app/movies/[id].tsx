import { IMovie } from "@/types/types";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import * as React from "react";
import { StyleSheet } from "react-native";
import {
  Image,
  Spinner,
  Text,
  YStack,
  ScrollView,
  XStack,
  H2,
  SizableText,
  H3,
  View,
} from "tamagui";
import Animated from "react-native-reanimated";
import { useQuery } from "@tanstack/react-query";
import { formatNumber } from "@/utils/utils";
import { Star } from "@tamagui/lucide-icons";
import { transition } from "@/constants/Animations";
import Casts from "@/components/Casts";
import Reviews from "@/components/Reviews";
import Recommendations from "@/components/Recommendations";

const MovieDetails: React.FC = () => {
  const { id } = useLocalSearchParams();

  const { data: movie, isLoading } = useQuery<IMovie>({
    queryKey: ["movie", id],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.EXPO_PUBLIC_MOVIE_DB_API_KEY}&language=en-US`
      );

      return await res.data;
    },
  });

  const releasedYear = movie?.release_date?.split("-")[0];

  const budget =
    movie?.budget === 0 ? "-" : "$" + formatNumber(movie?.budget as number);

  const revenue =
    movie?.revenue === 0 ? "-" : "$" + formatNumber(movie?.revenue as number);

  return (
    <ScrollView flex={1} showsVerticalScrollIndicator={false}>
      {isLoading ? (
        <YStack flex={1} alignItems="center" justifyContent="center">
          <Spinner size="large" color="$green10" />
        </YStack>
      ) : (
        <YStack padding={10} space>
          <View
            enterStyle={{
              scale: 1.5,
              y: -20,
              opacity: 0,
            }}
            animation="lazy"
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original/${movie?.poster_path}`,
              }}
              aspectRatio={1 / 1}
              resizeMode="contain"
              style={{ width: "100%", borderRadius: 30 }}
            />
          </View>
          <YStack
            space="$2"
            enterStyle={{
              y: -20,
              opacity: 0,
            }}
            animation="lazy"
          >
            <H2>{movie?.title}</H2>
            <Text fontSize="$4">{releasedYear}</Text>
            <XStack>
              <Star size="$1" fill="#ffc107" strokeWidth={0} />
              <Text marginLeft="$2" fontSize="$4">
                User Score - {movie?.vote_average}/10 (
                {formatNumber(movie?.vote_count as number)})
              </Text>
            </XStack>
          </YStack>

          <XStack
            space
            enterStyle={{
              x: -20,
              opacity: 0,
            }}
            animation="lazy"
          >
            {movie?.genres?.map((g) => (
              <Text
                paddingHorizontal="$4"
                paddingVertical="$2"
                bg="$gray3Dark"
                borderRadius={30}
                key={g.id}
              >
                {g.name}
              </Text>
            ))}
          </XStack>
          <YStack
            space
            enterStyle={{
              y: 20,
              opacity: 0,
            }}
            animation="lazy"
          >
            <H3>Overview</H3>
            <SizableText color="#cbd5e1" fontSize="$5">
              {movie?.overview}
            </SizableText>
          </YStack>

          <Casts id={id} />

          <YStack space>
            <XStack space>
              <Text fontWeight="bold">Status</Text>
              <Text>{movie?.status}</Text>
            </XStack>
            <XStack space>
              <Text fontWeight="bold">Budget</Text>
              <Text>{budget}</Text>
            </XStack>
            <XStack space>
              <Text fontWeight="bold">Revenue</Text>
              <Text>{revenue}</Text>
            </XStack>
          </YStack>

          <Reviews movieId={id} />
          <Recommendations movieId={id} title={movie?.title} />
        </YStack>
      )}
    </ScrollView>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({});
