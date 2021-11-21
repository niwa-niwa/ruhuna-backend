import "dotenv/config";
import app from "./app";

const PORT: string = process.env.PORT || "3001";

app.listen(PORT, () => {
  console.log(`Start the Web Server at: http://localhost:${PORT}`);
});
