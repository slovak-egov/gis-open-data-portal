import { NextApiRequest, NextApiResponse } from "next";

function Ip() {
  return <></>;
}

export async function getServerSideProps({
  res,
  req,
}: {
  res: NextApiResponse;
  req: NextApiRequest;
}) {
  let ipAddress = req.headers["x-real-ip"] as string;

  const forwardedFor = req.headers["x-forwarded-for"] as string;
  if (!ipAddress && forwardedFor) {
    ipAddress = forwardedFor?.split(",").at(0) ?? "Unknown";
  }

  res.write(ipAddress);
  res.end();

  return {
    props: {},
  };
}

export default Ip;
