import ReactPlayer from "react-player";

export function Video() {
  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <ReactPlayer
        width="100%"
        height="100%"
        controls
        url="https://www.youtube.com/watch?v=RNj5oxr7xfw&ab_channel=SpacePregui%C3%A7a"
      />
    </div>
  )
}