import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ImageFile } from "@/context/types";
import Image from "next/image";

interface ImageCarouselProps {
  items: ImageFile[];
}

export default function ImageCarousel({ items }: ImageCarouselProps) {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {items.map(({ url }, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Image src={url} alt={`Image number ${index}`} fill />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
