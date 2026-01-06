import type { RequestHandler } from "express";
import programRepository from "./programRepository";

const browse: RequestHandler = async (req, res) => {
  const programsFromDB = await programRepository.readAll();
  res.json(programsFromDB);
};

export default { browse };
