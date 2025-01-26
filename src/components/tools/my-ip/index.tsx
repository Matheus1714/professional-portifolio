import { useEffect, useState } from "react";

export function MyIp() {
  const [ip, setIp] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIp(data.ip));
  }, []);

  return (
    <>
      <div className="text-center text-4xl sm:text-6xl lg:text-8xl text-primary">
        {ip}
      </div>
    </>
  );
}