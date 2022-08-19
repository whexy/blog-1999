import PageTitle from "@/components/tiny/PageTitle";
import Main from "@/components/Main";
import Image from "next/image";

// content
import { useEffect, useState } from "react";

type Gallery = {
  theme: string;
  description: string;
  images: GalleryImage[];
};

type GalleryImage = {
  name: string;
  url: string;
};

const galleryLoader = ({ src, width, quality }) => {
  return `https://img.cdn.whexy.com/${src}?imageView2/1/w/${width}/h/${width}/format/webp/interlace/1/q/${quality}`;
};

const GalleryPage = ({ galleries }: { galleries: Gallery[] }) => {
  return (
    <Main>
      <PageTitle title="Gallery" emoji="📷" />
      <div className="">
        {galleries.map(g => (
          <div key={g.theme} className="primary my-5 py-8 sm:px-10">
            <div className="mx-1">
              <div className="mx-auto grid h-24 w-full place-items-center rounded-lg text-center font-article">
                <div>
                  <h2 className="text-3xl font-bold">{g.theme}</h2>
                  <p className="text-lg font-thin opacity-80">
                    {g.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.images.map(i => (
                <div key={i.name} className="my-2 mx-1">
                  <GalleryImage
                    image={{
                      href: i.url,
                      name: i.name,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Main>
  );
};

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type Image = {
  href: string;
  name: string;
};

interface EXIFInfo {
  make: string | null;
  model: string | null;
  exposureTime: string | null;
  aperture: string | null;
  focalLength: string | null;
  iso: number | null;
}

const ModelMap = {
  FC3582: "Dji M3P",
  "ILCE-6400": "⍺6400",
};

function GalleryImage({ image }: { image: Image }) {
  const [isLoading, setLoading] = useState(true);
  const [exif, setExif] = useState<EXIFInfo>(null);

  useEffect(() => {
    fetch(`https://img.cdn.whexy.com/${image.href}?exif`)
      .then(res => res.json())
      .then(data => {
        const info: EXIFInfo = {
          make: null,
          model: null,
          exposureTime: null,
          aperture: null,
          focalLength: null,
          iso: null,
        };
        info.make = data["Make"]?.val;
        info.model = data["Model"]?.val;
        if (info.model in ModelMap) {
          info.model = ModelMap[info.model];
        }
        info.exposureTime = data["ExposureTime"]?.val.split(" ")[0];
        info.aperture =
          "" + /\((.*)\)/.exec(data["ApertureValue"]?.val)[1];
        info.focalLength =
          parseFloat(data["FocalLength"]?.val.split(" ")[0]) + "mm";
        info.iso = data["ISOSpeedRatings"]?.val;
        setExif(info);
      });
  }, [image.href]);

  return (
    <a
      href={`https://img.cdn.whexy.com/${image.href}`}
      className="group"
    >
      <div className="aspect-w-4 aspect-h-3 w-full overflow-hidden rounded-lg bg-gray-200 sm:aspect-w-1 sm:aspect-h-1">
        <Image
          loader={galleryLoader}
          alt={image.name}
          src={image.href}
          quality={100}
          layout="fill"
          objectFit="cover"
          className={cn(
            "duration-700 ease-in-out sm:group-hover:opacity-75",
            isLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0",
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <div className="mt-2">
        <div className="flex justify-between">
          <h3 className="font-article text-lg">{`《${image.name}》`}</h3>
        </div>
        <div className="secondbg rounded-lg">
          <p className="text-xs font-light opacity-90">
            {exif && (
              <div className="grid grid-cols-5 place-items-center space-x-2 whitespace-nowrap py-2 px-2">
                <div className="flex items-center space-x-[2px]">
                  <CameraIcon />
                  <p>{`${exif.model}`}</p>
                </div>
                <div className="flex items-center space-x-[2px]">
                  <ExposureTimeIcon />
                  <p>{exif.exposureTime + "'"}</p>
                </div>
                <div className="flex items-center space-x-[2px]">
                  <FocusLengthIcon />
                  <p>{exif.focalLength}</p>
                </div>
                <div className="flex items-center space-x-[2px]">
                  <ApertureIcon />
                  <p>{exif.aperture}</p>
                </div>
                <div className="flex items-center space-x-[2px]">
                  <ISOIcon />
                  <p>{"ISO" + exif.iso}</p>
                </div>
              </div>
            )}
          </p>
        </div>
      </div>
    </a>
  );
}

const ExposureTimeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="h-4 w-4"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M11 4V1h2v3Zm0 19v-3h2v3Zm9-10v-2h3v2ZM1 13v-2h3v2Zm17.7-6.3-1.4-1.4 1.75-1.8 1.45 1.45ZM4.95 20.5 3.5 19.05l1.8-1.75 1.4 1.4Zm14.1 0-1.75-1.8 1.4-1.4 1.8 1.75ZM5.3 6.7 3.5 4.95 4.95 3.5 6.7 5.3ZM12 18q-2.5 0-4.25-1.75T6 12q0-2.5 1.75-4.25T12 6q2.5 0 4.25 1.75T18 12q0 2.5-1.75 4.25T12 18Z"
    />
  </svg>
);

const FocusLengthIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="h-4 w-4"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M12 17q-2.075 0-3.537-1.463Q7 14.075 7 12t1.463-3.538Q9.925 7 12 7t3.538 1.462Q17 9.925 17 12q0 2.075-1.462 3.537Q14.075 17 12 17Zm0-2q1.25 0 2.125-.875T15 12q0-1.25-.875-2.125T12 9q-1.25 0-2.125.875T9 12q0 1.25.875 2.125T12 15Zm-7 6q-.825 0-1.413-.587Q3 19.825 3 19v-4h2v4h4v2Zm10 0v-2h4v-4h2v4q0 .825-.587 1.413Q19.825 21 19 21ZM3 9V5q0-.825.587-1.413Q4.175 3 5 3h4v2H5v4Zm16 0V5h-4V3h4q.825 0 1.413.587Q21 4.175 21 5v4Zm-7 3Z"
    />
  </svg>
);

const ApertureIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="h-4 w-4"
    viewBox="0 0 256 256"
  >
    <path
      fill="currentColor"
      d="M232 128A104.1 104.1 0 0 0 128 24 104.1 104.1 0 0 0 24 128a104.1 104.1 0 0 0 104 104h.1A104.1 104.1 0 0 0 232 128Zm-122.2 21.4-9.4-26.4 18.2-21.4 27.6 5 9.4 26.4-18.2 21.4ZM49.2 88.9l51.2 9.4-53.7 63.2a88 88 0 0 1 2.5-72.6Zm160.1 5.6a88 88 0 0 1-2.5 72.6l-51.2-9.4Zm-8-15.2L167.6 119l-28-78.2a86.8 86.8 0 0 1 50.6 25 88.5 88.5 0 0 1 11.1 13.5Zm-78.9-39.1 17.5 49-81.6-14.9a99.2 99.2 0 0 1 7.5-8.5 87.1 87.1 0 0 1 56.6-25.6ZM54.7 176.7 88.4 137l28 78.2a86.8 86.8 0 0 1-50.6-25 88.5 88.5 0 0 1-11.1-13.5Zm78.9 39.1-17.5-49 23 4.2h.1l58.5 10.7a99.2 99.2 0 0 1-7.5 8.5 87.1 87.1 0 0 1-56.6 25.6Z"
    />
  </svg>
);

const ISOIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="h-4 w-4"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5.5 7.5h2v-2H9v2h2V9H9v2H7.5V9h-2V7.5zM19 19H5L19 5v14zm-2-2v-1.5h-4V17h5z"
    />
  </svg>
);

const CameraIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="h-4 w-4"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M12 18q2.075 0 3.538-1.462Q17 15.075 17 13q0-2.075-1.462-3.538Q14.075 8 12 8 9.925 8 8.463 9.462 7 10.925 7 13q0 2.075 1.463 3.538Q9.925 18 12 18Zm0-2q-1.25 0-2.125-.875T9 13q0-1.25.875-2.125T12 10q1.25 0 2.125.875T15 13q0 1.25-.875 2.125T12 16Zm6-6q.425 0 .712-.288Q19 9.425 19 9t-.288-.713Q18.425 8 18 8t-.712.287Q17 8.575 17 9t.288.712Q17.575 10 18 10ZM4 21q-.825 0-1.412-.587Q2 19.825 2 19V7q0-.825.588-1.412Q3.175 5 4 5h3.15L8.7 3.325q.15-.15.337-.238Q9.225 3 9.425 3h5.15q.2 0 .388.087.187.088.337.238L16.85 5H20q.825 0 1.413.588Q22 6.175 22 7v12q0 .825-.587 1.413Q20.825 21 20 21Zm16-2V7h-4.05l-1.825-2h-4.25L8.05 7H4v12Zm-8-6Z"
    />
  </svg>
);

export async function getStaticProps() {
  const resp = await fetch("https://sub.shiwx.org/galleries.json?");
  const data = await resp.json();
  return { props: { galleries: data } };
}

export default GalleryPage;
