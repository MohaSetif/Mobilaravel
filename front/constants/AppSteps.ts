import { ImageSourcePropType } from "react-native";

export type AppFeature = {
  id: number;
  title: string;
  description: string;
  image: ImageSourcePropType;
};

export const appFeatures: AppFeature[] = [
  {
    id: 1,
    title: "Take a picture of your food product",
    description: "Capture an image of any food item's nutrition label using your device's camera to start the analysis process.",
    image: require('@/assets/images/camera.png'),
  },
  {
    id: 2,
    title: "Crop the image",
    description: "Easily crop your image to focus on the relevant section of the nutrition label for more accurate analysis.",
    image: require('@/assets/images/crop.png'),
  },
  {
    id: 3,
    title: "Go to the app's gallery NutriScan",
    description: "Access previously scanned products in your gallery.",
    image: require('@/assets/images/gallery.png'),
  },
  {
    id: 4,
    title: "Set the nutrients manually",
    description: "Manually input nutrition values if a label is unreadable or unavailable, ensuring accurate results and full flexibility.",
    image: require('@/assets/images/nutrients_fields.png'),
  },
  {
    id: 5,
    title: "Analyze the product",
    description: "Let the app automatically interpret the nutrition data and provide a clear summary, including health scores and warnings.",
    image: require('@/assets/images/after_scan.png'),
  },
  {
    id: 6,
    title: "Learn more about the product",
    description: "Dive deeper into the product's nutritional profile with charts and comparisons to recommended daily intake values.",
    image: require('@/assets/images/nutrients_bars.png'),
  },
];
