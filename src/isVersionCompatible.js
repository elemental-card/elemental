import version from "./version";

// Compare major versions.
export default otherVersion =>
  otherVersion.split(".")[0] === version.split(".")[0];
