# Softeng Starter Code Repo

This document contains an outline of
the entire repo, the tooling in the
repo, and explanations of the provided
tooling, including why it was selected.

Each "package" in this repo also contains a
readme, providing further details on its tooling,
and the reasoning for the tooling it has.

Make sure you take time to read through this
readme and the others in the repository to fully
understand the project structure. Also make sure
to read through the `package.json` files in each
of the packages.

<!-- TOC -->

- [Design Pattern](#design-pattern)
- [Getting Started](#getting-started)
- [Useful Scripts](#useful-scripts)
- [Frontend vs Backend (A Web-Development Overview)](#frontend-vs-backend-a-web-development-overview)
    - [The Hyper-Text Transfer Protocol (HTTP)](#the-hyper-text-transfer-protocol-http)
    - [Using HTTP](#using-http)
- [Package Overview](#package-overview)
    - [TypeScript](#typescript)
    - [Node.js](#nodejs)
    - [Yarn](#yarn)
    - [Turbo.repo](#turborepo)
    - [ESLint](#eslint)
    - [Prettier](#prettier)
    - [Husky](#husky)
    - [Docker](#docker)
    - [PostgreSQL](#postgresql)
    - [Traefik](#traefik)
    - [Vitest](#vitest)
- [Miscellaneous](#miscellaneous)
  - [.turbo](#turbo)
  - [.gitignore](#gitignore)
  - [Apps](#apps)
  - [Configs](#configs)
  - [node_modules](#node_modules)
  - [Packages](#packages)
      <!-- TOC -->


## Design Pattern

This repository follows a common one
in modern web-development:
The `monorepo` pattern. In this pattern,
one repository contains multiple "projects".
Generally, (and in this case), these are
one or more applications (for us, the frontend
app and the backend app - more on the difference later),
and packages containing common code between them.
The tooling in this repository is designed around
making development with this pattern easier and
faster.

Yarn workspaces allow you to manage multiple packages within a single monorepo,
enabling easy dependency management and efficient linking between packages.
Each workspace is a project or package with its own `package.json`, and Yarn handles them collectively,
ensuring dependencies are installed at the root level when possible.

## Getting Started

These installation instructions assume you already have Git, Node.js and PostgreSQL installed on your system.

- Clone the repo using Git
    - Ensure the path to the repo does not contain any spaces 
      (e.g. `C:\Users\JohnDoe\Soft Eng\startercode` would be invalid) 
    - If using Windows, ensure the repo is not in your OneDrive folder.

- Open the project in WebStorm. 
  - If using Windows, right click WebStorm before launching it and select 'Run as administrator'. *You will only need this to run the installation commands*.

- Open the terminal from the bottom left.
  - If using Windows, click the arrow next to the Terminal session and select Git bash as the shell. You can set Webstorm to default to this later.

- Run `corepack -v`.
    - Corepack should come installed with npm. If corepack is missing, run `npm install --g corepack` to install corepack.

- Run `corepack enable` to enable corepack. This will install Yarn based on the version defined in `/package.json`.
    - If you get permissions issues, make sure you're running the app in administrator mode on Windows as specified.

- Run `yarn --version` and verify the Yarn version is 4.7.0.

- Now that yarn is installed, you can use all the scripts defined in [Useful Scripts](#useful-scripts).

- Run `yarn install` to install all packages used in the project.

- Run `yarn setup` to create environment files for various run configurations.

- Make sure PostgreSQL is running locally. This will look different depending on your operating system and PostgreSQL installation.
    - The credentials from the default environment files are as follows:
    - User: `postgres`, Password: `postgres`, Database: `postgres`
    - You may change them to suit your specific environment. 
  
- Run `yarn workspace database push` to push the Prisma schema defined in the database package to your PostgreSQL database.

- Run `yarn dev` to start the development server.

### Starter Project

The starter project is a basic React application with a frontend, backend, and database, 
and takes advantage of all the workspaces/projects in the repo and features of Yarn workspaces.

- The *frontend* package runs the React application, a basic counter that communicates with a backend server to get and update the score.
- The *backend* package runs the backend Express server, which handles HTTP requests from the frontend to get and update the score. It communicates with the database via the database package.
- The *database* package hosts the Prisma client, which contains the Prisma schema and Prisma client.
- The *common* package holds a constants file that defines the API routes the frontend and backend use to communicate.

## Useful Scripts

- Run `yarn install` to install all packages.
- Run `yarn run dev` to run the development environment.
- Run `yarn run docker` to build and run a local Docker container with your application (using the settings from `/docker/docker-compose.yml`).
- Run `yarn run lint` to check for linting and styling issues.
- Run `yarn run lint:fix` to fix linting and styling issues.
- Run `yarn run deploy` to push your app to AWS ECR (Elastic Container Registry). You can run this container using AWS ECS, with properly configured environment variables.
- Run `yarn run fix` to clean the Yarn cache, Turbo cache, and rebuild the development environment which can fix some issues. If you have lint issues in WebStorm, run File -> Invalidate Caches.

You can also run any of these commands without `run`, e.g. `yarn dev`, Webstorm just doesn't show the nice play button in Markdown.

Running `yarn workspace [workspace_name] [script_name]` will run scripts from any of the workspaces in the project.
Alternatively, you can `cd` into any of the package directories and run yarn without the `workspace [workspace_name]` prefix.

There are many useful commands in the *database* package that you should become familiar with, including commands
to generate the Prisma client and to push schema changes to the database. For each of these commands, there is a variant
for local DB, WPI DB, and production DB. These connection details are in the three `.env` files in the root of your repo,
`.env` specifies the local configuration, `.env.wpi` specifies the configuration for WPI DB, `.env.prod` specifies the configuration
for production DB.

The `.env.aws` file specifies credentials and information about your AWS ECR repository. It also includes some settings for your Docker containers.

You can also run the frontend and backend separately by running their respective `yarn dev` scripts.

## Frontend vs Backend (A Web-Development Overview)

In web development, a server of some sort is needed
to provide the webpage to any browser requesting it.
This typically results in a static file (e.g., a file that never
changes based on the application state) being
sent to the requesting browser. These files are pre-created during development time
and served in a "bundle" (containing `HTML`, `JavaScript`, and `CSS`) that the browser
assembles to create a functional webpage.

In order to create a webpage that interacts with a database of some kind (e.g., to provide
some kind of persistent data storage) a server needs the ability to send content that is not
static (e.g., content that can be modified), and to allow content to be changed.

### The Hyper-Text Transfer Protocol (HTTP)

The protocol that allows both of these to happen is `HTTP` (the Hyper-Text Transfer Protocol), which
allows documents to be sent to webpages. With one more modern exception,
**this is the only way a web-app running in a browser can communicate with servers**. HTTP
supports a few request
type - each of which acts on a "resource". A resource is an idea - not a physical file/object.
You define what a resource is. The only requirement is that it
can be somehow identified consistently (e.g., by a URI - a Uniform Resource Identifier). URLs are a type
of URI, and are typically used in web-development to identify resources.
There is no required pattern for URIs - they just need to be
consistent enough that your frontend can find them, and that there are no duplicates. Resources can
support one or more
of the following request types in HTTP

- GET (e.g., fetch the resource in its current state)
- PUT (e.g., set the resource)
- POST (e.g., submit something to the resource - this generally is used to update a resource
  or send some sort
  of data to the server)
- DELETE (e.g., remove the resource)
- PATCH (e.g., apply some sort of partial modification to the resource)

For more information on HTTP, see https://developer.mozilla.org/en-US/docs/Web/HTTP

### Using HTTP

Historically, both roles were served by `PHP` - it could both statically serve files and
support the other HTTP operations on changeable resources.
In the modern web-development world, `PHP` is considered
legacy - there is modern tooling that does the same
job, is faster, and is easier to work with.

In modern applications, these tasks are typically done separately,
allowing one API (e.g., backend with changeable resources) to be used
with multiple frontends, and to allow the frontend to change
without affecting the backend.

## Package Overview

What follows is a basic overview of the packages in the repo,
and what files they use.

### TypeScript

JavaScript is a dynamically-typed language, meaning it does not need types
explicitly specified in code, as they are determined at runtime.

Unfortunately, that can sometimes complicate development, as your IDE is unable
to provide proper suggestions on method names, object parameters, and more, since it does
not know what type an object will be at runtime.

It can also introduce bugs that would normally be caught at compile-time.

Typescript solves this by requiring that type annotations be placed on variables,
method parameters, and method returns. These are often automatically inferred,
so tedious boilerplate is reduced.

Typescript compiles to JavaScript, catching any type errors in the process.

Typescript is configured by `tsconfig.json`. You **SHOULD NEVER** edit the top-level one
directly, as it simply refers to the typescript config project in `configs`. It exists at the top-level
for the benefit of your IDE, and links to the above project. You probably won't need
to modify the Typescript config at all. Each package contains its own tsconfig.json that
extends the base one, and provides some specific information about its
environment (for instance, web based or client based, and how packages are resolved).

See https://www.typescriptlang.org/docs/ for information on TypeScript and its types.

### Node.js

Node.js is the basis for much of the repository. It is a client-side Javascript runner,
that enables JavaScript code to execute outside a webpage in a browser (much like
other languages, such as Python).

You should never need to directly interact with Node. Yarn will run Node
programs for you.

For details on Node, see https://nodejs.org/dist/latest-v18.x/docs/api/

### Yarn

Yarn is a package manager and task runner for Node.js, enabling fast dependency acquisition and
the bundling of dependencies in Node.js tasks.

Yarn is an alternative to NPM (the Node Package Manager). Yarn was selected over NPM in this
application because it has better support for monorepos, including two key features:

Workspaces (which are essentially the projects in a monorepo) can be defined in a Yarn project.
Dependencies in monorepo workspaces are shared (e.g., installed once at the top level),
and one project can use another as a dependency. NPM's support for both of these is primitive by comparison.
See https://yarnpkg.com/features/workspaces for details on workspaces

Plug'n'Play, which bundles highly compressed dependencies in the monorepo's
GitHub repository. Yarn recommends this configuration, because it improves image build times
(as images do not need to be fetched each time), and it improves the repositories
resilience to bugs in Yarn itself, or dependencies, as they do not need to be fetched
each time.
See https://yarnpkg.com/features/pnp and https://yarnpkg.com/features/zero-installs for details
on Yarn Plug'n'Play.

A few files/folders define a Yarn configuration:

- `package.json`: This defines the project, as Yarn sees it. It includes dependencies,
  development dependencies (dependencies that are not needed for the final build image, but are needed
  for development. This can include testing tools, code quality tools, or deployment tools). It also defines
  a projects workspaces, scripts (tasks Yarn can run), and some other miscellaneous
  information. You may need to edit this file at some point. Note that every workspace will need its own
  package.json, to define
  its dependencies and scripts. Packages and scripts are not inherited from the root of a monorepo. To reference
  another workspace as a package, import it normally (workspace name), and then
  use "workspace:\*" as the version. Examples of this are in the repo.
  See https://yarnpkg.com/configuration/manifest for details on how to modify your package.json files.
- `yarn.lock`: This contains the tree of dependencies your monorepo needs.
  You should **NEVER MODIFY THIS FILE DIRECTLY**, as it is meant to be auto-generated by Yarn.
- `.yarnrc.yml` contains some basic information about Yarn's internal settings, such
  as supported architectures/operating systems, the build system to use, and a few other miscellaneous
  configuration
  options. You probably won't need to modify this file.
  See https://yarnpkg.com/configuration/yarnrc for details on the file
- `.pnp.cjs` and `.pnp.loader.mjs`: These are part of the internal
  workings of the Yarn Plug'n'Play setup. You **SHOULD NOT** modify these files, or add them to your
  `.gitignore`.
- `.yarn`: This is where the Yarn cache is, meaning your actual packages are stored here.
  Some parts of this folder are in the `.gitignore`, while others are not. Do NOT modify
  which parts are and which aren't, or the Yarn Plug'n'Play setup will break. Do NOT modify anything in this folder
  directly.

Here are a few useful Yarn commands:

- `yarn run <script>` will run the provided Yarn script from the root
- `yarn add <package> [--dev]` will add the provided package to Yarn, and install it
- `yarn install [--immutable] [--immutable-cache] [--check-cache]` will check that Yarn has correctly
  installed everything
  based on your package.json files. Immutable and Immutable-cache set Yarn to validation mode,
  meaning it won't modify your yarn.lock, rather it will verify your yarn.lock (and cache). Check-cache will force a more
  strict check of your Yarn cache. If you think your Yarn configuration is broken,
  delete `yarn.lock` and run `yarn install --check-cache`.

Any of the above commands can be prefixed with `yarn workspace <workspace>` (or you can be
in a workspace folder) to run the command in a specified workspace. Generally, you will only want to run
`yarn install` in this configuration, as top-level packages are rarely useful.

See https://yarnpkg.com/cli/install for more details on the Yarn CLI

### Turbo.repo

Turbo is a task-runner built on-top of Yarn, that enables the caching and
parallelization of tasks, and allows tasks to run in pipelines. Turbo is built around
monorepos, and greatly improves development image size and build speed.

Turbo's config is based in `turbo.json`, which can be nested on a per-project basis.
You probably won't need to directly interact with Turbo, or it's configuration.

It's documentation can be found here https://turbo.build/repo

### ESLint

ESLint is a linter for JavaScript/TypeScript. It checks your code for various quality
issues, and enforces some style guidelines. WebStorm directly integrates with
ESLint, and can give you quality warnings from ESLint directly in your
IDE.

ESLint is defined by its config, `eslint.config.js`. You **SHOULD NEVER** modify the top level
.eslintrc.cjs file. It exists exclusively for the benefit of your IDE, importing the custom
package in `configs`. You probably won't need to modify your ESLint config directly,
but if you want to change your style rules, you can do so there. Each project also contains its own .eslintrc.cjs,
where it specifies some project specific configuration, such as the runtime environment.

Details on ESLint can be found here: https://eslint.org/docs/latest/

### Prettier

Prettier is a style-checker for JavaScript/TypeScript. JavaScript and TypeScript are very
flexible languages, meaning that the same functionality in code can look many ways. This includes
indentation, the presence of semicolons, and how functions are formatted.

Prettier defines a consistent style and ensures your code matches that style.

Prettier is defined by its configuration `.prettierrc.cjs`, which can be found at the root
and at each project. You **SHOULD NOT** modify the top-level or project-level configs directly,
they exist simply so that your IDE understands the prettier configuration. If you want to modify the prettier
configuration to update the style requirements, edit the custom config in the `configs` directory.

See https://prettier.io/docs/en/index.html for details on how to configure Prettier.

### Husky

Husky is a tool that automatically integrates with your `git`, enabling
scripts to automatically be run on certain events (such as attempting to commit).

In this repository, Husky is used to run `yarn run lint:fix` before each commit, which validates your code according to
ESLint, Prettier, and TypeScript. It automatically fixes anything that can
be automatically fixed, and if something needs manual intervention, it will stop
the commit from proceeding. If you have an issue that prevents you from committing,
run `yarn run lint:fix` and examine the output to find the issue.

If you absolutely need to skip the autochecks, you can run `git commit --no-verify`

Husky's config is in `.husky`.

You probably won't need to touch your Husky config.

See https://typicode.github.io/husky/ for details.

### Docker

Docker is a tool for containerized code. This basically means, it runs
code in highly-compact Virtual Machines that exist only to run that code.
When the code has finished running, the VMs die and all files that are not explicitly
marked to be saved are deleted from the VM.

This is useful for a few reasons:

1. It ensures a production environment that is always completely consistent
2. It simplifies the production environment
3. It simplifies deployment, as a template for a container (or, an Image) can be
   shared and easily run
4. It keeps the development environment consistent with the production environment
   and across systems
5. It simplifies interactions between multiple programs (for us, the backend, frontend, and database).

You can run `yarn run docker` to build and run a local Docker container with your application (using the settings from `/docker/docker-compose.yml`).
You can run `yarn run deploy` to build a Docker container for AWS and push it to AWS ECR (Elastic Container Registry).
You can run this container using AWS ECS, with properly configured environment variables.

You should not modify or move any of the Docker files unless you are absolutely sure
you know what you are doing.

See https://docs.docker.com for Docker documentation

### PostgreSQL

PostgreSQL is a modern, highly performant SQL database. It is completely
open-source, and the most widely used SQL database.

See https://www.postgresql.org/docs/ for details on PostgreSQL specific commands

### Traefik

Traefik is a "reverse-proxy"—that means it receives traffic and routes
it to the appropriate place. This is used in production to appropriately route
requests to the frontend or the backend. It also provides automatic TSL (https) configuration
in production, greatly enhancing security.

Details on Traefik can be found here: https://doc.traefik.io/traefik/

### Vitest

Vitest is a JavaScript test-runner. It is extremely fast, and includes
a web-portal to view and manipulate test results. It also can listen for file changes,
and automatically re-run tests based on file changes. Once the test configuration has
started, you can find the test results here: http://localhost:51204/**vitest**/

Vitetest is configured by the following files:

- `vitest.workspace.ts`, which defines where vitest can look for projects that
  will have test files
- `vitest.config.ts` which is the configuration file for vitest.
  Similar to vite in the frontend.

## Miscellaneous

The following details the remaining files that can be found in the top-level of the repo.

### .turbo

This is usually found in subdirectories, and is part of the Turbo.repo caching setup. You shouldn't need to
modfiy these files, but deleting them is OK.

### .gitignore

This defines folders/files that will automatically be excluded
from your Git repository. Don't modify this unless you are sure you know
what you're doing. This includes folders that cache dependencies, and .env files.

### Apps

Apps contains the above-described `frontend` and `backend` apps.

### Configs

Configs contains all the custom configurations (`prettier` `eslint`, and `TypeScript`)
described above in the repo. If you want to modify them, use the configs in these folders

### node_modules

This is location NPM installs packages. Some packages (`turbo` and `prettier`, as an example) still use
this as a caching location (as opposed to Yarn PnP, which is used in the rest of the repo).
Deleting this folder shouldn't have any affect other than slowing things down temporarily.

### Packages

Packages contains packages that the front/back end rely on, including code
they share. Changes to `Packages` will automatically be reflected in both the front and back ends.
