## Getting Started

### Purpose and use cases brief

Flexi file uploader allows the user to upload files locally and in remote storage containers. 
Initially, it was meant to be flexible enough to give the user the freedom of adding connectors to new remote storage services, via http/http protocols.

For simplicity in this application I am just using the host file system to store documents and images to a specific location: a folder under 
application root/public/uploads. For the remote option I integrated the vercel blob storage service and the upload is implemented using server upload method.

#### SignIn and Logout use case:
 Use next-auth module with built-in signin and signout methods.
 I have used two different providers: Credentials and Google provider, to show how next-auth allow easily integrate 
new providers with very little effort.

#### Upload use case:
Important: When using the uploader I just have  implemented the vercel upload strategy, meaning any file uploaded in this page will be uploaded straight
away to a unique vercel store. This could be more versatil, you can use more than one storage for project.

Constraint: Using the vercel server upload there is a limit on the file size in case of a Vercel-hosted website is 4.5 MB. 
This means you can't upload files larger than 4.5 MB on Vercel when using this method.

###### Security on uploads: 
All files stored on Vercel Blob are secured using AES-256 encryption. 
This encryption process is applied at rest and is transparent, ensuring that files are encrypted before being saved to the disk and decrypted upon retrieval.


#### Fetch files use case: 
Since I have two different locations to store files. 
There are two strategies to follow, one is using fs library the other one using vercel server strategy. The strategy is passed
on the route as a param and data will be loaded base on it.

### Rest API
All the endpoints can be publicly accessed by using any REST client, like postman. I have a signin method, to authenticate.
If user is not authenticated, I intercept the request with a non-authorised response.


### Analytics and UI components
The UI and charts components are reused from https://ui.shadcn.com/

### Typescript
Types inferred using https://zod.dev/

### Hosting.
The application is hosted in Vercel.
Also, I have hosted separately storybook project.


### Test
I have used cypress for integration testing.

### 
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open https://flexi-file-uploader.vercel.app/signin  with your browser to see the result.
Open https://storybook-file-uploader-mariadahs-projects.vercel.app for access to storybook project.
