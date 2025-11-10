import apicache from "apicache";

const cache = apicache.middleware;

export const limpiarCache = (req, res, next) => {
  if (["POST", "PATCH", "DELETE", "PUT"].includes(req.method)) {
    apicache.clear();
  }
  next();
};

export const guardarCache = cache("5 minutes", (req, res) => {
  // Solo cachear respuestas exitosas de tipo GET
  return req.method === "GET" && res.statusCode === 200;
});
