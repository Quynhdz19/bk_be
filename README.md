# Project Name
Education

## Environment Setup

- Node.js (version 12.18.3 or above)
- npm (version 6.14.6 or above)

## Environment Specification

- Node.js: version 18.18.0

## Step Running

Follow the steps below to set up and run the project on your local machine.

3. create a .env file on same level as the src directory: 
    ```bash
    touch .env
    ```

4. Copy content of file .env.development to file .env: 
    ```bash
    cp .env.development .env
    ```

5. Install the dependencies:

    ```bash
    yarn install
    ```

### Running the Project
To run the project, use the following command:

```bash
yarn start
```

### Building for Production
To build the production-ready optimized bundle, use the following command:

```bash
yarn run build
```

### Directory Description
- `src/` - Contains the source code files of the project.
- `public/` - Contains the public assets and the HTML template file.
- `build/` - Generated directory for the production-ready build.
- `node_modules/` - Contains the installed dependencies.# education_fe
