import { FC } from "react";
import { Text, YStack, View, Image, AnimatePresence } from "tamagui";
import { Link } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { IMovie } from "@/types/types";

interface MovieCardProps {
  movie: Pick<IMovie, "id" | "title" | "release_date" | "poster_path">;
}

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  return (
    <AnimatePresence>
      <YStack padding={10} marginVertical={15} space={85}>
        <Link href={`/movies/${movie?.id}`} asChild>
          <Pressable
            style={{
              width: "100%",
              height: 300,
            }}
          >
            <View
              enterStyle={{
                scale: 1.5,
                y: -20,
                opacity: 0,
              }}
              exitStyle={{
                scale: 0.5,
                y: 20,
                opacity: 0,
              }}
              animation="lazy"
            >
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/original/${movie?.poster_path}`,
                }}
                aspectRatio={1 / 1}
                style={{ width: "100%", borderWidth: 5, borderRadius: 30 }}
                resizeMode="contain"
                backgroundColor="$gray7Dark"
              />
            </View>
          </Pressable>
        </Link>

        <Text
          animation="lazy"
          enterStyle={{
            y: 20,
            animationDuration: ".6s",
            transitionDelay: ".9s",
          }}
          fontWeight="bold"
          textAlign="center"
        >
          {movie?.title}
        </Text>
      </YStack>
    </AnimatePresence>
  );
};

export default MovieCard;

const styles = StyleSheet.create({});
