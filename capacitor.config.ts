import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "ionic.dcollection",
  appName: "DCollection",
  webDir: "dist",
  plugins: {
    StatusBar: {
      backgroundColor: "#1e90ff",
    },
  },
};

export default config;
