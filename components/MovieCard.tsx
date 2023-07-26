import { IMovie } from "@/types/types";
import { FC } from "react";
import { Card, Image, Text, View } from "tamagui";
import { MoreHorizontal } from "@tamagui/lucide-icons";

interface MovieCardProps {
  movie: Pick<IMovie, "title" | "release_date" | "poster_path">;
}

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  return (
    <View marginVertical={20}>
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
        <Card.Background>
          <Image
            resizeMode="cover"
            source={{
              uri: `https://image.tmdb.org/t/p/original/${movie?.poster_path}`,
            }}
            style={{ aspectRatio: 3 / 4, width: "100%" }}
          />
        </Card.Background>
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
