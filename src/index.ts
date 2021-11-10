import express, { Request, Response, Express } from "express";
import admin from "firebase-admin";
import { Auth } from "firebase-admin/lib/auth/auth";

const serviceAccount: object = {
  type: "service_account",
  project_id: "ruhuna-dev",
  private_key_id: "af265266faeba8d8061690187b8be6cbbaea9d0c",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7pHXhKOQxTlyz\nJlg6DLfZ2DkV0OnRAw8vpTlMnbqq2+syzL+m5rw6lMjL0UFny4NQvv/+Npun9Chi\ncKqB9/KrkXV6ROCDZkvmxNuKzByLZ6SpkY2LY1K9dz6zyAQcYAAzvYnJLwDV+sLq\nZ6zVJN8a35nsNX29qMxT1oirBUAq/vQ39HSlwhFRKAH+vFSmTZIEi6kkV6Wohj+G\nPrIFFVfn6gHMPehWwgjavcD4mG7ds+ik+Nb80WUoXbJFXC7+wS2MQ+qunNm6tHoV\nXplpFNm4oko5o00Tyvr4MaJGNvTTUymdLH2kRSKFoPwcmpW/UUMAbg8uJ/Ug8lmY\njMkAx2X/AgMBAAECggEAAbEu+vPScvtg7KCo5QUeV1GS2jaDFUZwyZ400RMPDuFi\n0pd0Fv43rlOPJ/9gFp6INZ8zUciOSMpz3sdjUj65KoDqTUr3t1eh0Zfu3uaOT1eE\n7Z6JZztjEKBVqWthVhwrhEvuRSkuWb+kKFb9AQMPG//uNGobEy3FgfAKVXh7pqeX\n+d3i+96MIR0UMz+xD2f5gYVvoj1XDQ6un18CljPzt7mUHJ1TC8KiSWELDF7g1Q7V\nGm5J4gKiv+xvGwUJOBDGU/2gsn+sAl4ZeMY/1jjbqit+Puq5DrVNs5JkAqIY2lrI\naidE9Vu1SESfLOE7YCXZqaJR1xASp/qGU0QBNoeLwQKBgQDhRsbsSnkDWnZx8vGy\nsq0WG/5VVZvTiTMgtfkyLu4cx1fc9bfDjguU2cKSdgMmOPx6uljymcHaYn+SQUU4\nlwzZGEwLRB2wCyLaaijQIMN5mBG+9ED3F0qquH9T8tuWqMJLIWBu6Xi6h33/bqA5\n0H2ykwqZdr/38Dz6MnQvqGjd4QKBgQDVO73XTFPiXGWff35DC9527cZwGox64l04\nx8RvSLVX2yLkNn9cMT5yQ/qQOdfnNYngl0mOfbE3XPZeoNVzi6jlqiIGWJO8FAQM\ncpYd+nsCHlSWWw5QKyBoIHgCgvVdGrJSmWOd1cyP2qikh67gv/Jmoj4AmLBy/RVn\nSV1Dx8v/3wKBgH7B4HRcgzML19HOLYmrWBE0tys0/HVOoeIqAonmNj0jPaEq8ber\nWYDr9ruKg8MiFY7JA/ud4KINAlM9PsHU3HnbXg6IyVuhKH9VdJmHlfX5RyL3NQbT\nqEPfhGWsJTrkwk6b/TLrU+9BBfiQOr/NPK0aZ8BqPSI5n1X4xb97N2aBAoGAUDs5\nVBAZI/vmFNxw0qNdolwXJUkoAHi54Mpxo/m0mgkPGNVUmIjC2VWwqqHJFer0JPhn\nqeCrVIx6+uIDToWHGFsqkD6137ecSl63EzKTJBnrc+NxAEMp32QQI8nIrq6D2EZ0\n0AeI/7ujZrzS1SgD+hAjyi+pfKqzafiVyhIcNPsCgYEAzyouzOqaQEYvTMYEuvFq\nl55u2X0pua70E5hax4VvicaWDasXh1TnfyTzDy4BPowOJByGDcFzqmtRajs2Dh83\n2BpRWBmKcVSJp7+UfpwzAn0We1z9FxQJQdqfLOqaVVa/Gd9L2w5FsbaNYT0nwhV3\nnHqofjm27bJyiS/lIJGKvcE=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-zq7q5@ruhuna-dev.iam.gserviceaccount.com",
  client_id: "105113689279319920223",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zq7q5%40ruhuna-dev.iam.gserviceaccount.com",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app: Express = express();

app.get("/", async (req: Request, res: Response) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("The Express with Node.js right now");
});

app.post("/auth", async (req: Request, res: Response) => {
  const idToken: string | undefined = req.header("Authorization");
  console.log("token = ", idToken);
  if (idToken) {
    const currentUser = await admin
      .auth()
      .verifyIdToken(idToken.replace("Bearer ", ""));
    console.log("currentUser = ", currentUser);
    res.json({ message: "done!" });
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("auth api working!");
  }
});

const PORT: string = process.env.PORT || "3001";

app.listen(PORT, () => {
  console.log(`Start the Web Server at: http://localhost:${PORT}`);
});
