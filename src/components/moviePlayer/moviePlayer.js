import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function MoviePlayer() {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const fetchVideoUrl = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/196454/season/1?api_key=f1a9834ac832fe0d454f8a81f7197759&append_to_response=watch/providers"
      );
      const data = await response.json();
      // console.log(data, "data");
      const videoFileUrl =
        data?.["watch/providers"]?.results?.US?.link;

      // Check if videoFileUrl is a valid URL
      // console.log(videoFileUrl)
      if (videoFileUrl) {
        setVideoUrl(videoFileUrl);
      }
    };

    fetchVideoUrl();
  }, []);

  return (
    <ReactPlayer
      className="react-player"
      url={videoUrl}
      width="100%"
      height="100%"
      controls={true}
      allow="fullscreen"
      type="video/mp4"
      onError={(error) => console.log(error)}
    />
  );
}
