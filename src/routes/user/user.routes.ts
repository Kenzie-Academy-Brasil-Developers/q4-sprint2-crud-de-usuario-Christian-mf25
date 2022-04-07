import {
  createUserController,
  deleteUserController,
  loginUserController,
  retrieveProfileController,
  retrieveUserController,
  updateUserController,
} from "../../controller";
import {
  validateAuthMiddleware,
  validateShape,
  validateToken,
  verifyAdmMiddleware,
} from "../../middlewares";
import { createUserShape, loginShape, updateUserShape } from "../../shapes";

const userRoutes = (route: any): void => {
  route.post("", validateShape(createUserShape), createUserController);
  route.post(
    "/login",
    validateShape(loginShape),
    validateToken,
    loginUserController
  );
  route.get(
    "",
    validateAuthMiddleware,
    verifyAdmMiddleware,
    retrieveUserController
  );
  route.get("/profile", validateAuthMiddleware, retrieveProfileController);
  route.patch("/:uuid", validateAuthMiddleware, updateUserController);
  route.delete(
    "/:uuid",
    validateShape(updateUserShape),
    validateAuthMiddleware,
    deleteUserController
  );
};

export default userRoutes;
