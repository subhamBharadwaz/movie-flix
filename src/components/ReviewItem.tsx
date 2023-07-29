import { FC, useState } from "react";
import { IReview } from "@/types/types";
import { generateImage } from "@/utils/utils";
import { Pressable } from "react-native";
import { Avatar, Card, View, XStack, YStack, Text, SizableText } from "tamagui";
import { Star } from "@tamagui/lucide-icons";

interface ReviewItemProps {
  review: IReview;
}

const ReviewItem: FC<ReviewItemProps> = ({ review }) => {
  const [showFullContent, setShowFullContent] = useState<boolean>(false);

  const toggleContentHandler = () => {
    setShowFullContent((prevState) => !prevState);
  };

  const toggleBtnCaption = showFullContent ? "Read less" : "Read more";

  const content = showFullContent
    ? review?.content
    : `${review?.content?.slice(0, 400)}${
        review.content.length > 400 ? "..." : ""
      }`;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const generateDate = (createdAt: string) => {
    const dateObj = new Date(createdAt);
    return `${
      months[dateObj.getMonth()]
    } ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
  };

  const generateRating = (rating: number) => {
    if (rating) {
      return rating.toString().includes(".") ? rating : `${rating}.0`;
    } else {
      return null;
    }
  };

  return (
    <Card key={review?.id} padded>
      <Card.Header>
        <XStack space alignItems="center">
          <Avatar circular size="$5">
            <Avatar.Image
              accessibilityLabel="Cam"
              src={generateImage(review?.author_details?.avatar_path)}
            />
            <Avatar.Fallback backgroundColor="$blue10" />
          </Avatar>
          <YStack>
            <XStack>
              <Text>
                Review by <Text fontWeight="bold">{review?.author}</Text>{" "}
              </Text>
              <XStack columnGap="$1">
                <Star size="$1" fill="#ffc107" strokeWidth={0} />
                <Text>{generateRating(review?.author_details?.rating)}</Text>
              </XStack>
            </XStack>
            <Text>{generateDate(review?.created_at)}</Text>
          </YStack>
        </XStack>
      </Card.Header>
      <SizableText space mt="$4">
        {content}
        {review?.content.length > 400 && (
          <Pressable onPress={toggleContentHandler}>
            <Text
              borderBottomColor="$gray9Light"
              borderBottomWidth="$1"
              paddingBottom="$1"
            >
              {toggleBtnCaption}
            </Text>
          </Pressable>
        )}
      </SizableText>
    </Card>
  );
};

export default ReviewItem;
