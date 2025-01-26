import { Loading } from "@/components/Loading";
import { useEffect, useState } from "react";

export function MyIp() {
  const [ip, setIp] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch("https://api.ipify.org?format=json")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setIp(data.ip);
    //     setLoading(false);
    //   });
  }, []);

  if (loading) {
    return (
      <div className="relative flex justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="text-center text-4xl sm:text-6xl lg:text-8xl text-primary">
        {ip}
      </div>
    </>
  );
}