export type Card = {
    id: number,
    title: string,
    text: string,
    icon: string
}

export const cards: Card[] = [
  {
    id: 1,
    title: "Smart Label Recognition",
    text: "Point your camera at any nutrition label, and our AI analyzes the ingredients to help you make informed food choices.",
    icon: "food-variant"
  }, 
  {
    id: 2,
    title: "Health Insights",
    text: "Get personalized recommendations and health insights based on your dietary preferences, restrictions, and nutritional goals.",
    icon: "chart-bar"
  },  
  {
    id: 3,
    title: "User Feedback",
    text: "Share your experience, rate your meals, and help us improve the system with valuable user feedback.",
    icon: "star"
  }

]