export const Routes = {
  GeneralLanding: { path: "/" },
  Signin: { path: "/sign-in" },
  Signup: { path: "/sign-up" },
  ForgotPassword: { path: "/forgot-password" },
  ResetPassword: { path: "/reset-password/:_token" },
  VerifyEmail: { path: "/verify-request/:_token" },
  Dashboard: { path: "/dashboard" },
  NotFound: { path: "/404" },
  ServerError: { path: "/500" },
  Forbidden: { path: "/403" },

  AddUser: { path: "/users/create" },
  EditUser: { path: "/users/:_id/edit" },
  User: { path: "/users/:_id" },
  Users: { path: "/users" },

  MyProfile: { path: "/profile" },
  EditMyProfile: { path: "/profile/edit" },

  AddRole: { path: "/roles/create" },
  EditRole: { path: "/roles/:_id/edit" },
  Role: { path: "/roles/:_id" },
  Roles: { path: "/roles" },
};
