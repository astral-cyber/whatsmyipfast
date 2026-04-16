import { useState, useCallback, useEffect } from "react";

export interface IpInfo {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  org?: string;
  timezone?: string;
  loc?: string;
}

export const useIpInfo = () => {
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchIp = useCallback(() => {
    setLoading(true);
    fetch("https://ipinfo.io/json?token=")
      .then((res) => res.json())
      .then((data) => { setIpInfo(data); setLoading(false); })
      .catch(() => {
        fetch("https://api.ipify.org?format=json")
          .then((res) => res.json())
          .then((data) => { setIpInfo({ ip: data.ip }); setLoading(false); })
          .catch(() => setLoading(false));
      });
  }, []);

  useEffect(() => { fetchIp(); }, [fetchIp]);

  return { ipInfo, loading, fetchIp };
};
