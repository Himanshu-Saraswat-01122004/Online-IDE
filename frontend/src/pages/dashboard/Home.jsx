
import { WobbleCard } from "@/components/ui/wobble-card";
import { TailwindcssButtons } from "@/components/ui/tailwindcss-buttons";
import { HoverEffect } from "@/components/ui/card_container";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import React from "react";
import { useNavigate } from "react-router-dom";
import CreateContButton  from  "@/components/dashboard/CreateContainer"



function Home() {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

useEffect(() => {
  const fetchContainers = async () => {
    try {
      const tok = JSON.parse(localStorage.getItem("token"));
      console.log(tok);
      const response = await fetch("http://localhost:3000/container/listcontainers", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + tok.token,
        },
      });
      const data = await response.json();
      
      const userContainers = data.map(container => ({
        title: container.name,
        description: `Last used: ${container.lastUsed}`,
        link: `project/${container.id}`
      }));
      console.log(userContainers);
      setProjects(userContainers);
      if (data === null) {
        console.log("empytyjhbj")
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  fetchContainers();
  // const data = [
  //   {
  //     title: "Stripe",
  //     description:
  //       "A technology company that builds economic infrastructure for the internet.",
  //     link: "#",
  //   },
  //   {
  //     title: "Netflix",
  //     description:
  //       "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
  //     link: "#",
  //   },
  //   {
  //     title: "Google",
  //     description:
  //       "A multinational technology company that specializes in Internet-related services and products.",
  //     link: "#",
  //   },
  //   {
  //     title: "Meta",
  //     description:
  //       "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
  //     link: "#",
  //   },
  //   // {
  //   //   title: "Amazon",
  //   //   description:
  //   //     "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
  //   //   link: "https://amazon.com",
  //   // },
  //   // {
  //   //   title: "Microsoft",
  //   //   description:
  //   //     "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
  //   //   link: "https://microsoft.com",
  //   // },
  // ];
  // setProjects(data);

  // fetchProjects();
}, []);


  return (
    <div>
      <div className=" ">
        <CreateContButton />    
      {/* Add recent activity content */}
      </div>
    <div>
      <div className="mt-8 flex justify-between pr-32">
        <div>
        <h2 className="text-xl bg-transparent font-bold">Recent Containers</h2>
        </div>
        <div>
        <TailwindcssButtons idx={1} onClick={() => navigate("/containers")}>
          {"Show all"}
        </TailwindcssButtons>
        </div>
      </div>
      
      <div className="rounded-sm h-auto overflow-auto">
        <div className="max-w-5xl text-black border-2">
        <HoverEffect items={projects.slice(0,5)} />
        </div>
        {/* Add more containers as needed */}
      </div>
      </div>
    </div>
    );
}

export default Home;