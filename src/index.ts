// import cookieSession from "cookie-session";
import express, { Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer, gql } from "apollo-server-core";
import http from "http";
import { DocumentNode } from "graphql";

// const app = express();

// app.use(cookieSession({ secret: "test secret" }));
// app.use(count);

// function count(req: Request, res: Response) {
//   console.log(req.session);
//   if (!req.session) return;
//   req.session.count = (req.session.count || 0) + 1;
//   res.send("viewed " + req.session.count + " times\n");
// }

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const resolver = {
  Query: {
    /* @ts-ignore */
    books: (root, args, context, info) => {
      console.log("zzz", context);
      const { res } = context;
      res.cookie("test_token_cookie", "my_token", { httpOnly: true });
      return [
        { title: "book1", author: "author1" },
        { title: "book2", author: "author2" },
      ];
    },
  },
};

async function startApolloServer(typeDefs: DocumentNode, resolvers: any) {
  const app = express();

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req, res }) => {
      return { req, res };
    },
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolver);
// app.listen(4000);
// console.log("express started 🕙 http://localhost:4000");
