import { IMovie } from "@/types/types";
import { FC } from "react";
import { Image, Text, YStack, View } from "tamagui";
import { Link } from "expo-router";
import { Pressable } from "react-native";

interface MovieCardProps {
  movie: Pick<IMovie, "id" | "title" | "release_date" | "poster_path">;
}

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  return (
    <YStack padding={10} marginVertical={15} space={85}>
      <Link href={`/movies/${movie?.id}`} asChild>
        <Pressable
          style={{
            width: "100%",
            height: 300,
          }}
        >
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/original/${movie?.poster_path}`,
            }}
            aspectRatio={1 / 1}
            style={{ width: "100%", borderWidth: 5, borderColor: "#0f172a" }}
            resizeMode="contain"
            borderRadius={30}
          />
        </Pressable>
      </Link>

      <View>
        <Text fontWeight="bold" textAlign="center">
          {movie?.title}
        </Text>
      </View>
    </YStack>
  );
};

export default MovieCard;
