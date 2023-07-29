import { FC, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { IReview } from "@/types/types";
import { H3, ScrollView, Spinner, View, YStack } from "tamagui";
import ReviewItem from "./ReviewItem";

interface ReviewsProps {
  movieId: string | string[];
}

const Reviews: FC<ReviewsProps> = ({ movieId }) => {
  const { data: reviews, isLoading } = useQuery<IReview[]>({
    queryKey: ["reviews", movieId],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${process.env.EXPO_PUBLIC_MOVIE_DB_API_KEY}&language=en-US&page=1`
      );
      return await res.data.results;
    },
  });

  return (
    <YStack space>
      <H3>Reviews</H3>
      <YStack space>
        {isLoading ? (
          <Spinner />
        ) : (
          <ScrollView space showsVerticalScrollIndicator={false}>
            {reviews?.map((review) => (
              <ReviewItem key={review?.id} review={review} />
            ))}
          </ScrollView>
        )}
      </YStack>
    </YStack>
  );
};

export default Reviews;
