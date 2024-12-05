import { AREA_IDS } from "./areaIds"; // Import the areaIds constants

export const AREA_DETAILS = {
  anxiety: {
    hero: {
      imageUrl: "https://i.imgur.com/0jyaAtG.jpeg",
      title: "Anxiety",
      description:
        "Feeling overwhelmed? You're not alone. In this space, we’ve gathered practical tips, expert advice, and calming videos designed to help you navigate anxiety. Whether you're seeking quick techniques to ease your mind or deeper insights into managing stress, we’ve got you covered.",
    },
    areaPosts: {
      areaId: AREA_IDS.anxietyId, // Dynamically use the areaId
      latestPosts: {
        title: "Latest posts on Anxiety",
        description:
          "This page offers practical strategies, including mindfulness, breathing exercises, and lifestyle changes, to help you regain control. You'll also find links to trusted resources and expert advice on coping with anxiety, empowering you to take proactive steps toward better mental health.",
      },
      mostPopularPosts: {
        title: "Most popular posts on Anxiety",
        description:
          "Take a look at what our users are saying about the most popular posts on Anxiety topics!",
        mostPopular: true,
        areaId: AREA_IDS.anxietyId, // Dynamically use the areaId
      },
    },
    areaVideos: {
      areaId: AREA_IDS.anxietyId, // Dynamically use the areaId
      title: "Latest videos on Anxiety",
      description:
        "Take a breath. These videos are here to guide you through anxiety with expert tips, calming techniques, and insights to help you find your calm.",
      bannerUrl: "https://i.imgur.com/pBhbBYY.jpeg",
    },
  },
  sleep: {
    hero: {
      imageUrl: "https://i.imgur.com/cCP60VB.jpeg",
      title: "Sleep",
      description:
        "Learn how to improve your sleep with expert tips and calming techniques.",
    },
    areaPosts: {
      areaId: AREA_IDS.sleepId, // Dynamically use the areaId
      latestPosts: {
        title: "Latest posts on Sleep",
        description:
          "Explore the latest research and advice on improving your sleep quality.",
      },
      mostPopularPosts: {
        title: "Most popular posts on Sleep",
        description:
          "Discover the most popular posts about sleep tips and techniques.",
        mostPopular: true,
        areaId: AREA_IDS.sleepId, // Dynamically use the areaId
      },
    },
    areaVideos: {
      areaId: AREA_IDS.sleepId, // Dynamically use the areaId
      title: "Latest videos on Sleep",
      description:
        "Find calming videos to help you relax and improve your sleep.",
      bannerUrl: "https://i.imgur.com/AUiVueS.jpeg",
    },
  },
  stress: {
    hero: {
      imageUrl: "https://i.imgur.com/B6d7ttv.jpeg",
      title: "Stress",
      description:
        "Manage stress effectively with expert strategies and advice.",
    },
    areaPosts: {
      areaId: AREA_IDS.stressId, // Dynamically use the areaId
      latestPosts: {
        title: "Latest posts on Stress",
        description:
          "Learn how to cope with and reduce stress with practical tips.",
      },
      mostPopularPosts: {
        title: "Most popular posts on Stress",
        description: "Explore the most popular posts on managing stress.",
        mostPopular: true,
        areaId: AREA_IDS.stressId, // Dynamically use the areaId
      },
    },
    areaVideos: {
      areaId: AREA_IDS.stressId, // Dynamically use the areaId
      title: "Latest videos on Stress",
      description: "Watch videos with tips on managing and reducing stress.",
      bannerUrl: "https://i.imgur.com/md0fapn.jpeg",
    },
  },
  ["eating-disorders"]: {
    hero: {
      imageUrl: "https://i.imgur.com/LN735E2.jpeg",
      title: "Eating Disorders",
      description:
        "Find help and support for eating disorders with expert guidance.",
    },
    areaPosts: {
      areaId: AREA_IDS.eatingDisordersId, // Dynamically use the areaId
      latestPosts: {
        title: "Latest posts on Eating Disorders",
        description:
          "Read the latest articles on understanding and overcoming eating disorders.",
      },
      mostPopularPosts: {
        title: "Most popular posts on Eating Disorders",
        description:
          "Check out the most popular posts on overcoming eating disorders.",
        mostPopular: true,
        areaId: AREA_IDS.eatingDisordersId, // Dynamically use the areaId
      },
    },
    areaVideos: {
      areaId: AREA_IDS.eatingDisordersId, // Dynamically use the areaId
      title: "Latest videos on Eating Disorders",
      description:
        "Watch helpful videos on understanding and managing eating disorders.",
      bannerUrl: "https://i.imgur.com/t3OUuVv.jpeg",
    },
  },
  ["cognitive-health"]: {
    hero: {
      imageUrl: "https://i.imgur.com/JvF9Oxk.jpeg",
      title: "Cognitive Health",
      description:
        "Boost your cognitive health with helpful tips and resources.",
    },
    areaPosts: {
      areaId: AREA_IDS.cognitiveHealthId, // Dynamically use the areaId
      latestPosts: {
        title: "Latest posts on Cognitive Health",
        description:
          "Explore the latest articles on improving cognitive health.",
      },
      mostPopularPosts: {
        title: "Most popular posts on Cognitive Health",
        description:
          "Browse through the most popular posts on cognitive health.",
        mostPopular: true,
        areaId: AREA_IDS.cognitiveHealthId, // Dynamically use the areaId
      },
    },
    areaVideos: {
      areaId: AREA_IDS.cognitiveHealthId, // Dynamically use the areaId
      title: "Latest videos on Cognitive Health",
      description: "Watch videos focused on improving cognitive health.",
      bannerUrl: "https://i.imgur.com/baKTnA7.jpeg",
    },
  },
};
