export const getImageLink = (googleDriveLink: string) => {
  const regex = /\/file\/d\/([^/]+)\//;
  try {
    const match = googleDriveLink.match(regex);

    if (!match || match.length < 2) {
      throw new Error("Invalid Google Drive link");
    }

    const fileId = match[1];
    //   return `https://drive.google.com/uc?export=view&id=${fileId}`;
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  } catch (error: any) {
    console.log(error.message);
    return "/assets/imgs/page/homepage1/journey2.png";
  }
};
