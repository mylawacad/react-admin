import {
  createServer,
  Model,
  JSONAPISerializer,
  Response,
  hasMany,
  belongsTo,
} from "miragejs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import randomName from "./data/random-name";
import _ from "lodash";

// serializer setup
const _JSONAPISerializer = JSONAPISerializer.extend({
  keyForAttribute(attr) {
    return attr;
  },
});

// Mirage server
export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    serializers: {
      application: _JSONAPISerializer,
      user: _JSONAPISerializer.extend({
        attrs: [
          "firstName",
          "lastName",
          "email",
          "image",
          "createdAt",
          "updatedAt",
        ],
        include: ["role"],
      }),
      role: _JSONAPISerializer.extend({
        include: function (request) {
          if (request?.queryParams?.include === "permission") {
            return ["permission"];
          } else {
            return [];
          }
        },
      }),
    },

    models: {
      role: Model.extend({
        user: hasMany(),
        permission: hasMany(),
      }),
      user: Model.extend({
        role: belongsTo(),
      }),
      permission: Model.extend({
        role: hasMany(),
      }),
      token: Model,
    },

    seeds(server) {
      console.log(
        "<========================== SEEDING DATA ============================>"
      );

      const basicPermissions = [];
      //basicPermissions.push(server.create("permission", { title: 'Check own permissions', method: "POST", path: "/check-user-permissions", createdAt: new Date(), updatedAt: new Date() }))
      basicPermissions.push(
        server.create("permission", {
          title: "Get own user profile",
          method: "GET",
          path: "/user",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      );
      basicPermissions.push(
        server.create("permission", {
          title: "Edit own user profile",
          method: "PUT",
          path: "/user",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      );

      const elevatedPermissions = [...basicPermissions];
      elevatedPermissions.push(
        server.create("permission", {
          title: "Get roles",
          method: "GET",
          path: "/roles",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      );
      elevatedPermissions.push(
        server.create("permission", {
          title: "Add role",
          method: "POST",
          path: "/roles",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      );
      elevatedPermissions.push(
        server.create("permission", {
          title: "Get role",
          method: "GET",
          path: "/roles/:_id",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      );
      elevatedPermissions.push(
        server.create("permission", {
          title: "Edit role",
          method: "PUT",
          path: "/roles/:_id",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      );
      elevatedPermissions.push(
        server.create("permission", {
          title: "Delete role",
          method: "DELETE",
          path: "/roles/:_id",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      );
      elevatedPermissions.push(
        server.create("permission", {
          title: "Get permissions",
          method: "GET",
          path: "/permissions",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      );
      elevatedPermissions.push(
        server.create("permission", {
          title: "Get users",
          method: "GET",
          path: "/users",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      );
      elevatedPermissions.push(
        server.create("permission", {
          title: "Add user",
          method: "POST",
          path: "/users",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      );
      elevatedPermissions.push(
        server.create("permission", {
          title: "Get user",
          method: "GET",
          path: "/users/:_id",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      );
      elevatedPermissions.push(
        server.create("permission", {
          title: "Edit user",
          method: "PUT",
          path: "/users/:_id",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      );
      elevatedPermissions.push(
        server.create("permission", {
          title: "Delete user",
          method: "DELETE",
          path: "/users/:_id",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      );

      const adminRole = server.create("role", {
        roleName: "Administrator",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const managerRole = server.create("role", {
        roleName: "Attorney",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      managerRole.permissionIds = basicPermissions.map(
        (permission) => permission.id
      );
      managerRole.save();

      adminRole.permissionIds = elevatedPermissions.map(
        (permission) => permission.id
      );
      adminRole.save();

      // Admin user
      server.create("user", {
        firstName: "Andrew",
        lastName: "Smith",
        email: "mylawacad+A@gmail.com",
        image: "https://xsgames.co/randomusers/assets/avatars/male/42.jpg",
        role: adminRole,
        createdAt: new Date(),
        updatedAt: new Date(),
        password: bcrypt.hashSync("123-Test", 10),
      });

      // Manager user
      server.create("user", {
        firstName: "Bob",
        lastName: "Dou",
        email: "mylawacad+B@gmail.com",
        image: "https://xsgames.co/randomusers/assets/avatars/male/21.jpg",
        role: managerRole,
        createdAt: new Date(),
        updatedAt: new Date(),
        password: bcrypt.hashSync("123-Test", 10),
      });

      // No role user
      server.create("user", {
        firstName: "Alice",
        lastName: "Dou",
        email: "mylawacad+C@gmail.com",
        image: "https://xsgames.co/randomusers/assets/avatars/female/71.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
        password: bcrypt.hashSync("123-Test", 10),
      });

      // Many manager users
      for (let i = 0; i < 50; i++) {
        const first = randomName("first");
        const last = randomName("last");
        const sexList = ["male", "female"];
        const sex = sexList[Math.floor(Math.random() * 2)];
        server.create("user", {
          firstName: first,
          lastName: last,
          email: `${first}.${last}@gmail.com`.toLowerCase(),
          image: `https://xsgames.co/randomusers/assets/avatars/${sex}/${i}.jpg`,
          role: managerRole,
          createdAt: new Date(),
          updatedAt: new Date(),
          password: bcrypt.hashSync("123-Test", 10),
        });
      }
    },

    routes() {
      this.namespace = "api";

      // User Sign In
      this.post("/sign-in", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const { email, password } = attrs;
        const user = schema.users.findBy({ email });

        if (!user) {
          return new Response(
            403,
            { contentType: "application/json" },
            {
              errors: [
                {
                  code: "invalid-user",
                  status: "403",
                  source: { pointer: "/sign-in" },
                  title: "Invalid Credentials",
                  detail: "Sorry, no such user found. Try registering.",
                },
              ],
            }
          );
        }

        if (!bcrypt.compareSync(password, user.password)) {
          return new Response(
            403,
            { contentType: "application/json" },
            {
              errors: [
                {
                  code: "invalid-credentials",
                  status: "403",
                  source: { pointer: "/sign-in" },
                  title: "Invalid Credentials",
                  detail: "Sorry, try other credentials please.",
                },
              ],
            }
          );
        }

        const accessToken = jwt.sign({ userId: user.id }, this.env.JWT_SECRET, {
          expiresIn: this.env.JWT_EXPIRATION,
        });

        const token = server.create("token", { token: accessToken });
        return token;
      });

      // User password reset
      this.post("/reset-password", (schema, request) => {
        return new Response(
          500,
          { contentType: "application/json" },
          {
            errors: [
              {
                code: "not-today",
                status: "500",
                source: { pointer: "/sign-in" },
                title: "Not today feature",
                detail:
                  "This is a Mirage.  We will send you an email other day. We promice.",
              },
            ],
          }
        );
      });

      // My profile
      this.get("/user", (schema, request) => {
        const requestedPermissions = [{ method: "GET", path: "/user" }];
        const { user, error: authError } = this.middleware.isAuth(
          schema,
          request,
          requestedPermissions
        );
        if (authError) {
          return authError;
        }

        return user;
      });

      // Edit my profile
      this.put("/user", (schema, request) => {
        const requestedPermissions = [{ method: "PUT", path: "/user" }];
        const { user, error: authError } = this.middleware.isAuth(
          schema,
          request,
          requestedPermissions
        );
        if (authError) {
          return authError;
        }

        const apiEndpointUrl = new URL(request.responseURL);
        const pointer = apiEndpointUrl.pathname;
        let body = JSON.parse(request.requestBody);

        const model = user;

        if (!model) {
          return new Response(
            404,
            { contentType: "application/json" },
            {
              errors: [
                {
                  code: "no-item",
                  status: "404",
                  source: { pointer },
                  title: "Not found",
                  detail: "Item not found.",
                },
              ],
            }
          );
        }

        // check already email exists
        if (model.email !== body?.attributes?.email) {
          const emailExists = schema.users.findBy({
            email: body?.attributes?.email,
          });
          if (emailExists) {
            return new Response(
              403,
              { contentType: "application/json" },
              {
                errors: [
                  {
                    code: "email-exists",
                    status: "403",
                    source: { pointer: "/sign-in" },
                    title: "Invalid email",
                    detail: "This email already taken.",
                  },
                ],
              }
            );
          }
        }

        model.update({
          ...body.attributes,
          updatedAt: new Date(),
        });

        return model;
      });

      // Users list
      this.get("/users", (schema, request) => {
        const requestedPermissions = [{ method: "GET", path: "/users" }];
        const { error: authError } = this.middleware.isAuth(
          schema,
          request,
          requestedPermissions
        );
        if (authError) {
          return authError;
        }

        let query = request.queryParams;

        // Mirage components issue: https://github.com/miragejs/ember-cli-mirage/issues/420
        const limit = parseInt(query["page[limit]"] || 10);
        const offset = parseInt(query["page[offset]"] || 0);
        const search = query["filter[search]"] || "";
        const roleId = query["filter[roleId]"] || "";

        const collectionAll = schema.users
          .all()
          .sort((a, b) => {
            return b.id < a.id;
          })
          .filter((item) => {
            if (
              search &&
              !(item?.email || "").toLowerCase().includes(search.toLowerCase())
            ) {
              return false;
            }

            if (roleId && item.roleId !== roleId) {
              return false;
            }

            return true;
          });

        const collection = collectionAll.slice(offset, offset + limit);

        let json = this.serializerOrRegistry.serialize(collection);
        json.meta = {
          count: collection.length,
          countTotal: collectionAll.length,
        };
        return json;
      });

      // User by id
      this.get("/users/:id", (schema, request) => {
        const requestedPermissions = [{ method: "GET", path: "/users/:_id" }];
        const { error: authError } = this.middleware.isAuth(
          schema,
          request,
          requestedPermissions
        );
        if (authError) {
          return authError;
        }

        let id = request.params.id;
        return schema.users.find(id);
      });

      // Create user
      this.post("/users", (schema, request) => {
        const requestedPermissions = [{ method: "POST", path: "/users" }];
        const { error: authError } = this.middleware.isAuth(
          schema,
          request,
          requestedPermissions
        );
        if (authError) {
          return authError;
        }

        let body = JSON.parse(request.requestBody);

        // TODO:  add yup schema validation here

        // check already email exists
        const emailExists = schema.users.findBy({
          email: body?.attributes?.email,
        });
        if (emailExists) {
          return new Response(
            403,
            { contentType: "application/json" },
            {
              errors: [
                {
                  code: "email-exists",
                  status: "403",
                  source: { pointer: "/sign-in" },
                  title: "Invalid email",
                  detail: "This email already taken. Try to log in.",
                },
              ],
            }
          );
        }

        const model = schema.users.create({
          ...body.attributes,
          roleId: body.relationships.role.data.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        return model;
      });

      // Edit user
      this.put("/users/:id", (schema, request) => {
        const requestedPermissions = [{ method: "PUT", path: "/users/:_id" }];
        const { error: authError } = this.middleware.isAuth(
          schema,
          request,
          requestedPermissions
        );
        if (authError) {
          return authError;
        }

        let id = request.params.id;
        const apiEndpointUrl = new URL(request.responseURL);
        const pointer = apiEndpointUrl.pathname;

        let body = JSON.parse(request.requestBody);

        const model = schema.users.find(id);

        if (!model) {
          return new Response(
            404,
            { contentType: "application/json" },
            {
              errors: [
                {
                  code: "no-item",
                  status: "404",
                  source: { pointer },
                  title: "Not found",
                  detail: "Item not found.",
                },
              ],
            }
          );
        }

        // check already email exists
        if (model.email !== body?.attributes?.email) {
          const emailExists = schema.users.findBy({
            email: body?.attributes?.email,
          });
          if (emailExists) {
            return new Response(
              403,
              { contentType: "application/json" },
              {
                errors: [
                  {
                    code: "email-exists",
                    status: "403",
                    source: { pointer: "/sign-in" },
                    title: "Invalid email",
                    detail: "This email already taken.",
                  },
                ],
              }
            );
          }
        }

        model.update({
          ...body.attributes,
          roleId: body.relationships.role.data.id,
          updatedAt: new Date(),
        });

        return model;
      });

      // Delete user
      this.delete("/users/:id", (schema, request) => {
        const requestedPermissions = [
          { method: "DELETE", path: "/users/:_id" },
        ];
        const { error: authError } = this.middleware.isAuth(
          schema,
          request,
          requestedPermissions
        );
        if (authError) {
          return authError;
        }

        let id = request.params.id;
        const apiEndpointUrl = new URL(request.responseURL);
        const pointer = apiEndpointUrl.pathname;

        const model = schema.users.find(id);

        if (!model) {
          return new Response(
            404,
            { contentType: "application/json" },
            {
              errors: [
                {
                  code: "no-item",
                  status: "404",
                  source: { pointer },
                  title: "Not found",
                  detail: "Item not found.",
                },
              ],
            }
          );
        }

        model.destroy();

        return new Response(
          200,
          { contentType: "application/json" },
          { data: { type: "users", id } }
        );
      });

      // Roles list
      this.get("/roles", (schema, request) => {
        const requestedPermissions = [{ method: "GET", path: "/roles" }];
        const { error: authError } = this.middleware.isAuth(
          schema,
          request,
          requestedPermissions
        );
        if (authError) {
          return authError;
        }

        let query = request.queryParams;

        // Mirage components issue: https://github.com/miragejs/ember-cli-mirage/issues/420
        const limit = parseInt(query["page[limit]"] || 10);
        const offset = parseInt(query["page[offset]"] || 0);
        const search = query["filter[search]"] || "";

        const collectionAll = schema.roles
          .all()
          .sort((a, b) => {
            return b.id < a.id;
          })
          .filter((item) => {
            if (
              search &&
              !(item?.roleName || "")
                .toLowerCase()
                .includes(search.toLowerCase())
            ) {
              return false;
            }

            return true;
          });

        const collection = collectionAll.slice(offset, offset + limit);

        let json = this.serializerOrRegistry.serialize(collection);
        json.meta = {
          count: collection.length,
          countTotal: collectionAll.length,
        };
        return json;
      });

      // Role by id
      this.get("/roles/:id", (schema, request) => {
        const requestedPermissions = [{ method: "GET", path: "/roles/:_id" }];
        const { error: authError } = this.middleware.isAuth(
          schema,
          request,
          requestedPermissions
        );
        if (authError) {
          return authError;
        }

        let id = request.params.id;
        return schema.roles.find(id);
      });

      // Create role
      this.post("/roles", (schema, request) => {
        const requestedPermissions = [{ method: "POST", path: "/roles" }];
        const { error: authError } = this.middleware.isAuth(
          schema,
          request,
          requestedPermissions
        );
        if (authError) {
          return authError;
        }

        let body = JSON.parse(request.requestBody);

        // TODO:  add yup schema validation here

        // check already exists
        const exists = schema.roles.findBy({
          roleName: body?.attributes?.roleName,
        });
        if (exists) {
          return new Response(
            403,
            { contentType: "application/json" },
            {
              errors: [
                {
                  code: "role-exists",
                  status: "403",
                  source: { pointer: "/sign-in" },
                  title: "Invalid name",
                  detail: "This name already taken.",
                },
              ],
            }
          );
        }

        const model = schema.roles.create({
          ...body.attributes,
          permissionIds: (body?.relationships?.permission?.data || []).map(
            (permission) => permission.id
          ),
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        return model;
      });

      // Edit role
      this.put("/roles/:id", (schema, request) => {
        const requestedPermissions = [{ method: "PUT", path: "/roles/:_id" }];
        const { error: authError } = this.middleware.isAuth(
          schema,
          request,
          requestedPermissions
        );
        if (authError) {
          return authError;
        }

        let id = request.params.id;
        const apiEndpointUrl = new URL(request.responseURL);
        const pointer = apiEndpointUrl.pathname;

        let body = JSON.parse(request.requestBody);

        const model = schema.roles.find(id);

        if (!model) {
          return new Response(
            404,
            { contentType: "application/json" },
            {
              errors: [
                {
                  code: "no-item",
                  status: "404",
                  source: { pointer },
                  title: "Not found",
                  detail: "Item not found.",
                },
              ],
            }
          );
        }

        // check already name exists
        if (model.roleName !== body?.attributes?.roleName) {
          const exists = schema.roles.findBy({
            roleName: body?.attributes?.roleName,
          });
          if (exists) {
            return new Response(
              403,
              { contentType: "application/json" },
              {
                errors: [
                  {
                    code: "role-exists",
                    status: "403",
                    source: { pointer: "/sign-in" },
                    title: "Invalid role name",
                    detail: "This name already taken.",
                  },
                ],
              }
            );
          }
        }

        model.update({
          ...body.attributes,
          permissionIds: (body?.relationships?.permission?.data || []).map(
            (permission) => permission.id
          ),
          updatedAt: new Date(),
        });

        return model;
      });

      // Delete role
      this.delete("/roles/:id", (schema, request) => {
        const requestedPermissions = [
          { method: "DELETE", path: "/roles/:_id" },
        ];
        const { error: authError } = this.middleware.isAuth(
          schema,
          request,
          requestedPermissions
        );
        if (authError) {
          return authError;
        }

        let id = request.params.id;
        const apiEndpointUrl = new URL(request.responseURL);
        const pointer = apiEndpointUrl.pathname;

        const model = schema.roles.find(id);

        if (!model) {
          return new Response(
            404,
            { contentType: "application/json" },
            {
              errors: [
                {
                  code: "no-item",
                  status: "404",
                  source: { pointer },
                  title: "Not found",
                  detail: "Item not found.",
                },
              ],
            }
          );
        }

        model.destroy();

        return new Response(
          200,
          { contentType: "application/json" },
          { data: { type: "roles", id } }
        );
      });

      // Permissions list
      this.get("/permissions", (schema, request) => {
        const requestedPermissions = [{ method: "GET", path: "/permissions" }];
        const { error: authError } = this.middleware.isAuth(
          schema,
          request,
          requestedPermissions
        );
        if (authError) {
          return authError;
        }

        let query = request.queryParams;

        // Mirage components issue: https://github.com/miragejs/ember-cli-mirage/issues/420
        const limit = parseInt(query["page[limit]"] || 10);
        const offset = parseInt(query["page[offset]"] || 0);
        const search = query["filter[search]"] || "";

        const collectionAll = schema.permissions
          .all()
          .sort((a, b) => {
            return b.id < a.id;
          })
          .filter((item) => {
            if (
              search &&
              !(item?.roleName || "")
                .toLowerCase()
                .includes(search.toLowerCase())
            ) {
              return false;
            }

            return true;
          });

        const collection = collectionAll.slice(offset, offset + limit);

        let json = this.serializerOrRegistry.serialize(collection);
        json.meta = {
          count: collection.length,
          countTotal: collectionAll.length,
        };
        return json;
      });

      // Check permissions
      this.post("/check-user-permissions", (schema, request) => {
        const body = JSON.parse(request.requestBody);
        const requestedPermissions = body?.endpoints || [];
        const { error: authError } = this.middleware.isAuth(
          schema,
          request,
          requestedPermissions
        );
        if (authError) {
          return authError;
        }

        return new Response(
          200,
          { contentType: "application/json" },
          {
            data: {
              type: "permissions",
              hasRequestedPermissions: true,
            },
          }
        );
      });
    },
  });

  // imitate environment variables on backend
  server.env = {
    JWT_EXPIRATION: "24h",
    JWT_SECRET: "m2FLbTPeFW8Ptgwj8W351FRUzVMytfVz", //random secret
  };

  // imitate middleware
  server.middleware = {
    // auth middleware
    isAuth: function (schema, request, requestedPermissions) {
      const authBearer = request?.requestHeaders?.Authorization || "";
      const apiEndpointUrl = new URL(request.responseURL);
      const pointer = apiEndpointUrl.pathname;

      if (!(authBearer && authBearer.startsWith("Bearer "))) {
        return {
          error: new Response(
            401,
            { contentType: "application/json" },
            {
              errors: [
                {
                  code: "no-token",
                  status: "401",
                  source: { pointer },
                  title: "Authorization failed",
                  detail: "This endpoint requires user authorization.",
                },
              ],
            }
          ),
        };
      }

      const accessToken = authBearer.split(" ")[1];

      const decoded = jwt.verify(accessToken, server.env.JWT_SECRET);
      if (!decoded) {
        return {
          error: new Response(
            401,
            { contentType: "application/json" },
            {
              errors: [
                {
                  code: "no-auth",
                  status: "401",
                  source: { pointer },
                  title: "Authorization failed",
                  detail: "Authentication verification failed.  Try re-login.",
                },
              ],
            }
          ),
        };
      }

      // TODO: here we should also have Redis (or similar in-memstore) in place and check if this token was not voided.

      // get user from the db
      const user = schema.users.findBy({ id: decoded.userId });
      if (!user) {
        return {
          error: new Response(
            401,
            { contentType: "application/json" },
            {
              errors: [
                {
                  status: "003",
                  source: { pointer },
                  title: "Authorization failed",
                  detail: "Authenticated user not found.  Try re-login.",
                },
              ],
            }
          ),
        };
      }

      // permission check
      const userPermissions = (user?.role?.permission?.models || []).map(
        (p) => ({ method: p.method, path: p.path })
      );
      const hasRequestedPermissions = (requestedPermissions || []).every(
        (element) => {
          return _.find(userPermissions, element);
        }
      );

      if (!hasRequestedPermissions) {
        const apiEndpointUrl = new URL(request.responseURL);
        const pointer = apiEndpointUrl.pathname;
        return {
          error: new Response(
            403,
            { contentType: "application/json" },
            {
              errors: [
                {
                  code: "no-permissions",
                  status: "403",
                  source: { pointer },
                  title: "Forbidden",
                  detail: "Not enough permissions.",
                },
              ],
            }
          ),
        };
      }

      return {
        user: user,
        hasRequestedPermissions,
      };
    },
  };

  return server;
}
