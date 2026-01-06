import type { RequestHandler } from "express";

const categories = [
  {
    id: 1,
    name: "Comédie",
  },
  {
    id: 2,
    name: "Science-Fiction",
  },
];

const browse: RequestHandler = (req, res) => {
  res.json(categories);
};

const read: RequestHandler = (req, res) => {
  const categoryId = Number(req.params.id);

  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    res.sendStatus(404);
    return;
  }

  res.json(category);
};

export default { browse, read };
