import axios from "axios";
import { Button, Card } from "flowbite-react";
import { useEffect, useState } from "react";


export default function Customize() {
  const [dress, setDress] = useState([]);

  useEffect(() => {
    const fetchDress = async () => {
      const res = await axios("/api/cloth/get");
      setDress([...res.data].filter((d) => d.isCustomizable && d.clothType === "Top"));
    };

    fetchDress();
  }, []);
  return (
    <div className="pt-20 pb-20 pl-10 pr-10">
      <h1 className="mb-10 text-4xl text-center ">Customizable Collection</h1>
      <div className="w-full grid gap-10 grid-cols-4  ">
        {dress.map((item, index) => (
          <Card
            key={index}
            className="max-w-sm"
            imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
            imgSrc={item.imageUrl}
          >
            <a href="#">
              <h4 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {item.dressName}
              </h4>
              <h5 className="text-l font-semibold tracking-tight text-gray-900 dark:text-white">
                {item.Discription}
              </h5>
            </a>

            <div className="flex items-center justify-between">
              <span className="text-l font-bold text-gray-900 dark:text-white">
                Rs . {item.price} /=
              </span>
              <Button onClick={() => (window.location = `/dressCustomize/${item._id}`)}>
                Customize
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
