const GOOGLE_REVIEWS_URL =
  "https://getgooglereviews-fdkefcllsq-uc.a.run.app";

export const fetchGoogleReviews = async () => {
  const res = await fetch(GOOGLE_REVIEWS_URL);

  if (!res.ok) {
    const text = await res.text();
    throw new Error("Failed to fetch reviews: " + text);
  }

  return res.json();
};
