import passport from "passport";

const validarSesion = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Error interno del servidor",
      });
    }

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Token inválido o expirado",
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

export default validarSesion;
