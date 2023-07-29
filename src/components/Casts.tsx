import { ICast } from "@/types/types";
import { generateImage } from "@/utils/utils";
import { FC } from "react";
import { Avatar, H3, ScrollView, Spinner, Text, XStack, YStack } from "tamagui";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface CastsProps {
  id: string | string[];
}

const Casts: FC<CastsProps> = ({ id }) => {
  const { data: casts, isLoading } = useQuery<ICast[]>({
    queryKey: ["casts", id],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.EXPO_PUBLIC_MOVIE_DB_API_KEY}&language=en-US`
      );
      return await res.data.cast;
    },
  });

  return (
    <ScrollView>
      <YStack space>
        <H3>Cast</H3>
        {isLoading ? (
          <Spinner size="large" color="$green10" />
        ) : (
          <XStack flexWrap="wrap" alignItems="center" gap="$3">
            {casts?.slice(0, 9).map((cast) => (
              <YStack
                justifyContent="center"
                alignItems="center"
                key={cast?.id}
              >
                <Avatar circular size="$10">
                  <Avatar.Image
                    accessibilityLabel="Cam"
                    src={generateImage(cast?.profile_path)}
                  />
                  <Avatar.Fallback backgroundColor="$blue10" />
                </Avatar>
                <Text fontSize="$3" fontWeight="bold">
                  {cast?.name}
                </Text>
                <Text fontSize="$3">({cast?.character})</Text>
              </YStack>
            ))}
          </XStack>
        )}
      </YStack>
    </ScrollView>
  );
};

export default Casts;
