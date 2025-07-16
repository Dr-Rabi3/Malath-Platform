import { useMutation } from "@tanstack/react-query";
import { getAllSliders } from "../api/admin";
import { getFile } from "../api/http";

export const useSliderData = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await getAllSliders();

      if (res.isSuccess && Array.isArray(res.data)) {
        const slidesWithImages = await Promise.all(
          res.data.map(async (slide, idx) => {
            let imageUrl = slide.imageUrl;
            let imageBlobUrl = "";
            try {
              if (imageUrl) {
                const blob = await getFile(imageUrl);
                imageBlobUrl = URL.createObjectURL(blob);
              }
            } catch (e) {
              imageBlobUrl = "";
            }
            return {
              number: String(idx + 1).padStart(2, "0"),
              title: slide.title || "",
              description: slide.description || "",
              image: imageBlobUrl,
            };
          })
        );
        return slidesWithImages;
      }
      return [];
    },
    onError: (error) => {
      console.error("Error fetching slider data:", error);
    },
  });
};
