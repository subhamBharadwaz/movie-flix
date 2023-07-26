import { IMovie } from "@/types/types";
import { FC } from "react";
import { Card, Image, Text, View } from "tamagui";
import { MoreHorizontal } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { Pressable } from "react-native";

interface MovieCardProps {
  movie: Pick<IMovie, "id" | "title" | "release_date" | "poster_path">;
}

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  return (
    <View marginVertical={15}>
      <Card
        animation="bouncy"
        borderRadius="$10"
        overflow="hidden"
        size="$2"
        width="100%"
        height={300}
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.875 }}
        bordered
        marginBottom={5}
      >
        <Card.Header padded marginLeft="auto">
          <MoreHorizontal />
        </Card.Header>
        <Link href={`/movies/${movie?.id}`} asChild>
          <Pressable style={{ width: "100%", height: 300 }}>
            <Card.Background>
              <Image
                resizeMode="cover"
                source={{
                  uri: `https://image.tmdb.org/t/p/original/${movie?.poster_path}`,
                }}
                style={{ aspectRatio: 3 / 4, width: "100%" }}
              />
            </Card.Background>
          </Pressable>
        </Link>
      </Card>

      <View>
        <Text fontWeight="bold" textAlign="center">
          {movie?.title}
        </Text>
      </View>
    </View>
  );
};

export default MovieCard;
