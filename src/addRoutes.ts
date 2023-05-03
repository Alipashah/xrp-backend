import { Express } from "express";
import { readdirSync } from "fs";

function addRoutesToApp(
  app: Express,
  routesFolderPath: string,
  baseRoute: string
) {
  try {
    readdirSync(routesFolderPath)
      .filter((file) => {
        return file.endsWith(".ts");
      })
      .forEach(async (file) => {
        const routerFilePath = "./routes/" + replaceTsWithJs(file);

        const importedModule = await import(routerFilePath);
        app.use(
          `/${baseRoute}/${file.replace(".ts", "")}`,
          importedModule.default
        );
      });
  } catch (e) {
    console.error(e, "error");
  }
}

function replaceTsWithJs(fileString: string) {
  return fileString.replace(".ts", ".js");
}

export default addRoutesToApp;
