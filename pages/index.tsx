import Head from "next/head";
import { useState } from "react";
import type { MouseEventHandler } from "react";
import { random } from "lodash";
import { LazyImage } from "@/components/RandomFox";

// random fuction between 1 and 123
const myRandom = () => random(1, 123);

// simple unique id
const generateId = () => Math.random().toString(36).substring(2, 9);

export default function Home() {
  const [images, setImages] = useState<Array<IFoxImageItem>>([]);

  const addNewFox: MouseEventHandler<HTMLButtonElement> = (event) => {
    const newImageItem: IFoxImageItem = {
      id: generateId(),
      url: `https://randomfox.ca/images/${myRandom()}.jpg`,
    };

    setImages([...images, newImageItem]);
    window.plausible("add_fox");
  };

  return (
    <div>
      <Head>
        <title>Random Fox</title>
        <script
          defer
          data-domain="yourdomain.com"
          src="https://plausible.io/js/script.js"
        ></script>
      </Head>

      <main>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <button onClick={addNewFox}>Add new fox</button>
        {images.map(({ id, url }, index) => (
          <div key={id} className="p-4">
            <LazyImage
              className="rounded-lg bg-gray-300"
              src={url}
              width={320}
              height="auto"
              onClick={() => console.log("hey")}
              onLazyLoad={(img) => {
                console.log(`Image #${index + 1} cargada. Nodo: `, img);
              }}
            />
          </div>
        ))}
      </main>

      <footer></footer>
    </div>
  );
}
