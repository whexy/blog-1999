const Spotify = ({ trackId }: { trackId: string }) => {
  return (
    <div className="not-prose mx-auto max-w-[660px] py-2">
      <iframe
        className="mx-auto my-4 w-full max-w-[660px] overflow-hidden rounded-lg shadow-lg"
        src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator`}
        height="152"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"></iframe>
    </div>
  );
};

export default Spotify;
