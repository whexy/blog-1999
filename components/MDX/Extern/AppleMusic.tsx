const AppleMusic = ({ link }) => {
  return (
    <div className="not-prose mx-auto max-w-[660px] py-2">
      <iframe
        allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
        height="175"
        className="mx-auto my-4 w-full max-w-[660px] overflow-hidden rounded-lg shadow-lg"
        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
        src={link}></iframe>
    </div>
  );
};

export default AppleMusic;
